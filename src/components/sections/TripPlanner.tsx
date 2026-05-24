'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const countryOptions = [
  { name: 'Vietnam', image: '/images/heroes/vietnam.png' },
  { name: 'India', image: '/images/heroes/india.png' },
  { name: 'Thailand', image: '/images/heroes/thailand.png' },
  { name: 'Singapore', image: '/images/heroes/singapore.png' },
  { name: 'Malaysia', image: '/images/heroes/malaysia.png' },
  { name: 'Bali', image: '/images/heroes/bali.png' },
]

const styleOptions = [
  { name: 'Luxury', icon: '✨', desc: 'Five-star everything' },
  { name: 'Adventure', icon: '🏔️', desc: 'Thrills & discoveries' },
  { name: 'Cultural', icon: '🏛️', desc: 'Heritage & history' },
  { name: 'Relaxation', icon: '🧘', desc: 'Unwind & recharge' },
  { name: 'Romantic', icon: '💕', desc: 'Love & intimacy' },
  { name: 'Spiritual', icon: '🙏', desc: 'Inner peace & growth' },
]

const durationOptions = [
  { label: '5 Days', value: 5 },
  { label: '7 Days', value: 7 },
  { label: '10 Days', value: 10 },
  { label: '14 Days', value: 14 },
  { label: '21 Days', value: 21 },
]

const budgetOptions = [
  {
    label: 'Budget',
    range: '$500 — $1,000',
    icon: '🎒',
    desc: 'Smart & savvy travel',
  },
  {
    label: 'Comfort',
    range: '$1,000 — $3,000',
    icon: '🏨',
    desc: 'Quality & convenience',
  },
  {
    label: 'Premium',
    range: '$3,000 — $5,000',
    icon: '🌟',
    desc: 'Elevated experiences',
  },
  {
    label: 'Ultra Luxury',
    range: '$5,000+',
    icon: '👑',
    desc: 'No compromises',
  },
]

const steps = [
  'Where do you want to go?',
  "What's your style?",
  'How long?',
  'Your Budget',
]

/* ═══════════════════════════════════════════════════════════════
   STEPPER PROGRESS
   ═══════════════════════════════════════════════════════════════ */

function StepperProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="w-full max-w-md mx-auto mb-10">
      <div className="flex justify-between mb-3">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                i <= current
                  ? 'bg-gradient-to-br from-sky to-lavender-deep text-white shadow-lg'
                  : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]'
              }`}
            >
              {i < current ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-[var(--surface)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-sky to-lavender-deep rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${((current + 1) / total) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <p className="text-center text-xs text-[var(--text-muted)] mt-2">
        Step {current + 1} of {total}
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   STEP COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function StepCountries({
  selected,
  toggle,
}: {
  selected: string[]
  toggle: (name: string) => void
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {countryOptions.map((c) => {
        const isSelected = selected.includes(c.name)
        return (
          <motion.button
            key={c.name}
            onClick={() => toggle(c.name)}
            className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 ${
              isSelected
                ? 'ring-2 ring-sky shadow-lg shadow-sky/20'
                : 'ring-1 ring-[var(--border)] hover:ring-sky/40'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="relative aspect-[4/3]">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white font-semibold text-sm">
                {c.name}
              </p>
              {isSelected && (
                <motion.div
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-sky flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}

function StepStyle({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (name: string) => void
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {styleOptions.map((s) => {
        const isSelected = selected === s.name
        return (
          <motion.button
            key={s.name}
            onClick={() => onSelect(s.name)}
            className={`glass-card p-5 text-center cursor-pointer transition-all duration-300 ${
              isSelected
                ? 'ring-2 ring-sky shadow-lg shadow-sky/20'
                : 'hover:ring-1 hover:ring-sky/40'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="text-3xl block mb-2">{s.icon}</span>
            <p className="font-semibold text-sm mb-1">{s.name}</p>
            <p className="text-xs text-[var(--text-muted)]">{s.desc}</p>
          </motion.button>
        )
      })}
    </div>
  )
}

function StepDuration({
  selected,
  onSelect,
}: {
  selected: number | null
  onSelect: (val: number) => void
}) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {durationOptions.map((d) => {
        const isSelected = selected === d.value
        return (
          <motion.button
            key={d.value}
            onClick={() => onSelect(d.value)}
            className={`glass-card px-8 py-5 text-center cursor-pointer transition-all duration-300 min-w-[100px] ${
              isSelected
                ? 'ring-2 ring-sky shadow-lg shadow-sky/20'
                : 'hover:ring-1 hover:ring-sky/40'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <p className="text-2xl font-bold mb-1">{d.value}</p>
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
              Days
            </p>
          </motion.button>
        )
      })}
    </div>
  )
}

function StepBudget({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (label: string) => void
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {budgetOptions.map((b) => {
        const isSelected = selected === b.label
        return (
          <motion.button
            key={b.label}
            onClick={() => onSelect(b.label)}
            className={`glass-card p-5 text-left cursor-pointer transition-all duration-300 ${
              isSelected
                ? 'ring-2 ring-sky shadow-lg shadow-sky/20'
                : 'hover:ring-1 hover:ring-sky/40'
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{b.icon}</span>
              <div>
                <p className="font-semibold text-sm">{b.label}</p>
                <p className="text-xs text-gold font-medium">{b.range}</p>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)]">{b.desc}</p>
          </motion.button>
        )
      })}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   RESULT CARD
   ═══════════════════════════════════════════════════════════════ */

function ResultCard({
  countries,
  style,
  duration,
  budget,
}: {
  countries: string[]
  style: string
  duration: number
  budget: string
}) {
  const daysPerCountry = Math.max(1, Math.floor(duration / countries.length))
  const priceMap: Record<string, number> = {
    Budget: 150,
    Comfort: 300,
    Premium: 500,
    'Ultra Luxury': 900,
  }
  const total = (priceMap[budget] || 300) * duration

  return (
    <motion.div
      className="glass-card p-8 max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center mb-6">
        <span className="text-3xl block mb-2">🌟</span>
        <h3 className="text-2xl font-bold mb-1">Your Dream Itinerary</h3>
        <p className="text-sm text-[var(--text-muted)]">
          A {style.toLowerCase()} journey across Asia
        </p>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-sky/30 to-transparent mb-6" />

      {/* Route */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {countries.map((c, i) => (
          <div key={c} className="flex items-center gap-2">
            <span className="glass-sm px-3 py-1.5 text-sm font-medium">{c}</span>
            {i < countries.length - 1 && (
              <svg className="w-4 h-4 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Details */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Duration</p>
          <p className="text-lg font-bold">{duration} Days</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Per Stop</p>
          <p className="text-lg font-bold">{daysPerCountry} Days</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Est. Cost</p>
          <p className="text-lg font-bold text-gradient">${total.toLocaleString()}</p>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2">
        {countries.map((c, i) => (
          <div key={c} className="flex items-center gap-3 text-sm">
            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-sky to-lavender-deep flex items-center justify-center text-white text-xs font-bold">
              {i + 1}
            </span>
            <span className="font-medium">{c}</span>
            <span className="flex-1 border-b border-dotted border-[var(--border)]" />
            <span className="text-[var(--text-muted)]">
              Day {i * daysPerCountry + 1} — {Math.min((i + 1) * daysPerCountry, duration)}
            </span>
          </div>
        ))}
      </div>

      <motion.button
        className="mt-8 w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide cursor-pointer
          bg-gradient-to-r from-sky to-lavender-deep text-white
          hover:shadow-lg hover:shadow-sky/25 transition-all duration-300"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        Book This Journey →
      </motion.button>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function TripPlanner() {
  const [step, setStep] = useState(0)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null)
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)

  const toggleCountry = (name: string) => {
    setSelectedCountries((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    )
  }

  const canProceed = () => {
    if (step === 0) return selectedCountries.length > 0
    if (step === 1) return selectedStyle !== null
    if (step === 2) return selectedDuration !== null
    if (step === 3) return selectedBudget !== null
    return false
  }

  const handleGenerate = () => setShowResult(true)

  const handleReset = () => {
    setStep(0)
    setSelectedCountries([])
    setSelectedStyle(null)
    setSelectedDuration(null)
    setSelectedBudget(null)
    setShowResult(false)
  }

  return (
    <section
      id="trip-planner"
      className="relative w-full py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient bg */}
      <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-overline block mb-4">Plan Your Trip</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            AI{' '}
            <span className="text-gradient">Trip Planner</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Tell us your dreams, we&apos;ll craft your journey — step by step,
            detail by detail.
          </p>
        </motion.div>
      </div>

      {/* Planner */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-12">
        {!showResult ? (
          <>
            <StepperProgress current={step} total={steps.length} />

            {/* Step Title */}
            <motion.h3
              key={step}
              className="text-center text-xl md:text-2xl font-bold mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {steps[step]}
            </motion.h3>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {step === 0 && (
                  <StepCountries
                    selected={selectedCountries}
                    toggle={toggleCountry}
                  />
                )}
                {step === 1 && (
                  <StepStyle
                    selected={selectedStyle}
                    onSelect={setSelectedStyle}
                  />
                )}
                {step === 2 && (
                  <StepDuration
                    selected={selectedDuration}
                    onSelect={setSelectedDuration}
                  />
                )}
                {step === 3 && (
                  <StepBudget
                    selected={selectedBudget}
                    onSelect={setSelectedBudget}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10 max-w-md mx-auto">
              <motion.button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className={`glass-sm px-6 py-2.5 text-sm font-medium cursor-pointer transition-all duration-300 ${
                  step === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'hover:bg-sky/10'
                }`}
                whileHover={{ x: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Back
              </motion.button>

              {step < steps.length - 1 ? (
                <motion.button
                  onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                  disabled={!canProceed()}
                  className={`glass-card px-6 py-2.5 text-sm font-semibold cursor-pointer transition-all duration-300
                    ${
                      canProceed()
                        ? 'bg-gradient-to-r from-sky/20 to-lavender/20 hover:from-sky/35 hover:to-lavender/35 border border-sky/30'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                  whileHover={canProceed() ? { x: 3, scale: 1.02 } : {}}
                  whileTap={canProceed() ? { scale: 0.95 } : {}}
                >
                  Next →
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleGenerate}
                  disabled={!canProceed()}
                  className={`px-8 py-3 rounded-xl text-sm font-bold tracking-wide cursor-pointer transition-all duration-300
                    ${
                      canProceed()
                        ? 'bg-gradient-to-r from-sky to-lavender-deep text-white hover:shadow-lg hover:shadow-sky/25'
                        : 'bg-[var(--surface)] text-[var(--text-muted)] opacity-40 cursor-not-allowed'
                    }`}
                  whileHover={canProceed() ? { scale: 1.04 } : {}}
                  whileTap={canProceed() ? { scale: 0.95 } : {}}
                >
                  Create My Dream Trip ✨
                </motion.button>
              )}
            </div>
          </>
        ) : (
          <>
            <ResultCard
              countries={selectedCountries}
              style={selectedStyle!}
              duration={selectedDuration!}
              budget={selectedBudget!}
            />
            <div className="text-center mt-6">
              <motion.button
                onClick={handleReset}
                className="glass-sm px-6 py-2.5 text-sm font-medium cursor-pointer hover:bg-sky/10 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Plan Another Trip
              </motion.button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
