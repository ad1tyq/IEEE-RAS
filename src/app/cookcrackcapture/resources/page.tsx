'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, ElementType } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// 1. Correctly import the data from its file.
import { ctfResources } from 'data/cookcrackcapture/resourcesData';
import { ToxicBackground } from '@/components/CookCrackCapture/ToxicBackground';
import Navbar from '@/components/CookCrackCapture/Navbar';

// --- Define the type for a single resource category object ---
// Renamed for clarity, but structure is the same.
type ResourceCategory = {
  name: string;
  icon: ElementType;
  color: string;
  glowColor: string;
  items: ResourceItem[];
}

type ResourceItem = {
  id: number,
  title: string,
  description: string,
  logo: string,
  website: string,
  linkedinUrl: string
}

// Renamed from SponsorsPage to ResourcesPage to match file and content
export default function ResourcesPage() {

  const [mounted, setMounted] = useState(false);
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev => ({
      ...prev,
      [domain]: !prev[domain]
    }));
  };

  // Prevent rendering on the server to avoid hydration mismatch
  if (!mounted) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  // --- MAJOR FIX: The main 'return' statement MUST be at the top level of the component. ---
  // It was previously inside the 'toggleDomain' function, which is why nothing was rendering.
  return (
    <div className="min-h-screen bg-black/60 text-white">
        <ToxicBackground />

      <Navbar />

      {/* Main Content */}
      <main className="pt-48 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Link href="/cookcrackcapture" className="inline-flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors font-mono-pixel">
              <ArrowLeft size={18} />
              <span>Back to Event</span>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-24">
            <h1 className="font-pixel text-4xl md:text-6xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">RESOURCES</h1>
            <div className="w-20 h-0.5 bg-gradient-to-r from-green-600 to-sky-500 mx-auto mb-8"></div>
            <p className="font-mono-pixel text-xl text-gray-300 max-w-3xl mx-auto">
              These are the key hardware components, simulators, and software tools you’ll need to start building and testing your drone—from setup to flight control and simulation.
            </p>
          </motion.div>

          {/* Resources Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-20"
          >
            <div className="space-y-6">
              {/* 2. Map directly over the imported data, which now matches the required type */}
              {(ctfResources as ResourceCategory[]).map((domain, domainIndex) => {
                const IconComponent = domain.icon;
                const isExpanded = !!expandedDomains[domain.name]; // Ensure it's always a boolean
                return (
                  <motion.div
                    key={domain.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: domainIndex * 0.1 }}
                    className="glass modern-card rounded-2xl overflow-hidden"
                  >
                    <motion.button
                      onClick={() => toggleDomain(domain.name)}
                      className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-18 h-12 rounded-xl bg-gradient-to-r ${domain.color} flex items-center justify-center`}
                          style={{ boxShadow: `0 0 20px ${domain.glowColor}` }}
                        >
                          <IconComponent size={24} className="text-white" />
                        </div>
                        <div className="text-left">
                          <h2 className="font-pixel text-2xl md:text-3xl mb-1">
                            {domain.name}
                          </h2>
                          <p className="font-mono-pixel text-sm text-gray-400">
                            {/* 3. Changed "Problem" to "Resource" to match the context */}
                            {domain.items.length} Resource{domain.items.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={24} className="text-gray-400" />
                      </motion.div>
                    </motion.button>

                    <motion.div
                      initial={false}
                      animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {/* Changed the inner container to a grid for better layout */}
                      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {domain.items.map((item, itemIndex) => (
                          // 'item' used instead of 'problem'
                          // Wrap each card in a Link to make it clickable
                          <div key={item.id} className="block h-full">
                            <motion.div
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                              transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                              className="glass-strong rounded-xl p-6 border-l-4 h-full flex flex-col hover:bg-white/10 transition-colors"
                              style={{ borderLeftColor: domain.glowColor.replace('0.4', '0.8') }}
                            >
                              <div className="flex items-center space-x-4 mb-4">
                                <div
                                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                >
                                  <Image src={item.logo} alt={`${item.title} logo`} width={50} height={50} className="object-contain" />
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-pixel text-lg md:text-xl text-white">
                                    {item.title}
                                  </h3>
                                </div>
                              </div>
                              <p className="font-mono-pixel text-base text-gray-300 leading-relaxed flex-grow">
                                {item.description}
                              </p>
                              <div className='flex justify-end items-center'>
                                <Link href={item.website} target="_blank" rel="noopener noreferrer"
                                key={item.id} className="block h-full cursor-pointer text-green-600 font-semibold hover:scale-105 py-4 duration-300">
                                  More Info -&gt;</Link>
                              </div>

                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
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
                style={{ filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.6))' }}
              />
              <div>
                <h3 className="font-pixel text-green-500">Cook Crack Capture</h3>
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

