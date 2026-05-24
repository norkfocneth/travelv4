'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   PACKAGE DATA
   ═══════════════════════════════════════════════════════════════ */

interface TravelPackage {
  name: string
  subtitle: string
  price: string
  destinations: string
  emoji: string
  gradient: string
  highlights: string[]
  duration: string
}

const packages: TravelPackage[] = [
  {
    name: 'Honeymoon Bliss',
    subtitle: '14 Days of Romance',
    price: 'From $3,499',
    destinations: 'Bali + Thailand',
    emoji: '💕',
    gradient: 'from-pink-500/80 to-rose-400/80',
    highlights: [
      'Private villa with infinity pool',
      'Couples spa & sunset cruise',
      'Candlelit beachfront dinners',
    ],
    duration: '14 Days',
  },
  {
    name: 'Student Explorer',
    subtitle: '10 Days Budget Adventure',
    price: 'From $899',
    destinations: 'Vietnam + Thailand',
    emoji: '🎒',
    gradient: 'from-emerald-500/80 to-teal-400/80',
    highlights: [
      'Hostel & homestay experiences',
      'Street food crawl tours',
      'Adventure activities included',
    ],
    duration: '10 Days',
  },
  {
    name: 'Beach Escapes',
    subtitle: '7 Days of Paradise',
    price: 'From $1,899',
    destinations: 'Malaysia + Bali',
    emoji: '🏖️',
    gradient: 'from-cyan-500/80 to-sky-400/80',
    highlights: [
      'Beachfront luxury resort stays',
      'Snorkeling & island hopping',
      'Private beach club access',
    ],
    duration: '7 Days',
  },
  {
    name: 'Spiritual Journey',
    subtitle: '12 Days of Inner Peace',
    price: 'From $2,199',
    destinations: 'India + Bali',
    emoji: '🙏',
    gradient: 'from-amber-500/80 to-orange-400/80',
    highlights: [
      'Temple meditation retreats',
      'Yoga & wellness programs',
      'Sacred site pilgrimages',
    ],
    duration: '12 Days',
  },
  {
    name: 'City Luxe',
    subtitle: '8 Days Urban Elite',
    price: 'From $4,299',
    destinations: 'Singapore + Malaysia',
    emoji: '🏙️',
    gradient: 'from-violet-500/80 to-purple-400/80',
    highlights: [
      'Five-star hotel collection',
      'Michelin dining experiences',
      'VIP lounge & rooftop access',
    ],
    duration: '8 Days',
  },
  {
    name: 'Grand Asia Tour',
    subtitle: '21 Days Complete Experience',
    price: 'From $6,999',
    destinations: 'All Countries',
    emoji: '🌏',
    gradient: 'from-gold/80 to-gold-light/80',
    highlights: [
      'All six destinations included',
      'Personal travel concierge',
      'First-class transfers & upgrades',
    ],
    duration: '21 Days',
  },
]

/* ═══════════════════════════════════════════════════════════════
   PACKAGE CARD
   ═══════════════════════════════════════════════════════════════ */

function PackageCard({
  pkg,
  index,
}: {
  pkg: TravelPackage
  index: number
}) {
  return (
    <motion.div
      className="relative flex-shrink-0 w-[320px] md:w-[340px] glass-card overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 40px rgba(135,206,235,0.15)',
      }}
    >
      {/* Gradient strip top */}
      <div className={`h-2 w-full bg-gradient-to-r ${pkg.gradient}`} />

      <div className="p-6 flex flex-col gap-4">
        {/* Emoji & Destinations */}
        <div className="flex items-center justify-between">
          <span className="text-3xl">{pkg.emoji}</span>
          <span className="glass-sm px-3 py-1 text-xs font-medium text-sky-deep dark:text-sky-light">
            {pkg.destinations}
          </span>
        </div>

        {/* Name & Subtitle */}
        <div>
          <h3 className="text-xl font-bold mb-1">{pkg.name}</h3>
          <p className="text-sm text-[var(--text-muted)]">{pkg.subtitle}</p>
        </div>

        {/* Duration & Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
              Duration
            </p>
            <p className="text-sm font-semibold">{pkg.duration}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
              Starting
            </p>
            <p className="text-lg font-bold text-gradient">{pkg.price}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" />

        {/* Highlights */}
        <div className="space-y-2.5">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Highlights
          </p>
          {pkg.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2.5">
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0 text-sky"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-sm text-[var(--text-secondary)]">{h}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          className="mt-2 w-full py-3 rounded-xl text-sm font-semibold tracking-wide
            bg-gradient-to-r from-sky/15 to-lavender/15
            hover:from-sky/30 hover:to-lavender/30
            border border-sky/25 hover:border-sky/50
            transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          View Details →
        </motion.button>
      </div>

      {/* Hover glow overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 pointer-events-none`}
      />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════ */

export default function LuxuryPackages() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="packages"
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient bg */}
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-overline block mb-4">Exclusive Packages</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Curated{' '}
            <span className="text-gradient">Travel Packages</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Handcrafted journeys for every kind of explorer — from budget
            backpacking to ultra-luxury grand tours across Asia.
          </p>
        </motion.div>
      </div>

      {/* Scrolling Card Strip */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[var(--background)] to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[var(--background)] to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 overflow-x-auto no-scrollbar px-8 md:px-16 pb-4">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.name} pkg={pkg} index={index} />
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <motion.p
        className="text-center text-xs text-[var(--text-muted)] mt-6 md:hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      >
        ← Swipe to explore →
      </motion.p>
    </section>
  )
}
