'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { judges } from 'data/judgeData';
/**
 * Judges Page Component for Pixel Palettes Hackathon
 * 
 * This component displays the panel of judges for the Pixel Palettes hackathon event.
 * It features professional judge profiles with their expertise, affiliations, and
 * LinkedIn contact information. The page includes scroll-triggered animations and
 * maintains the cyberpunk aesthetic of the event.
 * 
 * Key Features:
 * - Responsive grid layout for judge cards (1 column mobile, 2 columns desktop)
 * - Individual judge profiles with photos, credentials, and expertise tags
 * - LinkedIn integration for professional networking
 * - Scroll-triggered Framer Motion animations with staggered reveals
 * - Judging criteria section explaining evaluation process
 * - Consistent navigation and footer with event branding
 * - Glassmorphism design with cyberpunk background effects
 * 
 * Data Structure:
 * - Judge objects contain id, name, affiliation, role, image, LinkedIn URL, and expertise array
 * - All content uses placeholder data that should be updated with real judge information
 * 
 * @returns {JSX.Element} Complete judges page with navigation and footer
 */

type JudgesTypes = {
  id: number,
  name: string,
  affiliation: string,
  role: string,
  image: string, // Placeholder - to be replaced with actual photo
  linkedinUrl: string, // Placeholder - to be updated
  expertise: string[],
};

export default function Judges() {
  /**
   * Mobile menu visibility state
   * Controls whether the mobile navigation menu is open or closed
   */
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auto-scroll to center the "To Be Announced" section
  useEffect(() => {
    const scrollToAnnouncement = () => {
      const announcementSection = document.querySelector('[data-announcement-section]');
      if (announcementSection) {
        const elementTop = announcementSection.getBoundingClientRect().top + window.pageYOffset;
        const elementHeight = announcementSection.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        const scrollTo = elementTop - (windowHeight - elementHeight) / 2;

        window.scrollTo({
          top: Math.max(0, scrollTo),
          behavior: 'smooth'
        });
      }
    };

    // Delay scroll to ensure content is rendered
    const timer = setTimeout(scrollToAnnouncement, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects - Layered gradients and patterns for cyberpunk aesthetic */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>

      {/* Animated Grid Background - CSS-generated retro grid pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(147, 51, 234, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(147, 51, 234, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px' // 50px grid for subtle pattern
        }}></div>
      </div>

      {/* Navigation Bar - Fixed header with glassmorphism effect */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong" style={{ paddingTop: '1px', paddingBottom: '2px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Link - Returns to main homepage */}
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
            {/* Desktop Navigation Menu - Event-specific links */}
            <div className="hidden md:flex space-x-8">
              <Link href="/pixelpalettes#about" className="text-xl hover:text-purple-400 transition-colors font-mono-pixel">About</Link>
              {/* Current page highlighted with purple color */}
              <Link href="/pixelpalettes/judges" className="text-xl text-purple-400 font-mono-pixel">Judges</Link>
              <Link href="/pixelpalettes/sponsors" className="text-xl hover:text-purple-400 transition-colors font-mono-pixel">Sponsors</Link>
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
            <div className="max-w-7xl mx-auto px-6 py-4">
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
                    className="block px-4 py-3 text-lg font-mono-pixel text-purple-400 border-b border-gray-800/30"
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
                    className="block px-4 py-3 text-lg font-mono-pixel text-gray-300 hover:text-purple-400 transition-colors duration-300"
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

      {/* Main Content Container */}
      <main className="pt-32 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6 relative">
          {/* Back Navigation Button - Animated slide-in from left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/pixelpalettes"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors font-mono-pixel"
            >
              <ArrowLeft size={18} />
              <span>Back to Event</span>
            </Link>
          </motion.div>

          {/* Judges Section - Hidden with blur overlay and "To Be Announced" message */}
          <div className="relative">
            {/* Original Content - Blurred but preserved */}
            <div className="blur-lg select-none pointer-events-none">
              {/* Page Header - Title and description with fade-in animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-center mb-16 relative z-20"
                style={{ isolation: 'isolate' }} // Creates new stacking context
              >
                <h1 className="font-pixel text-4xl md:text-6xl mb-6 neon-glow relative z-10">OUR JUDGES</h1>
                {/* Decorative gradient underline */}
                <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8 relative z-10"></div>
                <p className="font-mono-pixel text-xl text-gray-300 max-w-3xl mx-auto relative z-10">
                  Meet our distinguished panel of judges who will evaluate your innovative projects.
                  These industry experts bring years of experience and expertise to guide and assess your work.
                </p>
              </motion.div>

              {/* Judges Grid - Responsive layout with scroll-triggered animations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-0">
                {(judges as JudgesTypes[]).map((judge, index) => (
                  // Individual Judge Card with staggered entrance animation
                  <motion.div
                    key={judge.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }} // Trigger animation 50px before entering viewport
                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }} // Staggered by 150ms
                    className="glass modern-card rounded-2xl p-6 md:p-8 text-center relative"
                  >
                    {/* Judge Profile Photo Section */}
                    <div className="mb-6">
                      <motion.div
                        whileHover={{ scale: 1.05 }} // Subtle hover scale effect
                        className="relative mx-auto w-32 h-32 md:w-40 md:h-40"
                      >
                        {/* Photo container with gradient border and glow effects */}
                        <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border-2 border-purple-400/30 rounded-full flex items-center justify-center overflow-hidden">
                          {/* Enhanced Silhouette Placeholder */}
                          <div className="w-full h-full relative bg-gradient-to-br from-gray-800 via-gray-900 to-black flex items-center justify-center">
                            <svg
                              width="120"
                              height="120"
                              viewBox="0 0 120 120"
                              className="opacity-60"
                              style={{
                                filter: 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.3))'
                              }}
                            >
                              {/* Robotic/Tech-themed silhouette based on judge index */}
                              {index === 0 && (
                                // Dr. Sarah Chen - Female AI researcher silhouette
                                <g fill="url(#judgeGradient1)">
                                  <defs>
                                    <linearGradient id="judgeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#9333ea" stopOpacity="0.8" />
                                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                                    </linearGradient>
                                  </defs>
                                  {/* Head shape */}
                                  <ellipse cx="60" cy="35" rx="18" ry="22" />
                                  {/* Hair/headset indication */}
                                  <path d="M42 25 Q60 15 78 25 Q78 20 60 18 Q42 20 42 25" />
                                  {/* Shoulders/torso */}
                                  <path d="M30 85 Q30 70 45 65 Q60 60 75 65 Q90 70 90 85 L90 120 L30 120 Z" />
                                  {/* Tech elements - circuit lines */}
                                  <line x1="45" y1="75" x2="55" y2="85" stroke="#9333ea" strokeWidth="1" opacity="0.5" />
                                  <line x1="65" y1="85" x2="75" y2="75" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
                                  <circle cx="50" cy="80" r="2" fill="#9333ea" opacity="0.7" />
                                  <circle cx="70" cy="80" r="2" fill="#06b6d4" opacity="0.7" />
                                </g>
                              )}

                              {index === 1 && (
                                // Alex Rodriguez - Male CTO silhouette
                                <g fill="url(#judgeGradient2)">
                                  <defs>
                                    <linearGradient id="judgeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#dc2626" stopOpacity="0.8" />
                                      <stop offset="100%" stopColor="#9333ea" stopOpacity="0.6" />
                                    </linearGradient>
                                  </defs>
                                  {/* Head shape - more angular */}
                                  <path d="M42 35 Q42 15 60 15 Q78 15 78 35 Q78 45 75 50 Q60 55 45 50 Q42 45 42 35" />
                                  {/* Short hair */}
                                  <path d="M45 20 Q60 12 75 20 Q75 15 60 13 Q45 15 45 20" />
                                  {/* Shoulders/suit jacket */}
                                  <path d="M25 85 Q25 68 42 62 Q60 58 78 62 Q95 68 95 85 L95 120 L25 120 Z" />
                                  {/* Tie/collar indication */}
                                  <path d="M55 62 L65 62 L62 75 L58 75 Z" fill="#06b6d4" opacity="0.6" />
                                  {/* Tech badge/pin */}
                                  <rect x="68" y="68" width="6" height="6" rx="1" fill="#dc2626" opacity="0.8" />
                                  <circle cx="71" cy="71" r="1" fill="#ffffff" opacity="0.9" />
                                </g>
                              )}

                              {index === 2 && (
                                // Maya Patel - Female designer silhouette
                                <g fill="url(#judgeGradient3)">
                                  <defs>
                                    <linearGradient id="judgeGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                                      <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
                                    </linearGradient>
                                  </defs>
                                  {/* Head shape */}
                                  <ellipse cx="60" cy="35" rx="17" ry="21" />
                                  {/* Long hair silhouette */}
                                  <path d="M43 25 Q60 12 77 25 Q82 35 80 45 Q75 55 70 60 Q60 58 50 60 Q45 55 40 45 Q38 35 43 25" />
                                  {/* Shoulders/creative top */}
                                  <path d="M32 85 Q32 72 48 67 Q60 62 72 67 Q88 72 88 85 L88 120 L32 120 Z" />
                                  {/* Design elements - creative patterns */}
                                  <circle cx="48" cy="75" r="3" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.6" />
                                  <circle cx="72" cy="75" r="3" fill="none" stroke="#ec4899" strokeWidth="1" opacity="0.6" />
                                  <path d="M52 82 Q60 78 68 82" stroke="#06b6d4" strokeWidth="1" fill="none" opacity="0.5" />
                                </g>
                              )}

                              {index === 3 && (
                                // Dr. James Wilson - Male professor silhouette
                                <g fill="url(#judgeGradient4)">
                                  <defs>
                                    <linearGradient id="judgeGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
                                      <stop offset="0%" stopColor="#059669" stopOpacity="0.8" />
                                      <stop offset="100%" stopColor="#9333ea" stopOpacity="0.6" />
                                    </linearGradient>
                                  </defs>
                                  {/* Head shape - slightly larger (academic) */}
                                  <ellipse cx="60" cy="35" rx="19" ry="23" />
                                  {/* Receding hairline indication */}
                                  <path d="M48 22 Q60 18 72 22 Q70 18 60 17 Q50 18 48 22" />
                                  {/* Academic jacket/blazer */}
                                  <path d="M28 85 Q28 70 44 64 Q60 59 76 64 Q92 70 92 85 L92 120 L28 120 Z" />
                                  {/* Academic elements - book/tablet indication */}
                                  <rect x="45" y="72" width="8" height="12" rx="1" fill="#059669" opacity="0.7" />
                                  <line x1="46" y1="75" x2="52" y2="75" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" />
                                  <line x1="46" y1="78" x2="52" y2="78" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" />
                                  <line x1="46" y1="81" x2="52" y2="81" stroke="#ffffff" strokeWidth="0.5" opacity="0.8" />
                                </g>
                              )}

                              {/* Common tech overlay elements for all silhouettes */}
                              <g opacity="0.3">
                                {/* Circuit pattern overlay */}
                                <line x1="20" y1="100" x2="30" y2="100" stroke="#9333ea" strokeWidth="0.5" />
                                <line x1="30" y1="100" x2="30" y2="95" stroke="#9333ea" strokeWidth="0.5" />
                                <line x1="90" y1="105" x2="100" y2="105" stroke="#06b6d4" strokeWidth="0.5" />
                                <line x1="90" y1="105" x2="90" y2="110" stroke="#06b6d4" strokeWidth="0.5" />
                                <circle cx="25" cy="95" r="1" fill="#9333ea" />
                                <circle cx="95" cy="110" r="1" fill="#06b6d4" />
                              </g>
                            </svg>

                            {/* Subtle tech overlay pattern */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                              <div
                                className="w-full h-full"
                                style={{
                                  backgroundImage: `
                                    radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.3) 1px, transparent 1px),
                                    radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                                  `,
                                  backgroundSize: '20px 20px'
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Judge Information Section */}
                    <div className="mb-6">
                      {/* Judge Name - Primary identification */}
                      <h2 className="font-pixel text-xl md:text-2xl mb-2 text-purple-400">
                        {judge.name}
                      </h2>

                      {/* Professional Affiliation */}
                      <p className="font-mono-pixel text-base text-gray-300 mb-2">
                        {judge.affiliation}
                      </p>

                      {/* Primary Role/Expertise */}
                      <p className="font-mono-pixel text-sm text-cyan-400 mb-4">
                        {judge.role}
                      </p>

                      {/* Expertise Tags - Color-coded skill indicators */}
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {judge.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-400/50 rounded-full text-xs font-mono-pixel"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* LinkedIn Contact Button - Professional networking link */}
                    <motion.a
                      href={judge.linkedinUrl}
                      target="_blank" // Open in new tab
                      rel="noopener noreferrer" // Security best practice
                      className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-mono-pixel text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaLinkedin size={20} />
                      <span>LinkedIn</span>
                    </motion.a>
                  </motion.div>
                ))}
              </div>

              {/* Judging Criteria Section - Explains evaluation process */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="text-center mt-16 p-8 glass modern-card rounded-2xl"
              >
                <h3 className="font-pixel text-2xl md:text-3xl mb-4 text-cyan-400">
                  JUDGING CRITERIA
                </h3>
                {/* Three-column grid of evaluation criteria */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  {/* Innovation Criterion */}
                  <div className="text-center">
                    <h4 className="font-pixel text-lg text-purple-400 mb-2">Innovation</h4>
                    <p className="font-mono-pixel text-sm text-gray-300">
                      Creativity and originality of the solution
                    </p>
                  </div>
                  {/* Technical Excellence Criterion */}
                  <div className="text-center">
                    <h4 className="font-pixel text-lg text-purple-400 mb-2">Technical Excellence</h4>
                    <p className="font-mono-pixel text-sm text-gray-300">
                      Quality of code and implementation
                    </p>
                  </div>
                  {/* Impact Criterion */}
                  <div className="text-center">
                    <h4 className="font-pixel text-lg text-purple-400 mb-2">Impact</h4>
                    <p className="font-mono-pixel text-sm text-gray-300">
                      Potential real-world application and value
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* "To Be Announced" Overlay */}
            <div className="absolute inset-0 flex items-center justify-center z-30" data-announcement-section>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center p-8 glass-strong rounded-3xl border border-purple-400/30 backdrop-blur-sm"
                style={{
                  background: 'rgba(0, 0, 0, 0.8)',
                  boxShadow: '0 0 40px rgba(147, 51, 234, 0.3)'
                }}
              >
                <motion.div
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(147, 51, 234, 0.8)',
                      '0 0 40px rgba(147, 51, 234, 1)',
                      '0 0 20px rgba(147, 51, 234, 0.8)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <h2 className="font-pixel text-3xl md:text-5xl lg:text-6xl mb-6 text-purple-400">
                    TO BE ANNOUNCED
                  </h2>
                </motion.div>

                <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-6"></div>

                <p className="font-mono-pixel text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Our distinguished panel of judges will be revealed soon.
                  Stay tuned for announcements about the industry experts
                  who will evaluate your innovative projects.
                </p>

                <motion.div
                  className="mt-8 flex justify-center space-x-2"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-purple-400 rounded-full"
                      style={{
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
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