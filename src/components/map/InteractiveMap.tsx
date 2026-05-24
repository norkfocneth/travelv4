'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Country Data ──────────────────────────────────────────── */
interface Country {
  id: string;
  name: string;
  emoji: string;
  cx: number;
  cy: number;
  sectionId: string;
}

const COUNTRIES: Country[] = [
  { id: 'india', name: 'India', emoji: '🇮🇳', cx: 200, cy: 280, sectionId: '#india' },
  { id: 'vietnam', name: 'Vietnam', emoji: '🇻🇳', cx: 480, cy: 300, sectionId: '#vietnam' },
  { id: 'thailand', name: 'Thailand', emoji: '🇹🇭', cx: 420, cy: 320, sectionId: '#thailand' },
  { id: 'malaysia', name: 'Malaysia', emoji: '🇲🇾', cx: 440, cy: 420, sectionId: '#malaysia' },
  { id: 'singapore', name: 'Singapore', emoji: '🇸🇬', cx: 450, cy: 450, sectionId: '#singapore' },
  { id: 'bali', name: 'Bali', emoji: '🇮🇩', cx: 520, cy: 470, sectionId: '#bali' },
];

/* ─── Route Data ────────────────────────────────────────────── */
interface Route {
  id: string;
  from: string;
  to: string;
  path: string;
  label: string;
}

const ROUTES: Route[] = [
  {
    id: 'my-sg',
    from: 'malaysia',
    to: 'singapore',
    path: 'M 440 420 L 450 450',
    label: 'KL → Singapore',
  },
  {
    id: 'sg-th',
    from: 'singapore',
    to: 'thailand',
    path: 'M 450 450 C 460 400 440 370 420 320',
    label: 'Singapore → Bangkok',
  },
  {
    id: 'th-vn',
    from: 'thailand',
    to: 'vietnam',
    path: 'M 420 320 C 440 300 460 295 480 300',
    label: 'Bangkok → Hanoi',
  },
  {
    id: 'vn-in',
    from: 'vietnam',
    to: 'india',
    path: 'M 480 300 C 420 250 320 230 200 280',
    label: 'Hanoi → Delhi',
  },
  {
    id: 'my-bali',
    from: 'malaysia',
    to: 'bali',
    path: 'M 440 420 C 470 440 500 460 520 470',
    label: 'KL → Denpasar',
  },
];

/* ─── Active Corridor Labels ────────────────────────────────── */
const CORRIDORS = [
  'KL – Singapore – Denpasar',
  'Singapore – Bangkok – Hanoi',
  'Bangkok – Hanoi – Delhi',
  'Delhi – Hanoi – Bangkok',
  'KL – Singapore – Bangkok',
];

/* ─── Simplified Asia Map Outline ───────────────────────────── */
const ASIA_OUTLINE =
  'M 80 80 C 120 60 200 50 280 60 C 360 70 420 55 500 65 C 560 72 620 90 660 120 ' +
  'C 700 150 720 200 710 250 C 700 300 680 340 650 370 C 620 400 580 420 560 460 ' +
  'C 540 500 530 520 550 540 C 530 550 500 530 480 510 C 460 490 440 500 420 490 ' +
  'C 400 480 390 460 370 450 C 340 440 310 450 290 440 C 260 430 240 410 220 390 ' +
  'C 200 370 180 360 160 340 C 140 320 130 300 120 270 C 110 240 100 210 90 180 ' +
  'C 80 150 75 120 80 80 Z';

/* ─── SVG Map Marker ────────────────────────────────────────── */
function MapMarker({
  country,
  isHovered,
  onHover,
  onLeave,
  onClick,
}: {
  country: Country;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <g
      className="cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${country.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onClick();
      }}
    >
      {/* Pulsing ring */}
      <circle cx={country.cx} cy={country.cy} r={8} fill="none" stroke="url(#markerGradient)" strokeWidth={2} opacity={0.4}>
        <animate attributeName="r" from="8" to="18" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Second pulsing ring (offset) */}
      <circle cx={country.cx} cy={country.cy} r={8} fill="none" stroke="url(#markerGradient)" strokeWidth={1.5} opacity={0.3}>
        <animate attributeName="r" from="8" to="22" dur="2s" begin="0.7s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.4" to="0" dur="2s" begin="0.7s" repeatCount="indefinite" />
      </circle>

      {/* Main circle */}
      <circle
        cx={country.cx}
        cy={country.cy}
        r={8}
        fill="url(#markerGradient)"
        filter="url(#glow)"
        style={{
          transition: 'r 0.3s ease',
        }}
      />

      {/* Center dot */}
      <circle cx={country.cx} cy={country.cy} r={3} fill="white" opacity={0.95} />

      {/* Hover scale overlay */}
      {isHovered && (
        <circle cx={country.cx} cy={country.cy} r={12} fill="url(#markerGradient)" opacity={0.15} />
      )}
    </g>
  );
}

/* ─── Tooltip Card ──────────────────────────────────────────── */
function Tooltip({ country }: { country: Country }) {
  const tooltipX = country.cx > 500 ? country.cx - 160 : country.cx + 20;
  const tooltipY = country.cy > 400 ? country.cy - 70 : country.cy - 50;

  return (
    <motion.foreignObject
      x={tooltipX}
      y={tooltipY}
      width={150}
      height={65}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ pointerEvents: 'none' }}
    >
      <div className="rounded-xl border border-white/20 bg-white/90 px-3 py-2.5 shadow-xl backdrop-blur-xl dark:border-sky/20 dark:bg-navy/90">
        <p className="text-sm font-semibold text-navy dark:text-white">
          {country.emoji} {country.name}
        </p>
        <p className="mt-0.5 text-[11px] text-sky-deep dark:text-sky-light">
          Click to explore →
        </p>
      </div>
    </motion.foreignObject>
  );
}

/* ─── Animated Route Path ───────────────────────────────────── */
function AnimatedRoute({ route, index }: { route: Route; index: number }) {
  return (
    <g>
      {/* Route path */}
      <path
        d={route.path}
        fill="none"
        stroke="url(#routeGradient)"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.5}
        strokeDasharray="6 4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="200"
          to="0"
          dur={`${3 + index * 0.5}s`}
          repeatCount="indefinite"
        />
      </path>

      {/* Airplane icon moving along path */}
      <g opacity={0.8}>
        <circle r={3} fill="url(#markerGradient)">
          <animateMotion dur={`${5 + index}s`} repeatCount="indefinite" begin={`${index * 0.8}s`}>
            <mpath href={`#route-${route.id}`} />
          </animateMotion>
        </circle>
        <text fontSize="10" textAnchor="middle" dy="-6" fill="white" className="dark:fill-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
          ✈
          <animateMotion dur={`${5 + index}s`} repeatCount="indefinite" begin={`${index * 0.8}s`}>
            <mpath href={`#route-${route.id}`} />
          </animateMotion>
        </text>
      </g>

      {/* Hidden path for animateMotion reference */}
      <path id={`route-${route.id}`} d={route.path} fill="none" stroke="none" />
    </g>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INTERACTIVE MAP – Main Component
   ═══════════════════════════════════════════════════════════════ */
export default function InteractiveMap() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [corridorIndex, setCorridorIndex] = useState(0);

  /* Auto‑cycle corridors */
  useEffect(() => {
    const timer = setInterval(() => {
      setCorridorIndex((prev) => (prev + 1) % CORRIDORS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  /* Smooth‑scroll handler */
  const handleCountryClick = useCallback((sectionId: string) => {
    const el = document.querySelector(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const hoveredData = COUNTRIES.find((c) => c.id === hoveredCountry) || null;

  return (
    <section
      id="map"
      className="relative w-full min-h-screen bg-gradient-to-b from-cream to-sky-light py-20 md:py-32 dark:from-navy dark:to-midnight"
    >
      {/* ── Decorative Background Mesh ────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 gradient-mesh opacity-50" />

      {/* ── Section Header ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mb-12 max-w-2xl px-4 text-center md:mb-16"
      >
        <span className="text-overline mb-3 inline-block">Interactive Map</span>
        <h2
          className="text-gradient"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Journey Awaits
        </h2>
        <p className="mt-4 text-base text-gray-600 md:text-lg dark:text-gray-400">
          Explore our curated travel routes across Asia
        </p>
      </motion.div>

      {/* ── Map Container ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className="relative mx-auto max-w-[1000px] px-4"
      >
        <div className="glass-card relative overflow-hidden p-4 md:p-8">
          {/* ── Active Corridor Badge ─────────────────────────── */}
          <div className="absolute top-4 right-4 z-20 md:top-6 md:right-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={corridorIndex}
                initial={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="glass-sm flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
                <span className="text-xs font-medium whitespace-nowrap text-navy md:text-sm dark:text-white">
                  {CORRIDORS[corridorIndex]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── SVG Map ───────────────────────────────────────── */}
          <svg
            viewBox="0 0 800 600"
            className="h-auto w-full"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Interactive map of Asia travel routes"
          >
            <defs>
              {/* Marker gradient */}
              <linearGradient id="markerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="100%" stopColor="#7FDBDA" />
              </linearGradient>

              {/* Route gradient */}
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#87CEEB" />
                <stop offset="100%" stopColor="#C8A8E9" />
              </linearGradient>

              {/* Glow filter */}
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Soft shadow for continent */}
              <filter id="continentShadow" x="-5%" y="-5%" width="110%" height="110%">
                <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="rgba(135,206,235,0.15)" />
              </filter>

              {/* Ocean pattern */}
              <pattern id="oceanPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="0.5" fill="rgba(135,206,235,0.15)" />
              </pattern>
            </defs>

            {/* Ocean background */}
            <rect width="800" height="600" fill="url(#oceanPattern)" rx="16" />

            {/* Decorative grid lines */}
            {[150, 300, 450, 600].map((x) => (
              <line key={`vl-${x}`} x1={x} y1={0} x2={x} y2={600} stroke="rgba(135,206,235,0.08)" strokeWidth={0.5} strokeDasharray="4 8" />
            ))}
            {[150, 300, 450].map((y) => (
              <line key={`hl-${y}`} x1={0} y1={y} x2={800} y2={y} stroke="rgba(135,206,235,0.08)" strokeWidth={0.5} strokeDasharray="4 8" />
            ))}

            {/* Asia continent outline */}
            <path
              d={ASIA_OUTLINE}
              fill="rgba(135,206,235,0.06)"
              stroke="rgba(135,206,235,0.2)"
              strokeWidth={1.5}
              strokeLinejoin="round"
              filter="url(#continentShadow)"
            />

            {/* Inner landmass glow */}
            <path
              d={ASIA_OUTLINE}
              fill="none"
              stroke="rgba(127,219,218,0.1)"
              strokeWidth={4}
              strokeLinejoin="round"
            />

            {/* ── Animated Routes ─────────────────────────────── */}
            {ROUTES.map((route, i) => (
              <AnimatedRoute key={route.id} route={route} index={i} />
            ))}

            {/* ── Country Markers ─────────────────────────────── */}
            {COUNTRIES.map((country) => (
              <MapMarker
                key={country.id}
                country={country}
                isHovered={hoveredCountry === country.id}
                onHover={() => setHoveredCountry(country.id)}
                onLeave={() => setHoveredCountry(null)}
                onClick={() => handleCountryClick(country.sectionId)}
              />
            ))}

            {/* ── Country Labels ───────────────────────────────── */}
            {COUNTRIES.map((country) => (
              <text
                key={`label-${country.id}`}
                x={country.cx}
                y={country.cy + 22}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fontFamily="'Inter', system-ui, sans-serif"
                fill="currentColor"
                className="fill-navy/70 dark:fill-white/60"
                style={{ pointerEvents: 'none' }}
              >
                {country.name}
              </text>
            ))}

            {/* ── Tooltip ─────────────────────────────────────── */}
            <AnimatePresence>
              {hoveredData && <Tooltip country={hoveredData} />}
            </AnimatePresence>
          </svg>

          {/* ── Legend ─────────────────────────────────────────── */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 md:mt-6 md:gap-6">
            <div className="flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-br from-sky to-aqua" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-0.5 w-6 rounded-full bg-gradient-to-r from-sky to-lavender-deep" />
              <span className="text-xs text-gray-500 dark:text-gray-400">Travel Routes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs">✈</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Active Flights</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Injected keyframes ─────────────────────────────────── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes dashDraw {
              to { stroke-dashoffset: 0; }
            }
          `,
        }}
      />
    </section>
  );
}
