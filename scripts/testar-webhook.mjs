#!/usr/bin/env node
// testar-webhook.mjs — prova que uma compra aprovada vira um link que o
// curso-guard aceita, e que nada além disso passa.
//
//   node scripts/testar-webhook.mjs
//
// Importa a MESMA função que roda na Netlify e o MESMO validador que roda na
// borda — não cópias. Se os dois deixarem de combinar, este teste quebra.

import { createHmac } from "node:crypto";
import handler from "../netlify/functions/compra.mjs";
import { validar } from "../netlify/edge-functions/curso-guard.ts";

const SEGREDO = "segredo-de-teste-nao-use-em-producao";
const CAKTO_SECRET = "secret-da-cakto";
const KIWIFY_TOKEN = "token-da-kiwify";

const ID_HIERO = "cd287b31-d4b7-4e94-858a-96e05ce2f4a2";
const ID_ARQUEO = "9f2a1c04-1111-2222-3333-444455556666";
const ID_COMBO = "5b77e0aa-aaaa-bbbb-cccc-ddddeeeeffff";

Object.assign(process.env, {
  CURSO_SEGREDO: SEGREDO,
  CAKTO_SECRET, KIWIFY_TOKEN,
  PRODUTOS: JSON.stringify({
    [ID_HIERO]: "curso-hieroglifos",
    [ID_ARQUEO]: "curso-arqueoastronomia",
    [ID_COMBO]: "*",
  }),
  RESEND_API_KEY: "re_teste",
  EMAIL_REMETENTE: "Códigos Egípcios <acesso@exemplo.com>",
  EMAIL_ADMIN: "fabio@exemplo.com",
  CURSO_SITE: "https://codigosegipcios.netlify.app",
});

/* ---- dublês: nada sai para a internet, nada é gravado de verdade ---- */
let enviados = [];
const fetchOriginal = async (url, opts) => {
  if (String(url).includes("api.resend.com")) {
    enviados.push(JSON.parse(opts.body));
    return new Response(JSON.stringify({ id: "email_" + enviados.length }), { status: 200 });
  }
  throw new Error("chamada de rede inesperada: " + url);
};
globalThis.fetch = fetchOriginal;

let falhas = 0;
function checa(nome, cond, extra) {
  console.log(`${cond ? "  ok  " : "FALHA "} ${nome}${cond || !extra ? "" : "  → " + extra}`);
  if (!cond) falhas++;
}

/* ---- construtores de payload ----
   Cada chamada gera um pedido novo: com o registro de vendas ligado, repetir
   o mesmo id significa "já entregue", e um teste contaminaria o seguinte.
   O bloco de entrega dupla reaproveita um payload de propósito. */
let seq = 0;
const cakto = (over = {}) => ({
  secret: CAKTO_SECRET,
  event: "purchase_approved",
  data: {
    id: `pedido-${++seq}`,
    refId: "AUAe5xK",
    customer: { name: "Maria Silva", email: "maria@exemplo.com", phone: "34999999999" },
    offer: { id: "B8BcHrY", name: "Oferta", price: 197 },
    product: { name: "Masterclass de Hieróglifos", id: ID_HIERO, type: "unique" },
    status: "paid", amount: 197, fees: 2.49, paymentMethod: "pix",
    paidAt: "2026-09-15T11:39:57.113068-03:00",
    ...over.data,
  },
  ...Object.fromEntries(Object.entries(over).filter(([k]) => k !== "data")),
});

const post = (body, { url = "https://site.netlify.app/api/compra", method = "POST" } = {}) =>
  handler(new Request(url, {
    method, headers: { "content-type": "application/json" },
    body: method === "POST" ? JSON.stringify(body) : undefined,
  }));

const paraComprador = () => enviados.find((e) => e.to[0] === "maria@exemplo.com");
const paraAdmin = () => enviados.filter((e) => e.to[0] === "fabio@exemplo.com");
const tokenDoEmail = (e) => e?.html.match(/\?t=([\w-]+\.[\w-]+)/)?.[1];

/* ══════════════ 1. o caminho feliz ══════════════ */
enviados = [];
const compra1 = cakto();
let r = await post(compra1);
checa("compra aprovada devolve 200", r.status === 200, `status ${r.status}`);
checa("comprador recebeu e-mail", !!paraComprador());
checa("dono recebeu aviso de venda", paraAdmin().length === 1);

const tk = tokenDoEmail(paraComprador());
checa("o e-mail traz um token", !!tk);
const carga = await validar(tk, SEGREDO);
checa("o curso-guard ACEITA o token emitido", carga !== null);
checa("token aponta para o curso comprado", carga?.p === "curso-hieroglifos");
checa("token carrega o e-mail do comprador", carga?.e === "maria@exemplo.com");
checa("token carrega o id do pedido", carga?.i === compra1.data.id);
checa("o link do e-mail é do curso certo",
  paraComprador().html.includes("/curso-hieroglifos/?t="));
checa("o e-mail NÃO vaza o outro curso",
  !paraComprador().html.includes("/curso-arqueoastronomia/"));

/* ══════════════ 2. segredo errado ══════════════ */
enviados = [];
r = await post(cakto({ secret: "chute" }));
checa("secret errado devolve 401", r.status === 401, `status ${r.status}`);
checa("e não dispara nenhum e-mail", enviados.length === 0);

enviados = [];
r = await post({ ...cakto(), secret: undefined });
checa("sem secret devolve 401", r.status === 401);

/* ══════════════ 3. eventos que não são venda ══════════════ */
for (const ev of ["pix_gerado", "boleto_gerado", "purchase_refused", "checkout_abandonment"]) {
  enviados = [];
  r = await post(cakto({ event: ev }));
  checa(`evento "${ev}" é ignorado sem e-mail`, r.status === 200 && enviados.length === 0);
}

// aprovado mas ainda não pago
enviados = [];
r = await post(cakto({ data: { status: "waiting_payment" } }));
checa("status diferente de paid não libera acesso", enviados.length === 0);

/* ══════════════ 4. reembolso e estorno ══════════════ */
for (const ev of ["refund", "chargeback"]) {
  enviados = [];
  r = await post(cakto({ event: ev }));
  checa(`"${ev}": 200, avisa o dono e NÃO manda acesso`,
    r.status === 200 && !paraComprador() && paraAdmin().length === 1);
}

/* ══════════════ 5. produto fora do mapa ══════════════ */
enviados = [];
r = await post(cakto({ data: { product: { id: "id-desconhecido", name: "Caneca" } } }));
checa("produto não mapeado: 200 (não faz a plataforma repetir)", r.status === 200);
checa("produto não mapeado: comprador não recebe token", !paraComprador());
checa("produto não mapeado: dono é avisado", paraAdmin().length === 1);

/* ══════════════ 6. combo ══════════════ */
enviados = [];
r = await post(cakto({ data: { product: { id: ID_COMBO, name: "Combo" } } }));
const tkCombo = tokenDoEmail(paraComprador());
const cargaCombo = await validar(tkCombo, SEGREDO);
checa('combo emite token com produto "*"', cargaCombo?.p === "*");
checa("e-mail do combo traz os dois links",
  paraComprador().html.includes("/curso-hieroglifos/?t=") &&
  paraComprador().html.includes("/curso-arqueoastronomia/?t="));

/* ══════════════ 7. token de um curso não abre o outro ══════════════ */
enviados = [];
await post(cakto({ data: { product: { id: ID_ARQUEO, name: "Arqueoastronomia" } } }));
const tkArq = tokenDoEmail(paraComprador());
const cargaArq = await validar(tkArq, SEGREDO);
checa("compra do arqueo emite token do arqueo", cargaArq?.p === "curso-arqueoastronomia");
checa("e esse token não é o do outro curso", cargaArq?.p !== "curso-hieroglifos");

/* ══════════════ 8. Kiwify ══════════════ */
const kiwi = {
  order_id: "ord_123", order_status: "paid",
  Customer: { email: "maria@exemplo.com", full_name: "Maria Silva" },
  Product: { product_id: ID_HIERO, product_name: "Masterclass de Hieróglifos" },
};
const assinar = (b) => createHmac("sha1", KIWIFY_TOKEN).update(JSON.stringify(b)).digest("hex");

enviados = [];
r = await post(kiwi, { url: `https://site.netlify.app/api/compra?signature=${assinar(kiwi)}` });
checa("Kiwify com assinatura válida entrega o acesso", r.status === 200 && !!paraComprador());
checa("e o token da Kiwify também é aceito pelo guard",
  (await validar(tokenDoEmail(paraComprador()), SEGREDO))?.p === "curso-hieroglifos");

enviados = [];
r = await post(kiwi, { url: "https://site.netlify.app/api/compra?signature=abc123" });
checa("Kiwify com assinatura errada devolve 401", r.status === 401 && enviados.length === 0);

enviados = [];
r = await post(kiwi);
checa("Kiwify sem assinatura devolve 401", r.status === 401);

enviados = [];
r = await post({ ...kiwi, order_status: "refunded" },
  { url: `https://site.netlify.app/api/compra?signature=${assinar({ ...kiwi, order_status: "refunded" })}` });
checa("Kiwify reembolsado não libera acesso", !paraComprador() && r.status === 200);

/* ══════════════ 9. o webhook repetido ══════════════
   As plataformas reenviam o mesmo evento quando não recebem 200 a tempo.
   Sem trava, o comprador receberia dois e-mails e dois tokens. Este bloco
   só roda se o Netlify Blobs estiver disponível (o dublê em node_modules,
   nos testes; o pacote de verdade, em produção). */
let temBlobs = false;
try { await import("@netlify/blobs"); temBlobs = true; } catch {}

if (!temBlobs) {
  console.log("  --   entrega dupla: pulado (@netlify/blobs ausente)");
} else {
  enviados = [];
  const p = cakto();                  // um pedido, enviado três vezes
  const r1 = await post(p);
  const nDepoisDaPrimeira = enviados.length;
  const r2 = await post(p);           // mesmíssimo pedido, de novo
  const r3 = await post(p);           // e de novo

  checa("webhook repetido continua devolvendo 200",
    r1.status === 200 && r2.status === 200 && r3.status === 200);
  checa("o comprador recebe UM e-mail só, não três",
    enviados.filter((e) => e.to[0] === "maria@exemplo.com").length === 1,
    `recebeu ${enviados.filter((e) => e.to[0] === "maria@exemplo.com").length}`);
  checa("nenhum e-mail a mais depois da primeira entrega",
    enviados.length === nDepoisDaPrimeira, `${enviados.length} vs ${nDepoisDaPrimeira}`);

  // a venda ficou registrada, que é o que permite reemitir se o segredo mudar
  const { getStore } = await import("@netlify/blobs");
  const linha = await getStore("vendas").get(`cakto-${p.data.id}`, { type: "json" });
  checa("a venda fica registrada com comprador e curso",
    linha?.email === "maria@exemplo.com" && linha?.produto === "curso-hieroglifos");
  checa("e com o token, para reenviar o acesso sem recalcular", !!linha?.token);

  // pedido diferente, mesmo comprador: precisa entregar
  enviados = [];
  await post(cakto());   // outro pedido, mesmo comprador
  checa("um pedido novo do mesmo comprador é entregue normalmente", !!paraComprador());
}

/* ══════════════ 10. método e corpo ══════════════ */
checa("GET devolve 405", (await post(null, { method: "GET" })).status === 405);
r = await handler(new Request("https://s/api/compra", { method: "POST", body: "isto não é json" }));
checa("corpo inválido devolve 400", r.status === 400);

/* ══════════════ 11. sem CURSO_SEGREDO ══════════════ */
enviados = [];
const guardado = process.env.CURSO_SEGREDO;
delete process.env.CURSO_SEGREDO;
r = await post(cakto());
checa("sem CURSO_SEGREDO devolve 500 e não inventa acesso",
  r.status === 500 && enviados.length === 0);
process.env.CURSO_SEGREDO = guardado;

/* ══════════════ 12. e-mail fora do ar ══════════════ */
enviados = [];
globalThis.fetch = async () => new Response("quota exceeded", { status: 429 });
r = await post(cakto());
checa("se a Resend falhar, devolve 500 para a plataforma repetir", r.status === 500);

/* ══════════════ 13. o mapa padrão, sem a variável PRODUTOS ══════════════
   Os ids abaixo são os reais da conta da Cakto, lidos da API pública do
   checkout. Este bloco prova que, mesmo sem ninguém criar a variável de
   ambiente, uma compra de cada produto entrega o curso certo. */
globalThis.fetch = fetchOriginal;
const semVariavel = process.env.PRODUTOS;
delete process.env.PRODUTOS;

for (const [rotulo, idProduto, idOferta, esperado] of [
  ["Masterclass", "AyaZ2qq", "i8tzac5", ["curso-hieroglifos"]],
  ["Arqueoastronomia", "5GP4SGF", "92q6amb", ["curso-arqueoastronomia"]],
  ["Combo", "6CTrKwE", "mryzbp7", ["curso-hieroglifos", "curso-arqueoastronomia"]],
]) {
  // pelo id do produto
  enviados = [];
  r = await post(cakto({ data: { product: { name: rotulo, id: idProduto } } }));
  let html = paraComprador()?.html ?? "";
  checa(`${rotulo}: id do produto entrega ${esperado.join(" + ")}`,
    r.status === 200 && esperado.every((c) => html.includes(`/${c}/?t=`)));

  // pelo id da oferta, caso a Cakto mande só ele
  enviados = [];
  r = await post(cakto({ data: { product: { name: rotulo, id: "desconhecido" }, offer: { id: idOferta } } }));
  html = paraComprador()?.html ?? "";
  checa(`${rotulo}: id da oferta também entrega`,
    r.status === 200 && esperado.every((c) => html.includes(`/${c}/?t=`)));
}

// um id que não é de nenhum produto continua caindo no aviso ao dono
enviados = [];
r = await post(cakto({ data: { product: { name: "Camiseta", id: "nada-a-ver" }, offer: { id: "nada-a-ver" } } }));
checa("id desconhecido ainda avisa o dono em vez de inventar acesso",
  r.status === 200 && paraComprador() === undefined && paraAdmin().length === 1);

// e a variável, quando existe, manda mais que o padrão
process.env.PRODUTOS = JSON.stringify({ AyaZ2qq: "curso-arqueoastronomia" });
enviados = [];
r = await post(cakto({ data: { product: { name: "Masterclass", id: "AyaZ2qq" } } }));
checa("a variável PRODUTOS tem precedência sobre o mapa do código",
  (paraComprador()?.html ?? "").includes("/curso-arqueoastronomia/?t="));

if (semVariavel === undefined) delete process.env.PRODUTOS;
else process.env.PRODUTOS = semVariavel;

console.log("");
console.log(falhas === 0 ? "Tudo passou." : `${falhas} falha(s).`);
process.exit(falhas === 0 ? 0 : 1);
