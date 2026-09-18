#!/usr/bin/env node
// testar.mjs — prova que o token emitido pelo gerador é aceito pelo guard,
// e que qualquer adulteração é recusada.
//
//   node scripts/testar.mjs
//
// Importa a MESMA função de validação que roda na Netlify (não uma cópia).

import { gerarToken } from "./gerar-token.mjs";
import guard, { validar } from "../netlify/edge-functions/curso-guard.ts";

const SEGREDO = "segredo-de-teste-nao-use-em-producao";
const OUTRO = "outro-segredo-qualquer";

let falhas = 0;
function checa(nome, condicao) {
  console.log(`${condicao ? "  ok  " : "FALHA "} ${nome}`);
  if (!condicao) falhas++;
}

/* 1. caminho feliz -------------------------------------------------- */
const { token } = gerarToken(SEGREDO, {
  produto: "curso-hieroglifos",
  email: "fabio@exemplo.com",
  dias: 365,
});
const bom = await validar(token, SEGREDO);
checa("token legítimo é aceito", bom !== null);
checa("carrega o produto certo", bom?.p === "curso-hieroglifos");
checa("carrega o e-mail", bom?.e === "fabio@exemplo.com");

/* 2. assinatura adulterada ------------------------------------------ */
const [carga, assin] = token.split(".");
const assinTorta = assin.slice(0, -2) + (assin.endsWith("aa") ? "bb" : "aa");
checa(
  "assinatura trocada é recusada",
  (await validar(`${carga}.${assinTorta}`, SEGREDO)) === null,
);

/* 3. carga adulterada (trocar o produto na mão) --------------------- */
const cargaFalsa = Buffer.from(
  JSON.stringify({ p: "curso-arqueoastronomia", x: 4102444800 }),
).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
checa(
  "carga reescrita com a assinatura antiga é recusada",
  (await validar(`${cargaFalsa}.${assin}`, SEGREDO)) === null,
);

/* 4. segredo errado ------------------------------------------------- */
checa("token de outro segredo é recusado", (await validar(token, OUTRO)) === null);

/* 5. token vencido -------------------------------------------------- */
const { token: vencido } = gerarToken(SEGREDO, {
  produto: "curso-hieroglifos",
  dias: -1,
});
checa("token vencido é recusado", (await validar(vencido, SEGREDO)) === null);

/* 6. lixo ----------------------------------------------------------- */
for (const lixo of ["", "abc", "a.b.c", "....", "%%%.%%%"]) {
  checa(
    `lixo recusado: ${JSON.stringify(lixo)}`,
    (await validar(lixo, SEGREDO)) === null,
  );
}

/* 7. token de um curso não abre o outro ----------------------------- */
const { token: tokenArqueo } = gerarToken(SEGREDO, {
  produto: "curso-arqueoastronomia",
  dias: 30,
});
const cargaArqueo = await validar(tokenArqueo, SEGREDO);
checa(
  "token do outro curso valida mas com produto diferente",
  cargaArqueo?.p === "curso-arqueoastronomia",
);

/* 8. o handler inteiro, simulando a Netlify -------------------------- */

// simula o jar de cookies do navegador: { nome: valor }
// next() devolve o que a Netlify entregaria se o guard deixasse passar
const ctx = (jar = {}) => ({
  cookies: { get: (n) => jar[n] },
  next: async () => new Response("<html>a área do aluno</html>", {
    status: 200, headers: { "content-type": "text/html" },
  }),
});
const jarHiero = (t) => ({ "curso_acesso_curso-hieroglifos": t });
const req = (u) => new Request(u);
const BASE = "https://codigosegipcios.netlify.app";

// 8a. sem segredo configurado -> falha aberta, deixa passar
globalThis.Netlify = { env: { get: () => undefined } };
checa(
  "sem CURSO_SEGREDO o guard não bloqueia nada",
  (await guard(req(`${BASE}/curso-hieroglifos/`), ctx())) === undefined,
);

// a partir daqui, segredo configurado
globalThis.Netlify = { env: { get: (k) => (k === "CURSO_SEGREDO" ? SEGREDO : undefined) } };

// 8b. sem nada -> manda para a página de vendas
const negado = await guard(req(`${BASE}/curso-hieroglifos/modulo-03.html`), ctx());
checa("visitante sem token é redirecionado", negado?.status === 302);
checa(
  "e cai na página de vendas",
  negado?.headers.get("location")?.includes("acesso=negado"),
);

// 8c. com ?t= válido -> grava cookie e redireciona sem o t
const entrada = await guard(req(`${BASE}/curso-hieroglifos/?t=${token}`), ctx());
checa("token na URL gera redirecionamento", entrada?.status === 302);
checa(
  "o ?t= some da URL final",
  entrada?.headers.get("location") === "/curso-hieroglifos/",
);
const setCookie = entrada?.headers.get("set-cookie") ?? "";
checa(
  "grava o cookie do curso certo",
  setCookie.startsWith("curso_acesso_curso-hieroglifos="),
);
checa("cookie é HttpOnly", /HttpOnly/i.test(setCookie));
checa("cookie é Secure", /Secure/i.test(setCookie));
checa("cookie vale para o site todo", /Path=\//.test(setCookie));

// 8d. com cookie válido -> passa direto
checa(
  "cookie válido abre a página",
  (await guard(
    req(`${BASE}/curso-hieroglifos/modulo-07.html`),
    ctx(jarHiero(token)),
  )) === undefined,
);

// 8e. cookie de um curso NÃO abre o outro
const cruzado = await guard(
  req(`${BASE}/curso-arqueoastronomia/modulo-02.html`),
  ctx(jarHiero(token)),
);
checa("cookie de hieróglifos não abre arqueoastronomia", cruzado?.status === 302);

// 8f. token na URL mas para o curso errado
const errado = await guard(
  req(`${BASE}/curso-arqueoastronomia/?t=${token}`),
  ctx(),
);
checa("token do curso errado na URL é recusado", errado?.status === 302);

// 8g. cookie vencido -> bloqueia
checa(
  "cookie vencido é bloqueado",
  (await guard(req(`${BASE}/curso-hieroglifos/`), ctx(jarHiero(vencido))))
    ?.status === 302,
);

// 8h. quem comprou os dois mantém os dois cookies ao mesmo tempo
const jarDuplo = {
  "curso_acesso_curso-hieroglifos": token,
  "curso_acesso_curso-arqueoastronomia": tokenArqueo,
};
checa(
  "dois cursos convivem: hieróglifos abre",
  (await guard(req(`${BASE}/curso-hieroglifos/`), ctx(jarDuplo))) === undefined,
);
checa(
  "dois cursos convivem: arqueoastronomia abre",
  (await guard(req(`${BASE}/curso-arqueoastronomia/`), ctx(jarDuplo))) ===
    undefined,
);

// 8i. token combo "*" abre os dois
const { token: combo } = gerarToken(SEGREDO, { produto: "*", dias: 365 });
checa(
  'token combo "*" abre hieróglifos',
  (await guard(req(`${BASE}/curso-hieroglifos/?t=${combo}`), ctx()))?.status ===
    302,
);
checa(
  'token combo "*" abre arqueoastronomia',
  (await guard(req(`${BASE}/curso-arqueoastronomia/?t=${combo}`), ctx()))
    ?.headers.get("location") === "/curso-arqueoastronomia/",
);

// 8j. âncora e outros parâmetros sobrevivem à limpeza do ?t=
const comExtras = await guard(
  req(`${BASE}/curso-hieroglifos/modulo-04.html?t=${token}&ref=email#aula-4-2`),
  ctx(),
);
checa(
  "outros parâmetros e a âncora sobrevivem",
  comExtras?.headers.get("location") ===
    "/curso-hieroglifos/modulo-04.html?ref=email#aula-4-2",
);

/* 9. a área do aluno ------------------------------------------------ */

// cookies de resposta -> { nome: {valor, httpOnly, ...} }
function lerSetCookie(res) {
  const out = {};
  for (const linha of (res?.headers.getSetCookie?.() ?? [])) {
    const [par, ...attrs] = linha.split(";").map((s) => s.trim());
    const i = par.indexOf("=");
    out[par.slice(0, i)] = {
      valor: par.slice(i + 1),
      httpOnly: attrs.some((a) => /^HttpOnly$/i.test(a)),
      secure: attrs.some((a) => /^Secure$/i.test(a)),
    };
  }
  return out;
}

const AREA = `${BASE}/aluno/`;

// 9a. sem credencial: a área ABRE, de propósito — ela não tem conteúdo de
// curso, e quem acabou de comprar precisa ler "abra o link do e-mail" em vez
// de ser jogado na página de venda do que já pagou.
const semNada = await guard(req(AREA), ctx());
checa("área do aluno sem token ABRE (não expulsa)", semNada?.status === 200);
checa("e entrega a página", (await semNada.text()).includes("área do aluno"));
const ckSemNada = lerSetCookie(semNada);
checa(
  "e manda apagar a lista de cursos (valor vazio)",
  ckSemNada["curso_lista"]?.valor === "",
);
checa(
  "com Max-Age=0, que é o que faz o navegador apagar de fato",
  /Max-Age=0\b/.test(semNada.headers.getSetCookie().find((l) => l.startsWith("curso_lista=")) ?? ""),
);

// 9a-bis. mas o CONTEÚDO dos cursos continua trancado
for (const c of ["curso-hieroglifos", "curso-arqueoastronomia"]) {
  checa(
    `/${c}/ continua trancado para quem não tem token`,
    (await guard(req(`${BASE}/${c}/`), ctx()))?.status === 302,
  );
}

// 9b. entrada pelo link do e-mail
const entradaArea = await guard(req(`${AREA}?t=${token}`), ctx());
const ckArea = lerSetCookie(entradaArea);
checa("entrar na área com ?t= redireciona", entradaArea?.status === 302);
checa("e limpa o token da URL", entradaArea?.headers.get("location") === "/aluno/");
checa(
  "grava o cookie de acesso do curso comprado",
  ckArea["curso_acesso_curso-hieroglifos"]?.valor === token,
);
checa("esse cookie é HttpOnly", ckArea["curso_acesso_curso-hieroglifos"]?.httpOnly === true);
checa("grava a lista de cursos", ckArea["curso_lista"]?.valor === "curso-hieroglifos");
checa(
  "a lista NÃO é HttpOnly — a página precisa lê-la",
  ckArea["curso_lista"]?.httpOnly === false,
);
checa("mas continua Secure", ckArea["curso_lista"]?.secure === true);
checa("a lista não carrega o token", !ckArea["curso_lista"]?.valor.includes("."));

// 9c. combo abre os dois de uma vez
const ckCombo = lerSetCookie(await guard(req(`${AREA}?t=${combo}`), ctx()));
checa(
  "combo grava o cookie dos dois cursos",
  ckCombo["curso_acesso_curso-hieroglifos"]?.valor === combo &&
    ckCombo["curso_acesso_curso-arqueoastronomia"]?.valor === combo,
);
checa(
  "e a lista traz os dois",
  ckCombo["curso_lista"]?.valor === "curso-hieroglifos~curso-arqueoastronomia",
);

// 9d. quem já tem cookie entra direto, e a lista é reescrita
const dentro = await guard(req(AREA), ctx(jarHiero(token)));
checa("com cookie válido a área abre", dentro?.status === 200);
checa("e entrega a página", (await dentro.text()).includes("área do aluno"));
checa(
  "reescrevendo a lista de cursos",
  lerSetCookie(dentro)["curso_lista"]?.valor === "curso-hieroglifos",
);

const dentroDuplo = await guard(req(AREA), ctx(jarDuplo));
checa(
  "quem tem os dois cursos vê os dois na lista",
  lerSetCookie(dentroDuplo)["curso_lista"]?.valor ===
    "curso-hieroglifos~curso-arqueoastronomia",
);

// 9e. cookie vencido: a área abre, mas sem curso nenhum listado
const comVencido = await guard(req(AREA), ctx(jarHiero(vencido)));
checa("cookie vencido não expulsa da área", comVencido?.status === 200);
checa(
  "mas a lista sai vazia, então a página mostra a explicação",
  lerSetCookie(comVencido)["curso_lista"]?.valor === "",
);

// 9f. token de curso entrando pela porta do curso também publica a lista
checa(
  "entrar por /curso-X/?t= já publica a lista para a área",
  lerSetCookie(entrada)["curso_lista"]?.valor === "curso-hieroglifos",
);

// 9g. sem segredo, a área também falha aberta
globalThis.Netlify = { env: { get: () => undefined } };
checa(
  "sem CURSO_SEGREDO a área não bloqueia ninguém",
  (await guard(req(AREA), ctx())) === undefined,
);
globalThis.Netlify = { env: { get: (k) => (k === "CURSO_SEGREDO" ? SEGREDO : undefined) } };

console.log("");
console.log(falhas === 0 ? "Tudo passou." : `${falhas} falha(s).`);
process.exit(falhas === 0 ? 0 : 1);
