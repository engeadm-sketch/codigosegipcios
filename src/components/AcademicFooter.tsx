"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function AcademicFooter() {
  const { t } = useLanguage();

  return (
    <footer id="sobre" className="relative bg-[#050301] text-[#b8ab99] border-t border-[#dfa55c]/30 pt-20 pb-12 overflow-hidden">
      {/* Subtle radial ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-b from-[#dfa55c]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Scholar Quotes Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16 border-b border-[#3a2c17]/60">
          
          <div className="p-6 rounded-2xl bg-[#0a0703] border border-[#3a2c17]/60 relative">
            <span className="font-cinzel text-3xl text-[#dfa55c]/30 absolute top-3 right-4">“</span>
            <p className="text-xs sm:text-sm text-[#dfc9ae] italic leading-relaxed mb-4">
              {t.footer.quotePetrie}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#dfa55c]" />
              <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                {t.footer.authorPetrie}
              </span>
              <span className="text-[10px] text-[#8f8272] font-mono">
                {t.footer.subPetrie}
              </span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0a0703] border border-[#3a2c17]/60 relative">
            <span className="font-cinzel text-3xl text-[#dfa55c]/30 absolute top-3 right-4">“</span>
            <p className="text-xs sm:text-sm text-[#dfc9ae] italic leading-relaxed mb-4">
              {t.footer.quoteChampollion}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#dfa55c]" />
              <span className="font-cinzel text-xs font-bold text-white uppercase tracking-wider">
                {t.footer.authorChampollion}
              </span>
              <span className="text-[10px] text-[#8f8272] font-mono">
                {t.footer.subChampollion}
              </span>
            </div>
          </div>

        </div>

        {/* Chronological Dynastic Belt */}
        <div className="py-12 border-b border-[#3a2c17]/60">
          <span className="font-cinzel text-xs font-bold uppercase tracking-[0.25em] text-[#dfa55c] block mb-6">
            {t.footer.timelineTitle}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { period: "Época Tinita", date: "c. 3100–2686 a.C.", dyn: "I – II Dinastias" },
              { period: "Reino Antigo", date: "c. 2686–2181 a.C.", dyn: "III – VI Dinastias" },
              { period: "Reino Médio", date: "c. 2055–1650 a.C.", dyn: "XI – XIII Dinastias" },
              { period: "Reino Novo", date: "c. 1550–1069 a.C.", dyn: "XVIII – XX Dinastias" },
              { period: "Época Baixa", date: "c. 664–332 a.C.", dyn: "XXVI – XXX Dinastias" },
              { period: "Ptolomaico", date: "c. 332–30 a.C.", dyn: "Alexandria & Cleópatra" }
            ].map((dyn, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#090603] border border-[#261d10] text-center">
                <span className="font-cinzel text-xs font-bold text-white block">
                  {dyn.period}
                </span>
                <span className="text-[10px] font-mono text-[#dfa55c] block mt-0.5">
                  {dyn.date}
                </span>
                <span className="text-[9px] text-[#8f8272] block mt-1">
                  {dyn.dyn}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Links & Branding */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Horus Eye */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl text-[#dfa55c]">𓂀</span>
              <span className="font-cinzel text-lg font-bold text-white tracking-widest uppercase">
                {t.hero.headline1} {t.hero.headline2}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#a89b8a] font-light leading-relaxed max-w-md mb-6">
              {t.footer.brandDesc}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-[#8f8272]">
              <span>GIZÉ</span>
              <span>•</span>
              <span>SACARÁ</span>
              <span>•</span>
              <span>LUXOR</span>
              <span>•</span>
              <span>ÁBIDOS</span>
            </div>
          </div>

          {/* Col 2: Tratados & Capítulos */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#dfa55c] mb-4">
              {t.footer.dossiersTitle}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="#matematica-sagrada" className="hover:text-white transition-colors">
                  {t.math.title}
                </Link>
              </li>
              <li>
                <Link href="#documentario" className="hover:text-white transition-colors">
                  {t.necropolis.title}
                </Link>
              </li>
              <li>
                <Link href="#solucoes" className="hover:text-white transition-colors">
                  {t.lexicon.title}
                </Link>
              </li>
              <li>
                <Link href="#explorar" className="hover:text-white transition-colors">
                  {t.eng.title}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutos & Fontes Acadêmicas */}
          <div>
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#dfa55c] mb-4">
              {t.footer.museumsTitle}
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8f8272]">
              <li>Grand Egyptian Museum (GEM)</li>
              <li>Institut Français d&apos;Archéologie Orientale</li>
              <li>Museu Egípcio de Turim (Museo Egizio)</li>
              <li>The British Museum • Dept. of Egypt</li>
              <li>Musée du Louvre • Antiquités Égyptiennes</li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-8 border-t border-[#3a2c17]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8f8272] font-mono">
          <p>
            © {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <p className="flex items-center gap-2">
            <span>{t.footer.preservation}</span>
            <span>✦</span>
            <span className="text-[#dfa55c]">UNESCO WORLD HERITAGE</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
