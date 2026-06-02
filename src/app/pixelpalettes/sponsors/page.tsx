'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Globe } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { sponsors } from 'data/wingsandwires/sponsorData';

/**
 * Sponsors Page Component for Pixel Palettes Hackathon
 * 
 * This component displays the sponsors and partners supporting the Pixel Palettes hackathon.
 * It features detailed sponsor profiles with logos, descriptions, and LinkedIn contact information.
 * The page maintains equal visual prominence for all sponsors without tier distinctions.
 * 
 * Key Features:
 * - Equal visual prominence for all sponsors (no tier-based categorization)
 * - Individual sponsor profiles with logos, descriptions, and LinkedIn links
 * - Scroll-triggered Framer Motion animations with staggered reveals
 * - Call-to-action section for potential new sponsors
 * - Responsive design with mobile-first approach
 * - Glassmorphism design with cyberpunk theming
 * - Improved spacing between navbar, content, and footer
 * 
 * Data Structure:
 * - Sponsor objects contain id, name, logo, description, and LinkedIn URL
 * - Color themes (purple/cyan) for visual distinction between sponsors
 * - All sponsors have equal visual weight and prominence
 * 
 * @returns {JSX.Element} Complete sponsors page with navigation and footer
 */

// --- Define the type for a single sponsor object ---
type Sponsor = {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  linkedinUrl: string;
  color: 'purple' | 'cyan';
};


export default function SponsorsPage() {
  /**
   * State to track component mount status for hydration safety
   * Prevents SSR/CSR mismatch in Next.js applications
   */
  const [mounted, setMounted] = useState(false);

  /**
   * Mobile menu visibility state
   * Controls whether the mobile navigation menu is open or closed
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Effect hook to set mounted state after component initialization
   * This ensures that client-side features only run after hydration
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until component is mounted (avoids hydration mismatch)
  if (!mounted) return null;


  /**
   * Framer Motion animation variants for container-level staggered animations
   * Controls the overall reveal timing of child elements
   */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3 // 300ms delay between child animations for better spacing
      }
    }
  };

  /**
   * Framer Motion animation variants for individual sponsor cards
   * Creates smooth slide-up entrance animations with fade-in
   */
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar - Fixed header with glassmorphism effect */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo Section - Pixel Palettes branding */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/images/logos/logo.png"
                  alt="Pixel Palettes Logo"
                  width={256}
                  height={256}
                  priority // Load immediately for above-the-fold content
                  quality={100}
                  className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                  style={{
                    filter: 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.8))',
                    imageRendering: 'crisp-edges'
                  }}
                  sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                />
              </Link>
            </div>
            {/* Desktop Navigation Menu - Event-specific links */}
            <div className="hidden md:flex space-x-8">
              <Link href="/pixelpalettes#about" className="text-xl hover:text-purple-400 transition-colors font-mono-pixel">About</Link>
              <Link href="/pixelpalettes/judges" className="text-xl hover:text-purple-400 transition-colors font-mono-pixel">Judges</Link>
              {/* Current page highlighted with purple color */}
              <Link href="/pixelpalettes/sponsors" className="text-xl text-purple-400 font-mono-pixel">Sponsors</Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-300 hover:text-white transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800/50"
          >
            <div className="max-w-6xl mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/pixelpalettes#about"
                    className="block px-4 py-3 text-lg font-mono-pixel text-gray-300 hover:text-purple-400 transition-colors duration-300 border-b border-gray-800/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/pixelpalettes/judges"
                    className="block px-4 py-3 text-lg font-mono-pixel text-gray-300 hover:text-purple-400 transition-colors duration-300 border-b border-gray-800/30"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Judges
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/pixelpalettes/sponsors"
                    className="block px-4 py-3 text-lg font-mono-pixel text-purple-400"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sponsors
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content Container - Improved spacing from navbar */}
      <main className="pt-48 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Navigation Button - Animated slide-in from left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Link
              href="/pixelpalettes"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors font-mono-pixel"
            >
              <ArrowLeft size={18} />
              <span>Back to Event</span>
            </Link>
          </motion.div>

          {/* Page Header - Title and description with fade-in animation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-24"
          >
            <h1 className="font-pixel text-4xl md:text-6xl mb-6 neon-glow">OUR SPONSORS</h1>
            {/* Decorative gradient underline */}
            <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="font-mono-pixel text-xl text-gray-300 max-w-3xl mx-auto">
              We are grateful to our amazing sponsors who make Pixel Palettes possible.
              Their support enables us to create an incredible hackathon experience for all participants.
            </p>
          </motion.div>

          {/* Sponsors Grid - Equal prominence with improved spacing */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-20"
          >
            {(sponsors as Sponsor[]).map((sponsor, index) => (
              // Individual Sponsor Card with alternating left/right layout
              <motion.div
                key={sponsor.id}
                variants={itemVariants}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`glass modern-card rounded-2xl p-10 md:p-16 ${
                  // Alternate layout direction: even indices = left-to-right, odd = right-to-left
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex flex-col md:flex items-center gap-10 md:gap-16`}
              >
                {/* Sponsor Logo - Clean and Transparent */}
                <div className="flex-shrink-0">
                  <motion.a
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    className="block"
                  >
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} Logo`}
                      width={200}
                      height={100}
                      className="object-contain hover:opacity-80 transition-opacity duration-300"
                    />
                  </motion.a>
                </div>

                {/* Content Section - Company information and LinkedIn contact */}
                <div className="flex-1 text-center md:text-left">
                  {/* Company Name - Color-themed heading with equal prominence */}
                  <h2 className={`font-pixel text-3xl md:text-4xl mb-6 ${sponsor.color === 'purple' ? 'text-purple-400' : 'text-cyan-400'
                    }`}>
                    {sponsor.name}
                  </h2>

                  {/* Company Description - Improved spacing and readability */}
                  <p className="font-mono-pixel text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                    {sponsor.description}
                  </p>

                  {/* Contact Buttons - Website and LinkedIn */}
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
                    {/* Website Button - Color-themed outline style */}
                    <motion.a
                      href={sponsor.website}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security best practice
                      whileHover={{ scale: 1.05 }}
                      className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg border-2 transition-colors ${sponsor.color === 'purple'
                          ? 'border-purple-400/50 text-purple-400 hover:bg-purple-400/10'
                          : 'border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10'
                        }`}
                    >
                      <Globe size={20} />
                      <span className="font-mono-pixel text-base">Website</span>
                      <ExternalLink size={16} />
                    </motion.a>

                    {/* LinkedIn Button - Blue themed for LinkedIn branding */}
                    <motion.a
                      href={sponsor.linkedinUrl}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security best practice
                      className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-mono-pixel text-base transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedin size={20} />
                      <span>LinkedIn</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>


        </div>
      </main>

      {/* Footer - Cyberpunk themed footer with proper styling */}
      <footer className="py-12 border-t border-gray-800/50 bg-black/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Image
                src="/images/logos/logo.png"
                alt="Pixel Palettes Logo"
                width={48}
                height={48}
                className="object-contain"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.6))'
                }}
              />
              <div>
                <h3 className="font-pixel text-purple-400">Pixel Palettes</h3>
                <p className="text-gray-400 text-sm font-mono-pixel">AI & Design Hackathon</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm font-mono-pixel">
                © 2024 IEEE RAS Manipal University Jaipur. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 