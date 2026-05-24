'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

/* ═══════════════════════════════════════════════════════════════
   COUNTRY DATA
   ═══════════════════════════════════════════════════════════════ */

interface Country {
  name: string
  tagline: string
  description: string
  tags: string[]
  image: string
  price: string
  duration: string
  rating: string
}

const countries: Country[] = [
  {
    name: 'Vietnam',
    tagline: 'The Land of the Ascending Dragon',
    description:
      'Sail through the ethereal limestone pillars of Ha Long Bay at dawn, wander the lantern-lit streets of Hoi An, and savor phở so rich it rewrites your definition of comfort. Vietnam is where ancient heritage dances with vibrant street life.',
    tags: ['Ha Long Bay', 'Street Food', 'Ancient Temples'],
    image: '/images/heroes/vietnam.png',
    price: 'From $1,299',
    duration: '7 Days',
    rating: '4.9',
  },
  {
    name: 'India',
    tagline: 'A Tapestry of Colors & Culture',
    description:
      'From the ivory symmetry of the Taj Mahal to the sacred ghats of Varanasi, India is an intoxicating mosaic of spirituality, spice markets, and timeless architecture. Every sunrise here tells a story spanning five thousand years.',
    tags: ['Heritage', 'Spirituality', 'Cuisine'],
    image: '/images/heroes/india.png',
    price: 'From $1,499',
    duration: '10 Days',
    rating: '4.8',
  },
  {
    name: 'Thailand',
    tagline: 'The Land of Smiles',
    description:
      'Glide between gilded temple spires and turquoise lagoons, dine on Michelin-starred street food, and retreat to private villas perched above the Andaman Sea. Thailand delivers paradise with effortless warmth.',
    tags: ['Beaches', 'Temples', 'Nightlife'],
    image: '/images/heroes/thailand.png',
    price: 'From $1,199',
    duration: '7 Days',
    rating: '4.9',
  },
  {
    name: 'Singapore',
    tagline: 'The Garden City',
    description:
      "A futuristic city-state where Supertree Groves glow at dusk, hawker centers hold Michelin stars, and infinity pools stretch toward the skyline. Singapore is Asia's polished jewel — compact, electric, and endlessly surprising.",
    tags: ['Modern', 'Clean', 'Diverse'],
    image: '/images/heroes/singapore.png',
    price: 'From $1,899',
    duration: '5 Days',
    rating: '4.9',
  },
  {
    name: 'Malaysia',
    tagline: 'Truly Asia',
    description:
      'Lose yourself in the misty tea plantations of the Cameron Highlands, dive the crystalline reefs of Sipadan, and feast on laksa at midnight in George Town. Malaysia is a symphony of jungle, coast, and culture.',
    tags: ['Nature', 'Food', 'Culture'],
    image: '/images/heroes/malaysia.png',
    price: 'From $1,099',
    duration: '8 Days',
    rating: '4.8',
  },
  {
    name: 'Bali',
    tagline: 'Island of the Gods',
    description:
      'Wake to the scent of frangipani in a clifftop villa, trek through emerald rice terraces at sunrise, and witness fire dancers perform under a canopy of stars. Bali is where the spirit finds its horizon.',
    tags: ['Temples', 'Rice Terraces', 'Surfing'],
    image: '/images/heroes/bali.png',
    price: 'From $1,399',
    duration: '7 Days',
    rating: '4.9',
  },
]

/* ═══════════════════════════════════════════════════════════════
   STAR RATING COMPONENT
   ═══════════════════════════════════════════════════════════════ */

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
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
   SECTION DIVIDER
   ═══════════════════════════════════════════════════════════════ */

function SectionDivider() {
  return (
    <div className="relative w-full h-px my-4 md:my-8">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sky/30 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sky/40" />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   COUNTRY SECTION
   ═══════════════════════════════════════════════════════════════ */

function CountrySection({
  country,
  index,
}: {
  country: Country
  index: number
}) {
  const isEven = index % 2 === 1
  const imageDirection = isEven ? -80 : 80
  const contentDirection = isEven ? 80 : -80

  return (
    <motion.div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center py-16 md:py-24 ${
        isEven ? 'lg:direction-rtl' : ''
      }`}
    >
      {/* Image Side */}
      <motion.div
        className={`relative overflow-hidden rounded-2xl group ${
          isEven ? 'lg:order-2' : 'lg:order-1'
        }`}
        initial={{ opacity: 0, x: imageDirection }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative aspect-[4/3] lg:aspect-[3/4] xl:aspect-[4/3]">
          <Image
            src={country.image}
            alt={`${country.name} — ${country.tagline}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
        </div>

        {/* Floating price badge */}
        <div className="absolute bottom-4 left-4 glass-sm px-4 py-2 text-sm font-semibold text-white backdrop-blur-xl">
          {country.price}
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div
        className={`flex flex-col gap-5 ${
          isEven ? 'lg:order-1 lg:text-right lg:items-end' : 'lg:order-2'
        }`}
        initial={{ opacity: 0, x: contentDirection }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {/* Overline */}
        <motion.span
          className="text-overline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Destination {String(index + 1).padStart(2, '0')}
        </motion.span>

        {/* Country Name */}
        <motion.h2
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {country.name}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          className="text-lg md:text-xl italic text-gold font-medium"
          style={{ fontFamily: 'Georgia, serif' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          &ldquo;{country.tagline}&rdquo;
        </motion.p>

        {/* Description */}
        <motion.p
          className="text-base md:text-lg leading-relaxed max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          {country.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          className={`flex flex-wrap gap-2 ${isEven ? 'lg:justify-end' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {country.tags.map((tag) => (
            <span
              key={tag}
              className="glass-sm px-4 py-1.5 text-xs font-medium tracking-wide text-sky-deep dark:text-sky-light"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Star Rating */}
        <motion.div
          className={`flex items-center gap-3 ${isEven ? 'lg:flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          <StarRating />
          <span className="text-sm text-[var(--text-muted)]">
            {country.rating} · Exceptional
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className={`flex items-center gap-4 text-sm text-[var(--text-muted)] ${
            isEven ? 'lg:flex-row-reverse' : ''
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span className="font-semibold text-[var(--text-primary)]">
            {country.price}
          </span>
          <span className="w-px h-4 bg-[var(--border)]" />
          <span>{country.duration}</span>
          <span className="w-px h-4 bg-[var(--border)]" />
          <span>{country.rating}★</span>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="mt-2 glass-card px-8 py-3.5 font-semibold text-sm tracking-wide
            bg-gradient-to-r from-sky/20 to-lavender/20
            hover:from-sky/40 hover:to-lavender/40
            border border-sky/30 hover:border-sky/50
            transition-all duration-300 cursor-pointer
            w-fit"
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.5 }}
        >
          Discover {country.name} →
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN SHOWCASE
   ═══════════════════════════════════════════════════════════════ */

export default function CountryShowcase() {
  return (
    <section id="destinations" className="relative w-full overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 gradient-mesh opacity-40 pointer-events-none" />

      {/* Section Header */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-overline block mb-4">Our Destinations</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Discover{' '}
            <span className="text-gradient">Asia&apos;s Finest</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Six extraordinary destinations, each a masterpiece of culture,
            nature, and timeless beauty — curated for the discerning traveler.
          </p>
        </motion.div>
      </div>

      {/* Country Sections */}
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {countries.map((country, index) => (
          <div key={country.name}>
            <CountrySection country={country} index={index} />
            {index < countries.length - 1 && <SectionDivider />}
          </div>
        ))}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  )
}
