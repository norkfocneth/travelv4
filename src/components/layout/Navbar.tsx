'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/providers/ThemeProvider';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Packages', href: '#packages' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Plan Your Trip', href: '#plan' },
  { label: 'Contact', href: '#contact' },
];

/* ─── Sun Icon ─── */
function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/* ─── Moon Icon ─── */
function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [activeLink, setActiveLink] = useState('#home');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [rotateKey, setRotateKey] = useState(0);

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setScrolled(currentY > 100);

    if (currentY > lastScrollY && currentY > 300) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(currentY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleToggleTheme = () => {
    setRotateKey(prev => prev + 1);
    toggleTheme();
  };

  return (
    <>
      {/* ─── Main Navbar ─── */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <nav
          className={`
            w-full h-16 lg:h-20 flex items-center justify-between
            px-5 md:px-8 lg:px-12
            border-b transition-all duration-500
            ${scrolled
              ? 'bg-[rgba(255,255,255,0.75)] dark:bg-[rgba(10,14,39,0.85)] border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.12)]'
              : 'bg-[rgba(255,255,255,0.1)] dark:bg-[rgba(10,14,39,0.6)] border-[rgba(255,255,255,0.2)] dark:border-[rgba(255,255,255,0.1)]'
            }
            backdrop-blur-xl
          `}
        >
          {/* ── Left: Logo ── */}
          <a
            href="#home"
            onClick={() => setActiveLink('#home')}
            className="flex items-center gap-3 shrink-0"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden shadow-md ring-2 ring-white/30 dark:ring-white/10">
              <Image
                src="/images/logo.jpg"
                alt="Asian Season Logo"
                fill
                className="object-cover"
                sizes="48px"
                priority
              />
            </div>
            <span
              className="text-lg lg:text-xl font-semibold text-[#0a0e27] dark:text-white tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Asian Season
            </span>
          </a>

          {/* ── Center: Desktop Links ── */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className="relative px-3 xl:px-4 py-2 group"
              >
                <span
                  className={`
                    text-xs uppercase tracking-[0.1em] font-medium transition-colors duration-300
                    ${activeLink === link.href
                      ? 'text-sky-600 dark:text-sky-400'
                      : 'text-[#0a0e27]/70 dark:text-white/70 group-hover:text-[#0a0e27] dark:group-hover:text-white'
                    }
                  `}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {link.label}
                </span>

                {/* Animated underline */}
                <motion.span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-sky-500 to-cyan-400 rounded-full"
                  initial={false}
                  animate={{
                    width: activeLink === link.href ? '60%' : '0%',
                    opacity: activeLink === link.href ? 1 : 0,
                  }}
                  whileHover={{
                    width: '60%',
                    opacity: 1,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </a>
            ))}
          </div>

          {/* ── Right: Theme Toggle + CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              key={rotateKey}
              onClick={handleToggleTheme}
              className="relative w-10 h-10 flex items-center justify-center rounded-full
                bg-white/20 dark:bg-white/10 backdrop-blur-md
                border border-white/30 dark:border-white/10
                text-[#0a0e27] dark:text-white
                hover:bg-white/30 dark:hover:bg-white/20
                transition-colors duration-300 cursor-pointer"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </motion.button>

            {/* CTA Button - Desktop */}
            <motion.a
              href="#plan"
              className="hidden md:flex items-center px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.1em] font-semibold text-white
                bg-gradient-to-r from-sky-500 to-cyan-400
                shadow-lg shadow-sky-500/25 dark:shadow-sky-500/15
                border border-white/20"
              style={{ fontFamily: "'Inter', sans-serif" }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 10px 40px rgba(14, 165, 233, 0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
            >
              Book Now
            </motion.a>

            {/* Hamburger - Mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] cursor-pointer"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-[2px] bg-[#0a0e27] dark:bg-white rounded-full origin-center"
                animate={mobileOpen
                  ? { rotate: 45, y: 7 }
                  : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-6 h-[2px] bg-[#0a0e27] dark:bg-white rounded-full"
                animate={mobileOpen
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[2px] bg-[#0a0e27] dark:bg-white rounded-full origin-center"
                animate={mobileOpen
                  ? { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(10,14,39,0.92)] backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
              {/* Links */}
              <nav className="flex flex-col items-center gap-6">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.href);
                      setMobileOpen(false);
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      delay: i * 0.08,
                      duration: 0.4,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="group relative"
                  >
                    <span
                      className={`
                        text-xl uppercase tracking-[0.15em] font-medium transition-colors duration-300
                        ${activeLink === link.href
                          ? 'text-sky-600 dark:text-sky-400'
                          : 'text-[#0a0e27]/80 dark:text-white/80'
                        }
                      `}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {link.label}
                    </span>
                    <span
                      className={`
                        block mx-auto mt-1 h-[2px] rounded-full bg-gradient-to-r from-sky-500 to-cyan-400
                        transition-all duration-300
                        ${activeLink === link.href ? 'w-full' : 'w-0 group-hover:w-full'}
                      `}
                    />
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.a
                href="#plan"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10 px-10 py-3 rounded-full text-sm uppercase tracking-[0.1em] font-semibold text-white
                  bg-gradient-to-r from-sky-500 to-cyan-400
                  shadow-lg shadow-sky-500/25"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Book Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
