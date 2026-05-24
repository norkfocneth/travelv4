'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Mood {
  id: string;
  emoji: string;
  name: string;
  description: string;
  color: string;
  destinations: {
    name: string;
    image: string;
    description: string;
  }[];
}

const moods: Mood[] = [
  {
    id: 'romantic',
    emoji: '🌹',
    name: 'Romantic Escapes',
    description: 'For lovers, dreamers, and unforgettable honeymoons.',
    color: 'from-pink-500/20 to-lavender-500/20',
    destinations: [
      {
        name: 'Bali, Indonesia',
        image: '/images/heroes/bali.png',
        description: 'Villas overlooking lush valleys, sunset temple walks, and private beach dinners.'
      },
      {
        name: 'Thailand Beaches',
        image: '/images/heroes/thailand.png',
        description: 'Secluded island resorts, crystal clear waters, and scenic boat rides for two.'
      }
    ]
  },
  {
    id: 'adventurous',
    emoji: '🏔',
    name: 'Adventurous Paths',
    description: 'For the brave at heart, high peaks, and lush jungles.',
    color: 'from-orange-500/20 to-sky-500/20',
    destinations: [
      {
        name: 'Vietnam Highlands',
        image: '/images/heroes/vietnam.png',
        description: 'Trekking through misty terraced mountains of Sapa and exploring massive karst caves.'
      },
      {
        name: 'Malaysia Rainforests',
        image: '/images/heroes/malaysia.png',
        description: 'Canopy walks in ancient jungles, wildlife cruises, and climbing Mount Kinabalu.'
      }
    ]
  },
  {
    id: 'spiritual',
    emoji: '🙏',
    name: 'Spiritual Journeys',
    description: 'Find inner peace, ancient wisdom, and quiet contemplation.',
    color: 'from-purple-500/20 to-gold/20',
    destinations: [
      {
        name: 'Varanasi & Rishikesh, India',
        image: '/images/heroes/india.png',
        description: 'Ganges sunrise prayers, yoga ashrams by the river, and sacred ancient temple rituals.'
      },
      {
        name: 'Ubud, Bali',
        image: '/images/heroes/bali.png',
        description: 'Sacred water purification pools, silent meditation retreats, and forest temples.'
      }
    ]
  },
  {
    id: 'beach',
    emoji: '🏖',
    name: 'Beach & Sun Serenity',
    description: 'Unwind with golden sand, warm sun, and pristine waters.',
    color: 'from-aqua-500/20 to-sky-500/20',
    destinations: [
      {
        name: 'Southern Islands, Thailand',
        image: '/images/heroes/thailand.png',
        description: 'Koh Samui and Phuket luxury resorts, longtail boat cruises, and diving spots.'
      },
      {
        name: 'Nusa Dua, Bali',
        image: '/images/heroes/bali.png',
        description: 'Pristine private beaches, premium five-star resorts, and absolute relaxation.'
      }
    ]
  },
  {
    id: 'cultural',
    emoji: '🏛',
    name: 'Cultural Tapestries',
    description: 'Immerse yourself in history, majestic heritage, and local arts.',
    color: 'from-gold-light/20 to-lavender-deep/20',
    destinations: [
      {
        name: 'Rajasthan, India',
        image: '/images/heroes/india.png',
        description: 'Golden fortresses, floating palaces, vibrant heritage dances, and royal bazaars.'
      },
      {
        name: 'Ancient Hoi An, Vietnam',
        image: '/images/heroes/vietnam.png',
        description: 'Lantern-lit historical streets, centuries-old houses, and unique local craftsmanship.'
      }
    ]
  },
  {
    id: 'foodie',
    emoji: '🍜',
    name: 'Culinary Voyages',
    description: 'Savor world-class dining, bustling street food markets, and rich spices.',
    color: 'from-red-500/20 to-gold-light/20',
    destinations: [
      {
        name: 'Singapore Hawker & Fine Dining',
        image: '/images/heroes/singapore.png',
        description: 'Michelin-starred street food stalls, hyper-modern rooftops, and blend of global cuisines.'
      },
      {
        name: 'Penang, Malaysia',
        image: '/images/heroes/malaysia.png',
        description: 'A culinary melting pot of Peranakan, Malay, Indian, and Chinese historic flavors.'
      }
    ]
  }
];

export default function MoodFinder() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  return (
    <section id="mood-finder" className="py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 bg-gradient-to-b from-sky-light/20 via-lavender-light/10 to-cream/20 dark:from-navy dark:via-midnight dark:to-navy">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent)] dark:bg-[radial-gradient(ellipse_at_top,rgba(91,171,219,0.05),transparent)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-overline tracking-widest text-sky-deep dark:text-sky-light block mb-2 font-semibold">Mood Discovery</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy dark:text-white mb-4">
              Destination Mood Finder
            </h2>
            <p className="text-base text-navy/60 dark:text-white/60 max-w-xl mx-auto font-sans">
              What kind of journey speaks to your soul? Select a travel state of mind below to find your perfect matches.
            </p>
          </motion.div>
        </div>

        {/* Mood Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {moods.map((mood, idx) => (
            <motion.div
              key={mood.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => setSelectedMood(selectedMood === mood.id ? null : mood.id)}
              className={`cursor-pointer group glass-card border border-white/20 dark:border-white/10 p-8 rounded-3xl transition-all duration-300 ${
                selectedMood === mood.id 
                  ? 'ring-2 ring-sky-deep shadow-2xl bg-gradient-to-br ' + mood.color
                  : 'hover:shadow-xl hover:border-sky/40'
              }`}
            >
              <div className="text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300">
                {mood.emoji}
              </div>
              <h3 className="text-xl font-display font-semibold text-navy dark:text-white text-center mb-2">
                {mood.name}
              </h3>
              <p className="text-sm text-navy/60 dark:text-white/60 text-center">
                {mood.description}
              </p>
              
              <div className="mt-6 flex justify-center items-center text-xs font-semibold text-sky-deep dark:text-sky-light group-hover:translate-x-1 transition-transform duration-300">
                {selectedMood === mood.id ? 'Click to collapse ▲' : 'View destinations →'}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded Destinations */}
        <AnimatePresence mode="wait">
          {selectedMood && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="overflow-hidden w-full"
            >
              <div className="glass p-8 md:p-12 rounded-3xl border border-white/30 dark:border-white/10 bg-white/40 dark:bg-navy/40 backdrop-blur-xl">
                <h4 className="text-2xl font-display font-semibold text-navy dark:text-white mb-6 text-center">
                  Recommended Destinations for &ldquo;{moods.find(m => m.id === selectedMood)?.name}&rdquo;
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {moods.find(m => m.id === selectedMood)?.destinations.map((dest, idx) => (
                    <motion.div
                      key={dest.name}
                      initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="group/dest overflow-hidden rounded-2xl border border-white/20 dark:border-white/10 glass-card flex flex-col md:flex-row gap-6 p-6"
                    >
                      <div className="relative w-full md:w-40 h-40 flex-shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={dest.image}
                          alt={dest.name}
                          fill
                          className="object-cover group-hover/dest:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                      </div>

                      <div className="flex flex-col justify-center">
                        <h5 className="text-lg font-display font-semibold text-navy dark:text-white mb-2">
                          {dest.name}
                        </h5>
                        <p className="text-sm text-navy/70 dark:text-white/70 mb-4">
                          {dest.description}
                        </p>
                        <a
                          href="#trip-planner"
                          className="text-xs font-bold uppercase tracking-wider text-sky-deep dark:text-sky-light hover:underline mt-auto self-start"
                        >
                          Plan Journey Now →
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
