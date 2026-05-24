'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

/* ─── Monument Data ─────────────────────────────────────────── */
interface Monument {
  name: string;
  country: string;
  emoji: string;
  image: string;
  description: string;
}

const MONUMENTS: Monument[] = [
  {
    name: 'Petronas Twin Towers',
    country: 'Malaysia',
    emoji: '🇲🇾',
    image: '/images/monuments/petronas-towers.png',
    description: 'Rising 452m above Kuala Lumpur, an icon of modern architecture',
  },
  {
    name: 'Taj Mahal',
    country: 'India',
    emoji: '🇮🇳',
    image: '/images/monuments/taj-mahal.png',
    description: 'A timeless symbol of love, crafted in pristine white marble',
  },
  {
    name: 'Marina Bay Sands',
    country: 'Singapore',
    emoji: '🇸🇬',
    image: '/images/monuments/marina-bay-sands.png',
    description: 'Where luxury meets the sky with infinity pools above the clouds',
  },
  {
    name: 'Wat Arun',
    country: 'Thailand',
    emoji: '🇹🇭',
    image: '/images/monuments/wat-arun.png',
    description: 'The Temple of Dawn, adorned with colorful porcelain',
  },
  {
    name: 'Golden Bridge',
    country: 'Vietnam',
    emoji: '🇻🇳',
    image: '/images/monuments/golden-bridge.png',
    description: 'Held by giant stone hands, a bridge to the heavens',
  },
  {
    name: 'Gates of Heaven',
    country: 'Bali',
    emoji: '🇮🇩',
    image: '/images/monuments/gates-of-heaven.png',
    description: 'A sacred gateway framing the majestic Mount Agung',
  },
];

/* ─── Cloud Decorations ─────────────────────────────────────── */
const CLOUDS = [
  { width: 400, height: 120, top: '8%', left: '-5%', opacity: 0.12, duration: 60, delay: 0 },
  { width: 300, height: 90, top: '35%', left: '70%', opacity: 0.1, duration: 75, delay: 10 },
  { width: 500, height: 140, top: '62%', left: '20%', opacity: 0.08, duration: 55, delay: 5 },
  { width: 250, height: 80, top: '85%', left: '60%', opacity: 0.1, duration: 65, delay: 20 },
];

/* ─── 3D Tilt Card ──────────────────────────────────────────── */
function MonumentCard({ monument, index }: { monument: Monument; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({ rotateX, rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  /* Staggered float animation offsets */
  const floatDelay = index * 0.7;
  const floatDuration = 4 + (index % 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.15,
      }}
      style={{
        animation: `monumentFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-xl backdrop-blur-sm transition-shadow duration-500 dark:border-sky/10 dark:bg-navy/80"
        style={{
          transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          transition: 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
          boxShadow: isHovered
            ? '0 25px 60px rgba(135,206,235,0.25), 0 8px 24px rgba(0,0,0,0.1)'
            : '0 8px 30px rgba(0,0,0,0.08)',
          willChange: 'transform',
        }}
      >
        {/* ── Image Area ────────────────────────────────────── */}
        <div className="relative h-[200px] overflow-hidden md:h-[280px]">
          <Image
            src={monument.image}
            alt={monument.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Gradient overlay for text readability */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Shimmer overlay on hover */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.15) 55%, transparent 70%)',
              backgroundSize: '200% 100%',
              animation: isHovered ? 'cardShimmer 1.5s ease-out' : 'none',
            }}
          />
        </div>

        {/* ── Content Area ──────────────────────────────────── */}
        <div className="relative p-5 md:p-6">
          {/* Country badge */}
          <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-sky/10 px-3 py-1 text-xs font-medium text-sky-deep dark:bg-sky/15 dark:text-sky-light">
            {monument.emoji} {monument.country}
          </span>

          {/* Monument name */}
          <h3
            className="mt-2 text-lg font-bold text-navy md:text-xl dark:text-white"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {monument.name}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            {monument.description}
          </p>

          {/* Explore link */}
          <div className="mt-4 flex items-center gap-1">
            <span className="text-sm font-semibold text-sky-deep transition-colors duration-300 group-hover:text-sky dark:text-sky-light dark:group-hover:text-sky">
              Explore
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4 text-sky-deep transition-all duration-300 group-hover:translate-x-1 group-hover:text-sky dark:text-sky-light"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>

        {/* ── Inner glow border on hover ────────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: 'inset 0 0 30px rgba(135,206,235,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MONUMENT EXPERIENCE – Main Component
   ═══════════════════════════════════════════════════════════════ */
export default function MonumentExperience() {
  return (
    <section
      id="monuments"
      className="relative w-full min-h-screen overflow-hidden py-20 md:py-32"
      style={{
        background:
          'linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 30%, #f8faff 60%, #e0f2fe 100%)',
      }}
    >
      {/* ── Dark mode background override ─────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block"
        style={{
          background:
            'linear-gradient(180deg, #0a0e27 0%, #111638 30%, #1a1f4e 60%, #0a0e27 100%)',
        }}
      />

      {/* ── Cloud Decorations ─────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {CLOUDS.map((cloud, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: cloud.width,
              height: cloud.height,
              top: cloud.top,
              left: cloud.left,
              background: `radial-gradient(ellipse, rgba(255,255,255,${cloud.opacity}) 0%, transparent 70%)`,
              filter: 'blur(40px)',
              animation: `cloudFloat ${cloud.duration}s ease-in-out ${cloud.delay}s infinite alternate`,
            }}
          />
        ))}

        {/* Extra decorative light orbs */}
        <div
          className="absolute h-[300px] w-[300px] rounded-full opacity-20 dark:opacity-10"
          style={{
            top: '15%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(135,206,235,0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            animation: 'orbPulse 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute h-[250px] w-[250px] rounded-full opacity-15 dark:opacity-8"
          style={{
            bottom: '20%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(200,168,233,0.25) 0%, transparent 70%)',
            filter: 'blur(50px)',
            animation: 'orbPulse 10s ease-in-out 3s infinite',
          }}
        />
      </div>

      {/* ── Content Container (above clouds) ──────────────────── */}
      <div className="relative z-10">
        {/* ── Section Header ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl px-4 text-center md:mb-16"
        >
          <span className="text-overline mb-3 inline-block">Explore</span>
          <h2
            className="text-gradient"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Iconic Landmarks
          </h2>
          <p className="mt-4 text-base text-gray-600 md:text-lg dark:text-gray-400">
            Discover Asia&apos;s most magnificent monuments
          </p>
        </motion.div>

        {/* ── Monument Grid ───────────────────────────────────── */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:px-8">
          {MONUMENTS.map((monument, index) => (
            <MonumentCard key={monument.name} monument={monument} index={index} />
          ))}
        </div>
      </div>

      {/* ── Injected Keyframes ─────────────────────────────────── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes monumentFloat {
              0%, 100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-8px);
              }
            }

            @keyframes cloudFloat {
              0% {
                transform: translateX(0) translateY(0) scale(1);
              }
              100% {
                transform: translateX(40px) translateY(-15px) scale(1.05);
              }
            }

            @keyframes orbPulse {
              0%, 100% {
                transform: scale(1);
                opacity: 0.2;
              }
              50% {
                transform: scale(1.15);
                opacity: 0.35;
              }
            }

            @keyframes cardShimmer {
              0% {
                background-position: -200% center;
              }
              100% {
                background-position: 200% center;
              }
            }
          `,
        }}
      />
    </section>
  );
}
