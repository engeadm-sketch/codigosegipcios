"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function SacredLexicon() {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string>("wedjat");

  const symbolKeys = ["wedjat", "ankh", "djed", "khepri"] as const;
  const currentKey = (symbolKeys.includes(selectedId as any) ? selectedId : "wedjat") as typeof symbolKeys[number];
  const current = t.lexicon.symbols[currentKey];

  const glyphMap: Record<typeof symbolKeys[number], { hieroglyph: string; transliteration: string }> = {
    wedjat: { hieroglyph: "𓂀", transliteration: "wḏꜢt (Wedjat)" },
    ankh: { hieroglyph: "☥", transliteration: "ꜥnḫ (Ankh)" },
    djed: { hieroglyph: "𓊽", transliteration: "ḏd (Djed)" },
    khepri: { hieroglyph: "𓆣", transliteration: "ḫpr (Khepri)" },
  };

  return (
    <section id="solucoes" className="relative py-24 sm:py-32 bg-[#050301] overflow-hidden border-t border-[#dfa55c]/20">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfa55c]/35 bg-[#dfa55c]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#dfa55c] mb-4 shadow-sm">
            <span>𓂀</span>
            <span>{t.lexicon.tag}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.lexicon.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#bfb3a2] font-light leading-relaxed">
            {t.lexicon.subtitle}
          </p>
        </div>

        {/* 4 Interactive Symbols Selector Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {symbolKeys.map((key) => {
            const sym = t.lexicon.symbols[key];
            const meta = glyphMap[key];
            const isSelected = key === selectedId;
            return (
              <button
                key={key}
                onClick={() => setSelectedId(key)}
                className={`p-6 rounded-2xl border text-center transition-all duration-300 relative group overflow-hidden cursor-pointer ${
                  isSelected
                    ? "bg-[#160f07] border-[#dfa55c] shadow-[0_0_30px_rgba(223,165,92,0.3)] scale-[1.02]"
                    : "bg-[#0c0804] border-[#3a2c17]/60 hover:border-[#dfa55c]/40 hover:bg-[#120d06]"
                }`}
              >
                <div className="text-4xl sm:text-5xl mb-3 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(223,165,92,0.4)]">
                  {meta.hieroglyph}
                </div>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wide">
                  {sym.name}
                </h3>
                <span className="font-mono text-[10px] text-[#dfa55c] block mt-1 italic">
                  {meta.transliteration}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Symbol Deep Exploration Window */}
        <div className="rounded-3xl bg-[#0b0804]/95 border border-[#dfa55c]/35 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Col: Symbol Showcase & Philosophical Breakdown (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-5xl drop-shadow-[0_0_20px_rgba(223,165,92,0.6)]">
                  {glyphMap[currentKey].hieroglyph}
                </span>
                <div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                    {current.name}
                  </h3>
                  <span className="font-mono text-xs text-[#dfa55c]">
                    {glyphMap[currentKey].transliteration}
                  </span>
                </div>
              </div>

              <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#e7bb81] mb-4">
                {current.meaning}
              </h4>

              <p className="text-xs sm:text-sm text-[#cec2b1] leading-relaxed mb-6 font-light">
                {current.insight}
              </p>

              {/* Papyrus Quote Plate */}
              <div className="p-4 rounded-xl bg-[#120d06] border-l-4 border-[#dfa55c] text-xs sm:text-sm italic text-[#e6d7c3] leading-relaxed mb-6 shadow-inner">
                {current.quote}
              </div>
            </div>

            {/* Right Col: Mathematical / Anatomical Decomposition (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#dfa55c] font-bold mb-2">
                {t.lexicon.decompositionTitle}
              </h4>

              <div className="space-y-2.5">
                {current.attrs.map((attr, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#120d06] border border-[#3a2c17]/60 hover:border-[#dfa55c]/40 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        {attr.symbolPart}
                      </span>
                      <span className="text-[11px] text-[#8f8272] block mt-0.5">
                        {attr.meaning}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#dfa55c]/15 text-[#dfa55c] border border-[#dfa55c]/30 text-[10px] font-mono whitespace-nowrap ml-3">
                      {attr.ratio}
                    </span>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
