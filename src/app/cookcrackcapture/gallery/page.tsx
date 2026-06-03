'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { ToxicBackground } from '@/components/CookCrackCapture/ToxicBackground';
import { galleryData } from 'data/cookcrackcapture/galleryData';
import Navbar from '@/components/CookCrackCapture/Navbar';
import styles from './gallery.module.css';

export default function GalleryPage() {
  const [mounted, setMounted] = useState(false);
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
      <ToxicBackground />

      {/* Navigation requires high z-index */}
      <div className="relative z-[100]">
        <Navbar />
      </div>

      <style dangerouslySetInnerHTML={{ __html: dynamicStyle }} />

      <div className="pt-48 relative z-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-8">
            <Link href="/cookcrackcapture" className="inline-flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors font-mono-pixel">
              <ArrowLeft size={18} />
              <span>Back to Event</span>
            </Link>
          </motion.div>
        </div>
      </div>

      <main className={styles.container}>
        <div className="relative mt-4 mb-12 z-50 text-center w-full px-4">
          <h1 className="font-pixel text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)] py-2">EVENT GALLERY</h1>
          <div className="w-20 h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 mx-auto mt-2"></div>
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
                alt="Pixel Palettes Logo"
                width={48}
                height={48}
                className="object-contain"
                style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.6))' }}
              />
              <div>
                <h3 className="font-pixel text-green-500">Cook Crack Capture</h3>
                <p className="text-gray-400 text-sm font-mono-pixel">Capture the Flag</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm font-mono-pixel">
                © 2026 IEEE RAS Manipal University Jaipur. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
