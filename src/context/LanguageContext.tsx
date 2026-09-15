"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations, TranslationSchema } from "@/i18n/translations";

interface LanguageContextProps {
  lang: Language;
  setLang: (lang: Language) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextProps>({
  lang: "pt",
  setLang: () => {},
  t: translations.pt,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("pt");

  useEffect(() => {
    const saved = localStorage.getItem("site_lang") as Language;
    if (saved && (saved === "pt" || saved === "en" || saved === "es")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("site_lang", newLang);
    } catch {
      // ignore
    }
  };

  const t = translations[lang] || translations.pt;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
