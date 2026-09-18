"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { VIDEO_DOCUMENTARIO } from "@/config";

/**
 * O documentário.
 *
 * Enquanto VIDEO_DOCUMENTARIO estiver vazio em src/config.ts, este bloco
 * simplesmente não aparece — o site continua exatamente como está hoje.
 * Assim que houver um ID do YouTube ali, a seção nasce pronta.
 *
 * O player só carrega quando a pessoa clica. Antes disso a página serve
 * apenas uma imagem: nenhum script do YouTube, nenhum cookie, nenhum peso.
 * E usa youtube-nocookie.com, que não grava histórico de quem só assistiu.
 */
export default function DocumentaryFilm() {
  const { t } = useLanguage();
  const [tocando, setTocando] = useState(false);

  if (!VIDEO_DOCUMENTARIO) return null;

  const filme = t.necropolis.film;
  const capa = `https://i.ytimg.com/vi/${VIDEO_DOCUMENTARIO}/maxresdefault.jpg`;

  return (
    <div className="mb-20 sm:mb-24">
      <div className="max-w-3xl mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfa55c]/35 bg-[#dfa55c]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#dfa55c] mb-4">
          <span>🎬</span>
          <span>{filme.tag}</span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
          {filme.title}
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#bfb3a2] font-light leading-relaxed">
          {filme.subtitle}
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-[#dfa55c]/30 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.9)] aspect-video">
        {tocando ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_DOCUMENTARIO}?autoplay=1&rel=0&modestbranding=1`}
            title={filme.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setTocando(true)}
            aria-label={filme.play}
            className="group absolute inset-0 w-full h-full cursor-pointer"
          >
            {/* Capa como background, e não como <img>: evita a regra de lint
                do Next para imagens externas e não carrega nada do YouTube. */}
            <span
              className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-85 transition-opacity duration-500"
              style={{ backgroundImage: `url(${capa})` }}
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/50" />
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <span className="w-20 h-20 rounded-full bg-gradient-to-r from-[#e7bb81] via-[#dfa55c] to-[#c78839] flex items-center justify-center shadow-[0_0_40px_rgba(223,165,92,0.45)] group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 ml-1 text-[#140e04]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#e5d3b4]">
                {filme.play}
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
