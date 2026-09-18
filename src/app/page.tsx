"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "@/components/LanguageSelector";
import MathematicalCanon from "@/components/MathematicalCanon";
import NecropolisAtlas from "@/components/NecropolisAtlas";
import SacredLexicon from "@/components/SacredLexicon";
import EngineeringChronicles from "@/components/EngineeringChronicles";
import StoreSection from "@/components/StoreSection";
import AcademicFooter from "@/components/AcademicFooter";
import TrailerButton from "@/components/TrailerButton";
import { WHATSAPP } from "@/config";

const TOTAL_FRAMES = 40;

function HomePageContent() {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Frame control refs for Apple-grade smooth lerp & persistent requestAnimationFrame loop
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const targetFrameRef = useRef<number>(1);
  const currentFrameRef = useRef<number>(1);
  const lastDrawnFrameRef = useRef<number>(-1);
  const needsResizeRef = useRef<boolean>(true);

  // Helper to construct frame file path
  const getFrameSrc = (index: number) => {
    const padded = String(index).padStart(3, "0");
    return `/imagens/ezgif-frame-${padded}.png`;
  };

  // Find the closest loaded frame to avoid any flicker/blank canvas while scrolling
  const getClosestLoadedFrame = useCallback((targetIndex: number): HTMLImageElement | null => {
    const directMatch = imagesRef.current[targetIndex];
    if (directMatch && directMatch.complete && directMatch.naturalWidth > 0) {
      return directMatch;
    }

    let closestImg: HTMLImageElement | null = null;
    let minDiff = Infinity;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = imagesRef.current[i];
      if (img && img.complete && img.naturalWidth > 0) {
        const diff = Math.abs(i - targetIndex);
        if (diff < minDiff) {
          minDiff = diff;
          closestImg = img;
        }
      }
    }

    return closestImg;
  }, []);

  // Draw frame with object-fit: cover logic and DPR support
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = getClosestLoadedFrame(frameIndex);
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 1080;

      // Aspect ratio cover calculation
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) / 2;
      const dy = (ch - dh) / 2;

      // Seamless deep black base
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    },
    [getClosestLoadedFrame]
  );

  // Update canvas size considering devicePixelRatio (Retina support)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    const targetW = Math.floor(w * dpr);
    const targetH = Math.floor(h * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      needsResizeRef.current = true;
      lastDrawnFrameRef.current = -1; // force redraw
    }
  }, []);

  // Calculate scroll progress mapped from 0% (frame 1) to 100% (frame 40)
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;

    if (totalScrollable <= 0) return;

    // rect.top starts at 0 and reaches -totalScrollable at the bottom
    const currentScroll = -rect.top;
    const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);

    // Map directly to frame range [1, TOTAL_FRAMES]
    targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
  }, []);

  // Preload frames progressively
  useEffect(() => {
    imagesRef.current = new Array(TOTAL_FRAMES + 1).fill(null);

    // 1. Immediately preload Frame 1 for zero initial delay
    const firstImg = new Image();
    firstImg.src = getFrameSrc(1);
    firstImg.onload = () => {
      imagesRef.current[1] = firstImg;
      lastDrawnFrameRef.current = -1;
      drawFrame(1);
    };

    // 2. Preload remaining frames progressively
    for (let i = 2; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        // Invalidate lastDrawnFrame if current frame just finished loading
        if (Math.round(currentFrameRef.current) === i) {
          lastDrawnFrameRef.current = -1;
        }
      };
    }
  }, [drawFrame]);

  // Animation loop with requestAnimationFrame and lerp
  useEffect(() => {
    updateCanvasDimensions();
    handleScroll();

    let animationId: number;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = mediaQuery.matches;

    const onMotionChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    mediaQuery.addEventListener("change", onMotionChange);

    const onResize = () => {
      updateCanvasDimensions();
      handleScroll();
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Persistent animation loop for ultra-smooth fluid transition
    const loop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const lerpSpeed = prefersReducedMotion ? 1 : 0.12;
      const diff = target - current;

      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * lerpSpeed;
      } else {
        currentFrameRef.current = target;
      }

      const frameToDraw = Math.min(
        Math.max(Math.round(currentFrameRef.current), 1),
        TOTAL_FRAMES
      );

      // Redraw whenever the target frame changes or canvas is resized
      if (frameToDraw !== lastDrawnFrameRef.current || needsResizeRef.current) {
        drawFrame(frameToDraw);
        lastDrawnFrameRef.current = frameToDraw;
        needsResizeRef.current = false;
      }

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", onMotionChange);
    };
  }, [updateCanvasDimensions, handleScroll, drawFrame]);

  return (
    <div className="relative bg-black selection:bg-[#c9a063] selection:text-black">
      <div ref={containerRef} className="relative h-[400vh] bg-black">
      {/* Sticky Fullscreen Wrapper holding the Canvas and Hero UI */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Fullscreen Sticky HTML5 Canvas for Image Sequence Animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ width: "100%", height: "100%" }}
        />

        {/* Ambient Dark Gold Luxury Vignette seamlessly integrating canvas with black background */}
        <div 
          className="pointer-events-none absolute inset-0 z-[1] opacity-40 mix-blend-screen"
          style={{
            background: `
              radial-gradient(circle at 20% 35%, rgba(180, 115, 45, 0.15) 0%, transparent 45%),
              radial-gradient(circle at 85% 65%, rgba(140, 85, 25, 0.10) 0%, transparent 40%)
            `,
          }}
        />

        {/* ===================== NAVBAR ===================== */}
        <header className="relative z-30 w-full pt-6 sm:pt-8 pb-4 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-black/90 via-black/60 to-transparent backdrop-blur-[2px]">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            
            {/* Logo with decorative lines */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:block h-[1px] w-8 lg:w-12 bg-gradient-to-r from-transparent to-[#c9a063]" />
              <Link href="/" className="group flex items-center justify-center text-[#d9aa61] hover:text-[#f3cca0] transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                {/* Eye of Horus / Egyptian Eye SVG */}
                <svg 
                  className="w-10 h-7 md:w-12 md:h-8 drop-shadow-[0_0_12px_rgba(223,165,92,0.6)]" 
                  viewBox="0 0 100 60" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  {/* Eyebrow */}
                  <path d="M 15 16 Q 50 4 85 16" />
                  {/* Upper eyelid */}
                  <path d="M 10 30 Q 50 14 90 30" />
                  {/* Lower eyelid */}
                  <path d="M 10 30 Q 50 46 90 30" />
                  {/* Pupil */}
                  <circle cx="50" cy="30" r="7" fill="currentColor" />
                  {/* Downward drop / teardrop line */}
                  <path d="M 46 36 L 46 56" />
                  {/* Spiral curled tail */}
                  <path d="M 54 36 Q 74 46 72 54 Q 70 58 65 54 Q 60 50 63 46" />
                </svg>
              </Link>
              <span className="hidden sm:block h-[1px] w-8 lg:w-12 bg-gradient-to-l from-transparent to-[#c9a063]" />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-10 text-xs lg:text-sm font-semibold tracking-wider text-[#e8ded1] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <Link href="#solucoes" className="hover:text-[#dfa55c] transition-colors">
                {t.nav.solutions}
              </Link>
              <Link href="#documentario" className="hover:text-[#dfa55c] transition-colors">
                {t.nav.documentary}
              </Link>
              <Link href="#engenharia" className="hover:text-[#dfa55c] transition-colors">
                {t.nav.resources}
              </Link>
              <Link href="#sobre" className="hover:text-[#dfa55c] transition-colors">
                {t.nav.about}
              </Link>
              <Link href="#loja" className="hover:text-[#dfa55c] transition-colors">
                {t.nav.store}
              </Link>
            </nav>

            {/* Desktop Auth & Language Selector */}
            <div className="hidden md:flex items-center gap-4 lg:gap-5">
              <LanguageSelector />
              <a
                href="/aluno/"
                className="text-xs lg:text-sm font-semibold text-[#f4ede2] hover:text-[#dfa55c] transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
              >
                {t.nav.login}
              </a>
              <Link 
                href="#loja" 
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#dfa55c] bg-gradient-to-r from-[#dfa55c]/25 via-[#c78839]/30 to-[#dfa55c]/25 backdrop-blur-md text-xs lg:text-sm font-bold text-white shadow-[0_0_20px_rgba(223,165,92,0.35),0_2px_10px_rgba(0,0,0,0.8)] hover:bg-gradient-to-r hover:from-[#e7bb81] hover:via-[#dfa55c] hover:to-[#c78839] hover:text-[#140e04] hover:shadow-[0_0_30px_rgba(223,165,92,0.6)] hover:scale-105 transition-all duration-300"
              >
                <span>{t.nav.getStarted}</span>
                <span className="text-sm font-bold">→</span>
              </Link>
            </div>

            {/* Mobile Menu & Lang Button */}
            <div className="md:hidden flex items-center gap-3">
              <LanguageSelector />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#dfa55c] hover:text-white focus:outline-none"
                aria-label="Abrir Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 px-6 rounded-2xl bg-black/95 border border-[#c9a063]/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.95)] flex flex-col gap-4 text-center">
              <Link 
                href="#solucoes" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm font-medium tracking-wider text-[#e8ded1] hover:text-white"
              >
                {t.nav.solutions}
              </Link>
              <Link 
                href="#documentario" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm font-medium tracking-wider text-[#e8ded1] hover:text-white"
              >
                {t.nav.documentary}
              </Link>
              <Link 
                href="#engenharia" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm font-medium tracking-wider text-[#e8ded1] hover:text-white"
              >
                {t.nav.resources}
              </Link>
              <Link 
                href="#sobre" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm font-medium tracking-wider text-[#e8ded1] hover:text-white"
              >
                {t.nav.about}
              </Link>
              <Link 
                href="#loja" 
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm font-medium tracking-wider text-[#e8ded1] hover:text-white"
              >
                {t.nav.store}
              </Link>
              <hr className="border-[#c9a063]/30 my-1" />
              <a
                href="/aluno/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-sm font-semibold text-[#f4ede2] hover:text-[#dfa55c]"
              >
                {t.nav.login}
              </a>
              <Link 
                href="#loja" 
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-full border border-[#dfa55c] bg-gradient-to-r from-[#dfa55c] to-[#c78839] text-xs font-bold uppercase tracking-wider text-[#140e04] shadow-[0_0_20px_rgba(223,165,92,0.4)]"
              >
                <span>{t.nav.getStarted}</span>
                <span>→</span>
              </Link>
            </div>
          )}
        </header>

        {/* ===================== HERO MAIN CONTENT ===================== */}
        <main className="hero-main relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-24 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl text-left relative">
            
            {/* Ambient Dark Aura behind Hero typography */}
            <div className="pointer-events-none absolute -inset-8 sm:-inset-12 -z-10 bg-black/60 blur-3xl rounded-3xl" />

            {/* Top Kicker / Subheading - High Contrast Frosted Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/75 border border-[#dfa55c]/60 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.9),0_0_15px_rgba(223,165,92,0.25)] mb-3 sm:mb-4">
              <span className="w-2 h-2 rounded-full bg-[#dfa55c] shadow-[0_0_8px_#dfa55c] animate-pulse" />
              <h2 className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#fbf7f0] uppercase font-bold">
                {t.hero.kicker}
              </h2>
            </div>

            {/* Main Hero Headline with Crisp Cinematic Depth Shadows */}
            <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight uppercase leading-[0.95]">
              <span className="block text-white drop-shadow-[0_4px_25px_rgba(0,0,0,1)] drop-shadow-[0_0_25px_rgba(223,165,92,0.25)]">
                {t.hero.headline1}
              </span>
              <span className="block bg-gradient-to-r from-white via-[#fff1db] to-[#dfa55c] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(0,0,0,1)]">
                {t.hero.headline2}
              </span>
            </h1>

            {/* Decorative Egyptian Diamond Emblem */}
            <div className="flex items-center gap-3 my-5 sm:my-6">
              <div className="w-3.5 h-3.5 rotate-45 border-2 border-[#dfa55c] flex items-center justify-center shadow-[0_0_10px_rgba(223,165,92,0.5)]">
                <div className="w-1.5 h-1.5 bg-[#dfa55c]" />
              </div>
              <div className="h-[1px] w-20 bg-gradient-to-r from-[#dfa55c]/60 to-transparent" />
            </div>

            {/* Subtitle / Description with Crisp Drop-Shadow */}
            <p className="text-sm sm:text-base md:text-lg text-[#f0e5d5] font-normal leading-relaxed max-w-lg mb-8 sm:mb-10 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              {t.hero.subtitle}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
              {/* Primary Button */}
              <Link
                href="#documentario"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#e7bb81] via-[#dca057] to-[#c78839] text-[#140e04] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_35px_rgba(223,165,92,0.6),0_4px_16px_rgba(0,0,0,0.9)] hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_20px_rgba(0,0,0,0.8),0_0_20px_rgba(223,165,92,0.3)]"
              >
                <span>{t.hero.exploreBtn}</span>
                <span className="text-base font-bold">→</span>
              </Link>

              {/* Secondary Button */}
              <TrailerButton
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border-2 border-[#dfa55c]/60 bg-black/80 backdrop-blur-md text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:border-[#dfa55c] hover:bg-[#dfa55c]/20 hover:shadow-[0_0_25px_rgba(223,165,92,0.35),0_4px_16px_rgba(0,0,0,0.9)] hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_16px_rgba(0,0,0,0.8)] cursor-pointer"
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[9px] pl-[1.5px] text-[#dfa55c]">
                  ▶
                </span>
                <span>{t.hero.trailerBtn}</span>
              </TrailerButton>
            </div>

          </div>
        </main>

        {/* ===================== BOTTOM FEATURE HIGHLIGHTS ===================== */}
        <section className="hero-faixa relative z-20 w-full border-t border-[#3a2c17]/40 bg-black/70 backdrop-blur-sm">
          <div className="hero-faixa-in max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
              
              {/* Item 1 */}
              <div className="flex flex-col items-center justify-center text-center md:border-r border-[#3a2c17]/60 md:px-4">
                <div className="w-10 h-10 rounded-full border border-[#c49a58]/50 flex items-center justify-center text-[#d9aa61] mb-2.5 shadow-[0_0_12px_rgba(196,154,88,0.2)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-[#d6c7b4] uppercase">
                  {t.hero.feature1}
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center justify-center text-center md:border-r border-[#3a2c17]/60 md:px-4">
                <div className="w-10 h-10 rounded-full border border-[#c49a58]/50 flex items-center justify-center text-[#d9aa61] mb-2.5 shadow-[0_0_12px_rgba(196,154,88,0.2)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="7" rx="4" ry="4.5" />
                    <path d="M12 11.5v10.5" />
                    <path d="M7 14h10" />
                  </svg>
                </div>
                <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-[#d6c7b4] uppercase">
                  {t.hero.feature2}
                </span>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center justify-center text-center md:border-r border-[#3a2c17]/60 md:px-4">
                <div className="w-10 h-10 rounded-full border border-[#c49a58]/50 flex items-center justify-center text-[#d9aa61] mb-2.5 shadow-[0_0_12px_rgba(196,154,88,0.2)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 4v16" />
                    <path d="M7 9c1 3 3 5 5 7 2-2 4-4 5-7" />
                    <path d="M4 14c2 2 5 4 8 4s6-2 8-4" />
                    <circle cx="12" cy="4" r="1.5" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-[#d6c7b4] uppercase">
                  {t.hero.feature3}
                </span>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center justify-center text-center md:px-4">
                <div className="w-10 h-10 rounded-full border border-[#c49a58]/50 flex items-center justify-center text-[#d9aa61] mb-2.5 shadow-[0_0_12px_rgba(196,154,88,0.2)]">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18" />
                    <path d="M12 3a13 13 0 0 1 0 18" />
                    <path d="M12 3a13 13 0 0 0 0 18" />
                  </svg>
                </div>
                <span className="font-cinzel text-[10px] sm:text-xs font-semibold tracking-[0.18em] text-[#d6c7b4] uppercase">
                  {t.hero.feature4}
                </span>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>

    {/* ===================== SEÇÃO 1: CARROSSEL INFINITO DE LOGOS ===================== */}
    <section className="relative z-20 w-full bg-black py-20 sm:py-28 overflow-hidden border-t border-[#3a2c17]/50 selection:bg-[#c9a063] selection:text-black">
      <div 
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at 20% 35%, rgba(180, 115, 45, 0.14) 0%, transparent 45%),
            radial-gradient(circle at 80% 65%, rgba(140, 85, 25, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.10) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 text-center mb-12 sm:mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c49a58]/35 bg-[#140e06]/70 backdrop-blur-md text-[11px] font-semibold text-[#dfc9ae] tracking-wider uppercase mb-3 shadow-[0_0_15px_rgba(196,154,88,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfa55c] shadow-[0_0_8px_#dfa55c]" />
          <span>{t.carousel.tag}</span>
        </div>
        <p className="font-cinzel text-2xl sm:text-3xl md:text-4xl text-white font-normal tracking-wide drop-shadow-[0_2px_15px_rgba(223,165,92,0.2)]">
          {t.carousel.title}
        </p>
        <p className="mt-4 max-w-2xl mx-auto text-[11px] sm:text-xs text-[#8f8272] leading-relaxed">
          {t.carousel.note}
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c9a063]/60" />
          <div className="w-2 h-2 rotate-45 border border-[#cda260] bg-[#cda260] shadow-[0_0_10px_rgba(205,162,96,0.6)]" />
          <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c9a063]/60" />
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden mask-fade-edges py-2">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-black via-black/90 to-transparent z-10" />

        {/* Linha 1 */}
        <div className="flex w-full mb-5 sm:mb-7 overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-5 sm:gap-7">
            <div className="flex items-center gap-5 sm:gap-7">
              
              <div className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full border border-[#c49a58]/25 bg-[#120d06]/75 backdrop-blur-xl text-[#d4c3b0] hover:border-[#dfa55c]/60 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 text-[#d9aa61] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 9l9-5 9 5v2H3V9zM4 11v7M8 11v7M12 11v7M16 11v7M20 11v7M2 19h20v2H2v-2z" />
                </svg>
                <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  The British Museum
                </span>
              </div>
              <div className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full border border-[#c49a58]/25 bg-[#120d06]/75 backdrop-blur-xl text-[#d4c3b0] hover:border-[#dfa55c]/60 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 text-[#d9aa61] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 3L2 21h20L12 3zM12 3v18M7 12h10" />
                </svg>
                <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  Musée du Louvre
                </span>
              </div>
              <div className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full border border-[#c49a58]/25 bg-[#120d06]/75 backdrop-blur-xl text-[#d4c3b0] hover:border-[#dfa55c]/60 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 text-[#d9aa61] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M3 9l9-5 9 5v2H3V9zM4 11v7M8 11v7M12 11v7M16 11v7M20 11v7M2 19h20v2H2v-2z" />
                </svg>
                <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  Egyptian Museum, Cairo
                </span>
              </div>
              
            </div>
          </div>
        </div>

        {/* Linha 2 */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-right flex items-center gap-5 sm:gap-7">
            <div className="flex items-center gap-5 sm:gap-7">
              <div className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full border border-[#c49a58]/25 bg-[#120d06]/75 backdrop-blur-xl text-[#d4c3b0] hover:border-[#dfa55c]/60 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 text-[#d9aa61] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 3L3 8v2h18V8L12 3zM5 10v7M8 10v7M12 10v7M16 10v7M19 10v7M3 18h18v3H3v-3z" />
                </svg>
                <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  UNESCO World Heritage
                </span>
              </div>
              <div className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full border border-[#c49a58]/25 bg-[#120d06]/75 backdrop-blur-xl text-[#d4c3b0] hover:border-[#dfa55c]/60 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 text-[#d9aa61] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                  <path d="M15 4v5h5M7 13h9M7 17h6" />
                </svg>
                <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  Nature
                </span>
              </div>
              <div className="group flex items-center gap-3 px-6 sm:px-8 py-3.5 rounded-full border border-[#c49a58]/25 bg-[#120d06]/75 backdrop-blur-xl text-[#d4c3b0] hover:border-[#dfa55c]/60 hover:text-white transition-all duration-300">
                <svg className="w-5 h-5 text-[#d9aa61] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
                  <path d="M15 4v5h5M7 13h9M7 17h6" />
                </svg>
                <span className="font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase">
                  Griffith Institute · Oxford
                </span>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ===================== SEÇÃO 2: BENTO GRID CÓSMICO ===================== */}
    <section className="relative z-20 w-full bg-black py-24 sm:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden border-t border-[#3a2c17]/50 selection:bg-[#c9a063] selection:text-black">
      <div 
        className="pointer-events-none absolute inset-0 opacity-35 mix-blend-screen"
        style={{
          background: `
            radial-gradient(circle at 15% 25%, rgba(180, 115, 45, 0.16) 0%, transparent 45%),
            radial-gradient(circle at 85% 30%, rgba(200, 130, 45, 0.14) 0%, transparent 40%),
            radial-gradient(circle at 50% 60%, rgba(140, 85, 25, 0.12) 0%, transparent 50%)
          `,
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c49a58]/35 bg-[#140e06]/70 backdrop-blur-md text-[11px] font-semibold text-[#dfc9ae] tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(196,154,88,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfa55c] shadow-[0_0_8px_#dfa55c]" />
            <span>Tecnologia Cósmica & Arqueologia</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-wide leading-tight mb-4 drop-shadow-[0_2px_15px_rgba(223,165,92,0.25)]">
            Desvendando os Códigos no Espaço-Tempo
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#bfb3a2] font-light leading-relaxed">
            Uma arquitetura neural de alta precisão que conecta astronomia milenar, inteligência artificial e fotogrametria quântica.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#c9a063]/60" />
            <div className="w-2.5 h-2.5 rotate-45 border border-[#cda260] bg-[#cda260] shadow-[0_0_10px_rgba(205,162,96,0.6)]" />
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#c9a063]/60" />
          </div>
        </div>

        {/* 3-COLUMN BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* COLUNA 1 */}
          <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            
            {/* Card 1A */}
            <div className="group relative rounded-3xl p-6 sm:p-7 bg-[#0f0b06]/75 backdrop-blur-2xl border border-[#c49a58]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_35px_rgba(0,0,0,0.7)] hover:border-[#dfa55c]/60 hover:shadow-[0_0_30px_rgba(223,165,92,0.25)] transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#f59e0b] via-[#dfa55c] to-[#92400e] p-[1.5px] shadow-[0_0_15px_rgba(223,165,92,0.4)] mb-5">
                  <div className="w-full h-full bg-[#160f06] rounded-[14px] flex items-center justify-center text-white">
                    <svg className="w-5 h-5 text-[#e7bb81]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-cinzel text-lg sm:text-xl text-white font-medium leading-snug tracking-wide group-hover:text-[#f4ede2] transition-colors">
                  {t.bento.card1Title}
                </h3>
              </div>
              <div className="mt-4 pt-3 border-t border-[#3a2c17]/50">
                <span className="text-[11px] font-semibold text-[#d9aa61] block uppercase tracking-wider">
                  {t.bento.card1Tag}
                </span>
                <span className="text-[10px] text-[#a89b8a] block mt-0.5">
                  {t.bento.card1Desc}
                </span>
              </div>
            </div>

            {/* Card 1B */}
            <div className="group relative rounded-3xl p-6 sm:p-7 bg-[#0f0b06]/75 backdrop-blur-2xl border border-[#c49a58]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_35px_rgba(0,0,0,0.7)] hover:border-[#dfa55c]/60 hover:shadow-[0_0_30px_rgba(223,165,92,0.25)] transition-all duration-300 flex flex-col justify-between min-h-[200px]">
              <div>
                <span className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#f7ebd8] to-[#cbb28d] drop-shadow-[0_0_20px_rgba(223,165,92,0.3)]">
                  {t.bento.card6ActiveCount}
                </span>
                <p className="text-xs text-[#bfb3a2] tracking-wider uppercase font-medium mt-1">
                  {t.bento.card6ActiveLabel}
                </p>
              </div>
              <div className="flex items-center -space-x-2.5 mt-5">
                <div className="w-10 h-10 rounded-full border-2 border-[#d9aa61] bg-gradient-to-tr from-[#3a2610] to-[#1a1107] flex items-center justify-center text-xs font-bold text-[#f4ede2] shadow-md">
                  EA
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#c78839] bg-gradient-to-tr from-[#3a2610] to-[#1a1107] flex items-center justify-center text-xs font-bold text-[#f4ede2] shadow-md">
                  SC
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-[#e7bb81] bg-gradient-to-tr from-[#3a2610] to-[#1a1107] flex items-center justify-center text-xs font-bold text-[#f4ede2] shadow-md">
                  MR
                </div>
                <span className="pl-4 text-[11px] font-medium text-[#d6c7b4]">
                  +120 países
                </span>
              </div>
            </div>

            {/* Card 1C */}
            <div className="group relative rounded-3xl p-5 sm:p-6 bg-[#0f0b06]/75 backdrop-blur-2xl border border-[#c49a58]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_35px_rgba(0,0,0,0.7)] hover:border-[#dfa55c]/60 hover:shadow-[0_0_30px_rgba(223,165,92,0.25)] transition-all duration-300 flex items-center justify-center min-h-[110px]">
              <Link
                href="#documentario"
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#e7bb81] via-[#dca057] to-[#c78839] text-[#140e04] font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(223,165,92,0.45)] hover:shadow-[0_0_35px_rgba(223,165,92,0.65)] hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <svg className="w-4 h-4 text-[#140e04]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
                </svg>
                <span>{t.bento.card6Btn}</span>
              </Link>
            </div>

          </div>

          {/* COLUNA 2 (CENTRAL) */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="group relative rounded-3xl p-7 sm:p-9 bg-gradient-to-b from-[#160f08]/85 via-[#0d0904]/90 to-[#050301] backdrop-blur-2xl border border-[#c49a58]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_20px_50px_rgba(0,0,0,0.8)] hover:border-[#dfa55c]/60 hover:shadow-[0_0_40px_rgba(223,165,92,0.25)] transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full">
              
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-[#c49a58]/20 via-[#92400e]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c49a58]/40 bg-[#160f06]/70 backdrop-blur-md text-[11px] font-semibold text-[#dfc9ae] tracking-wider uppercase shadow-inner">
                  <span className="text-[#dfa55c]">✦</span>
                  <span>{t.bento.card2Tag}</span>
                </div>
                <h3 className="font-cinzel text-2xl sm:text-3xl lg:text-4xl text-white font-normal tracking-wide text-center mt-3.5 drop-shadow-[0_2px_15px_rgba(223,165,92,0.25)]">
                  {t.bento.card2Title}
                </h3>
              </div>

              {/* Central Golden Solar Orb */}
              <div className="relative flex flex-col items-center justify-center my-6 sm:my-8 z-10">
                <div className="text-[9px] sm:text-[10px] tracking-[0.25em] text-[#c9a063]/75 uppercase font-mono mb-2 flex items-center gap-2">
                  <span>29.9792° N</span>
                  <span className="w-1 h-1 rounded-full bg-[#dfa55c]" />
                  <span>31.1342° E</span>
                  <span className="w-1 h-1 rounded-full bg-[#e5a93b]" />
                  <span>ORION BELT</span>
                  <span className="w-1 h-1 rounded-full bg-[#facc15]" />
                  <span>SIRIUS A</span>
                </div>

                <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#dfa55c] via-[#f59e0b] to-[#78350f] opacity-60 blur-2xl animate-pulse pointer-events-none" />
                  <div className="absolute -inset-2 rounded-full border border-[#c49a58]/40 shadow-[0_0_35px_rgba(223,165,92,0.4)] pointer-events-none" />

                  <div 
                    className="relative w-full h-full rounded-full overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.9),0_0_50px_rgba(223,165,92,0.5)] border border-[#fef08a]/20 flex items-center justify-center"
                    style={{
                      background: `
                        radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.95) 0%, rgba(223, 165, 92, 0.8) 35%, transparent 65%),
                        radial-gradient(circle at 25% 25%, rgba(254, 243, 199, 0.95) 0%, rgba(202, 138, 4, 0.85) 40%, transparent 70%),
                        radial-gradient(circle at 50% 50%, #1c1105 0%, #080401 100%)
                      `,
                    }}
                  >
                    <svg className="w-full h-full opacity-90 mix-blend-screen animate-[spin_40s_linear_infinite]" viewBox="0 0 200 200">
                      <defs>
                        <linearGradient id="goldSwirl1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="goldSwirl2" x1="100%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                          <stop offset="60%" stopColor="#dfa55c" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#92400e" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M 100,100 m -60,0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0" fill="none" stroke="url(#goldSwirl1)" strokeWidth="14" strokeDasharray="40 15 25 10" />
                      <path d="M 100,100 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0" fill="none" stroke="url(#goldSwirl2)" strokeWidth="12" strokeDasharray="30 20 15 15" />
                      <circle cx="100" cy="100" r="12" fill="#ffffff" filter="drop-shadow(0 0 8px #fbbf24)" />
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-black/70 pointer-events-none" />
                  </div>
                </div>

                <div className="w-full max-w-xs h-6 flex justify-between items-center px-8 relative -mt-2">
                  <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#dfa55c]/60 to-[#e5a93b]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
                  <div className="w-1/2 h-[1px] bg-gradient-to-l from-transparent via-[#dfa55c]/60 to-[#c78839]" />
                </div>
              </div>

              {/* Bottom Feature Branches */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5 border-t border-[#3a2c17]/50 relative z-10">
                <div className="flex flex-col items-start">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#dfa55c] to-[#c78839] flex items-center justify-center text-[#140e04] font-bold shadow-[0_0_15px_rgba(223,165,92,0.5)] mb-2.5">
                    <svg className="w-4 h-4 text-[#140e04]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="6" y1="3" x2="6" y2="15" />
                      <circle cx="18" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <path d="M18 9a9 9 0 0 1-9 9" />
                    </svg>
                  </div>
                  <h4 className="font-cinzel text-sm sm:text-base text-white font-medium tracking-wide">
                    {t.bento.cartographyTitle}
                  </h4>
                  <p className="text-xs text-[#bfb3a2] leading-relaxed mt-1 font-light">
                    {t.bento.cartographyDesc}
                  </p>
                </div>

                <div className="flex flex-col items-start">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e7bb81] to-[#dfa55c] flex items-center justify-center text-[#140e04] font-bold shadow-[0_0_15px_rgba(223,165,92,0.5)] mb-2.5">
                    <svg className="w-4 h-4 text-[#140e04]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 7V4h3M20 7V4h-3M4 17v3h3M20 17v3h-3" />
                      <circle cx="12" cy="12" r="2" fill="currentColor" />
                    </svg>
                  </div>
                  <h4 className="font-cinzel text-sm sm:text-base text-white font-medium tracking-wide">
                    {t.bento.epigraphicTitle}
                  </h4>
                  <p className="text-xs text-[#bfb3a2] leading-relaxed mt-1 font-light">
                    {t.bento.epigraphicDesc}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* COLUNA 3 */}
          <div className="lg:col-span-3 flex flex-col gap-5 sm:gap-6">
            
            {/* Card 3A */}
            <div className="group relative rounded-3xl p-5 sm:p-6 bg-[#0f0b06]/75 backdrop-blur-2xl border border-[#c49a58]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_35px_rgba(0,0,0,0.7)] hover:border-[#dfa55c]/60 hover:shadow-[0_0_30px_rgba(223,165,92,0.25)] transition-all duration-300 flex items-center justify-between min-h-[105px]">
              <div>
                <span className="font-cinzel text-xs text-[#dfc9ae] tracking-wider uppercase font-semibold block">
                  {t.bento.card3Title}
                </span>
                <span className="text-[10px] text-[#8f8272] block mt-0.5">
                  {t.bento.card3Sub}
                </span>
              </div>
              <div className="w-16 h-9 rounded-full bg-[#0a0703] border border-[#c49a58]/40 p-1 flex items-center justify-end shadow-inner cursor-pointer">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#e7bb81] via-[#dfa55c] to-[#c78839] flex items-center justify-center text-[#140e04] text-[10px] font-bold shadow-[0_0_15px_rgba(223,165,92,0.7)]">
                  ✦
                </div>
              </div>
            </div>

            {/* Card 3B */}
            <div className="group relative rounded-3xl p-6 sm:p-7 bg-[#0f0b06]/75 backdrop-blur-2xl border border-[#c49a58]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_35px_rgba(0,0,0,0.7)] hover:border-[#dfa55c]/60 hover:shadow-[0_0_30px_rgba(223,165,92,0.25)] transition-all duration-300 flex flex-col justify-center min-h-[175px]">
              <span className="font-cinzel text-4xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#f7ebd8] to-[#cbb28d] drop-shadow-[0_0_20px_rgba(223,165,92,0.3)]">
                {t.bento.card4Number}
              </span>
              <p className="text-xs text-[#bfb3a2] tracking-wider uppercase font-medium mt-2">
                <span className="text-[#dfa55c] font-bold">[</span> {t.bento.card4Label} <span className="text-[#dfa55c] font-bold">]</span>
              </p>
            </div>

            {/* Card 3C */}
            <div className="group relative rounded-3xl p-6 sm:p-7 bg-[#0f0b06]/75 backdrop-blur-2xl border border-[#c49a58]/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_12px_35px_rgba(0,0,0,0.7)] hover:border-[#dfa55c]/60 hover:shadow-[0_0_30px_rgba(223,165,92,0.25)] transition-all duration-300 flex flex-col justify-between min-h-[270px]">
              <div>
                <h4 className="font-cinzel text-base sm:text-lg text-white font-medium tracking-wide">
                  {t.bento.card5Title}
                </h4>
                <p className="text-xs text-[#bfb3a2] leading-relaxed mt-1 font-light">
                  {t.bento.card5Desc}
                </p>
              </div>

              <div className="my-4 relative flex flex-col gap-2.5">
                <div className="self-end inline-flex items-center px-3.5 py-1 rounded-full border border-[#c49a58]/35 bg-[#c49a58]/15 text-[11px] font-semibold text-[#f0e2cf] shadow-sm">
                  {t.bento.card5Badge1}
                </div>

                <div className="self-start px-4 py-1.5 rounded-full bg-gradient-to-r from-[#dca057] to-[#b4772b] text-[#140e04] text-xs font-bold shadow-[0_0_15px_rgba(223,165,92,0.4)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#140e04] animate-ping" />
                  <span>{t.bento.card5Badge2}</span>
                </div>

                <div className="flex items-center gap-2.5 mt-1">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#e7bb81] to-[#c78839] flex items-center justify-center text-[#140e04] font-bold shadow-md">
                    𓂀
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#c49a58]/20 border border-[#c49a58]/40 flex items-center justify-center text-[#dfa55c] shadow-md">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                      <circle cx="12" cy="13" r="4" />
                    </svg>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-[#c49a58]/15 border border-[#c49a58]/30 flex items-center justify-center text-[10px] text-[#e7cfa6]">
                    ☥
                  </div>
                </div>

              </div>

              <div className="pt-3 border-t border-[#3a2c17]/50 flex items-center justify-between text-[10px] tracking-wider text-[#a89b8a] font-mono uppercase">
                <span>• 4K RAW</span>
                <span>• 3D OBJ</span>
                <span>• FLAC</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

      {/* ===================== TRATADO MATEMÁTICO & GEOMETRIA SAGRADA ===================== */}
      <MathematicalCanon />

      {/* ===================== ATLAS DAS GRANDES NECRÓPOLES ===================== */}
      <NecropolisAtlas />

      {/* ===================== LÉXICO SAGRADO: A CIÊNCIA DOS SÍMBOLOS ===================== */}
      <SacredLexicon />

      {/* ===================== CRÔNICAS DE ENGENHARIA MECÂNICA ===================== */}
      <EngineeringChronicles />

      {/* ===================== LOJA DE ARTEFATOS & TREINAMENTOS ===================== */}
      <StoreSection />

      {/* ===================== ARQUIVO ACADÊMICO & FOOTER MONUMENTAL ===================== */}
      <AcademicFooter />

      {/* Floating WhatsApp Action Button */}
      <aside className="fixed bottom-6 right-6 z-50 flex items-center group">
        <span className="mr-3 px-3.5 py-1.5 rounded-full bg-[#0f0b06]/95 border border-[#dfa55c]/50 text-[#f7ebd8] text-xs font-semibold tracking-wider uppercase shadow-[0_4px_20px_rgba(0,0,0,0.85)] backdrop-blur-md opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap hidden sm:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          <span>{t.footer.whatsappTooltip}</span>
        </span>

        <a
          href={`https://wa.me/${WHATSAPP}?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20projeto.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#1ea952] to-[#25D366] text-[#ffffff] shadow-[0_6px_25px_rgba(37,211,102,0.45),0_0_15px_rgba(223,165,92,0.25)] hover:shadow-[0_8px_35px_rgba(37,211,102,0.7),0_0_25px_rgba(223,165,92,0.5)] border-2 border-[#dfa55c]/70 hover:border-[#ffe4a0] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none" />
          <svg className="w-7 h-7 fill-current relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.146-.525-1.745-.722-2.859-2.51-2.946-2.627-.088-.117-.708-.941-.708-1.794s.448-1.273.607-1.446c.159-.174.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.158.571 4.183 1.571 5.932l-1.579 5.764 5.922-1.554c1.701.929 3.654 1.458 5.733 1.458 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12zm0 22c-1.892 0-3.666-.529-5.183-1.445l-.372-.224-3.525.925.941-3.435-.246-.391c-1.025-1.633-1.615-3.565-1.615-5.63 0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
          </svg>
        </a>
      </aside>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomePageContent />
    </LanguageProvider>
  );
}
