"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function StoreSection() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const { storeSection } = t;

  const categories = [
    { id: "all", label: storeSection.filterAll },
    { id: "courses", label: storeSection.filterCourses },
    { id: "apparel", label: storeSection.filterApparel },
    { id: "accessories", label: storeSection.filterAccessories },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? storeSection.items
      : storeSection.items.filter((item) => item.category === selectedCategory);

  const getItemIcon = (category: string, id: string) => {
    if (category === "courses") {
      return (
        <svg className="w-8 h-8 text-[#dfa55c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
    }
    if (category === "apparel") {
      return (
        <svg className="w-8 h-8 text-[#dfa55c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      );
    }
    return (
      <svg className="w-8 h-8 text-[#dfa55c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    );
  };

  const handleBuyClick = (item: any) => {
    const text = encodeURIComponent(
      `Olá! Gostaria de comprar o item da Loja Oficial: ${item.title} (${item.price})`
    );
    window.open(`https://wa.me/5511999999999?text=${text}`, "_blank");
  };

  return (
    <section id="loja" className="relative w-full py-24 px-6 sm:px-10 lg:px-16 bg-[#0c0804] border-t border-[#3a2c17]/50 text-white overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at 50% 20%, rgba(223, 165, 92, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 80% 80%, rgba(180, 115, 45, 0.1) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#171008] border border-[#dfa55c]/40 text-[#dfa55c] text-xs font-semibold tracking-[0.2em] uppercase mb-4 shadow-[0_0_15px_rgba(223,165,92,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfa55c] animate-pulse" />
            <span>{storeSection.tag}</span>
          </div>

          <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f4ede2] to-[#dfa55c] mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            {storeSection.title}
          </h2>

          <p className="text-sm sm:text-base text-[#c4b5a2] leading-relaxed max-w-2xl mx-auto">
            {storeSection.subtitle}
          </p>

          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#dfa55c]" />
            <div className="w-2 h-2 rotate-45 border border-[#dfa55c] bg-[#dfa55c]/30" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#dfa55c]" />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? "bg-gradient-to-r from-[#dfa55c] to-[#c78839] text-[#140e04] shadow-[0_0_20px_rgba(223,165,92,0.4)] font-bold scale-105"
                  : "bg-[#140e07] border border-[#3a2c17] text-[#b8a794] hover:border-[#dfa55c]/60 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-gradient-to-b from-[#171009] to-[#0f0b06] border border-[#3a2c17]/70 hover:border-[#dfa55c]/80 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(223,165,92,0.25)]"
            >
              {/* Top Card Badge & Rating */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-md bg-[#dfa55c]/10 border border-[#dfa55c]/30 text-[#dfa55c] text-[10px] font-bold uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <span className="text-xs font-semibold text-[#e5b36d]">
                    {item.rating}
                  </span>
                </div>

                {/* Product Header & Icon */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#21160b] border border-[#dfa55c]/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(223,165,92,0.1)]">
                    {getItemIcon(item.category, item.id)}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-[#f7ebd8] leading-snug group-hover:text-[#dfa55c] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-[#b0a08e] leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Price & Buy Button Footer */}
              <div className="pt-4 border-t border-[#3a2c17]/50 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-[#8a7b6a] block uppercase font-mono tracking-wider">
                    Preço Oficial
                  </span>
                  <span className="text-2xl font-bold font-cinzel text-[#dfa55c] drop-shadow-[0_0_10px_rgba(223,165,92,0.3)]">
                    {item.price}
                  </span>
                </div>

                <button
                  onClick={() => handleBuyClick(item)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e7bb81] via-[#dfa55c] to-[#c78839] text-[#140e04] font-bold text-xs uppercase tracking-wider hover:brightness-110 hover:shadow-[0_0_20px_rgba(223,165,92,0.5)] transition-all duration-300"
                >
                  <span>{storeSection.buyBtn}</span>
                  <span className="text-sm">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
