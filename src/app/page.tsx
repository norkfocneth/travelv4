'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '@/components/splash/SplashScreen';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/hero/HeroSection';
import InteractiveMap from '@/components/map/InteractiveMap';
import MonumentExperience from '@/components/monuments/MonumentExperience';
import CountryShowcase from '@/components/countries/CountryShowcase';
import LuxuryPackages from '@/components/sections/LuxuryPackages';
import MoodFinder from '@/components/sections/MoodFinder';
import TripPlanner from '@/components/sections/TripPlanner';
import MembershipCards from '@/components/sections/MembershipCards';
import Testimonials from '@/components/sections/Testimonials';
import Footer from '@/components/layout/Footer';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {/* Netflix-style Cinematic Splash Screen */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Main Experience */}
      <div className={`relative w-full min-h-screen flex flex-col transition-opacity duration-700 ${showSplash ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {!showSplash && (
          <>
            <Navbar />
            <main className="w-full flex-grow">
              <HeroSection />
              <InteractiveMap />
              <MonumentExperience />
              <CountryShowcase />
              <LuxuryPackages />
              <MoodFinder />
              <TripPlanner />
              <MembershipCards />
              <Testimonials />
            </main>
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
