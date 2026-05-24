'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Tier {
  name: string;
  price: string;
  period: string;
  benefits: string[];
  gradient: string;
  borderGlow: string;
  popular?: boolean;
  buttonStyle: string;
}

const tiers: Tier[] = [
  {
    name: 'Silver Explorer',
    price: '$99',
    period: '/ year',
    gradient: 'from-slate-400/20 via-slate-500/10 to-slate-600/20 dark:from-slate-800/30 dark:to-slate-900/30',
    borderGlow: 'hover:border-slate-400/50 shadow-slate-500/10',
    buttonStyle: 'bg-navy/10 hover:bg-navy/20 dark:bg-white/10 dark:hover:bg-white/20 text-navy dark:text-white',
    benefits: [
      '5% savings on all luxury packages',
      'Priority booking access during high season',
      'Exclusive monthly travel inspiration digest',
      'Standard lounge invitation vouchers (2x)',
      'Basic visa guidance and support'
    ]
  },
  {
    name: 'Gold Voyager',
    price: '$249',
    period: '/ year',
    gradient: 'from-amber-400/20 via-yellow-500/10 to-amber-600/20 dark:from-amber-500/20 dark:via-yellow-600/10 dark:to-amber-800/20',
    borderGlow: 'hover:border-amber-400/50 shadow-amber-500/20 border-amber-500/30',
    popular: true,
    buttonStyle: 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg shadow-amber-500/25',
    benefits: [
      '15% savings on all luxury packages',
      'Complimentary airport private transfers',
      'Dedicated elite travel representative advisor',
      'Unlimited executive airport lounge access',
      'Premium fast-track visa processing support',
      'Room upgrades at boutique hotels (subject to availability)'
    ]
  },
  {
    name: 'Platinum Elite',
    price: '$499',
    period: '/ year',
    gradient: 'from-purple-400/20 via-pink-500/10 to-indigo-600/20 dark:from-purple-900/30 dark:to-indigo-900/30',
    borderGlow: 'hover:border-purple-400/50 shadow-purple-500/15',
    buttonStyle: 'bg-navy dark:bg-white text-white dark:text-navy hover:bg-navy/90 dark:hover:bg-white/90 shadow-lg',
    benefits: [
      '25% savings on all luxury packages',
      'Guaranteed room upgrades at 5-star properties',
      '24/7 dedicated global concierge service',
      'Private customized guided tours at destinations',
      'Annual premium curated luxury travel gift box',
      'Zero cancellation fees on booking alterations',
      'Exclusive invitations to bespoke partner events'
    ]
  }
];

export default function MembershipCards() {
  return (
    <section id="membership" className="py-24 px-6 md:px-12 relative overflow-hidden transition-colors duration-500 bg-gradient-to-b from-cream/20 via-sky-light/10 to-lavender-light/20 dark:from-navy dark:via-midnight dark:to-navy">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(230,230,250,0.4),transparent)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(190,168,233,0.05),transparent)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-overline tracking-widest text-sky-deep dark:text-sky-light block mb-2 font-semibold">Bespoke Privileges</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy dark:text-white mb-4">
              Premium Membership Tiers
            </h2>
            <p className="text-base text-navy/60 dark:text-white/60 max-w-xl mx-auto font-sans">
              Unlock exclusive rates, private transfer upgrades, airport lounge comfort, and priority access to our signature packages.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ 
                y: -10, 
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                transition: { duration: 0.2 } 
              }}
              className={`relative flex flex-col rounded-3xl border border-white/30 dark:border-white/10 p-8 glass-card transition-all duration-300 ${
                tier.popular ? 'lg:-translate-y-4 ring-2 ring-amber-500 shadow-xl' : ''
              } bg-gradient-to-b ${tier.gradient} ${tier.borderGlow}`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <span className="text-overline font-semibold text-navy/60 dark:text-white/60 tracking-wider text-xs uppercase block mb-2">
                  {tier.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-display font-bold text-navy dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-sm text-navy/60 dark:text-white/60 font-sans">
                    {tier.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {tier.benefits.map((benefit, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <svg
                      className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        tier.popular ? 'text-amber-500' : 'text-sky-deep dark:text-sky-light'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-sm text-navy/80 dark:text-white/80 font-sans leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-full font-bold text-sm uppercase tracking-wider transition-all duration-300 active:scale-95 ${tier.buttonStyle}`}
              >
                Join {tier.name.split(' ')[0]} Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
