// compra.mjs — recebe o webhook de venda e entrega o acesso ao curso.
//
// Fluxo: plataforma avisa que a compra foi paga  ->  esta função confere a
// autenticidade, descobre qual curso foi comprado, emite um token assinado com
// o MESMO segredo que o curso-guard verifica, e manda o link por e-mail.
//
// Sem banco de dados. O registro de vendas usa Netlify Blobs quando disponível,
// e a função continua funcionando se não estiver.
//
// Endereço público: https://SEUSITE/api/compra
//
// ---------------------------------------------------------------------------
// VARIÁVEIS DE AMBIENTE (painel do Netlify, escopo Functions)
//
//   CURSO_SEGREDO     obrigatória — a MESMA do curso-guard.ts
//   PRODUTOS          obrigatória — JSON que liga id de produto a curso, ex.:
//                     {"cd287b31-...":"curso-hieroglifos",
//                      "9f2a1c04-...":"curso-arqueoastronomia",
//                      "5b77e0aa-...":"*"}
//                     "*" é o combo: abre os dois cursos.
//   CAKTO_SECRET      o "secret" que a Cakto envia no corpo do webhook
//   KIWIFY_TOKEN      o token do webhook da Kiwify (só se usar Kiwify)
//   RESEND_API_KEY    chave da Resend, para enviar o e-mail de acesso
//   EMAIL_REMETENTE   ex.: Códigos Egípcios <acesso@seudominio.com.br>
//   EMAIL_ADMIN       seu e-mail, para receber os avisos de venda e reembolso
//   CURSO_SITE        opcional — padrão https://codigosegipcios.netlify.app
//   ACESSO_DIAS       opcional — validade do acesso em dias, padrão 3650
// ---------------------------------------------------------------------------

import { createHmac, timingSafeEqual } from "node:crypto";

const SITE = () => process.env.CURSO_SITE ?? "https://codigosegipcios.netlify.app";
const DIAS = () => Number(process.env.ACESSO_DIAS ?? 3650);

const NOMES = {
  "curso-hieroglifos": "Masterclass: Epigrafia & Leitura de Hieróglifos",
  "curso-arqueoastronomia": "Arqueoastronomia das Necrópoles",
};

/* ══════════════════════════════════════════════════════════════════
   TOKEN — idêntico ao de scripts/gerar-token.mjs e verificado pelo
   curso-guard.ts. Se um dia mudar aqui, tem de mudar nos três.
   ══════════════════════════════════════════════════════════════════ */

const b64url = (buf) =>
  Buffer.from(buf).toString("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export function gerarToken(segredo, { produto, email, dias, id }) {
  const carga = {
    p: produto,
    ...(email ? { e: email } : {}),
    x: Math.floor(Date.now() / 1000) + dias * 86400,
    i: id,
  };
  const cargaB64 = b64url(JSON.stringify(carga));
  const assinatura = b64url(createHmac("sha256", segredo).update(cargaB64).digest());
  return `${cargaB64}.${assinatura}`;
}

/* ══════════════════════════════════════════════════════════════════
   AUTENTICIDADE
   ══════════════════════════════════════════════════════════════════ */

// Comparação em tempo constante: evita que um atacante descubra o segredo
// medindo quanto tempo a comparação demora a falhar.
function igual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const ba = Buffer.from(a), bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

/* ══════════════════════════════════════════════════════════════════
   NORMALIZAÇÃO
   Cada plataforma tem o seu formato. Aqui os dois viram o mesmo objeto.
   ══════════════════════════════════════════════════════════════════ */

const APROVADO = "aprovado", DEVOLVIDO = "devolvido", IGNORAR = "ignorar";

// Cakto — formato confirmado na documentação oficial (webhooks/pagamento-unico).
function lerCakto(body) {
  const d = body?.data ?? {};
  const ev = String(body?.event ?? "");
  return {
    plataforma: "cakto",
    tipo: ev === "purchase_approved" && d.status === "paid" ? APROVADO
        : ev === "refund" || ev === "chargeback"            ? DEVOLVIDO
        : IGNORAR,
    evento: ev,
    pedido: String(d.id ?? d.refId ?? ""),
    email: d.customer?.email ?? "",
    nome: d.customer?.name ?? "",
    produtoId: String(d.product?.id ?? ""),
    ofertaId: String(d.offer?.id ?? ""),
    produtoNome: d.product?.name ?? "",
    valor: d.amount ?? null,
  };
}

// Kiwify — ATENÇÃO: a Kiwify não publica o formato do webhook de saída.
// Os nomes de campo abaixo são os observados na prática, e a função aceita
// mais de uma grafia para cada um. CONFIRA COM UM EVENTO REAL antes de vender.
function lerKiwify(body) {
  const st = String(body?.order_status ?? body?.status ?? "").toLowerCase();
  const c = body?.Customer ?? body?.customer ?? {};
  const p = body?.Product ?? body?.product ?? {};
  return {
    plataforma: "kiwify",
    tipo: st === "paid" || st === "approved"                         ? APROVADO
        : st === "refunded" || st === "chargedback" || st === "chargeback" ? DEVOLVIDO
        : IGNORAR,
    evento: st,
    pedido: String(body?.order_id ?? body?.id ?? ""),
    email: c.email ?? "",
    nome: c.full_name ?? c.name ?? c.first_name ?? "",
    produtoId: String(p.product_id ?? p.id ?? ""),
    ofertaId: String(body?.subscription_id ?? ""),
    produtoNome: p.product_name ?? p.name ?? "",
    valor: body?.Commissions?.charge_amount ?? null,
  };
}

/* ══════════════════════════════════════════════════════════════════
   E-MAIL
   ══════════════════════════════════════════════════════════════════ */

async function enviar({ para, assunto, html }) {
  const chave = process.env.RESEND_API_KEY;
  const de = process.env.EMAIL_REMETENTE;
  if (!chave || !de || !para) return { ok: false, motivo: "e-mail não configurado" };

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: de, to: [para], subject: assunto, html }),
  });
  if (!r.ok) return { ok: false, motivo: `resend ${r.status}: ${await r.text()}` };
  return { ok: true, id: (await r.json())?.id };
}

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function emailAcesso({ nome, cursos, token }) {
  const links = cursos.map((c) => `
    <tr><td style="padding:14px 0;border-bottom:1px solid #2a1f0f">
      <div style="font-size:16px;color:#f4ede2;margin-bottom:8px">${esc(NOMES[c])}</div>
      <a href="${SITE()}/${c}/?t=${token}"
         style="display:inline-block;background:#dfa55c;color:#0a0703;text-decoration:none;
                padding:11px 22px;border-radius:999px;font-size:14px;font-weight:600">
        Abrir o curso</a>
    </td></tr>`).join("");

  return `<!doctype html><html lang="pt-BR"><body style="margin:0;background:#000;
  font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#f4ede2">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center">
  <table role="presentation" width="100%" style="max-width:560px" cellpadding="0" cellspacing="0">
    <tr><td style="padding:34px 24px 10px">
      <div style="color:#dfa55c;font-size:22px;letter-spacing:.3em">&#x13080; &#x131FC;</div>
      <div style="color:#8f8272;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
                  margin-top:14px">Desvendando os Códigos Egípcios</div>
      <h1 style="font-size:23px;margin:10px 0 0;color:#e7bb81;font-weight:600">
        ${nome ? esc(nome.split(" ")[0]) + ", seu" : "Seu"} acesso está liberado</h1>
    </td></tr>
    <tr><td style="padding:6px 24px 0">
      <p style="color:#b8ab99;font-size:15px;line-height:1.65">
        Obrigado pela compra. ${cursos.length > 1 ? "Os links abaixo abrem os seus cursos" : "O link abaixo abre o seu curso"}
        direto no navegador, no computador ou no celular.</p>
    </td></tr>
    <tr><td style="padding:4px 24px"><table role="presentation" width="100%">${links}</table></td></tr>
    <tr><td style="padding:22px 24px 0">
      <div style="border:1px solid #3a2a14;border-radius:12px;padding:16px 18px;background:#0b0803">
        <div style="color:#e7bb81;font-size:14px;font-weight:600;margin-bottom:6px">
          Guarde este e-mail</div>
        <p style="color:#b8ab99;font-size:13.5px;line-height:1.6;margin:0">
          ${cursos.length > 1 ? "Esses links são" : "Esse link é"} a sua chave de acesso.
          O navegador lembra depois do primeiro clique, mas se você limpar os cookies ou trocar
          de computador, é só abrir ${cursos.length > 1 ? "os links" : "o link"} daqui de novo.</p>
      </div>
    </td></tr>
    <tr><td style="padding:22px 24px 34px">
      <p style="color:#8f8272;font-size:12.5px;line-height:1.6;margin:0">
        Você tem 7 dias para pedir o reembolso integral, sem precisar justificar — é o direito
        de arrependimento do art. 49 do Código de Defesa do Consumidor. Qualquer dúvida, é só
        responder a este e-mail.</p>
    </td></tr>
  </table></td></tr></table></body></html>`;
}

const emailAviso = (titulo, linhas) =>
  `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px">
   <h2 style="font-size:17px">${esc(titulo)}</h2><ul style="line-height:1.7">${
     linhas.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join("")
   }</ul></div>`;

/* ══════════════════════════════════════════════════════════════════
   REGISTRO DE VENDAS (Netlify Blobs, opcional)
   Serve para duas coisas concretas: não mandar o mesmo acesso duas vezes
   quando a plataforma repete o webhook, e ter a lista de compradores —
   sem ela, trocar o CURSO_SEGREDO deixa todo mundo sem acesso e sem
   como reemitir.
   ══════════════════════════════════════════════════════════════════ */

async function abrirRegistro() {
  try {
    const { getStore } = await import("@netlify/blobs");
    return getStore("vendas");
  } catch {
    return null; // pacote ausente ou Blobs indisponível: segue sem registro
  }
}

/* ══════════════════════════════════════════════════════════════════
   HANDLER
   ══════════════════════════════════════════════════════════════════ */

export default async (req) => {
  if (req.method !== "POST") return new Response("Método não permitido", { status: 405 });

  const bruto = await req.text();
  let body;
  try { body = JSON.parse(bruto); } catch { return new Response("JSON inválido", { status: 400 }); }

  // ---- 1. qual plataforma, e ela é quem diz ser? ----
  const ehCakto = typeof body?.event === "string" && body?.data !== undefined;
  const v = ehCakto ? lerCakto(body) : lerKiwify(body);

  if (ehCakto) {
    const esperado = process.env.CAKTO_SECRET;
    if (!esperado || !igual(String(body.secret ?? ""), esperado)) {
      console.warn("[compra] secret da Cakto não confere");
      return new Response("Não autorizado", { status: 401 });
    }
  } else {
    const token = process.env.KIWIFY_TOKEN;
    const assinatura = new URL(req.url).searchParams.get("signature");
    if (!token || !assinatura) {
      console.warn("[compra] webhook sem assinatura reconhecível");
      return new Response("Não autorizado", { status: 401 });
    }
    // Kiwify assina o corpo bruto com HMAC-SHA1. Formato não documentado
    // oficialmente — confira com um evento real antes de abrir as vendas.
    const calc = createHmac("sha1", token).update(bruto).digest("hex");
    if (!igual(calc, assinatura)) {
      console.warn("[compra] assinatura da Kiwify não confere");
      return new Response("Não autorizado", { status: 401 });
    }
  }

  // ---- 2. o evento interessa? ----
  if (v.tipo === IGNORAR) {
    console.log(`[compra] evento ignorado: ${v.plataforma}/${v.evento}`);
    return new Response("ok (ignorado)", { status: 200 });
  }

  const registro = await abrirRegistro();
  const chave = `${v.plataforma}-${v.pedido}`;

  // ---- 3. reembolso e estorno: não emite acesso, avisa o dono ----
  if (v.tipo === DEVOLVIDO) {
    if (registro) {
      try {
        const antes = await registro.get(chave, { type: "json" });
        await registro.setJSON(chave, { ...(antes ?? {}), devolvido: v.evento, em: new Date().toISOString() });
      } catch (e) { console.warn("[compra] registro falhou:", e.message); }
    }
    await enviar({
      para: process.env.EMAIL_ADMIN,
      assunto: `Reembolso/estorno — ${v.email}`,
      html: emailAviso("Uma venda foi devolvida", [
        ["Evento", v.evento], ["Comprador", `${v.nome} <${v.email}>`],
        ["Produto", v.produtoNome], ["Pedido", v.pedido],
        ["Atenção", "o token já emitido continua válido até expirar — veja 'Revogar um acesso' no LEIA-ME"],
      ]),
    });
    return new Response("ok (devolução registrada)", { status: 200 });
  }

  // ---- 4. compra aprovada ----
  const segredo = process.env.CURSO_SEGREDO;
  if (!segredo) {
    console.error("[compra] CURSO_SEGREDO ausente — não dá para emitir acesso");
    return new Response("Configuração incompleta", { status: 500 });
  }

  let mapa = {};
  try { mapa = JSON.parse(process.env.PRODUTOS ?? "{}"); }
  catch { console.error("[compra] PRODUTOS não é um JSON válido"); }

  // aceita o id do produto ou o da oferta como chave do mapa
  const destino = mapa[v.produtoId] ?? mapa[v.ofertaId];
  if (!destino) {
    console.error(`[compra] produto não mapeado: id=${v.produtoId} oferta=${v.ofertaId} nome=${v.produtoNome}`);
    await enviar({
      para: process.env.EMAIL_ADMIN,
      assunto: "⚠️ Venda sem acesso: produto não mapeado",
      html: emailAviso("Uma compra foi aprovada mas não sei qual curso entregar", [
        ["Produto", v.produtoNome], ["id do produto", v.produtoId], ["id da oferta", v.ofertaId],
        ["Comprador", `${v.nome} <${v.email}>`], ["Pedido", v.pedido],
        ["O que fazer", "acrescente esse id à variável PRODUTOS e reenvie o webhook pelo painel da plataforma"],
      ]),
    });
    // 200 de propósito: o erro é de configuração, não da plataforma.
    // Um 500 faria a Cakto repetir o webhook em vão por horas.
    return new Response("ok (produto não mapeado)", { status: 200 });
  }

  // não entregar duas vezes se o webhook repetir
  if (registro) {
    try {
      const antes = await registro.get(chave, { type: "json" });
      if (antes?.entregue) {
        console.log(`[compra] pedido ${chave} já entregue, nada a fazer`);
        return new Response("ok (já entregue)", { status: 200 });
      }
    } catch (e) { console.warn("[compra] leitura do registro falhou:", e.message); }
  }

  const token = gerarToken(segredo, {
    produto: destino, email: v.email, dias: DIAS(), id: v.pedido || undefined,
  });
  const cursos = destino === "*" ? Object.keys(NOMES) : [destino];

  const envio = await enviar({
    para: v.email,
    assunto: cursos.length > 1 ? "Seus cursos estão liberados" : `Seu acesso: ${NOMES[destino]}`,
    html: emailAcesso({ nome: v.nome, cursos, token }),
  });
  if (!envio.ok) console.error("[compra] e-mail do comprador falhou:", envio.motivo);

  if (registro) {
    try {
      await registro.setJSON(chave, {
        plataforma: v.plataforma, pedido: v.pedido, email: v.email, nome: v.nome,
        produto: destino, produtoNome: v.produtoNome, valor: v.valor,
        token, entregue: envio.ok, emailErro: envio.ok ? null : envio.motivo,
        em: new Date().toISOString(),
      });
    } catch (e) { console.warn("[compra] gravação do registro falhou:", e.message); }
  }

  await enviar({
    para: process.env.EMAIL_ADMIN,
    assunto: `Venda: ${NOMES[destino] ?? "combo"} — ${v.email}`,
    html: emailAviso("Nova venda", [
      ["Comprador", `${v.nome} <${v.email}>`],
      ["Curso", destino === "*" ? "Combo (os dois)" : NOMES[destino]],
      ["Valor", v.valor ?? "—"], ["Pedido", v.pedido], ["Plataforma", v.plataforma],
      ["E-mail de acesso", envio.ok ? "enviado" : `FALHOU — ${envio.motivo}`],
      ...(envio.ok ? [] : [["Link para enviar à mão", `${SITE()}/${cursos[0]}/?t=${token}`]]),
    ]),
  });

  // Se o e-mail do comprador falhou, devolve 500 para a plataforma repetir
  // o webhook — e o registro acima garante que não haja entrega dupla.
  return new Response(envio.ok ? "ok" : "falha no envio do e-mail",
                      { status: envio.ok ? 200 : 500 });
};

export const config = { path: "/api/compra" };
