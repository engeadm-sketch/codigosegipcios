"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function MathematicalCanon() {
  const { t } = useLanguage();
  const [activeTopic, setActiveTopic] = useState<string>("rhind");

  const topicKeys = ["rhind", "cubit", "acoustic"] as const;
  const currentKey = (topicKeys.includes(activeTopic as any) ? activeTopic : "rhind") as typeof topicKeys[number];
  const current = t.math.topics[currentKey];

  return (
    <section id="matematica-sagrada" className="relative py-24 sm:py-32 bg-[#050301] overflow-hidden border-t border-[#dfa55c]/20">
      {/* Background Decorative Grid and Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#dfa55c_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.04] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#dfa55c]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-40 w-96 h-96 rounded-full bg-[#c78839]/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfa55c]/35 bg-[#dfa55c]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#dfa55c] mb-4 shadow-sm">
            <span>📐</span>
            <span>{t.math.tag}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.math.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#bfb3a2] font-light leading-relaxed">
            {t.math.subtitle}
          </p>
        </div>

        {/* Interactive Topic Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
          {topicKeys.map((key) => {
            const topicData = t.math.topics[key];
            const isActive = key === activeTopic;
            return (
              <button
                key={key}
                onClick={() => setActiveTopic(key)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isActive
                    ? "bg-[#140e06] border-[#dfa55c] shadow-[0_0_25px_rgba(223,165,92,0.25)]"
                    : "bg-[#0b0804]/70 border-[#3a2c17]/60 hover:border-[#dfa55c]/40 hover:bg-[#100a05]"
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfa55c] to-transparent" />
                )}
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfa55c] block mb-1">
                  {topicData.badge}
                </span>
                <h3 className="font-cinzel text-base sm:text-lg font-semibold text-white">
                  {topicData.title.split("&")[0]}
                </h3>
                <p className="text-xs text-[#8f8272] mt-1 line-clamp-1">
                  {topicData.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Content Showcase Box */}
        <div className="rounded-3xl bg-[#0e0904]/80 border border-[#dfa55c]/30 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Area (7 columns) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-md bg-[#dfa55c]/15 text-[#dfa55c] border border-[#dfa55c]/30 text-[11px] font-mono uppercase tracking-wider mb-4">
                  {t.math.source}: {current.source}
                </div>
                
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
                  {current.title}
                </h3>
                
                <p className="text-sm font-medium text-[#dfa55c] mb-6">
                  {current.subtitle}
                </p>

                {/* Formula Highlight Plate */}
                <div className="p-4 rounded-xl bg-[#060402] border border-[#dfa55c]/40 font-mono text-xs sm:text-sm text-[#f7ebd8] shadow-inner mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[#dfa55c] font-bold">∑</span>
                    <span>
                      {currentKey === "rhind"
                        ? "Área ≈ [(8/9) × d]² = (64/81) × d² ≈ 3.1605 × r²"
                        : currentKey === "cubit"
                        ? "1 Côvado = 7 Palmos = 28 Dedos | π/6 ≈ 0.5236 m"
                        : "f = v / 2L | Ondas Estacionárias em Quartzo"}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase text-[#8f8272] tracking-wider hidden sm:block">
                    {t.math.canonicalEq}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#cec2b1] leading-relaxed mb-6 font-light">
                  {current.desc}
                </p>

                {/* Evidence Points */}
                <div className="space-y-3 pt-4 border-t border-[#3a2c17]/60">
                  <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#dfa55c] font-bold">
                    {t.math.evidenceTitle}
                  </h4>
                  {current.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#b8ab99] leading-relaxed">
                      <span className="text-[#dfa55c] mt-0.5 text-xs">◆</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Interactive Diagram Display (5 columns) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-[#080502] border border-[#c49a58]/20 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-radial from-[#dfa55c]/10 to-transparent blur-xl pointer-events-none" />
              
              {/* Technical Ruler & Geometry Blueprint SVG */}
              <div className="w-full max-w-sm aspect-square relative flex items-center justify-center">
                <svg className="w-full h-full text-[#dfa55c]" viewBox="0 0 300 300" fill="none">
                  {/* Outer Concentric Circles */}
                  <circle cx="150" cy="150" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                  <circle cx="150" cy="150" r="105" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
                  <circle cx="150" cy="150" r="65" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                  
                  {/* Golden Ratio Spiral / Inscribed Triangle */}
                  <polygon points="150,45 240,205 60,205" stroke="currentColor" strokeWidth="1.8" strokeDasharray="4 2" opacity="0.8" />
                  <line x1="150" y1="45" x2="150" y2="205" stroke="#f59e0b" strokeWidth="1.5" />
                  <line x1="60" y1="205" x2="240" y2="205" stroke="#f59e0b" strokeWidth="1.5" />
                  
                  {/* Square for Squaring the Circle */}
                  <rect x="75" y="75" width="150" height="150" stroke="currentColor" strokeWidth="1" strokeDasharray="6 4" opacity="0.45" />

                  {/* Compass Angle Marks */}
                  <line x1="150" y1="10" x2="150" y2="290" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.3" />
                  <line x1="10" y1="150" x2="290" y2="150" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.3" />

                  {/* Hieroglyphic and Geometry Labels */}
                  <circle cx="150" cy="45" r="4" fill="#ffffff" />
                  <circle cx="240" cy="205" r="4" fill="#ffffff" />
                  <circle cx="60" cy="205" r="4" fill="#ffffff" />
                  <circle cx="150" cy="150" r="5" fill="#f59e0b" />
                </svg>

                {/* Floating Metric Chips */}
                <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#160f06]/90 border border-[#dfa55c]/40 text-[10px] font-mono text-[#e7bb81]">
                  φ = 1.618033
                </div>
                <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-md bg-[#160f06]/90 border border-[#dfa55c]/40 text-[10px] font-mono text-[#e7bb81]">
                  Meh = 52.36 cm
                </div>
                <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-md bg-[#160f06]/90 border border-[#dfa55c]/40 text-[10px] font-mono text-[#e7bb81]">
                  f₀ = 432.08 Hz
                </div>
              </div>

              <div className="mt-6 w-full pt-4 border-t border-[#3a2c17]/50 flex items-center justify-between text-[11px] text-[#8f8272]">
                <span className="font-mono">{t.math.tolerance}</span>
                <span className="font-cinzel text-[#dfa55c] tracking-wider uppercase font-semibold">
                  {t.math.sacredMath}
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
