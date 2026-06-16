'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Wrench, GraduationCap, ArrowLeft, ExternalLink, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/UnlockD/Navbar';
import Loading from '@/components/UnlockD/loadingComp';
import UnlockDBackground from '@/components/UnlockD/UnlockDBackground';
import { resourcesData } from 'data/unlockd/resourcesData';


// ─── Animation Variants ──────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 100, damping: 15, mass: 0.6 },
  },
};


export default function UnlockDResources() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Documentation' | 'Tooling' | 'Learning'>('All');

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
    const initTimer = setTimeout(() => {
      const hasLoadedUnlockD = sessionStorage.getItem('hasLoadedUnlockD');
      if (!hasLoadedUnlockD) {
        const timer = setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('hasLoadedUnlockD', 'true');
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const quickTimer = setTimeout(() => setIsLoading(false), 50);
        return () => clearTimeout(quickTimer);
      }
    }, 10);
    return () => { clearTimeout(initTimer); clearTimeout(mountTimer); };
  }, []);

  if (!mounted) return null;

  const categories: ('All' | 'Documentation' | 'Tooling' | 'Learning')[] = [
    'All',
    'Documentation',
    'Tooling',
    'Learning',
  ];

  const filteredResources = activeCategory === 'All'
    ? resourcesData
    : resourcesData.filter((resource) => resource.category === activeCategory);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Documentation':
        return BookOpen;
      case 'Tooling':
        return Wrench;
      case 'Learning':
        return GraduationCap;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden" style={{ background: '#020510' }}>
      {/* ── 3D Live WebGL Background Scene ── */}
      <UnlockDBackground />

      {/* ── Ambient overlay layers ── */}
      <div className="fixed inset-0 pointer-events-none z-1" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(2,5,16,0.7) 100%)' }} />

      <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 min-h-screen flex flex-col justify-between"
          >
            <Navbar />

            {/* ── HERO HEADER ── */}
            <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex-grow">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                  <Link
                    href="/unlockd"
                    className="inline-flex items-center space-x-2 font-body text-sm text-cyan-300/60 hover:text-cyan-400 transition-colors group"
                  >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Unlock&apos;d Page</span>
                  </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <div className="unlockd-section-overline">RESOURCE PORTAL</div>
                <h1
                  className="glitch font-heading text-4xl sm:text-5xl md:text-6xl mb-6 ocean-title"
                  data-text="RESOURCES"
                >
                  RESOURCES
                </h1>
                <p className="font-body text-base sm:text-lg text-blue-200/60 max-w-2xl mx-auto">
                  Learning material, official documentation guides, and design tools curated for the participants of Unlock&apos;d 2026.
                </p>
                <div className="unlockd-heading-underline mx-auto mt-6" />
              </motion.div>

              {/* ── FILTER CATEGORY TABS (Floating Bottom Bar) ── */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[520px] z-[100] flex justify-center"
              >
                <div className="flex items-center justify-between w-full bg-[#020510]/90 border border-cyan-400/25 rounded-full p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(0,212,255,0.15)] backdrop-blur-lg backdrop-saturate-[180%] backdrop-contrast-[150%] relative">
                  <div className="absolute inset-0 rounded-full pointer-events-none border border-white/5" />
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    const IconComponent = cat === 'All' ? Layers : getIcon(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`flex-1 flex flex-col items-center justify-center py-2 px-1 md:px-3 rounded-full cursor-pointer transition-all duration-300 outline-none border border-transparent select-none active:scale-[0.93] ${
                          isActive
                            ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(0,212,255,0.2),inset_0_0_8px_rgba(0,212,255,0.1)]'
                            : 'text-blue-200/50 hover:bg-cyan-400/10 hover:text-cyan-400 hover:scale-[1.03]'
                        }`}
                      >
                        <IconComponent size={18} className="transition-transform duration-300" />
                        <span className="font-body text-[9px] md:text-[10px] font-semibold tracking-wider uppercase mt-1">
                          {cat}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>

              {/* ── RESOURCES GRID ── */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredResources.map((resource) => {
                  const Icon = getIcon(resource.category);
                  return (
                    <motion.div
                      key={resource.id}
                      variants={cardVariants}
                      className="prd-card rounded-2xl p-5 md:p-6 flex flex-col justify-between group border border-cyan-400/15 relative overflow-hidden"
                      style={{
                        willChange: 'transform, opacity',
                        contain: 'paint',
                      }}
                      whileHover={{
                        y: -6,
                        scale: 1.02,
                        borderColor: 'rgba(0, 212, 255, 0.45)',
                        boxShadow: '0 20px 40px rgba(0, 212, 255, 0.15)',
                        transition: { duration: 0.3, ease: 'easeOut' },
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className="aim-icon-wrap"
                            style={{
                              width: '42px',
                              height: '42px',
                              borderRadius: '12px',
                              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 96, 255, 0.12) 100%)',
                            }}
                          >
                            <Icon
                              size={20}
                              style={{ color: '#00d4ff', filter: 'drop-shadow(0 0 6px #00d4ff)' }}
                            />
                          </div>
                          <span
                            className="font-body text-[10px] tracking-wider px-2.5 py-1 rounded-full border border-cyan-400/20"
                            style={{
                              color:
                                resource.category === 'Documentation'
                                  ? '#00d4ff'
                                  : '#4da6ff',
                              background: 'rgba(2, 5, 16, 0.5)',
                            }}
                          >
                            {resource.category.toUpperCase()}
                          </span>
                        </div>

                        <h3 className="font-heading text-base text-white mb-3 group-hover:text-cyan-300 transition-colors">
                          {resource.title}
                        </h3>

                        <p className="font-body text-sm text-blue-100/60 leading-relaxed mb-6">
                          {resource.desc}
                        </p>
                      </div>

                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 font-body text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors"
                      >
                        <span>Visit Resource</span>
                        <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </motion.div>
                  );
                })}
              </motion.div>
            </main>

            {/* ── FOOTER ── */}
            <footer style={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <div className="max-w-6xl mx-auto px-6">
                <div className="flex justify-end">
                  <Image
                    src="/images/logos/logo.png"
                    alt="IEEE RAS Logo"
                    width={192}
                    height={192}
                    quality={100}
                    loading="eager"
                    className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain opacity-90"
                    style={{ filter: 'drop-shadow(0 0 16px rgba(0,212,255,0.7))', imageRendering: 'crisp-edges' }}
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

