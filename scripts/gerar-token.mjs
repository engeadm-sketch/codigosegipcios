#!/usr/bin/env node
// gerar-token.mjs — emite um link de acesso a um curso.
//
// Uso:
//   CURSO_SEGREDO="sua-frase-secreta" \
//   node gerar-token.mjs curso-hieroglifos fulano@email.com 365
//
// Argumentos:
//   1. produto  — a pasta do curso: curso-hieroglifos | curso-arqueoastronomia
//   2. e-mail   — do comprador (opcional; serve de rastro, não de senha)
//   3. dias     — validade em dias (padrão: 365)
//   4. id       — id da compra na plataforma (opcional)
//
// O mesmo segredo precisa estar na Netlify como variável CURSO_SEGREDO
// com escopo Functions. Sem isso, o guard deixa todo mundo passar.

import { createHmac, randomUUID } from "node:crypto";

const SITE = process.env.CURSO_SITE ?? "https://codigosegipcios.netlify.app";

const PRODUTOS = ["curso-hieroglifos", "curso-arqueoastronomia", "*"];

function b64url(buf) {
  return Buffer.from(buf).toString("base64")
    .replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function gerarToken(segredo, { produto, email, dias = 365, id }) {
  const carga = {
    p: produto,
    ...(email ? { e: email } : {}),
    x: Math.floor(Date.now() / 1000) + dias * 86400,
    i: id ?? randomUUID().slice(0, 8),
  };
  const cargaB64 = b64url(JSON.stringify(carga));
  const assinatura = b64url(
    createHmac("sha256", segredo).update(cargaB64).digest(),
  );
  return { token: `${cargaB64}.${assinatura}`, carga };
}

/* ---------------------------------------------------------------- */

function main() {
  const segredo = process.env.CURSO_SEGREDO;
  if (!segredo) {
    console.error(
      "Falta a variável CURSO_SEGREDO.\n" +
        '  CURSO_SEGREDO="..." node gerar-token.mjs <produto> [email] [dias]',
    );
    process.exit(1);
  }

  const [produto, email, dias, id] = process.argv.slice(2);

  if (!produto || !PRODUTOS.includes(produto)) {
    console.error(
      `Produto inválido: ${produto ?? "(vazio)"}\n` +
        `  Use um destes: ${PRODUTOS.join(" | ")}`,
    );
    process.exit(1);
  }

  const { token, carga } = gerarToken(segredo, {
    produto,
    email,
    dias: dias ? Number(dias) : 365,
    id,
  });

  // "*" é o combo: o mesmo token serve para os dois cursos, então o
  // comprador recebe dois links.
  const destinos = produto === "*"
    ? PRODUTOS.filter((p) => p !== "*")
    : [produto];

  const validade = new Date(carga.x * 1000).toLocaleDateString("pt-BR");

  console.log("");
  console.log(`  Curso    ${produto === "*" ? "combo (os dois)" : produto}`);
  console.log(`  Para     ${carga.e ?? "(sem e-mail)"}`);
  console.log(`  Compra   ${carga.i}`);
  console.log(`  Vale até ${validade}`);
  console.log("");
  for (const d of destinos) console.log(`${SITE}/${d}/?t=${token}`);
  console.log("");
}

if (import.meta.url === `file://${process.argv[1]}`) main();
