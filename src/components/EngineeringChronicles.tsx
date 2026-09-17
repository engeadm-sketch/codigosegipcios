"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function EngineeringChronicles() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<string>("sand_friction");

  const studyKeys = ["sand_friction", "merer_papyrus", "tubular_drills", "internal_ramp"] as const;
  const currentKey = (studyKeys.includes(activeTab as any) ? activeTab : "sand_friction") as typeof studyKeys[number];
  const current = t.eng.studies[currentKey];

  return (
    <section id="engenharia" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-[#dfa55c]/20">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfa55c]/35 bg-[#dfa55c]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#dfa55c] mb-4 shadow-sm">
            <span>⚙️</span>
            <span>{t.eng.tag}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.eng.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#bfb3a2] font-light leading-relaxed">
            {t.eng.subtitle}
          </p>
        </div>

        {/* 4 Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {studyKeys.map((key) => {
            const studyData = t.eng.studies[key];
            const isActive = key === activeTab;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-[#160f07] border-[#dfa55c] shadow-[0_0_25px_rgba(223,165,92,0.25)]"
                    : "bg-[#0b0804]/80 border-[#3a2c17]/60 hover:border-[#dfa55c]/40 hover:bg-[#100a05]"
                }`}
              >
                <span className="font-mono text-[10px] text-[#dfa55c] block uppercase tracking-wider mb-1">
                  {t.eng.tagStudy}
                </span>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-white">
                  {studyData.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Content Box */}
        <div className="rounded-3xl bg-[#0e0904]/90 border border-[#dfa55c]/35 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left 7 cols */}
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 rounded-md bg-[#dfa55c]/15 text-[#dfa55c] border border-[#dfa55c]/30 text-[11px] font-mono uppercase tracking-wider mb-3">
                {current.principle}
              </div>

              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mb-2">
                {current.title}
              </h3>

              <p className="text-sm text-[#e7bb81] font-medium mb-6">
                {current.subtitle}
              </p>

              <div className="p-4 rounded-xl bg-[#080502] border border-[#3a2c17]/60 mb-6 text-xs text-[#dfc9ae]">
                <strong className="text-white block mb-1 font-mono uppercase text-[10px] tracking-wider text-[#dfa55c]">
                  {t.eng.primaryEvidence}
                </strong>
                <span>{current.evidence}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#cec2b1] leading-relaxed font-light">
                {current.desc}
              </p>
            </div>

            {/* Right 5 cols: Metrics */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#dfa55c] font-bold">
                {t.eng.paramsTitle}
              </h4>

              <div className="grid grid-cols-2 gap-3.5">
                {current.points.map((dp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-[#080502] border border-[#3a2c17]/60 hover:border-[#dfa55c]/30 transition-colors"
                  >
                    <span className="text-[10px] uppercase font-mono text-[#8f8272] block tracking-wider">
                      {dp.label}
                    </span>
                    <span className="font-cinzel text-sm sm:text-base font-bold text-white mt-1.5 block">
                      {dp.metric}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-2 p-3.5 rounded-xl bg-[#dfa55c]/10 border border-[#dfa55c]/25 text-center">
                <span className="text-[11px] font-mono text-[#f7ebd8]">
                  {t.eng.empiricValidation}
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
