'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Data ──────────────────────────────────────────────────── */
const SLIDES = [
  { src: '/images/heroes/vietnam.png', label: 'Vietnam' },
  { src: '/images/heroes/thailand.png', label: 'Thailand' },
  { src: '/images/heroes/bali.png', label: 'Bali' },
  { src: '/images/heroes/singapore.png', label: 'Singapore' },
  { src: '/images/heroes/india.png', label: 'India' },
  { src: '/images/heroes/malaysia.png', label: 'Malaysia' },
] as const;

const INTERVAL_MS = 5_000;

/* ─── Particles (positions generated once) ──────────────────── */
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 6,
  duration: 4 + Math.random() * 4,
}));

/* ─── Clouds ────────────────────────────────────────────────── */
const CLOUDS = [
  { width: 320, height: 90, top: '12%', delay: 0, duration: 40, opacity: 0.18 },
  { width: 260, height: 70, top: '28%', delay: 8, duration: 50, opacity: 0.14 },
  { width: 380, height: 100, top: '55%', delay: 16, duration: 45, opacity: 0.12 },
  { width: 200, height: 60, top: '72%', delay: 24, duration: 55, opacity: 0.1 },
];

/* ─── Smooth‑scroll helper ──────────────────────────────────── */
function scrollTo(selector: string) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  }
}

/* ─── Component ─────────────────────────────────────────────── */
export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLElement>(null);

  /* Auto‑advance carousel */
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  /* Mouse parallax handler */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    setMousePos({ x, y });
  }, []);

  const currentSlide = SLIDES[currentIndex];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-screen overflow-hidden select-none"
      aria-label="Hero section"
    >
      {/* ── Background Image Carousel ────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide.src}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{
            opacity: { duration: 1.4, ease: 'easeInOut' },
            scale: { duration: INTERVAL_MS / 1000, ease: 'linear' },
          }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={currentSlide.src}
            alt={currentSlide.label}
            fill
            priority={currentIndex === 0}
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Overlay 1 – Gradient ─────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(56,189,248,0.25) 70%, rgba(56,189,248,0.45) 100%)',
        }}
      />

      {/* ── Overlay 2 – Floating gradient blobs ──────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light opacity-30">
        {/* Sky blob */}
        <div
          className="absolute rounded-full blur-[120px] animate-[blobDrift1_18s_ease-in-out_infinite]"
          style={{
            width: 500,
            height: 500,
            top: '-5%',
            left: '10%',
            background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
          }}
        />
        {/* Lavender blob */}
        <div
          className="absolute rounded-full blur-[100px] animate-[blobDrift2_22s_ease-in-out_infinite]"
          style={{
            width: 450,
            height: 450,
            bottom: '5%',
            right: '5%',
            background: 'radial-gradient(circle, #c4b5fd 0%, transparent 70%)',
          }}
        />
        {/* Aqua blob */}
        <div
          className="absolute rounded-full blur-[110px] animate-[blobDrift3_20s_ease-in-out_infinite]"
          style={{
            width: 420,
            height: 420,
            top: '40%',
            left: '55%',
            background: 'radial-gradient(circle, #67e8f9 0%, transparent 70%)',
          }}
        />
      </div>

      {/* ── Overlay 3 – Cloud layer ──────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-[60px]"
            style={{
              width: c.width,
              height: c.height,
              top: c.top,
              left: '-15%',
              background: `radial-gradient(ellipse, rgba(255,255,255,${c.opacity}) 0%, transparent 70%)`,
              animation: `cloudDrift ${c.duration}s linear ${c.delay}s infinite`,
            }}
          />
        ))}
      </div>

      {/* ── Overlay 4 – Particle layer ───────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-[4]">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/60"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              animation: `particleFloat ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            }}
          />
        ))}
      </div>

      {/* ── Content ──────────────────────────────────────────── */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        {/* Country pill indicator */}
        <motion.div
          style={{
            x: mousePos.x * 0.4,
            y: mousePos.y * 0.4,
          }}
          className="mb-6 md:mb-8"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={currentSlide.label}
              initial={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium tracking-wide backdrop-blur-xl"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              Now Viewing: {currentSlide.label}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            x: mousePos.x * 0.6,
            y: mousePos.y * 0.6,
            fontFamily: "'Playfair Display', serif",
            textShadow: '0 4px 30px rgba(0,0,0,0.4)',
          }}
          className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Discover the Soul of Asia
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
          style={{
            x: mousePos.x * 0.3,
            y: mousePos.y * 0.3,
          }}
          className="mt-5 max-w-[600px] text-base font-light leading-relaxed text-white/90 sm:text-lg md:mt-6 md:text-xl"
        >
          Premium luxury travel experiences across Vietnam, India, Thailand,
          Singapore, Malaysia &amp; Bali
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
          style={{
            x: mousePos.x * 0.2,
            y: mousePos.y * 0.2,
          }}
          className="mt-8 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4 md:mt-10"
        >
          {/* Primary – Explore Destinations */}
          <button
            onClick={() => scrollTo('#destinations')}
            className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_32px_rgba(56,189,248,0.45)] active:scale-95 sm:w-auto sm:py-4"
          >
            <span className="relative z-10">Explore Destinations</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>

          {/* Secondary – Start Journey */}
          <button
            onClick={() => scrollTo('#map')}
            className="w-full cursor-pointer rounded-full border border-white/30 bg-white/15 px-8 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-105 hover:border-white/50 hover:bg-white/25 hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] active:scale-95 sm:w-auto sm:py-4"
          >
            Start Journey
          </button>

          {/* Tertiary – Plan Your Trip */}
          <button
            onClick={() => scrollTo('#trip-planner')}
            className="w-full cursor-pointer rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:scale-105 hover:border-white/40 hover:bg-white/20 hover:shadow-[0_8px_32px_rgba(255,255,255,0.1)] active:scale-95 sm:w-auto sm:py-4"
          >
            Plan Your Trip
          </button>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.button
        onClick={() => scrollTo('#destinations')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 text-white/70 transition-opacity hover:opacity-100"
        aria-label="Scroll to explore"
      >
        <span className="text-xs font-light tracking-widest uppercase">
          Scroll to explore
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5 animate-[scrollBounce_1.8s_ease-in-out_infinite]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
          />
        </svg>
      </motion.button>

      {/* ── Keyframe styles (injected once) ──────────────────── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes blobDrift1 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(60px, 40px) scale(1.08); }
              66% { transform: translate(-30px, 20px) scale(0.95); }
            }
            @keyframes blobDrift2 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(-50px, -30px) scale(1.05); }
              66% { transform: translate(40px, -20px) scale(0.92); }
            }
            @keyframes blobDrift3 {
              0%, 100% { transform: translate(0, 0) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-60px, 30px) scale(0.9); }
            }
            @keyframes cloudDrift {
              0% { transform: translateX(0); }
              100% { transform: translateX(130vw); }
            }
            @keyframes particleFloat {
              0% { transform: translateY(0) scale(1); opacity: 0.4; }
              100% { transform: translateY(-30px) scale(1.3); opacity: 0.9; }
            }
            @keyframes scrollBounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(10px); }
            }
          `,
        }}
      />
    </section>
  );
}
