"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/i18n/translations";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#c49a58]/40 bg-[#0f0b06]/80 backdrop-blur-md text-xs font-semibold text-[#f4ede2] hover:border-[#dfa55c] hover:bg-[#191108] hover:shadow-[0_0_12px_rgba(223,165,92,0.3)] transition-all duration-200 cursor-pointer"
        aria-label="Selecionar Idioma"
      >
        <span className="text-sm">{current.flag}</span>
        <span className="uppercase tracking-wider text-[11px] font-mono text-[#dfa55c] font-bold">
          {current.code}
        </span>
        <svg
          className={`w-3 h-3 text-[#c49a58] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-[#0f0b06]/95 border border-[#dfa55c]/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.95)] z-50 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {languages.map((l) => {
            const isSelected = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[#dfa55c]/20 text-[#ffffff] font-bold"
                    : "text-[#cec2b1] hover:bg-[#c49a58]/15 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm">{l.flag}</span>
                  <span>{l.label}</span>
                </div>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#dfa55c] shadow-[0_0_6px_#dfa55c]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
