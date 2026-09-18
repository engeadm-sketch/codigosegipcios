"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { VIDEO_TRAILER } from "@/config";

/**
 * O botão "Assistir ao trailer".
 *
 * Sem VIDEO_TRAILER preenchido em src/config.ts, ele faz exatamente o que
 * fazia antes: rola até a seção do documentário. Com o ID preenchido, passa
 * a abrir o trailer sobreposto à página — são 30 segundos, e obrigar alguém
 * a rolar para ver meio minuto de vídeo é atrito à toa.
 *
 * A janela sai com Esc, com clique no fundo e no botão Fechar, e trava a
 * rolagem da página enquanto está aberta. Vai para document.body por portal,
 * para não depender do contexto de empilhamento do herói.
 */
export default function TrailerButton({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const [aberto, setAberto] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => setMontado(true), []);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    const rolagemAntes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = rolagemAntes;
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  if (!VIDEO_TRAILER) {
    return (
      <Link href="#documentario" className={className}>
        {children}
      </Link>
    );
  }

  return (
    <>
      <button type="button" onClick={() => setAberto(true)} className={className}>
        {children}
      </button>

      {aberto && montado &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Trailer"
            onClick={() => setAberto(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-sm px-4 py-16 sm:p-10"
          >
            <div
              className="relative w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="absolute inset-0 w-full h-full rounded-2xl border border-[#dfa55c]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_TRAILER}?autoplay=1&rel=0&modestbranding=1`}
                title="Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                type="button"
                onClick={() => setAberto(false)}
                className="absolute -top-12 right-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#dfa55c]/40 text-[#e5d3b4] font-mono text-[11px] uppercase tracking-[0.18em] hover:border-[#dfa55c] hover:text-white transition-colors cursor-pointer"
              >
                <span aria-hidden="true">✕</span>
                <span>Fechar</span>
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
