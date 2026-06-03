'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { CosmicBackground } from '@/components/WingsAndWires/CosmicBackground';
import { galleryData } from 'data/wingsandwires/galleryData';
import styles from './gallery.module.css';

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hoverZones = 9;
  const pictures = galleryData.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Dynamically generate the nth-child hover rules for however many pictures exist
  const dynamicStyle = `
    ${galleryData.map((_, idx) => `
      .${styles.nav}:has(a:nth-child(${idx + 1}):is(:hover,:focus-visible)) { --p: ${idx + 1}; }
    `).join('\n')}
  `;

  return (
    <div className="bg-black/60 text-white min-h-screen">
      <CosmicBackground />

      {/* Navigation requires high z-index */}
      <div className="relative z-[100]">
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
          <div className="max-w-6xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center space-x-3">
                  <Image
                    src="/images/logos/logo.png"
                    alt="Pixel Palettes Logo"
                    width={256}
                    height={256}
                    priority
                    quality={100}
                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                    style={{ filter: 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.8))', imageRendering: 'crisp-edges' }}
                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                  />
                </Link>
              </div>
              <div className="hidden md:flex space-x-8">
                <Link href="/wingsandwires#about" className="text-xl hover:text-purple-400 transition-colors font-mono-pixel">About</Link>
                <Link href="/wingsandwires/resources" className="text-xl hover:text-purple-400 transition-colors font-mono-pixel">Resources</Link>
                <Link href="/wingsandwires/gallery" className="text-xl text-purple-400 font-mono-pixel">Gallery</Link>
              </div>
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
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800/50"
            >
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/wingsandwires#about" className="block px-4 py-3 text-lg font-mono-pixel text-gray-300 hover:text-purple-400" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                <Link href="/wingsandwires/resources" className="block px-4 py-3 text-lg font-mono-pixel text-gray-300 hover:text-purple-400" onClick={() => setIsMobileMenuOpen(false)}>Resources</Link>
                <Link href="/wingsandwires/gallery" className="block px-4 py-3 text-lg font-mono-pixel text-purple-400" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
              </div>
            </motion.div>
          )}
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: dynamicStyle }} />

      <div className="pt-48 relative z-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
            <Link href="/wingsandwires" className="inline-flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors font-mono-pixel">
              <ArrowLeft size={18} />
              <span>Back to Event</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <main className={styles.container}>
        <div className="relative mt-4 mb-12 z-50 text-center w-full px-4">
          <h1 className="font-pixel text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 drop-shadow-[0_0_15px_rgba(147,51,234,0.6)] py-2">EVENT GALLERY</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 mx-auto mt-2"></div>
        </div>

        {/* The 3D Interactive Gallery */}
        <nav
          className={styles.nav}
          style={{
            '--max-p': pictures,
            '--max-z': hoverZones,
          } as React.CSSProperties}
        >
          {galleryData.map((item, i) => (
            <a
              key={item.id}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={styles.itemAnchor}
              style={{
                '--i': i,
              } as React.CSSProperties}
            >
              <div className={styles.img}>
                <CldImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  crop={{ type: 'auto', source: true }}
                  className="object-cover"
                />
              </div>
              <aside className={styles.hoverZone}>
                {Array.from({ length: hoverZones }).map((_, z) => (
                  <i key={z} />
                ))}
              </aside>
            </a>
          ))}
        </nav>
      </main>

      {/* Footer */}
      <footer className="relative py-12 border-t border-gray-800/50 bg-black/80 z-[100]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Image
                src="/images/logos/logo.png"
                alt="Logo"
                width={48}
                height={48}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.6))' }}
              />
              <div>
                <h3 className="font-pixel text-purple-400">Wings And Wires</h3>
                <p className="text-gray-400 text-sm font-mono-pixel">Robotics Workshop</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm font-mono-pixel">
                © 2025 IEEE RAS Manipal University Jaipur. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
