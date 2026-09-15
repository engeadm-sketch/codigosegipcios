"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function NecropolisAtlas() {
  const { t } = useLanguage();
  const [activeSite, setActiveSite] = useState<string>("giza");

  const siteKeys = ["giza", "saqqara", "kings_valley", "abydos"] as const;
  const currentKey = (siteKeys.includes(activeSite as any) ? activeSite : "giza") as typeof siteKeys[number];
  const current = t.necropolis.sites[currentKey];

  return (
    <section id="documentario" className="relative py-24 sm:py-32 bg-black overflow-hidden border-t border-[#dfa55c]/20">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#c49a58]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dfa55c]/35 bg-[#dfa55c]/10 text-xs font-semibold uppercase tracking-[0.2em] text-[#dfa55c] mb-4 shadow-sm">
            <span>🏛️</span>
            <span>{t.necropolis.tag}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
            {t.necropolis.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#bfb3a2] font-light leading-relaxed">
            {t.necropolis.subtitle}
          </p>
        </div>

        {/* Site Selection Tabs */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {siteKeys.map((key) => {
            const siteData = t.necropolis.sites[key];
            const isActive = key === activeSite;
            return (
              <button
                key={key}
                onClick={() => setActiveSite(key)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wider whitespace-nowrap transition-all duration-300 border flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#dfa55c] to-[#c78839] text-[#140e04] border-[#dfa55c] shadow-[0_0_20px_rgba(223,165,92,0.4)] scale-105"
                    : "bg-[#0d0904]/80 text-[#cec2b1] border-[#3a2c17]/70 hover:border-[#dfa55c]/50 hover:text-white"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? "bg-[#140e04]" : "bg-[#dfa55c]"}`} />
                <span>{siteData.name}</span>
              </button>
            );
          })}
        </div>

        {/* Necropolis Information Terminal Box */}
        <div className="rounded-3xl bg-[#0b0804]/90 border border-[#dfa55c]/30 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Main Overview (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-md bg-[#dfa55c]/15 text-[#dfa55c] border border-[#dfa55c]/30 text-[11px] font-mono uppercase tracking-wider">
                    {current.dynasty}
                  </span>
                  <span className="text-xs font-mono text-[#8f8272]">
                    {currentKey === "giza"
                      ? "29° 58′ 45″ N, 31° 08′ 03″ E"
                      : currentKey === "saqqara"
                      ? "29° 52′ 17″ N, 31° 12′ 59″ E"
                      : currentKey === "kings_valley"
                      ? "25° 44′ 27″ N, 32° 36′ 07″ E"
                      : "26° 11′ 06″ N, 31° 55′ 08″ E"}
                  </span>
                </div>

                <h3 className="font-cinzel text-2xl sm:text-4xl font-bold text-white mb-2">
                  {current.name}
                </h3>
                <p className="text-xs font-mono text-[#dfa55c] tracking-widest uppercase mb-6">
                  {current.location} • {current.age}
                </p>

                <p className="text-xs sm:text-sm text-[#cec2b1] leading-relaxed mb-8 font-light">
                  {current.desc}
                </p>

                {/* Documented Geophysical Anomalies */}
                <div className="space-y-3 pt-6 border-t border-[#3a2c17]/60">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#dfa55c] animate-pulse" />
                    <h4 className="font-cinzel text-xs uppercase tracking-widest text-[#dfa55c] font-bold">
                      {t.necropolis.anomaliesTitle}
                    </h4>
                  </div>
                  {current.anomalies.map((item, idx) => {
                    const [head, ...rest] = item.split(":");
                    return (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#120d07] border border-[#3a2c17]/50 text-xs text-[#b8ab99] leading-relaxed">
                        <strong className="text-white font-medium block mb-1">
                          {head}:
                        </strong>
                        <span>{rest.join(":")}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Metric & Radar Column (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Archaeo-Scan Card */}
              <div className="p-6 rounded-2xl bg-[#120d07] border border-[#dfa55c]/30 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-cinzel text-xs uppercase tracking-wider text-[#dfa55c] font-bold">
                    {t.necropolis.excavationRecord}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#dfa55c]/20 text-[10px] font-mono text-[#dfa55c]">
                    {t.necropolis.academicDoc}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {current.data.map((data, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#080502] border border-[#3a2c17]/40">
                      <span className="text-[10px] font-mono text-[#8f8272] block uppercase tracking-wider">
                        {data.label}
                      </span>
                      <span className="font-cinzel text-sm sm:text-base font-bold text-white mt-1 block">
                        {data.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-xl bg-[#dfa55c]/10 border border-[#dfa55c]/20 flex items-center gap-3">
                  <span className="text-lg">🛰️</span>
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#8f8272] block">
                      {t.necropolis.keyDiscoveryTag}
                    </span>
                    <span className="text-xs text-[#f7ebd8] font-semibold">
                      {current.keyDiscovery}
                    </span>
                  </div>
                </div>
              </div>

              {/* Geographic Scanner Mini Graphic */}
              <div className="p-6 rounded-2xl bg-[#080502] border border-[#3a2c17]/60 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="w-32 h-32 rounded-full border border-[#dfa55c]/30 flex items-center justify-center relative mb-3">
                  <div className="absolute inset-0 rounded-full border border-[#dfa55c]/10 animate-ping" />
                  <div className="w-20 h-20 rounded-full border border-[#dfa55c]/40 flex items-center justify-center">
                    <span className="font-cinzel text-2xl text-[#dfa55c]">☥</span>
                  </div>
                  {/* Radar sweep arm */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-[#dfa55c]/20 to-transparent animate-[spin_6s_linear_infinite] pointer-events-none" />
                </div>
                <span className="font-mono text-[11px] text-[#e7bb81]">
                  {t.necropolis.georefCoords}
                </span>
                <span className="font-mono text-[10px] text-[#8f8272] mt-0.5">
                  {t.necropolis.satellite}
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
