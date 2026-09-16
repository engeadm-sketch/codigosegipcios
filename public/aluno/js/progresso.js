/* ce-progresso — registro de leitura dos cursos.
 *
 * Guarda no navegador do aluno, em localStorage. Nada sai do dispositivo:
 * nem para o site, nem para nós. Isso tem um custo honesto — trocar de
 * computador recomeça a contagem — e uma vantagem: nenhum dado de leitura
 * de ninguém fica armazenado em lugar nenhum.
 *
 * Formato:
 *   { "curso-hieroglifos": { "3": { pct: 100, em: 1758... } }, ... }
 *   pct = maior porcentagem de rolagem já alcançada naquele módulo
 *
 * Este arquivo é a versão de referência. Nas páginas dos módulos ele é
 * injetado inline por scripts/injetar-progresso.py, para o curso não
 * depender de um segundo pedido de rede nem da área do aluno estar no ar.
 */
(function (global) {
  "use strict";

  var CHAVE = "ce_progresso_v1";
  var LIDO = 90; // % de rolagem a partir do qual o módulo conta como lido

  function ler() {
    try { return JSON.parse(global.localStorage.getItem(CHAVE)) || {}; }
    catch (e) { return {}; }          // modo privado, cookies bloqueados, etc.
  }

  function gravar(dados) {
    try { global.localStorage.setItem(CHAVE, JSON.stringify(dados)); return true; }
    catch (e) { return false; }
  }

  function registrar(curso, modulo, pct) {
    var d = ler();
    var c = d[curso] || (d[curso] = {});
    var antes = c[modulo] || { pct: 0 };
    // só sobe: reler o começo de um módulo não desfaz o que já foi lido
    if (pct <= antes.pct) { antes.em = Date.now(); c[modulo] = antes; }
    else c[modulo] = { pct: pct, em: Date.now() };
    gravar(d);
  }

  function limpar(curso) {
    var d = ler();
    if (curso) delete d[curso]; else d = {};
    gravar(d);
  }

  /* ---- métricas de um curso, a partir da grade em window.CE_CURSOS ---- */
  function resumo(curso, totalModulos) {
    var c = ler()[curso] || {};
    var lidos = 0, ultimo = null, ultimoEm = 0;
    for (var k in c) {
      if (!Object.prototype.hasOwnProperty.call(c, k)) continue;
      if (c[k].pct >= LIDO) lidos++;
      if (c[k].em > ultimoEm) { ultimoEm = c[k].em; ultimo = { modulo: +k, pct: c[k].pct }; }
    }
    return {
      lidos: lidos,
      total: totalModulos,
      pct: totalModulos ? Math.round((lidos / totalModulos) * 100) : 0,
      concluido: totalModulos > 0 && lidos >= totalModulos,
      ultimo: ultimo,
      modulos: c,
    };
  }

  global.CEProgresso = {
    ler: ler, registrar: registrar, limpar: limpar, resumo: resumo, LIDO: LIDO,
  };

  /* ---- se estamos numa página de módulo, medir a leitura ---- */
  var m = global.location.pathname.match(/\/(curso-[a-z-]+)\/modulo-(\d+)\.html?$/i);
  if (!m) return;
  var curso = m[1], modulo = String(parseInt(m[2], 10));

  function pctAtual() {
    var doc = global.document.documentElement;
    var alcance = doc.scrollHeight - doc.clientHeight;
    // página que cabe inteira na tela já está lida por definição
    if (alcance <= 40) return 100;
    return Math.min(100, Math.round(((global.scrollY || 0) / alcance) * 100));
  }

  var pendente = false;
  function medir() {
    if (pendente) return;
    pendente = true;
    global.requestAnimationFrame(function () {
      pendente = false;
      registrar(curso, modulo, pctAtual());
    });
  }

  global.addEventListener("scroll", medir, { passive: true });
  global.addEventListener("pagehide", medir);
  global.document.addEventListener("visibilitychange", function () {
    if (global.document.visibilityState === "hidden") medir();
  });
  // marca a visita já na abertura, para o "continuar de onde parei" funcionar
  // mesmo em quem abriu e saiu sem rolar
  if (global.document.readyState === "complete") medir();
  else global.addEventListener("load", medir);
})(window);
