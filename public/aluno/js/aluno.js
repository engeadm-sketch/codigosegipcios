/* aluno.js — monta a área do aluno.
 *
 * Quais cursos a pessoa tem vem do cookie curso_lista, que o curso-guard
 * grava na borda. Esse cookie não concede nada: forjá-lo só produz links
 * que o guard continua barrando. O token de verdade é HttpOnly e o
 * JavaScript não o enxerga — de propósito.
 */
(function () {
  "use strict";

  var CURSOS = window.CE_CURSOS || {};
  var P = window.CEProgresso;

  var COMBO = 347;

  /* ---------------- onde estamos ----------------
   * No site publicado os caminhos são absolutos (/curso-hieroglifos/...).
   * Aberta do disco, a página precisa apontar para a pasta irmã. */
  var LOCAL = location.protocol === "file:" ||
              /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var RAIZ = location.protocol === "file:" ? ".." : "";

  var PRECOS = {
    "curso-hieroglifos": { preco: 197, vendas: RAIZ + "/masterclass-hieroglifos/" },
    "curso-arqueoastronomia": { preco: 247, vendas: RAIZ + "/masterclass-arqueoastronomia/" },
  };

  /* ---------------- utilidades ---------------- */

  function cookie(nome) {
    var m = document.cookie.match("(?:^|; )" + nome + "=([^;]*)");
    return m ? decodeURIComponent(m[1]) : null;
  }

  function el(tag, attrs, filhos) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === "class") n.className = attrs[k];
      else if (k === "html") n.innerHTML = attrs[k];
      else if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (filhos || []).forEach(function (f) { if (f) n.appendChild(f); });
    return n;
  }

  // "Précessão" e "precessao" precisam casar com "precessão"
  function dobra(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function escapar(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------------- anel de progresso ---------------- */

  function anel(pct, completo) {
    var r = 30, c = 2 * Math.PI * r;
    var svg =
      '<svg viewBox="0 0 76 76" width="76" height="76" aria-hidden="true">' +
      '<circle class="trilho" cx="38" cy="38" r="' + r + '"/>' +
      '<circle class="arco" cx="38" cy="38" r="' + r + '" ' +
      'stroke-dasharray="' + c.toFixed(1) + '" ' +
      'stroke-dashoffset="' + (c * (1 - pct / 100)).toFixed(1) + '"/></svg>';
    return el("div", {
      class: "anel" + (completo ? " completo" : ""),
      html: svg + "<b>" + (completo ? "✓" : pct + "%") + "</b>",
      role: "img",
      "aria-label": completo ? "Curso concluído" : pct + " por cento concluído",
    });
  }

  /* ---------------- cartão de um curso ---------------- */

  function cartao(slug) {
    var c = CURSOS[slug];
    if (!c) return null;
    var r = P.resumo(slug, c.m.length);

    var linhas = c.m.map(function (m) {
      var mp = r.modulos[String(m.n)];
      var lido = mp && mp.pct >= P.LIDO;
      var comecado = mp && mp.pct > 0 && !lido;
      return el("div", { class: "mod" + (lido ? " lido" : "") }, [
        el("span", { class: "marca", text: lido ? "✓" : comecado ? "◐" : "○",
                     title: lido ? "lido" : comecado ? "começado" : "não aberto" }),
        el("span", {}, [
          el("a", { href: RAIZ + "/" + slug + "/" + m.f,
                    text: "Módulo " + String(m.n).padStart(2, "0") + " — " + m.t }),
          el("small", { class: "aulas", text: m.a.length + " aulas · " + m.h + "h" }),
        ]),
        el("span", { class: "h", text: lido ? "lido" : comecado ? mp.pct + "%" : "" }),
      ]);
    });

    // para onde vai o botão "continuar"
    var alvo, rotulo;
    if (r.concluido) {
      alvo = RAIZ + "/" + slug + "/"; rotulo = "Revisitar o curso";
    } else if (r.ultimo) {
      var m = c.m.filter(function (x) { return x.n === r.ultimo.modulo; })[0];
      if (m && r.ultimo.pct >= P.LIDO) {
        var prox = c.m.filter(function (x) { return !(r.modulos[String(x.n)] || {}).pct ||
                                                    r.modulos[String(x.n)].pct < P.LIDO; })[0];
        alvo = RAIZ + "/" + slug + "/" + (prox ? prox.f : m.f);
        rotulo = prox ? "Continuar no Módulo " + String(prox.n).padStart(2, "0") : "Revisitar o curso";
      } else {
        alvo = RAIZ + "/" + slug + "/" + (m ? m.f : "index.html");
        rotulo = "Voltar ao Módulo " + String(r.ultimo.modulo).padStart(2, "0");
      }
    } else {
      alvo = RAIZ + "/" + slug + "/" + c.m[0].f; rotulo = "Começar pelo Módulo 01";
    }

    var cert = el("div", { class: "cert" + (r.concluido ? " pronto" : "") }, [
      el("p", { html: r.concluido
        ? "<strong>Curso concluído.</strong> Você pode emitir o seu certificado."
        : "O certificado fica disponível quando os " + c.m.length +
          " módulos estiverem marcados como lidos — faltam " + (c.m.length - r.lidos) + "." }),
      r.concluido
        ? el("a", { class: "btn btn-gold btn-sm", href: "certificado.html?curso=" + slug,
                    text: "Emitir certificado" })
        : el("button", { class: "btn btn-ghost btn-sm", type: "button", disabled: "disabled",
                         text: "Emitir certificado" }),
    ]);

    return el("article", { class: "curso" }, [
      el("div", { class: "curso-topo" }, [
        el("div", { style: "flex:1 1 320px" }, [
          el("h2", { text: c.t }),
          el("div", { class: "curso-meta",
                      text: c.m.length + " módulos · " + c.h + " horas · " +
                            r.lidos + " de " + c.m.length + " lidos" }),
        ]),
        anel(r.pct, r.concluido),
      ]),
      el("div", { class: "curso-acoes" }, [
        el("a", { class: "btn btn-gold", href: alvo, text: rotulo }),
        el("a", { class: "btn btn-ghost", href: RAIZ + "/" + slug + "/", text: "Ver a grade completa" }),
      ]),
      el("details", { class: "mods" }, [el("summary", { text: "Módulos deste curso" })].concat(linhas)),
      cert,
    ]);
  }

  /* ---------------- oferta do outro curso ---------------- */

  function oferta(faltando) {
    var c = CURSOS[faltando], p = PRECOS[faltando];
    if (!c || !p) return null;
    // desconto de aluno = o mesmo desconto do combo, aplicado a quem já pagou um
    var desconto = 197 + 247 - COMBO;
    var preco = p.preco - desconto;
    return el("section", { class: "oferta" }, [
      el("span", { class: "eyebrow", text: "Você tem um dos dois" }),
      el("h2", { text: c.t, style: "margin-bottom:.4rem" }),
      el("p", { class: "muted", style: "margin-top:0",
                text: c.m.length + " módulos, " + c.h + " horas. Os dois cursos se completam: " +
                      "num você lê o que os egípcios escreveram, no outro você lê o céu que eles " +
                      "observaram." }),
      el("div", { class: "antes", text: "R$ " + p.preco + " para quem chega de fora" }),
      el("div", { class: "preco", html: "<sup>R$</sup>" + preco }),
      el("p", { class: "small muted", style: "margin:.2rem 0 1.2rem",
                text: "preço de aluno — os mesmos R$ " + desconto +
                      " de desconto do combo, já que você comprou um separado" }),
      el("a", { class: "btn btn-gold", href: p.vendas, text: "Conhecer o curso" }),
    ]);
  }

  /* ---------------- busca ---------------- */

  function montarBusca(meus) {
    var itens = [];
    meus.forEach(function (slug) {
      var c = CURSOS[slug];
      if (!c) return;
      c.m.forEach(function (m) {
        m.a.forEach(function (a) {
          itens.push({
            titulo: a.t,
            via: c.t + " · Módulo " + String(m.n).padStart(2, "0") + " · " + a.n,
            href: RAIZ + "/" + slug + "/" + m.f + "#" + a.i,
            chave: dobra(a.t + " " + a.n + " " + m.t + " " + c.t),
          });
        });
      });
    });

    var campo = document.getElementById("q");
    var saida = document.getElementById("resultados");
    campo.setAttribute("aria-controls", "resultados");

    function render() {
      var q = dobra(campo.value.trim());
      saida.innerHTML = "";
      if (q.length < 2) {
        saida.appendChild(el("p", { class: "small muted",
          text: itens.length + " aulas disponíveis. Digite ao menos duas letras." }));
        return;
      }
      var achados = itens.filter(function (i) { return i.chave.indexOf(q) !== -1; }).slice(0, 25);
      if (!achados.length) {
        saida.appendChild(el("p", { class: "small muted", text: "Nada encontrado para “" + campo.value.trim() + "”." }));
        return;
      }
      achados.forEach(function (i) {
        // destaca sobre o texto original, achando a posição na forma sem acento
        // (as duas têm o mesmo comprimento, então os índices batem)
        var pos = dobra(i.titulo).indexOf(q);
        var titulo = pos === -1 ? escapar(i.titulo)
          : escapar(i.titulo.slice(0, pos)) + "<mark>" +
            escapar(i.titulo.slice(pos, pos + q.length)) + "</mark>" +
            escapar(i.titulo.slice(pos + q.length));
        saida.appendChild(el("a", { class: "res", href: i.href,
          html: titulo + '<span class="via">' + escapar(i.via) + "</span>" }));
      });
    }

    campo.addEventListener("input", render);
    render();
  }

  /* ---------------- início ---------------- */

  function meusCursos() {
    var lista = cookie("curso_lista");
    if (!lista) return [];
    return lista.split("~").filter(function (s) { return Object.prototype.hasOwnProperty.call(CURSOS, s); });
  }

  /* ---------------- pré-visualização ----------------
   * Sem o cookie que o guard grava na borda, esta página não mostra nada —
   * é o comportamento certo para um visitante, e péssimo para quem precisa
   * OLHAR a própria área antes de publicar.
   *
   * Então: aberta do disco ou de um servidor local, ela se preenche sozinha.
   * A checagem é pelo endereço, não por um parâmetro na URL, justamente para
   * que isso NÃO exista no site publicado — lá, sem cookie, continua fechada.
   *
   *   ?preview=1       os dois cursos (padrão local)
   *   ?preview=hiero   só o de hieróglifos, para ver a oferta do outro
   *   ?preview=arqueo  só o de arqueoastronomia
   *   ?preview=0       força o estado "sem acesso", para ver aquela tela
   */
  function previa() {
    if (!LOCAL) return null;
    var p = new URLSearchParams(location.search).get("preview");
    if (p === "0") return [];
    if (p === "hiero") return ["curso-hieroglifos"];
    if (p === "arqueo") return ["curso-arqueoastronomia"];
    return Object.keys(CURSOS);
  }

  function faixaPrevia() {
    var b = el("div", {
      style: "background:#2a1f0f;border-bottom:1px solid var(--line-strong);" +
             "padding:.7rem 1rem;text-align:center;font-size:.85rem;color:#f0e6d2",
      html: "<strong>Pré-visualização local.</strong> No site publicado esta área só abre " +
            "para quem tem o token — este preenchimento não existe lá. " +
            '<a href="?preview=hiero">só 1 curso</a> · ' +
            '<a href="?preview=1">os 2</a> · ' +
            '<a href="?preview=0">sem acesso</a>',
    });
    document.body.insertBefore(b, document.body.firstChild);
  }

  function iniciar() {
    var meus = meusCursos();
    var resumo = document.getElementById("linha-resumo");

    // sem cookie e rodando fora do ar: preenche para você poder olhar
    if (!meus.length) {
      var p = previa();
      if (p) { meus = p; faixaPrevia(); }
    }

    if (!meus.length) {
      document.getElementById("sem-cursos").hidden = false;
      document.getElementById("cursos").hidden = true;
      document.getElementById("indice").hidden = true;
      resumo.textContent = "";
      return;
    }

    var alvo = document.getElementById("lista-cursos");
    meus.forEach(function (slug) {
      var c = cartao(slug);
      if (c) alvo.appendChild(c);
    });

    var horas = meus.reduce(function (s, x) { return s + (CURSOS[x] ? CURSOS[x].h : 0); }, 0);
    var mods = meus.reduce(function (s, x) { return s + (CURSOS[x] ? CURSOS[x].m.length : 0); }, 0);
    var lidos = meus.reduce(function (s, x) {
      return s + P.resumo(x, CURSOS[x].m.length).lidos;
    }, 0);
    resumo.textContent = meus.length === 1
      ? "Seu curso: " + mods + " módulos, " + horas + " horas. " + lidos + " módulos lidos até agora."
      : "Seus dois cursos: " + mods + " módulos, " + horas + " horas. " + lidos + " módulos lidos até agora.";

    // quem tem só um dos dois vê o outro
    var todos = Object.keys(CURSOS);
    var faltando = todos.filter(function (s) { return meus.indexOf(s) === -1; });
    if (meus.length === 1 && faltando.length === 1) {
      var o = oferta(faltando[0]);
      if (o) document.getElementById("oferta-slot").appendChild(o);
    }

    montarBusca(meus);

    document.getElementById("zerar").addEventListener("click", function () {
      if (!window.confirm("Isso apaga as marcas de leitura deste navegador. O seu acesso aos cursos não muda. Continuar?")) return;
      P.limpar();
      window.location.reload();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
