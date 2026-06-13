'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, MapPin, GraduationCap, Clock, ArrowRight, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/TechnoVision3/loadingComp';
import { TechBackground } from '@/components/TechnoVision3/TechBackground';
import { timeline } from 'data/technovision3/timelineData';
import { rulesData } from 'data/technovision3/rulesData';
import { about } from 'data/technovision3/about';
import { aimData } from 'data/technovision3/aim';
import Navbar from '@/components/TechnoVision3/Navbar';

export default function Home() {

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as typeof window & { resetTechnoVisionLoading: () => void }).resetTechnoVisionLoading = () => {
        sessionStorage.removeItem('hasLoadedTechnoVision');
        console.log('TechnoVision loading animation reset - will show on next visit');
      };
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    const initTimer = setTimeout(() => {
      const hasLoadedTechnoVision = sessionStorage.getItem('hasLoadedTechnoVision');
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const isPageRefresh = navigationEntry?.type === 'reload';

      if (!hasLoadedTechnoVision || isPageRefresh) {
        const timer = setTimeout(() => {
          setIsLoading(false);
          sessionStorage.setItem('hasLoadedTechnoVision', 'true');
        }, 2000); 
        return () => clearTimeout(timer);
      } else {
        const quickTimer = setTimeout(() => {
          setIsLoading(false);
        }, 50); 
        return () => clearTimeout(quickTimer);
      }
    }, 10); 

    return () => clearTimeout(initTimer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen text-white">
      <TechBackground />

      <AnimatePresence>
        {isLoading && <Loading />}
      </AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Navbar />

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black/65 to-black/50 relative pt-20">
              <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-12 mt-16"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex justify-center mb-8 pl-10 pt-19"
                  >
                    {/* We can use styled text since we don't have a specific logo image yet */}
                    <h1 className="font-pixel text-5xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                      TECHNOVISION 3.0
                    </h1>
                  </motion.div>

                  <motion.p
                    className="font-mono-pixel text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 text-gray-300 px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    Unleashing the Future
                  </motion.p>

                  <motion.p
                    className="font-mono-pixel text-base md:text-lg text-gray-400 max-w-2xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    An immersive 24-hour ideathon designed to foster innovation and interdisciplinary collaboration among students.
                  </motion.p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  <div className="glass modern-card rounded-2xl p-6 text-center">
                    <Calendar className="text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)] mx-auto mb-3" size={28} />
                    <div className="font-pixel text-sm mb-1 text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]">DATE</div>
                    <div className="font-mono-pixel text-xl">10TH - 11TH SEPT</div>
                  </div>

                  <div className="glass modern-card rounded-2xl p-6 text-center">
                    <MapPin className="text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] mx-auto mb-3" size={28} />
                    <div className="font-pixel text-sm mb-1 text-purple-500 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]">VENUE</div>
                    <div className="font-mono-pixel text-xl">AB2 / AB1</div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="pt-24 from-black/50 to-black/40 bg-gradient-to-b">
              <div className="max-w-6xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">ABOUT</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-8"></div>
                  <p className="font-mono-pixel text-xl md:text-2xl leading-relaxed text-gray-300 max-w-4xl mx-auto">
                    {about}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">AIM</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-8"></div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                  >
                  {aimData.map((item, index) => {
                    const aimStyles = [
                      { bg: 'from-cyan-500/20 to-purple-600/20', iconColor: 'text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)]', Icon: Zap },
                      { bg: 'from-cyan-500/20 to-purple-500/20', iconColor: 'text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]', Icon: Clock },
                      { bg: 'from-cyan-500/20 to-purple-500/20', iconColor: 'text-cyan-400', Icon: GraduationCap },
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

            {/* Gallery Link Section */}
            <section id="gallery" className="pt-20 bg-black/40 bg-gradient-to-b">
              <div className="max-w-5xl flex flex-col items-center justify-center mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16 mt-14"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">GALLERY</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto"></div>
                </motion.div>

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
                      style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.6)' }}
                    >
                      Unleashing the Future
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="font-mono-pixel text-lg md:text-xl mb-6"
                    >
                      Ideathon
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Link
                        href="/technovision3/gallery"
                        className="inline-flex items-center space-x-2 font-mono-pixel text-base text-cyan-500 hover:text-purple-300 transition-colors group"
                      >
                        <span className='text-[clamp(0.8rem,1vw,1rem)] cursor-pointer'>View Event Gallery</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Rules Section */}
            <section id="rules" className="py-24 bg-black/40 bg-gradient-to-b pt-10">
              <div className="max-w-5xl mx-auto px-6 pt-30">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">RULES & GUIDELINES</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {rulesData.map((rule, index) => (
                    <motion.div
                      key={rule.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
                      className="glass modern-card rounded-xl p-6 border-t-2 border-cyan-500/30 hover:border-cyan-500/70 transition-colors"
                    >
                      <h3 className="font-pixel text-xl mb-4 text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.4)] flex items-center space-x-3">
                        <span className="text-purple-400 font-mono-pixel opacity-70">#{rule.id}</span>
                        <span>{rule.title}</span>
                      </h3>
                      <ul className="space-y-2">
                        {rule.points.map((point, ptIndex) => (
                          <li key={ptIndex} className="font-mono-pixel text-sm text-gray-300 leading-relaxed flex items-start">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex-shrink-0 mr-3 mt-1.5 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Format Section - Timeline */}
            <section id="format" className="py-24 bg-black/40 bg-gradient-to-b">
              <div className="max-w-4xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="font-pixel text-3xl md:text-5xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">Event Format</h2>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
                </motion.div>

                <div className="space-y-8">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={item.isHeader ? "mb-4" : "flex items-center space-x-6"}
                    >
                      {item.isHeader ? (
                        <div className="text-center">
                          <h3 className="font-pixel text-xl md:text-2xl text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] mb-2">
                            {item.time}
                          </h3>
                          <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto"></div>
                        </div>
                      ) : (
                        <>
                          <div className="bg-gradient-to-br from-purple-500 to-cyan-500 w-4 h-4 rounded-full flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.6)]"></div>
                          <div className="glass modern-card rounded-xl p-6 flex-1 hover:border-purple-500/30 transition-colors border border-transparent">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                              <div>
                                <div className="font-pixel text-base text-cyan-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.6)] mb-2">{item.time}</div>
                                <h4 className="font-pixel text-lg md:text-xl mb-2 text-white">{item.title}</h4>
                                <p className="font-mono-pixel text-sm text-gray-400 mb-2">{item.desc}</p>
                                {item.mode && (
                                  <div className="inline-block px-2 py-1 bg-cyan-500/20 text-cyan-400 font-mono-pixel text-xs rounded border border-cyan-500/30 mb-2">
                                    Mode: {item.mode}
                                  </div>
                                )}
                                {item.categories && item.categories.length > 0 && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {item.categories.map((cat, i) => (
                                      <span key={i} className="px-2 py-1 bg-purple-500/10 text-purple-400 font-mono-pixel text-xs rounded border border-purple-500/20">
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

            {/* Resources Section */}
            <section className="py-16 bg-black/40 bg-gradient-to-b">
              <div className="max-w-6xl mx-auto px-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-12"
                >
                  <h2 className="font-pixel text-2xl md:text-3xl mb-6 text-gray-300" style={{ textShadow: '0 0 10px rgba(168, 85, 247, 0.6)' }}>
                    RESOURCES
                  </h2>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto"></div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center mt-10"
                >
                  <Link
                    href="/technovision3/resources"
                    className="font-mono-pixel text-md text-gray-400 hover:text-cyan-500 transition-colors inline-flex items-center space-x-2 group"
                  >
                    <span>View All Resources</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* Footer */}
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
                      filter: 'drop-shadow(0 0 12px rgba(6, 182, 212, 0.6))',
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
