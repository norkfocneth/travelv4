'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/* ─── Social Icons (inline SVG) ─── */
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { icon: <InstagramIcon />, href: '#', label: 'Instagram', color: 'hover:text-pink-500 hover:shadow-pink-500/30' },
  { icon: <FacebookIcon />, href: '#', label: 'Facebook', color: 'hover:text-blue-600 hover:shadow-blue-600/30' },
  { icon: <TwitterIcon />, href: '#', label: 'X', color: 'hover:text-gray-900 dark:hover:text-white hover:shadow-gray-500/30' },
  { icon: <YouTubeIcon />, href: '#', label: 'YouTube', color: 'hover:text-red-600 hover:shadow-red-600/30' },
  { icon: <WhatsAppIcon />, href: '#', label: 'WhatsApp', color: 'hover:text-green-500 hover:shadow-green-500/30' },
];

const QUICK_LINKS = [
  { label: 'Destinations', href: '#destinations' },
  { label: 'Packages', href: '#packages' },
  { label: 'Honeymoon Trips', href: '#honeymoon' },
  { label: 'Student Travel', href: '#student' },
  { label: 'Beach Escapes', href: '#beach' },
];

const SERVICES = [
  { label: 'Luxury Travel', href: '#luxury' },
  { label: 'Group Tours', href: '#groups' },
  { label: 'Custom Itineraries', href: '#custom' },
  { label: 'Visa Assistance', href: '#visa' },
  { label: 'Travel Insurance', href: '#insurance' },
];

/* ─── Animated link component ─── */
function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="group flex items-center gap-2 text-[#0a0e27]/70 dark:text-white/60 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300">
      <span className="w-0 group-hover:w-3 h-[1px] bg-sky-500 transition-all duration-300" />
      <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
        {label}
      </span>
    </a>
  );
}

/* ─── Container fade-in ─── */
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* ─── Animated Wave SVG ─── */}
      <div className="relative w-full h-20 md:h-28 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-full animate-[wave_8s_ease-in-out_infinite]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="wave-gradient-light" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e0f2fe" />
              <stop offset="50%" stopColor="#ddd6fe" />
              <stop offset="100%" stopColor="#e0f2fe" />
            </linearGradient>
            <linearGradient id="wave-gradient-dark" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#0a0e27" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <path
            className="fill-[url(#wave-gradient-light)] dark:fill-[url(#wave-gradient-dark)]"
            d="M0,40 C120,100 240,0 360,50 C480,100 600,20 720,60 C840,100 960,30 1080,70 C1200,110 1320,40 1440,80 L1440,120 L0,120 Z"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-full animate-[wave_12s_ease-in-out_infinite_reverse] opacity-50"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            className="fill-[url(#wave-gradient-light)] dark:fill-[url(#wave-gradient-dark)]"
            d="M0,60 C160,10 320,90 480,40 C640,0 800,80 960,30 C1120,0 1280,70 1440,50 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      {/* ─── Main Footer Content ─── */}
      <div className="bg-gradient-to-b from-sky-50 via-sky-50/80 to-violet-50 dark:from-[#0f172a] dark:via-[#0c1229] dark:to-[#0a0e27]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* ── Column 1: Brand ── */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={0}
              className="lg:col-span-1"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-md ring-2 ring-white/40 dark:ring-white/10">
                  <Image
                    src="/images/logo.jpg"
                    alt="Asian Season Logo"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-[#0a0e27] dark:text-white"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Asian Season
                  </h3>
                  <p className="text-xs text-[#0a0e27]/50 dark:text-white/40 tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Travel Representative
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[#0a0e27]/60 dark:text-white/50 mb-6 max-w-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                Your gateway to premium Asian travel experiences. Discover breathtaking destinations curated with luxury and authenticity.
              </p>

              {/* Social Icons */}
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`
                      w-10 h-10 flex items-center justify-center rounded-full
                      bg-white/60 dark:bg-white/5
                      border border-[#0a0e27]/10 dark:border-white/10
                      text-[#0a0e27]/50 dark:text-white/50
                      transition-all duration-300
                      ${social.color}
                    `}
                    whileHover={{
                      scale: 1.15,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ── Column 2: Quick Links ── */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={1}
            >
              <h4
                className="text-sm uppercase tracking-[0.15em] font-semibold text-[#0a0e27] dark:text-white mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Quick Links
              </h4>
              <div className="flex flex-col gap-3.5">
                {QUICK_LINKS.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </div>
            </motion.div>

            {/* ── Column 3: Services ── */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={2}
            >
              <h4
                className="text-sm uppercase tracking-[0.15em] font-semibold text-[#0a0e27] dark:text-white mb-6"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Services
              </h4>
              <div className="flex flex-col gap-3.5">
                {SERVICES.map((link) => (
                  <FooterLink key={link.label} {...link} />
                ))}
              </div>
            </motion.div>

            {/* ── Column 4: Newsletter ── */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              custom={3}
            >
              <h4
                className="text-sm uppercase tracking-[0.15em] font-semibold text-[#0a0e27] dark:text-white mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Stay Inspired
              </h4>
              <p className="text-sm text-[#0a0e27]/60 dark:text-white/50 mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
                Get curated travel stories and exclusive deals.
              </p>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col gap-3"
              >
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-5 py-3 rounded-full text-sm bg-white/50 dark:bg-white/5 backdrop-blur-md border border-[#0a0e27]/10 dark:border-white/10 text-[#0a0e27] dark:text-white placeholder:text-[#0a0e27]/40 dark:placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-400/50 transition-all duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="
                    w-full px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-[0.1em]
                    text-white bg-gradient-to-r from-sky-500 to-cyan-400
                    shadow-lg shadow-sky-500/20
                    border border-white/20
                    cursor-pointer
                  "
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: '0 8px 30px rgba(14, 165, 233, 0.35)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>

              <p className="text-xs text-[#0a0e27]/40 dark:text-white/30 mt-3 flex items-center gap-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                We respect your privacy
              </p>
            </motion.div>

          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="border-t border-[#0a0e27]/10 dark:border-white/10">
          {/* Gradient line */}
          <div className="h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
                <p className="text-xs text-[#0a0e27]/50 dark:text-white/40" style={{ fontFamily: "'Inter', sans-serif" }}>
                  © {new Date().getFullYear()} Asian Season Travel Representative. All rights reserved.
                </p>
                <span className="hidden md:inline text-[#0a0e27]/20 dark:text-white/20">|</span>
                <p className="text-xs text-[#0a0e27]/40 dark:text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Crafted with <span className="text-rose-400">♥</span> for wanderers
                </p>
              </div>

              <div className="flex items-center gap-5">
                {['Terms', 'Privacy', 'Sitemap'].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-xs text-[#0a0e27]/50 dark:text-white/40 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-300"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Wave Animation Keyframes (injected via style tag) ─── */}
      <style jsx global>{`
        @keyframes wave {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </footer>
  );
}
