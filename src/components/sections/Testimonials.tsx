'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIAL DATA
   ═══════════════════════════════════════════════════════════════ */

interface Testimonial {
  name: string
  quote: string
  stars: number
  type: string
  destination: string
  initials: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah & James',
    quote:
      'Our Bali honeymoon was a dream come true. Every detail was perfect — from the private villa overlooking the ocean to the surprise sunset dinner on the beach.',
    stars: 5,
    type: 'Honeymoon',
    destination: 'Bali',
    initials: 'SJ',
    color: 'from-pink-400 to-rose-500',
  },
  {
    name: 'Priya Sharma',
    quote:
      'The spiritual journey through India transformed my perspective on life. Meditating at sunrise in Varanasi was an experience I will carry forever.',
    stars: 5,
    type: 'Spiritual',
    destination: 'India',
    initials: 'PS',
    color: 'from-amber-400 to-orange-500',
  },
  {
    name: 'David Chen',
    quote:
      'Singapore and Malaysia in one trip — the best decision we ever made. The seamless planning and VIP treatment made us feel like royalty.',
    stars: 5,
    type: 'City Luxe',
    destination: 'Singapore',
    initials: 'DC',
    color: 'from-violet-400 to-purple-500',
  },
  {
    name: 'Emily Watson',
    quote:
      'As a student traveler, I got premium experiences at amazing prices. The street food tour in Hanoi alone was worth the entire trip.',
    stars: 5,
    type: 'Student',
    destination: 'Vietnam',
    initials: 'EW',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    name: 'The Rodriguez Family',
    quote:
      'Our family trip to Thailand was magical. The kids still talk about riding elephants and snorkeling in crystal-clear waters!',
    stars: 5,
    type: 'Family',
    destination: 'Thailand',
    initials: 'RF',
    color: 'from-cyan-400 to-sky-500',
  },
]

/* ═══════════════════════════════════════════════════════════════
   STAR COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, i) => (
        <svg
          key={i}
          className="w-4 h-4 text-gold"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIAL CARD
   ═══════════════════════════════════════════════════════════════ */

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col gap-5 h-full">
      {/* Avatar & Stars */}
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}
        >
          {t.initials}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{t.name}</p>
          <Stars count={t.stars} />
        </div>
      </div>

      {/* Quote */}
      <div className="flex-1">
        <svg
          className="w-8 h-8 text-sky/30 mb-2"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </svg>
        <p className="italic text-[var(--text-secondary)] leading-relaxed text-sm md:text-base">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2 mt-auto">
        <span className="glass-sm px-3 py-1 text-xs font-medium text-sky-deep dark:text-sky-light">
          {t.type}
        </span>
        <span className="glass-sm px-3 py-1 text-xs font-medium text-gold">
          {t.destination}
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CAROUSEL
   ═══════════════════════════════════════════════════════════════ */

export default function Testimonials() {
  const [current, setCurrent] = useState(0)

  // Desktop shows 3, mobile shows 1
  const getVisibleCount = useCallback(() => {
    if (typeof window === 'undefined') return 1
    if (window.innerWidth >= 1024) return 3
    return 1
  }, [])

  const [visibleCount, setVisibleCount] = useState(1)

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount())
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [getVisibleCount])

  const maxIndex = testimonials.length - visibleCount

  // Auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [maxIndex])

  const goTo = (idx: number) => setCurrent(Math.min(idx, maxIndex))

  return (
    <section
      id="testimonials"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient bg */}
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-overline block mb-4">Testimonials</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            What Our{' '}
            <span className="text-gradient">Travelers Say</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Stories from unforgettable journeys — every review a testament to
            experiences that transcend the ordinary.
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
              }}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {testimonials
                .slice(current, current + visibleCount)
                .map((t) => (
                  <TestimonialCard key={t.name} t={t} />
                ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2.5 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                idx === current
                  ? 'w-8 h-2.5 bg-gradient-to-r from-sky to-lavender-deep'
                  : 'w-2.5 h-2.5 bg-[var(--border)] hover:bg-sky/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
