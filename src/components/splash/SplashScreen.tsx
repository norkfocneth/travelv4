'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────
interface SplashScreenProps {
  onComplete: () => void;
}

// ─── Helpers ─────────────────────────────────────────────────────────
const rand = (min: number, max: number) =>
  Math.random() * (max - min) + min;

// ─── CSS Keyframes (injected once) ──────────────────────────────────
const keyframes = `
@keyframes gradientFlow {
  0%   { background-position: 0% 0%; }
  25%  { background-position: 50% 100%; }
  50%  { background-position: 100% 50%; }
  75%  { background-position: 50% 0%; }
  100% { background-position: 0% 0%; }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) translateX(0px);
    opacity: var(--particle-opacity, 0.5);
  }
  25% {
    transform: translateY(-30px) translateX(15px);
    opacity: calc(var(--particle-opacity, 0.5) + 0.15);
  }
  50% {
    transform: translateY(-15px) translateX(-10px);
    opacity: var(--particle-opacity, 0.5);
  }
  75% {
    transform: translateY(-40px) translateX(8px);
    opacity: calc(var(--particle-opacity, 0.5) - 0.1);
  }
}

@keyframes cloudDrift {
  0%   { transform: translateX(0px); }
  50%  { transform: translateX(60px); }
  100% { transform: translateX(0px); }
}

@keyframes lightRayRotate {
  0%   { transform: rotate(var(--ray-start, -15deg)); opacity: 0.03; }
  50%  { transform: rotate(var(--ray-end, 5deg)); opacity: 0.06; }
  100% { transform: rotate(var(--ray-start, -15deg)); opacity: 0.03; }
}

@keyframes shimmer {
  0%   { opacity: 0.4; }
  50%  { opacity: 1;   }
  100% { opacity: 0.4; }
}

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700;800;900&display=swap');
`;

// ─── Particle Data ──────────────────────────────────────────────────
function generateParticles(count: number) {
  return Array.from({ length: count }, (_, i) => {
    const size = rand(2, 6);
    const isGold = Math.random() > 0.6;
    return {
      id: i,
      size,
      left: `${rand(2, 98)}%`,
      top: `${rand(2, 98)}%`,
      opacity: rand(0.3, 0.7),
      duration: rand(6, 15),
      delay: rand(0, 5),
      color: isGold
        ? `rgba(197, 165, 90, ${rand(0.4, 0.8)})`
        : `rgba(255, 255, 255, ${rand(0.5, 0.9)})`,
    };
  });
}

// ─── Cloud Data ─────────────────────────────────────────────────────
const clouds = [
  { width: 350, height: 100, top: '10%', left: '-5%', opacity: 0.12, dur: 25 },
  { width: 450, height: 130, top: '22%', left: '30%', opacity: 0.08, dur: 30 },
  { width: 300, height: 90, top: '55%', left: '60%', opacity: 0.15, dur: 22 },
  { width: 500, height: 140, top: '70%', left: '10%', opacity: 0.1, dur: 28 },
  { width: 280, height: 80, top: '40%', left: '75%', opacity: 0.1, dur: 35 },
];

// ─── Light Ray Data ─────────────────────────────────────────────────
const lightRays = [
  { startDeg: -20, endDeg: 5, left: '15%', width: '35%', opacity: 0.05, dur: 12 },
  { startDeg: -10, endDeg: 10, left: '55%', width: '30%', opacity: 0.04, dur: 15 },
  { startDeg: -5, endDeg: 15, left: '35%', width: '25%', opacity: 0.035, dur: 18 },
];

// ─── Component ──────────────────────────────────────────────────────
export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const asianSeasonRef = useRef<HTMLDivElement>(null);
  const travelRef = useRef<HTMLDivElement>(null);
  const fullTextRef = useRef<HTMLDivElement>(null);
  const representativeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() => generateParticles(35), []);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    onComplete();
  }, [onComplete]);

  // ── GSAP Master Timeline ──────────────────────────────────────────
  useGSAP(
    () => {
      if (!containerRef.current) return;

      const tl = gsap.timeline({
        onComplete: handleComplete,
        defaults: { ease: 'power3.out' },
      });

      // ── Phase 0: Logo scales in ─────────────────────────────────
      tl.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.4)' },
        0
      );

      // ── Phase 1 (0s – 1.5s): "ASIAN SEASON" letter-by-letter ───
      const asianLetters = asianSeasonRef.current?.querySelectorAll('.splash-letter');
      if (asianLetters?.length) {
        tl.set(asianSeasonRef.current, { visibility: 'visible' }, 0);
        tl.fromTo(
          asianLetters,
          { opacity: 0, filter: 'blur(10px)', y: 10 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power2.out',
          },
          0.3
        );
      }

      // ── Phase 2 (1.5s – 3s): "TRAVEL" scale + glow ─────────────
      tl.set(travelRef.current, { visibility: 'visible' }, 1.5);
      tl.fromTo(
        travelRef.current,
        { scale: 0.5, opacity: 0, filter: 'blur(6px)' },
        {
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: 'expo.out',
        },
        1.5
      );
      // Gold glow pulse
      tl.to(
        travelRef.current,
        {
          textShadow:
            '0 0 30px rgba(197,165,90,0.6), 0 0 60px rgba(197,165,90,0.3), 0 0 90px rgba(197,165,90,0.15)',
          duration: 0.8,
          yoyo: true,
          repeat: 1,
          ease: 'sine.inOut',
        },
        2.0
      );

      // ── Phase 3 (3s – 4.5s): Morph to full text ────────────────
      tl.to(
        [asianSeasonRef.current, travelRef.current],
        {
          opacity: 0,
          scale: 0.85,
          filter: 'blur(4px)',
          duration: 0.6,
          ease: 'power2.in',
        },
        3.0
      );
      tl.set(fullTextRef.current, { visibility: 'visible' }, 3.5);
      tl.fromTo(
        fullTextRef.current,
        { opacity: 0, scale: 0.9, filter: 'blur(6px)' },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'expo.out',
        },
        3.5
      );

      // Logo shrinks a bit during morph
      tl.to(
        logoRef.current,
        {
          scale: 0.8,
          y: -10,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        3.2
      );

      // ── Phase 4 (4.5s – 5s): "Representative" subtitle ─────────
      tl.set(representativeRef.current, { visibility: 'visible' }, 4.5);
      tl.fromTo(
        representativeRef.current,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          ease: 'power2.out',
        },
        4.5
      );

      // ── Phase 5 (5s – 5.5s): Hold, zoom, fade out ──────────────
      tl.to(
        contentRef.current,
        {
          scale: 1.05,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 0.5,
          ease: 'power2.in',
        },
        5.0
      );
    },
    { scope: containerRef }
  );

  // ── Render ────────────────────────────────────────────────────────
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.02 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 overflow-hidden"
          style={{
            zIndex: 9999,
            fontFamily: "'Playfair Display', 'Georgia', serif",
          }}
        >
          {/* ── Injected Keyframes ────────────────────────────────── */}
          <style dangerouslySetInnerHTML={{ __html: keyframes }} />

          {/* ── Background Gradient Layer ─────────────────────────── */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 20% 20%, rgba(135,206,235,0.6) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 30%, rgba(184,228,248,0.5) 0%, transparent 55%),
                radial-gradient(ellipse at 50% 80%, rgba(127,219,218,0.4) 0%, transparent 60%),
                radial-gradient(ellipse at 30% 60%, rgba(230,230,250,0.3) 0%, transparent 50%),
                linear-gradient(
                  180deg,
                  #87CEEB 0%,
                  #B8E4F8 25%,
                  #E6E6FA 55%,
                  #7FDBDA 100%
                )
              `,
              backgroundSize: '200% 200%',
              animation: 'gradientFlow 8s ease-in-out infinite',
            }}
          />

          {/* ── Particle Layer ────────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <div
                key={p.id}
                style={{
                  position: 'absolute',
                  left: p.left,
                  top: p.top,
                  width: p.size,
                  height: p.size,
                  borderRadius: '50%',
                  background: p.color,
                  filter: 'blur(1px)',
                  opacity: p.opacity,
                  ['--particle-opacity' as string]: p.opacity,
                  animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>

          {/* ── Cloud Layer ───────────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none">
            {clouds.map((c, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: c.top,
                  left: c.left,
                  width: c.width,
                  height: c.height,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)',
                  opacity: c.opacity,
                  filter: 'blur(40px)',
                  animation: `cloudDrift ${c.dur}s ease-in-out infinite`,
                  willChange: 'transform',
                }}
              />
            ))}
          </div>

          {/* ── Light Ray Layer ───────────────────────────────────── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {lightRays.map((r, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '-20%',
                  left: r.left,
                  width: r.width,
                  height: '140%',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 50%, rgba(255,255,255,0.04) 100%)',
                  opacity: r.opacity,
                  transformOrigin: 'top center',
                  ['--ray-start' as string]: `${r.startDeg}deg`,
                  ['--ray-end' as string]: `${r.endDeg}deg`,
                  animation: `lightRayRotate ${r.dur}s ease-in-out infinite`,
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>

          {/* ── Content Layer ─────────────────────────────────────── */}
          <div
            ref={contentRef}
            className="absolute inset-0 flex flex-col items-center justify-center"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {/* Logo */}
            <div
              ref={logoRef}
              className="mb-6 sm:mb-8"
              style={{
                opacity: 0,
                willChange: 'transform, opacity',
              }}
            >
              <div
                className="relative overflow-hidden rounded-full shadow-2xl"
                style={{
                  width: 'clamp(80px, 15vw, 140px)',
                  height: 'clamp(80px, 15vw, 140px)',
                  boxShadow:
                    '0 8px 32px rgba(26,31,78,0.2), 0 0 60px rgba(197,165,90,0.15)',
                }}
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Asian Season Travel"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* ── "ASIAN SEASON" ────────────────────────────────── */}
            <div
              ref={asianSeasonRef}
              className="text-center select-none"
              style={{
                visibility: 'hidden',
                letterSpacing: '0.4em',
                fontSize: 'clamp(1.4rem, 4.5vw, 3.2rem)',
                fontWeight: 300,
                color: '#1a1f4e',
                willChange: 'transform, opacity, filter',
              }}
              aria-hidden="true"
            >
              {'ASIAN SEASON'.split('').map((char, i) => (
                <span
                  key={i}
                  className="splash-letter inline-block"
                  style={{
                    opacity: 0,
                    willChange: 'transform, opacity, filter',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </div>

            {/* ── "TRAVEL" ─────────────────────────────────────── */}
            <div
              ref={travelRef}
              className="text-center select-none mt-2 sm:mt-4"
              style={{
                visibility: 'hidden',
                fontSize: 'clamp(2rem, 7vw, 5.5rem)',
                fontWeight: 700,
                color: '#1a1f4e',
                textShadow:
                  '0 0 20px rgba(197,165,90,0.4), 0 0 40px rgba(197,165,90,0.2)',
                letterSpacing: '0.15em',
                willChange: 'transform, opacity, filter, text-shadow',
              }}
            >
              TRAVEL
            </div>

            {/* ── Full Merged Text ──────────────────────────────── */}
            <div
              ref={fullTextRef}
              className="text-center select-none absolute"
              style={{
                visibility: 'hidden',
                willChange: 'transform, opacity, filter',
              }}
            >
              <div
                style={{
                  fontSize: 'clamp(1rem, 3vw, 2rem)',
                  fontWeight: 300,
                  color: '#1a1f4e',
                  letterSpacing: '0.35em',
                  lineHeight: 1.3,
                }}
              >
                ASIAN SEASON
              </div>
              <div
                style={{
                  fontSize: 'clamp(1.8rem, 5.5vw, 4rem)',
                  fontWeight: 700,
                  color: '#1a1f4e',
                  letterSpacing: '0.12em',
                  textShadow:
                    '0 0 20px rgba(197,165,90,0.35), 0 0 40px rgba(197,165,90,0.15)',
                  marginTop: '0.1em',
                }}
              >
                TRAVEL
              </div>
              <div
                style={{
                  fontSize: 'clamp(0.65rem, 1.6vw, 1rem)',
                  fontWeight: 400,
                  color: '#1a1f4e',
                  letterSpacing: '0.5em',
                  marginTop: '0.3em',
                  opacity: 0.7,
                }}
              >
                REPRESENTATIVE
              </div>
            </div>

            {/* ── "Representative" Subtitle ────────────────────── */}
            <div
              ref={representativeRef}
              className="mt-4 sm:mt-6 text-center select-none"
              style={{
                visibility: 'hidden',
                fontSize: 'clamp(0.7rem, 1.8vw, 1.1rem)',
                fontWeight: 400,
                color: '#1a1f4e',
                letterSpacing: '0.3em',
                opacity: 0,
                willChange: 'transform, opacity, filter',
              }}
            >
              REPRESENTATIVE
            </div>
          </div>

          {/* ── Vignette Overlay ──────────────────────────────────── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 50%, rgba(26,31,78,0.08) 100%)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
