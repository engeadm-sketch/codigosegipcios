// curso-guard.ts — proteção de acesso aos cursos
// Netlify Edge Function (Deno). Sem banco de dados, sem login.
//
// Ordem de verificação:
//   1. cookie válido        -> deixa passar
//   2. ?t=<token> na URL    -> valida, grava cookie, redireciona sem o ?t
//   3. nada                 -> redireciona para a página de vendas
//
// FALHA ABERTA de propósito: se a variável CURSO_SEGREDO não existir,
// a função deixa tudo passar. Uma configuração errada nunca tranca você
// para fora do seu próprio site.

import type { Config, Context } from "@netlify/edge-functions";

// Um cookie por curso: quem compra os dois não perde o acesso ao primeiro
// quando entra no segundo.
const cookieDe = (produto: string) => `curso_acesso_${produto}`;

// Legível por JavaScript de propósito (ver areaDoAluno). Guarda só a lista
// de cursos, nunca o token.
const COOKIE_LISTA = "curso_lista";

const CURSOS = ["curso-hieroglifos", "curso-arqueoastronomia"];
const AREA = "aluno";

const PAGINA_VENDAS = "/masterclass-hieroglifos/?acesso=negado";

/* ------------------------------------------------------------------ */
/* base64url                                                           */
/* ------------------------------------------------------------------ */

function b64urlParaBytes(s: string): Uint8Array {
  const base64 = s.replace(/-/g, "+").replace(/_/g, "/")
    .padEnd(s.length + ((4 - (s.length % 4)) % 4), "=");
  const bin = atob(base64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function bytesParaTexto(b: Uint8Array): string {
  return new TextDecoder().decode(b);
}

/* ------------------------------------------------------------------ */
/* HMAC-SHA256                                                         */
/* ------------------------------------------------------------------ */

async function chaveDe(segredo: string): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(segredo),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
}

type Carga = {
  p: string; // produto (pasta do curso), ou "*" para acesso a todos
  e?: string; // e-mail do comprador
  x: number; // expiração, unix em segundos
  i?: string; // id da compra
};

// exportada só para o teste automatizado em scripts/testar.mjs;
// a Netlify usa apenas o export default lá embaixo.
export async function validar(
  token: string,
  segredo: string,
): Promise<Carga | null> {
  if (typeof token !== "string" || !token) return null;

  const partes = token.split(".");
  if (partes.length !== 2) return null;

  const [cargaB64, assinaturaB64] = partes;

  let assinatura: Uint8Array;
  let cargaBytes: Uint8Array;
  try {
    assinatura = b64urlParaBytes(assinaturaB64);
    cargaBytes = b64urlParaBytes(cargaB64);
  } catch {
    return null;
  }

  const ok = await crypto.subtle.verify(
    "HMAC",
    await chaveDe(segredo),
    assinatura,
    new TextEncoder().encode(cargaB64),
  );
  if (!ok) return null;

  let carga: Carga;
  try {
    carga = JSON.parse(bytesParaTexto(cargaBytes));
  } catch {
    return null;
  }

  if (typeof carga.x !== "number" || carga.x * 1000 < Date.now()) return null;
  if (typeof carga.p !== "string" || !carga.p) return null;

  return carga;
}

/* ------------------------------------------------------------------ */
/* qual curso esta URL representa                                      */
/* ------------------------------------------------------------------ */

function produtoDaURL(pathname: string): string {
  // "/curso-hieroglifos/modulo-03.html" -> "curso-hieroglifos"
  return pathname.split("/").filter(Boolean)[0] ?? "";
}

// "*" é o token combo: abre qualquer curso.
const liberaPara = (carga: Carga | null, produto: string) =>
  !!carga && (carga.p === produto || carga.p === "*");

// quais cursos um token concede
const cursosDe = (carga: Carga): string[] =>
  carga.p === "*" ? [...CURSOS] : CURSOS.filter((c) => c === carga.p);

const paraCookie = (nome: string, valor: string, maxAge: number, http: boolean) =>
  `${nome}=${valor}; Path=/; Max-Age=${maxAge}; ${http ? "HttpOnly; " : ""}Secure; SameSite=Lax`;

const validade = (carga: Carga) =>
  Math.max(60, Math.min(carga.x - Math.floor(Date.now() / 1000), 60 * 60 * 24 * 400));

const paraVendas = () =>
  new Response(null, {
    status: 302,
    headers: { Location: PAGINA_VENDAS, "Cache-Control": "no-store" },
  });

/* ------------------------------------------------------------------ */
/* a área do aluno                                                     */
/*                                                                     */
/* Regra diferente da dos cursos: /aluno/ abre para quem tem token de  */
/* QUALQUER curso. Além de deixar passar, publica em COOKIE_LISTA quais */
/* cursos a pessoa tem — esse cookie NÃO é HttpOnly, porque a página    */
/* precisa lê-lo em JavaScript para montar a área. Ele não concede      */
/* nada: quem o forjar vê links que o guard continua barrando.          */
/* ------------------------------------------------------------------ */

async function areaDoAluno(request: Request, context: Context, url: URL, segredo: string) {
  // porta de entrada: o link do e-mail de compra aponta para /aluno/?t=...
  const tokenURL = url.searchParams.get("t");
  if (tokenURL) {
    const carga = await validar(tokenURL, segredo);
    const meus = carga ? cursosDe(carga) : [];
    if (carga && meus.length) {
      const limpa = new URL(url.toString());
      limpa.searchParams.delete("t");

      const h = new Headers({
        Location: limpa.pathname + limpa.search + limpa.hash,
        "Cache-Control": "no-store",
      });
      // um cookie por curso concedido — o combo grava os dois de uma vez
      for (const c of meus) {
        h.append("Set-Cookie", paraCookie(cookieDe(c), tokenURL, validade(carga), true));
      }
      h.append("Set-Cookie", paraCookie(COOKIE_LISTA, meus.join("~"), validade(carga), false));
      return new Response(null, { status: 302, headers: h });
    }
  }

  // sem ?t=: vale qualquer cookie de curso que ainda esteja válido
  const meus: string[] = [];
  for (const c of CURSOS) {
    const ck = context.cookies.get(cookieDe(c));
    if (ck && liberaPara(await validar(ck, segredo), c)) meus.push(c);
  }
  // A área do aluno abre para QUALQUER UM, de propósito. Ela não contém
  // conteúdo de curso — só títulos de módulo e nomes de aula, que já estão
  // públicos nas páginas de venda. O conteúdo continua trancado nas rotas
  // /curso-*, que este mesmo guard protege.
  //
  // O motivo é de experiência, não de segurança: quem acabou de comprar e
  // clica em "Entrar" antes de abrir o e-mail não tem cookie ainda. Barrando,
  // ele era jogado na página de venda do curso que acabara de pagar. Passando,
  // ele lê "abra de novo o link que você recebeu" e resolve sozinho.
  const origem = await context.next();
  const res = new Response(origem.body, origem);
  res.headers.append(
    "Set-Cookie",
    meus.length
      // tem acesso: publica a lista, para a página nunca ficar velha
      ? paraCookie(COOKIE_LISTA, meus.join("~"), 60 * 60 * 24 * 400, false)
      // não tem: apaga a lista, para não exibir curso que não abriria
      : `${COOKIE_LISTA}=; Path=/; Max-Age=0; Secure; SameSite=Lax`,
  );
  return res;
}

/* ------------------------------------------------------------------ */
/* handler                                                             */
/* ------------------------------------------------------------------ */

export default async (request: Request, context: Context) => {
  const segredo = Netlify.env.get("CURSO_SEGREDO");

  // Sem segredo configurado: não protege nada. Nunca tranca o dono fora.
  if (!segredo) return;

  const url = new URL(request.url);
  const produto = produtoDaURL(url.pathname);

  if (produto === AREA) return await areaDoAluno(request, context, url, segredo);

  // 1. cookie
  const cookie = context.cookies.get(cookieDe(produto));
  if (cookie && liberaPara(await validar(cookie, segredo), produto)) return;

  // 2. token na URL
  const tokenURL = url.searchParams.get("t");
  if (tokenURL) {
    const carga = await validar(tokenURL, segredo);
    if (carga && liberaPara(carga, produto)) {
      const limpa = new URL(url.toString());
      limpa.searchParams.delete("t");

      const h = new Headers({
        Location: limpa.pathname + limpa.search + limpa.hash,
        "Cache-Control": "no-store",
      });
      h.append("Set-Cookie", paraCookie(cookieDe(produto), tokenURL, validade(carga), true));
      // publica a lista também aqui: quem entra direto por um curso já chega
      // na área do aluno com os cursos certos reconhecidos
      h.append("Set-Cookie", paraCookie(COOKIE_LISTA, cursosDe(carga).join("~"), validade(carga), false));

      return new Response(null, { status: 302, headers: h });
    }
  }

  // 3. sem credencial
  return paraVendas();
};

export const config: Config = {
  path: [
    "/curso-hieroglifos",
    "/curso-hieroglifos/*",
    "/curso-arqueoastronomia",
    "/curso-arqueoastronomia/*",
    "/aluno",
    "/aluno/*",
  ],
};
