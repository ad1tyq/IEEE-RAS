'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, GraduationCap, Clock, ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/CookCrackCapture/loadingComp';
import { ToxicBackground } from '@/components/CookCrackCapture/ToxicBackground';
import { timeline } from 'data/cookcrackcapture/timelineData';
import { rulesData } from 'data/cookcrackcapture/rulesData';
import { about } from 'data/cookcrackcapture/about';
import { aimData } from 'data/cookcrackcapture/aim';
import { winnersData } from 'data/cookcrackcapture/winnersData';
import Navbar from '@/components/CookCrackCapture/Navbar';

export default function Home() {

  const [mounted, setMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  /**
   * Debug function to reset loading animation for testing
   * Can be called from browser console: window.resetPixelPalettesLoading()
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as typeof window & { resetPixelPalettesLoading: () => void }).resetPixelPalettesLoading = () => {
        sessionStorage.removeItem('hasLoadedPixelPalettes');
        console.log('Pixel Palettes loading animation reset - will show on next visit');
      };
    }
  }, []);

  /**
   * Main effect hook for component initialization and loading logic
   * Handles:
   * - Setting mounted state for hydration safety
   * - Session storage tracking for loading animation control
   * - Timer management for extended loading screen duration
   * - Detection of page refresh vs navigation
   */
  useEffect(() => {
    setMounted(true);

    // Add a small delay to ensure proper detection
    const initTimer = setTimeout(() => {
      // Check if this is the first visit to Pixel Palettes website in this session
      // Show loading animation on first visit regardless of navigation method
      const hasLoadedPixelPalettes = sessionStorage.getItem('hasLoadedPixelPalettes');
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const isPageRefresh = navigationEntry?.type === 'reload';

      // Show loading animation if:
      // 1. First time visiting Cook Crack Capture in this session (no session flag)
      // 2. Page was refreshed (user pressed F5 or refresh button)
      // This includes navigation from main website "Learn More" button
      if (!hasLoadedPixelPalettes || isPageRefresh) {
        console.log('Showing full loading animation - First visit or refresh');

        // Complete loading animation (2 seconds) - always show on first visit
        const timer = setTimeout(() => {
          setIsLoading(false);
          // Set session flag AFTER loading completes to ensure it shows
          sessionStorage.setItem('hasLoadedPixelPalettes', 'true');
        }, 2000); // 2 seconds loading time for complete experience

        return () => clearTimeout(timer);
      } else {
        console.log('Skipping loading animation - Already visited');
        // Already visited in this session: Skip loading animation quickly
        const quickTimer = setTimeout(() => {
          setIsLoading(false);
        }, 50); // Minimal delay for smooth transition

        return () => clearTimeout(quickTimer);
      }
    }, 10); // Small delay to ensure proper initialization

    return () => clearTimeout(initTimer);
  }, []);

  // Prevent rendering until component is mounted (avoids hydration mismatch)
  if (!mounted) return null;

  /**
   * Framer Motion animation variants for loading screen container
   * Controls the overall fade-out transition when loading completes
   */
  const loadingVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: { duration: 1, ease: "easeInOut" as const }
    }
  };

  /**
   * Framer Motion animation variants for individual letters in loading animation
   * Creates staggered 3D letter animations with:
   * - Vertical slide-in motion (y: 50 to 0)
   * - 3D rotation effect (rotateX: -90 to 0)
   * - Scale transformation for dramatic entrance
   * - Staggered timing based on letter index
   */
  const letterVariants = {
    initial: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      scale: 0.5
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.08, // Staggered delay: 80ms per letter (quick reveal)
        duration: 0.6,   // Quick individual letter animation
        ease: "backOut" as const // Bounce-back easing for dramatic effect
      }
    })
  };

  /**
   * Framer Motion animation variants for glitch effects
   * Creates continuous color-shifting glitch overlay using hue-rotate filter
   * Cycles through full color spectrum (0-360 degrees) infinitely
   */
  const glitchVariants = {
    initial: { filter: "hue-rotate(0deg)" },
    animate: {
      filter: [
        "hue-rotate(0deg)",
        "hue-rotate(90deg)",
        "hue-rotate(180deg)",
        "hue-rotate(270deg)",
        "hue-rotate(360deg)"
      ],
      transition: {
        duration: 1.5,   // Quick glitch effect cycles
        repeat: Infinity,
        ease: "linear" as const
      }
    }
  };

  return (
    <div className="min-h-screen text-white">
      <ToxicBackground />

      {/* Loading Screen - Retro Event Name Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            variants={loadingVariants}
            initial="initial"
            exit="exit"
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Enhanced Retro Grid Background with Perspective */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
                transform: 'perspective(800px) rotateX(25deg)',
                transformOrigin: 'center bottom'
              }}
            />

            {/* Animated Horizontal Scanlines - Full width sweeping lines */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`scanline-${i}`}
                  className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-80"
                  style={{
                    top: `${15 + i * 20}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scaleX: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Vertical Scanlines */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`vscanline-${i}`}
                  className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-green-500 to-transparent opacity-60"
                  style={{
                    left: `${25 + i * 25}%`,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scaleY: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Corner Frame Animations */}
            <div className="absolute inset-8 border-2 border-yellow-500/30  pointer-events-none">
              {/* Animated corner brackets */}
              {[
                { corner: 'top-left', classes: 'top-0 left-0 border-l-4 border-t-4' },
                { corner: 'top-right', classes: 'top-0 right-0 border-r-4 border-t-4' },
                { corner: 'bottom-left', classes: 'bottom-0 left-0 border-l-4 border-b-4' },
                { corner: 'bottom-right', classes: 'bottom-0 right-0 border-r-4 border-b-4' }
              ].map((corner, i) => (
                <motion.div
                  key={corner.corner}
                  className={`absolute w-12 h-12 border-yellow-500 ${corner.classes}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.5 + i * 0.1,
                    duration: 0.4,
                    ease: "backOut"
                  }}
                />
              ))}
            </div>

            {/* Main Event Name - Split into PIXEL and PALETTES with different colors */}
            <div className="relative z-10 text-center mb-8">
              {/* PIXEL text in purple */}
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 mb-4">
                {"COOK CRACK".split("").map((letter, i) => (
                  <motion.span
                    key={`pixel-${i}`}
                    custom={i}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-green-500 inline-block"
                    style={{
                      // Neon glow effect with multiple shadow layers
                      textShadow: '0 0 20px rgba(168, 85, 247, 1), 0 0 40px rgba(168, 85, 247, 0.8)',
                      transformStyle: 'preserve-3d' // Enable 3D transforms
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* PALETTES text in cyan */}
              <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3">
                {"CAPTURE".split("").map((letter, i) => (
                  <motion.span
                    key={`palettes-${i}`}
                    custom={i + 5} // Offset delay to appear after PIXEL
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-yellow-500 inline-block"
                    style={{
                      textShadow: '0 0 20px rgba(139, 92, 246, 1), 0 0 40px rgba(139, 92, 246, 0.8)',
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>

              {/* Glitch Effect Overlay - Animated color-shifting overlay */}
              <motion.div
                variants={glitchVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 pointer-events-none"
                style={{
                  // Diagonal gradient with blend mode for glitch effect
                  background: 'linear-gradient(45deg, transparent 48%, rgba(255, 0, 255, 0.1) 49%, rgba(255, 0, 255, 0.1) 51%, transparent 52%)',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Enhanced Loading Dots Matrix - More prominent and animated */}
            <div className="flex space-x-3 mb-12">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`dot-${i}`}
                  className="w-4 h-4 rounded-full"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 1, 1, 0.3],
                    scale: [0, 1.2, 1, 0.8],
                    backgroundColor: [
                      'rgba(147, 51, 234, 0.8)',
                      'rgba(0, 255, 255, 1)',
                      'rgba(147, 51, 234, 1)',
                      'rgba(0, 255, 255, 0.6)'
                    ]
                  }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  style={{
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)'
                  }}
                />
              ))}
            </div>

            {/* Enhanced Loading Text - More prominent status indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="text-center space-y-4"
            >
              <motion.div
                className="font-mono text-xl font-bold tracking-wider text-gray-200"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  textShadow: [
                    '0 0 10px rgba(0, 255, 255, 0.5)',
                    '0 0 20px rgba(0, 255, 255, 0.8)',
                    '0 0 10px rgba(0, 255, 255, 0.5)'
                  ]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                INITIALIZING CTF
              </motion.div>

              <motion.div
                className="font-mono text-sm text-gray-400 tracking-wide"
                animate={{
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Loading creative experience...
              </motion.div>
            </motion.div>

            {/* Enhanced CRT Effect - Multiple layer scanlines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-15"
              style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.15) 2px, rgba(0, 255, 255, 0.15) 4px)'
              }}
            />

            {/* Additional subtle overlay for depth */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)'
              }}
              animate={{
                opacity: [0.3, 0.1, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content - Only visible after loading completes */}
      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Navigation Bar - Fixed header with glassmorphism and minimal padding */}
            <Navbar />

            {/* Hero Section - Main landing area with event branding modern-bg*/}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black/65 to-black/50 relative pt-20">
              <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
                {/* Main Title and Tagline */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-12 mt-16"
                >
                  {/* Main Event Title Logo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex justify-center mb-8 pl-10 pt-19"
                  >
                    <Image
                      src="/cookcrackcapture/ccc-logo.png"
                      alt="Cook Crack Capture Logo"
                      width={800}
                      height={400}
                      className="max-w-full h-auto drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] object-contain"
                      priority
                    />
                  </motion.div>

                  {/* Event Tagline */}
                  <motion.p
                    className="font-mono-pixel text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 text-gray-300 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    Capture the Flag
                  </motion.p>

                  {/* Event Description */}
                  <motion.p
                    className="font-mono-pixel text-base md:text-lg text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    Where forensic analysis meets offensive security in an intense 24-hour CTF showdown.
                  </motion.p>
                </motion.div>

                {/* Event Details Cards - Date, Venue, and Prizes */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  {/* Date Card */}
                  <div className="glass modern-card rounded-2xl p-6 text-center">
                    <Calendar className="text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] mx-auto mb-3" size={28} />
                    <div className="font-pixel text-sm mb-1 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">DATE</div>
                    <div className="font-mono-pixel text-xl">30TH - 31ST JAN</div>
                  </div>

                  {/* Venue Card */}
                  <div className="glass modern-card rounded-2xl p-6 text-center">
                    <MapPin className="text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)] mx-auto mb-3" size={28} />
                    <div className="font-pixel text-sm mb-1 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]">VENUE</div>
                    <div className="font-mono-pixel text-xl">AB2</div>
                  </div>

                  {/* Prizes Card with Interactive Tooltip */}
                  {/*<div className="glass modern-card rounded-2xl p-6 text-center relative">
                    <Trophy className="text-yellow-400 mx-auto mb-3" size={28} />
                    <div className="font-pixel text-sm mb-1 text-yellow-400">PRIZES</div>
                    {/* Prize Amount with Pulsing Glow Animation */}
                  {/*<motion.div
                      className="font-mono-pixel text-xl flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      animate={{
                        textShadow: [
                          "0 0 10px rgba(255, 193, 7, 0.5)",
                          "0 0 20px rgba(255, 193, 7, 0.8)",
                          "0 0 10px rgba(255, 193, 7, 0.5)"
                        ]
                      }}
                      transition={{
                        textShadow: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <span>₹15,000*</span>
                      {/* Info Icon for Tooltip Trigger */}
                  {/*<button
                        onMouseEnter={() => setShowPrizeTooltip(true)}
                        onMouseLeave={() => setShowPrizeTooltip(false)}
                        className="text-yellow-400/60 hover:text-yellow-400 transition-colors"
                      >
                        <Info size={16} />
                      </button>
                    </motion.div>

                    {/* Prize Tooltip - Animated explanation */}
                  {/*<AnimatePresence>
                      {showPrizeTooltip && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.9 }}
                          className="absolute -top-16 left-1/2 transform -translate-x-1/2 glass-strong rounded-lg p-3 text-sm font-mono-pixel text-gray-300 whitespace-nowrap z-10"
                        >
                          *Exact prize split and rewards to be announced
                          {/* Tooltip Arrow */}
                  {/*<div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/10"></div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>*/}
                </motion.div>


              </div>
            </section>

            {/* Winners Section - Top 3 Winners */}
            <section id="winners" className="py-24 bg-gradient-to-b from-green-900/10 to-black">
              <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">WINNERS</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-green-600 to-sky-500 mx-auto mb-4"></div>
                  <p className="font-mono-pixel text-lg text-gray-400 max-w-2xl mx-auto">
                    Congratulations to the top 3 teams who dominated Cook Crack Capture CTF!
                  </p>
                </motion.div>

                {/* Winners Podium - Top 3 teams with special styling */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  {winnersData.map((winner, index) => (
                    <motion.div
                      key={winner.position}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      animate={{
                        y: [0, -8, 0],
                        transition: {
                          duration: 3 + index * 0.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        rotateY: 5,
                        y: -12,
                        transition: { duration: 0.3 }
                      }}
                      className="glass modern-card rounded-xl p-8 text-center relative overflow-hidden group"
                      style={{
                        background: winner.position === 1 
                          ? 'rgba(234, 179, 8, 0.1)' 
                          : 'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(12px)',
                        border: `2px solid ${winner.colors.glow.replace('0.8', '0.4')}`,
                        boxShadow: `0 0 40px ${winner.colors.glow.replace('0.8', '0.6')}, 0 0 80px ${winner.colors.glow.replace('0.8', '0.4')}, 0 0 120px ${winner.colors.glow.replace('0.8', '0.2')}, 0 8px 32px rgba(0, 0, 0, 0.3)`
                      }}
                    >
                      {/* Position Badge */}
                      <div className={`absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-r ${winner.colors.gradient} flex items-center justify-center`}>
                        <span className="font-pixel text-sm text-white font-bold">{winner.position}</span>
                      </div>

                      {/* Winner Crown/Medal Animation */}
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-6xl mb-6"
                      >
                        {winner.emoji}
                      </motion.div>

                      {/* Team Name */}
                      <h3 className={`font-pixel text-xl md:text-2xl mb-4 ${winner.colors.text} relative z-10`}
                          style={{
                            textShadow: `0 0 20px ${winner.colors.glow}`
                          }}>
                        {winner.name}
                      </h3>

                      {/* Prize Badge - Cyberpunk style */}
                      <div className={`inline-flex items-center px-4 py-2 rounded-sm text-sm font-pixel ${winner.colors.text} border-2 ${winner.colors.border} mb-4`}
                           style={{
                             background: `linear-gradient(45deg, ${winner.colors.glow.replace('0.8', '0.05')}, ${winner.colors.glow.replace('0.8', '0.1')})`,
                             textShadow: `0 0 10px ${winner.colors.glow}`,
                             boxShadow: `0 0 20px ${winner.colors.glow.replace('0.8', '0.3')}`
                           }}>
                        {winner.prize}
                      </div>

                      {/* Celebration Particles */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            className={`absolute w-2 h-2 ${winner.colors.text.replace('text-', 'bg-')} rounded-full`}
                            style={{
                              left: `${10 + i * 20}%`,
                              top: `${20 + i * 15}%`,
                            }}
                            animate={{
                              y: [0, -15, 0],
                              opacity: [0, 1, 0],
                              scale: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                          />
                        ))}
                      </motion.div>

                      {/* Glowing Border Effect on Hover */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                           style={{
                             background: `linear-gradient(45deg, ${winner.colors.glow}, #22c55e, ${winner.colors.glow})`,
                             mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                             maskComposite: 'xor',
                             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                             WebkitMaskComposite: 'xor',
                             padding: '2px'
                           }}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Celebration Message */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-center mt-16"
                >
                  <div className="glass modern-card rounded-2xl p-8 max-w-2xl mx-auto">
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 2, -2, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="text-6xl mb-6 flex justify-center space-x-2"
                    >
                      <span>🎊</span>
                      <span>🏆</span>
                      <span>🎊</span>
                    </motion.div>
                    <h3 className="font-pixel text-xl md:text-2xl mb-4 text-green-400">
                      CTF COMPLETE
                    </h3>
                    <p className="font-mono-pixel text-base text-gray-400 leading-relaxed">
                      Thank you to all participants who made Cook Crack Capture an incredible success! 
                      These champions have showcased exceptional skills in cybersecurity and problem-solving.
                    </p>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* About Section - Event concept and features */}
            <section id="about" className="pt-24 from-black/50 to-black/40 bg-gradient-to-b">
              <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">ABOUT</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-green-600 to-sky-500 mx-auto mb-8"></div>
                  <p className="font-mono-pixel text-xl md:text-2xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
                    {about}
                  </p>
                </motion.div>

                {/* Feature Cards Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">AIM</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-green-600 to-sky-500 mx-auto mb-8"></div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                  {aimData.map((item, index) => {
                    const aimStyles = [
                      { bg: 'from-yellow-500/20 to-green-600/20', iconColor: 'text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]', Icon: Zap },
                      { bg: 'from-yellow-500/20 to-blue-500/20', iconColor: 'text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]', Icon: Clock },
                      { bg: 'from-green-500/20 to-blue-500/20', iconColor: 'text-green-400', Icon: GraduationCap },
                    ];
                    const style = aimStyles[index % aimStyles.length];
                    const Icon = style.Icon;
                    return (
                      <div key={index} className="glass modern-card rounded-2xl p-8 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br ${style.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                          <Icon className={style.iconColor} size={36} />
                        </div>
                        <h3 className={`font-pixel text-base mb-4 ${style.iconColor}`}>{item.title}</h3>
                        <p className="font-mono-pixel text-base text-gray-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                  </motion.div>
                </motion.div>
              </div>
            </section>

            {/* Register Now */}
            <section id="gallery" className="pt-20 bg-black/40 bg-gradient-to-b">
              <div className="max-w-5xl flex flex-col items-center justify-center mx-auto px-6">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16 mt-14"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">GALLERY</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-green-600 to-sky-500 mx-auto"></div>
                </motion.div>

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-md md:w-xl"
                >
                  <div className="glass modern-card rounded-2xl p-8 text-center">

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="font-pixel text-2xl md:text-3xl mb-2 text-white"
                      style={{
                        textShadow: '0 0 20px rgba(147, 51, 234, 0.6)'
                      }}
                    >
                      Break the Bad
                    </motion.h3>

                    {/* Guest Title */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="font-mono-pixel text-lg md:text-xl mb-6"
                    >
                      Capture the Flag
                    </motion.p>

                    {/* LinkedIn Link */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <motion.a
                        href="/cookcrackcapture/gallery"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-2 font-mono-pixel text-base text-green-500 hover:text-purple-300 transition-colors group"
                      >
                        <span className='text-[clamp(0.8rem,1vw,1rem)] cursor-pointer'>View Event Gallery</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Chief Guest Section */}
            {/*<section id="chief-guest" className="py-24 bg-black/40 bg-gradient-to-b">
              <div className="max-w-4xl mx-auto px-6">
                {/* Section Header */}
            {/*<motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">CHIEF GUEST</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-green-600 to-sky-500 mx-auto"></div>
                </motion.div>

                {/* Chief Guest Card */}
            {/*<motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-2xl mx-auto"
                >
                  <div className="glass modern-card rounded-2xl p-8 text-center">
                    {/* Guest Photo */}
            {/*<motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="mb-6"
                    >
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <Image
                          src="/images/people/guest.png"
                          alt="Varun Kohli - CEO of Coding Blocks"
                          width={128}
                          height={128}
                          quality={100}
                          className="w-full h-full object-cover rounded-full border-4 border-gradient-to-r from-green-600 to-sky-500"
                          style={{
                            boxShadow: '0 0 30px rgba(147, 51, 234, 0.4), 0 0 60px rgba(6, 182, 212, 0.2)',
                            imageRendering: 'crisp-edges'
                          }}
                          sizes="128px"
                        />
                        {/* Glowing Ring Animation */}
            {/*<motion.div
                          className="absolute inset-0 rounded-full border-2 border-transparent"
                          style={{
                            background: 'linear-gradient(45deg, #8B5CF6, #06B6D4, #8B5CF6)',
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'xor',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'xor',
                            padding: '2px'
                          }}
                          animate={{
                            rotate: [0, 360]
                          }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Guest Name */}
            {/*<motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="font-pixel text-2xl md:text-3xl mb-2 text-white"
                      style={{
                        textShadow: '0 0 20px rgba(147, 51, 234, 0.6)'
                      }}
                    >
                      VARUN KOHLI
                    </motion.h3>

                    {/* Guest Title */}
            {/*<motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="font-mono-pixel text-lg md:text-xl mb-6 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)]"
                    >
                      CEO of Coding Blocks
                    </motion.p>

                    {/* LinkedIn Link */}
            {/*<motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <motion.a
                        href="https://www.linkedin.com/in/kohli12/?originalSubdomain=in"
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center space-x-2 font-mono-pixel text-base text-green-500 hover:text-purple-300 transition-colors group"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>Connect on LinkedIn</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            */}

            <section id="rules" className="py-24 bg-black/40 bg-gradient-to-b pt-10">
              <div className="max-w-5xl mx-auto px-6 pt-30">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">RULES & GUIDELINES</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-green-600 mx-auto"></div>
                </motion.div>

                {/* Rules Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {rulesData.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                      className="glass modern-card rounded-xl p-6 border-t-2 border-green-500/30 hover:border-green-500/70 transition-colors"
                    >
                      <h3 className="font-pixel text-xl mb-4 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.4)] flex items-center space-x-3">
                        <span className="text-yellow-500 font-mono-pixel opacity-70">#{rule.id}</span>
                        <span>{rule.title}</span>
                      </h3>
                      <ul className="space-y-2">
                        {rule.points.map((point, ptIndex) => (
                          <li key={ptIndex} className="font-mono-pixel text-sm text-gray-300 leading-relaxed flex items-start">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-yellow-400 to-green-500 flex-shrink-0 mr-3 mt-1.5 shadow-[0_0_8px_rgba(163,230,53,0.8)]"></div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Format Section - 3-hour timeline */}
            <section id="format" className="py-24 bg-black/40 bg-gradient-to-b">
              <div className="max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">Event Format</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-yellow-500 to-green-600 mx-auto"></div>
                </motion.div>

                {/* Timeline Items */}
                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    // Individual Timeline Item or Header
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={item.isHeader ? "mb-4" : "flex items-center space-x-6"}
                    >
                      {item.isHeader ? (
                        // Day Header
                        <div className="text-center">
                          <h3 className="font-pixel text-xl md:text-2xl text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.6)] mb-2 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">
                            {item.time}
                          </h3>
                          <div className="w-24 h-0.5 bg-gradient-to-r from-yellow-500 to-green-600 mx-auto"></div>
                        </div>
                      ) : (
                        <>
                          {/* Timeline Dot - Styled with CSS class from globals.css */}
                          <div className="bg-gradient-to-br from-yellow-500 to-green-500 w-4 h-4 rounded-full flex-shrink-0 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
                          {/* Timeline Content Card */}
                          <div className="glass modern-card rounded-xl p-6 flex-1 hover:border-yellow-500/30 transition-colors border border-transparent">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="font-pixel text-base text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)] mb-2">{item.time}</div>
                                <h4 className="font-pixel text-lg md:text-xl mb-2 text-white">{item.title}</h4>
                                <p className="font-mono-pixel text-sm text-gray-400 mb-2">{item.desc}</p>
                                {item.mode && (
                                  <div className="inline-block px-2 py-1 bg-green-500/20 text-green-400 font-mono-pixel text-xs rounded border border-green-500/30 mb-2">
                                    Mode: {item.mode}
                                  </div>
                                )}
                                {item.categories && item.categories.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {item.categories.map((cat, i) => (
                                      <span key={i} className="px-2 py-1 bg-yellow-500/10 text-yellow-500 font-mono-pixel text-xs rounded border border-yellow-500/20">
                                        {cat}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Sponsors Section - Show event sponsors */}
            <section className="py-16 bg-black/40 bg-gradient-to-b">
              <div className="max-w-6xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <h2 className="font-pixel text-2xl md:text-3xl mb-6 text-gray-300" style={{ textShadow: '0 0 10px rgba(147, 51, 234, 0.6)' }}>
                    RESOURCES
                  </h2>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-green-600 to-sky-500 mx-auto"></div>
                </motion.div>

                {/* Sponsor Logos - Clean display without containers */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20"
                >
                  {/* KDK Software Logo - Clickable */}
                  {/*<motion.a
                    href="https://www.kdksoftware.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src="/images/logos/kdk-logo.png"
                      alt="KDK Software"
                      width={180}
                      height={90}
                      quality={100}
                      className="max-w-full max-h-full object-contain hover:opacity-80 transition-opacity"
                      style={{
                        imageRendering: 'crisp-edges'
                      }}
                      sizes="(max-width: 768px) 160px, 180px"
                    />
                  </motion.a>*/}

                  {/* Coding Blocks Logo - Clickable */}
                  {/*<motion.a
                    href="https://www.codingblocks.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src="/images/logos/coding-blocks-logo.png"
                      alt="Coding Blocks"
                      width={180}
                      height={90}
                      quality={100}
                      className="max-w-full max-h-full object-contain hover:opacity-80 transition-opacity"
                      style={{
                        imageRendering: 'crisp-edges'
                      }}
                      sizes="(max-width: 768px) 160px, 180px"
                    />
                  </motion.a>*/}
                </motion.div>

                {/* View All Resources Link */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center mt-10"
                >
                  <Link
                    href="/cookcrackcapture/resources"
                    className="font-mono-pixel text-md text-gray-400 hover:text-green-500 transition-colors inline-flex items-center space-x-2 group"
                  >
                    <span>View All Resources</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* Footer - Minimal footer with logo only */}
            <footer className='bg-black/40' style={{ paddingTop: '2px', paddingBottom: '2px' }}>
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-end">
                  <Image
                    src="/images/logos/logo.png"
                    alt="IEEE RAS Logo"
                    width={192}
                    height={192}
                    quality={100}
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain opacity-90"
                    style={{
                      // Purple glow with hue rotation for color variation
                      filter: 'drop-shadow(0 0 12px rgba(147, 51, 234, 0.6)) hue-rotate(280deg)',
                      imageRendering: 'crisp-edges'
                    }}
                    sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
                  />
                </div>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}
