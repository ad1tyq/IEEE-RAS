'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      const nav = document.querySelector('nav');

      if (isMobileMenuOpen && nav && !nav.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '/cookcrackcapture#about' },
    { name: 'Resources', href: '/cookcrackcapture/resources' },
    { name: 'Gallery', href: '/cookcrackcapture/gallery' },
  ];

  return (
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
                style={{
                  filter: 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.8))',
                  imageRendering: 'crisp-edges'
                }}
                sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              // Highlight the About link if we are on the main event page
              const isActive = pathname === link.href || (link.name === 'About' && pathname === '/cookcrackcapture');
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xl font-mono-pixel transition-colors ${
                    isActive ? 'text-green-500' : 'text-gray-300 hover:text-green-500'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
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
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.name === 'About' && pathname === '/cookcrackcapture');
                return (
                  <motion.div
                    key={link.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 text-lg font-mono-pixel transition-colors duration-300 border-b border-gray-800/30 ${
                        isActive ? 'text-green-500' : 'text-gray-300 hover:text-green-500'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
