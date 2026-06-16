'use client';

import { motion, AnimatePresence, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Code, Clock, Briefcase, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Loading from '@/components/UnlockD/loadingComp';
import Navbar from '@/components/UnlockD/Navbar';
import UnlockDBackground from '@/components/UnlockD/UnlockDBackground';
import { about } from 'data/unlockd/about';
import { aimData } from 'data/unlockd/aim';
import { rulesData } from 'data/unlockd/rulesData';
import { timeline } from 'data/unlockd/timelineData';

const iconMap: Record<string, React.ElementType> = {
  Code, Briefcase, CheckCircle, Clock, MapPin, Calendar, ArrowRight,
};

// ─── Spring card with tilt + bloom on hover ──────────────────────────────────
function SpringCard({
  children,
  className = '',
  delay = 0,
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const springConfig = { stiffness: 260, damping: 22, mass: 0.6 };
  const rotateX = useSpring(tilt.x, springConfig);
  const rotateY = useSpring(tilt.y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -cy * 10, y: cx * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      className={`relative ${className}`}
    >
      {/* Edge bloom on hover */}
      {hovered && (
        <div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          style={{
            borderRadius: 'inherit',
            boxShadow: '0 0 30px rgba(0,212,255,0.18), 0 0 60px rgba(0,96,255,0.10)',
            opacity: 1,
            transition: 'opacity 0.2s',
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

// ─── Scroll Unlock Progress Indicator ────────────────────────────────────────
function UnlockProgressHint() {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const handler = () => {
      const raw = Math.min(window.scrollY / 360, 1.0);
      setProgress(raw);
      if (raw >= 0.99) setUnlocked(true);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  if (progress === 0) return null;

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-2 pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
    >
      {/* Lock icon SVG */}
      <svg width="36" height="40" viewBox="0 0 36 40" fill="none" style={{ filter: `drop-shadow(0 0 8px rgba(0,212,255,${0.4 + progress * 0.5}))` }}>
        {/* Body */}
        <rect x="4" y="18" width="28" height="20" rx="3" stroke="rgba(0,212,255,0.8)" strokeWidth="1.5" fill="none" />
        {/* Shackle */}
        <path
          d={`M 12 18 L 12 ${18 - progress * 12} Q 18 ${6 - progress * 10} 24 ${18 - progress * 12} L 24 18`}
          stroke={`rgba(${Math.round(progress*100)},${Math.round(212 - progress*80)},255,0.9)`}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
      {/* Progress bar */}
      <div style={{ width: 36, height: 3, background: 'rgba(0,212,255,0.15)', borderRadius: 2, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: unlocked
              ? 'linear-gradient(90deg, #00d4ff, #7c3aed)'
              : 'rgba(0,212,255,0.8)',
            borderRadius: 2,
            transition: 'width 0.1s',
            willChange: 'width',
          }}
        />
      </div>
      {unlocked && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs text-cyan-400"
          style={{ textShadow: '0 0 8px #00d4ff', fontSize: 9 }}
        >
          UNLOCKED
        </motion.span>
      )}
    </motion.div>
  );
}

// ─── Section Divider ──────────────────────────────────────────────────────────
function ScanDivider() {
  return (
    <div className="scan-divider" aria-hidden>
      <motion.div
        className="scan-line"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
      />
    </div>
  );
}

// ─── Section Heading ──────────────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
    >
      <h2 className="font-heading unlockd-section-title text-3xl md:text-5xl mb-6">{children}</h2>
      <div className="unlockd-heading-underline" />
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function UnlockD() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as typeof window & { resetUnlockDLoading: () => void }).resetUnlockDLoading = () => {
        sessionStorage.removeItem('hasLoadedUnlockD');
      };
    }
  }, []);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
    const initTimer = setTimeout(() => {
      const hasLoadedUnlockD = sessionStorage.getItem('hasLoadedUnlockD');
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const isPageRefresh = navigationEntry?.type === 'reload';

      if (!hasLoadedUnlockD || isPageRefresh) {
        setIsLoading(true);
        sessionStorage.setItem('hasLoadedUnlockD', 'true');
        setTimeout(() => setIsLoading(false), 2000);
      } else {
        setIsLoading(false);
      }
    }, 100);

    return () => { clearTimeout(mountTimer); clearTimeout(initTimer); };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen text-white relative overflow-x-hidden"
      style={{ background: '#020510' }}
    >
      {/* ── WebGL Lock Background ── */}
      <UnlockDBackground />

      {/* ── Ambient overlay ── keeps the glass lock readable behind text.
           Upper-centre stays clearer (where the lock sits); edges + lower page
           darken so cards and copy keep contrast. */}
      <div
        className="fixed inset-0 pointer-events-none z-1"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, transparent 26%, rgba(2,5,16,0.5) 64%, rgba(2,5,16,0.82) 100%), linear-gradient(to bottom, rgba(2,5,16,0.35) 0%, transparent 18%, transparent 72%, rgba(2,5,16,0.6) 100%)',
          willChange: 'opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* ── Scroll unlock progress indicator ── */}
      <UnlockProgressHint />

      <AnimatePresence>{isLoading && <Loading />}</AnimatePresence>

      <AnimatePresence>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <Navbar />

            {/* ── HERO (pinned: stays put while scroll drives the unlock, then releases) ── */}
            <div className="hero-pin">
            <section className="hero-sticky min-h-screen flex items-center justify-center md:justify-start relative pt-32 md:pt-40 overflow-hidden">
              <div className="hero-glow" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl w-full mx-auto md:mx-0 px-6 sm:px-8 lg:pl-24 text-center md:text-left relative z-10 flex flex-col items-center md:items-start"
              >
                {/* Negative space reserved for the WebGL glass lock, which is the
                    hero centerpiece now (rendered in the fixed background canvas).
                    Replaces the old <GlassOrb /> so the two don't compete. */}
                <motion.div
                  aria-hidden
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="mb-8 hero-lock-space"
                />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-12"
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                >
                    <motion.h1
                    className="glitch font-heading unlockd-hero-title text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wider mb-6 ocean-title"
                    data-text="UNLOCK'D"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    UNLOCK&apos;D
                  </motion.h1>

                  <motion.p
                    className="font-heading unlockd-hero-subtitle text-lg sm:text-xl md:text-2xl lg:text-3xl mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    24-Hour Progressive Software Development Challenge
                  </motion.p>

                  <motion.p
                    className="font-body unlockd-hero-desc text-base md:text-lg max-w-2xl mx-auto md:mx-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    A guided product-building relay from foundational setup to cloud deployment.
                  </motion.p>
                </motion.div>


                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto md:mx-0 w-auto md:w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                >
                  <SpringCard className="prd-card rounded-2xl p-5 md:p-6 text-center group" delay={0}>
                    <Calendar
                      className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                      size={28}
                      style={{ color: '#00d4ff', filter: 'drop-shadow(0 0 12px #00d4ff)' }}
                    />
                    <div className="font-mono text-sm mb-1 cyan-label">DATE</div>
                    <div className="font-body text-xl text-white font-semibold">3RD &ndash; 4TH JULY</div>
                  </SpringCard>

                  <SpringCard className="prd-card rounded-2xl p-5 md:p-6 text-center group" delay={0.08}>
                    <MapPin
                      className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                      size={28}
                      style={{ color: '#0096ff', filter: 'drop-shadow(0 0 12px #0096ff)' }}
                    />
                    <div className="font-mono text-sm mb-1 blue-label">VENUE</div>
                    <div className="font-body text-xl text-white font-semibold">ONLINE</div>
                  </SpringCard>
                </motion.div>

                <motion.div
                  className="scroll-cue"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  style={{ willChange: 'transform' }}
                >
                  <div className="scroll-cue-inner">&darr;</div>
                </motion.div>
              </motion.div>
            </section>
            </div>

            <ScanDivider />

            {/* ── ABOUT ── */}
            <section id="about" className="pt-24 pb-8">
              <div className="max-w-6xl mx-auto px-6">
                <SectionHeading>ABOUT</SectionHeading>
                  <motion.p
                  className="font-body text-xl md:text-2xl leading-relaxed text-blue-100/70 max-w-4xl mx-auto text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                >
                  {about}
                </motion.p>

                <div className="mt-20">
                  <SectionHeading>AIM</SectionHeading>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {aimData.map((item, idx) => {
                      const IconComponent = iconMap[item.iconName] || Code;
                      return (
                        <SpringCard
                          key={idx}
                          className="prd-card rounded-2xl p-5 md:p-8 text-center group"
                          delay={idx * 0.08}
                          index={idx}
                        >
                          <div className="aim-icon-wrap mx-auto mb-6">
                            <IconComponent
                              size={36}
                              style={{ color: '#00d4ff', filter: 'drop-shadow(0 0 10px #00d4ff)' }}
                            />
                          </div>
                          <h3 className="font-heading text-base mb-4 cyan-label font-semibold">{item.title}</h3>
                          <p className="font-body text-base text-blue-100/60 leading-relaxed">
                            {item.description}
                          </p>
                        </SpringCard>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <ScanDivider />

            {/* ── EVENT OVERVIEW ── */}
            <section id="overview" className="py-24 pt-10">
              <div className="max-w-5xl mx-auto px-6">
                <SectionHeading>EVENT OVERVIEW</SectionHeading>
                <div className="max-w-4xl mx-auto space-y-4">
                  {rulesData[0].points.map((point, idx) => (
                    <SpringCard
                      key={idx}
                      className="prd-card rounded-xl p-4 md:p-6 border-l-2 border-cyan-400/40 flex items-start space-x-4 group hover:border-cyan-400/80 transition-colors duration-300"
                      delay={idx * 0.04}
                    >
                      <div className="overview-dot flex-shrink-0 mt-2" />
                      <p className="font-body text-base text-blue-100/70 leading-relaxed group-hover:text-blue-100/90 transition-colors">{point}</p>
                    </SpringCard>
                  ))}
                </div>
              </div>
            </section>



            <ScanDivider />

            {/* ── JUDGING CRITERIA ── */}
            <section id="judging" className="py-24">
              <div className="max-w-5xl mx-auto px-6">
                <SectionHeading>JUDGING CRITERIA</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {rulesData[1].points.map((point, idx) => (
                    <SpringCard
                      key={idx}
                      className="prd-card rounded-xl p-4 md:p-6 flex items-start space-x-4 group hover:border-cyan-400/30 transition-colors duration-300"
                      delay={idx * 0.04}
                      index={idx}
                    >
                      <CheckCircle
                        className="flex-shrink-0 mt-1"
                        size={20}
                        style={{ color: '#00d4ff', filter: 'drop-shadow(0 0 6px #00d4ff)' }}
                      />
                      <p className="font-body text-sm text-blue-100/70 leading-relaxed">{point}</p>
                    </SpringCard>
                  ))}
                </div>
              </div>
            </section>



            <ScanDivider />

            {/* ── GENERAL GUIDELINES ── */}
            <section id="guidelines" className="py-24">
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading>GENERAL GUIDELINES</SectionHeading>
                <div className="space-y-5">
                  {rulesData[2].points.map((point, idx) => (
                    <SpringCard
                      key={idx}
                      className="prd-card rounded-xl p-4 md:p-6 border-t border-cyan-400/20 flex items-start space-x-4"
                      delay={idx * 0.04}
                    >
                      <div className="policy-dot policy-dot-blue flex-shrink-0 mt-2" />
                      <p className="font-body text-base text-blue-100/70 leading-relaxed">{point}</p>
                    </SpringCard>
                  ))}
                </div>
              </div>
            </section>

            <ScanDivider />

            {/* ── REGISTER ── */}
            <section id="register" className="py-20">
              <div className="max-w-5xl flex flex-col items-center justify-center mx-auto px-6">
                <SectionHeading>REGISTER NOW</SectionHeading>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="max-w-md md:w-xl w-full"
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                >
                  <SpringCard className="register-card rounded-2xl p-6 md:p-10 text-center relative overflow-hidden">
                    <div className="register-inner-glow" />

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="font-heading unlockd-section-title text-2xl md:text-3xl mb-3 relative z-10"
                    >
                      Unlock Your Potential
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="font-body text-lg mb-8 text-blue-200/50 relative z-10"
                    >
                      Registration coming soon
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="relative z-10"
                    >
                      <span className="inline-flex items-center space-x-2 font-body text-base text-blue-300/40 cursor-not-allowed select-none">
                        <span>Click here to register</span>
                        <ArrowRight size={16} />
                      </span>
                    </motion.div>
                  </SpringCard>
                </motion.div>
              </div>
            </section>

            <ScanDivider />

            {/* ── EVENT FORMAT / TIMELINE ── */}
            <section id="format" className="py-24">
              <div className="max-w-4xl mx-auto px-6">
                <SectionHeading>Event Format</SectionHeading>

                <div className="timeline-track space-y-6">
                  {timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: (index % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                      className={item.isHeader ? 'mb-4' : 'flex items-start space-x-6'}
                      style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                    >
                      {item.isHeader ? (
                        <div className="text-center py-4 w-full">
                          <h3 className="font-heading text-xl md:text-2xl mb-2" style={{ color: '#00d4ff', textShadow: '0 0 20px #00d4ff' }}>
                            {item.time}
                          </h3>
                          <div className="unlockd-timeline-header-rule" />
                        </div>
                      ) : (
                        <>
                          <div className="unlockd-timeline-dot mt-5" />
                          <SpringCard className="prd-card rounded-xl p-4 md:p-6 flex-1 group hover:border-cyan-400/30 transition-colors duration-300">
                            <div className="font-mono text-sm cyan-label mb-2">{item.time}</div>
                            <h4 className="font-heading text-lg md:text-xl mb-2 text-white">{item.title}</h4>
                            <p className="font-body text-sm text-blue-100/55">{item.desc}</p>
                          </SpringCard>
                        </>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            <ScanDivider />

            {/* ── RESOURCES ── */}
            <section className="py-16">
              <div className="max-w-6xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="mb-12"
                  style={{ willChange: 'transform, opacity', transform: 'translateZ(0)' }}
                >
                  <div className="unlockd-section-overline">LEARNING MATERIAL</div>
                  <h2 className="font-heading unlockd-section-title text-2xl md:text-3xl mb-6">
                    RESOURCES
                  </h2>
                  <div className="unlockd-heading-underline mx-auto" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-10"
                >
                  <Link
                    href="/unlockd/resources"
                    className="font-mono text-sm text-blue-300/50 hover:text-cyan-400 transition-colors inline-flex items-center space-x-2 group"
                  >
                    <span className="tracking-wider">View All Resources</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              </div>
            </section>

            {/* ── FOOTER ── */}
            <footer style={{ paddingTop: '2px', paddingBottom: '2px' }}>
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
