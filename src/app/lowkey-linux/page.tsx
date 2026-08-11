"use client";

import { AnimatePresence, motion } from "framer-motion";
import { JetBrains_Mono, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { eventConfig } from "data/lowkeylinux/content";
import BootSequence from "@/components/LoowkeyLinux/BootSequence";
import Navbar from "@/components/LoowkeyLinux/Navbar";
import ProcessTable from "@/components/LoowkeyLinux/ProcessTable";
import { ManPage, FaqSection } from "@/components/LoowkeyLinux/ManPage";
import RegisterBanner from "@/components/LoowkeyLinux/RegisterBanner";
import Footer from "@/components/LoowkeyLinux/Footer";
import "./lowkey-linux.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--ll-font-display",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ll-font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--ll-font-mono",
  display: "swap",
});

export default function LoowkeyLinuxPage() {
  const [bootDone, setBootDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasBooted = sessionStorage.getItem("llBooted");
    if (hasBooted) setBootDone(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="top"
      className={`${jetbrains.variable} ${plexSans.variable} ${plexMono.variable} ll-page`}
    >
      <div className="ll-crt" aria-hidden />
      {!bootDone && (
        <AnimatePresence>
          <BootSequence
            lines={eventConfig.boot.lines}
            onComplete={() => {
              sessionStorage.setItem("llBooted", "true");
              setBootDone(true);
            }}
          />
        </AnimatePresence>
      )}
      {bootDone && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <Navbar />

          {/* ── HERO ── */}
          <section className="ll-hero">
            <div>
              <div className="ll-hero-eyebrow">IEEE RAS MUJ presents</div>
              <h1 className="ll-hero-title">
                LOWKEY LINUX<span className="ll-hero-cursor" aria-hidden />
              </h1>
              <p className="ll-hero-sub">{eventConfig.tagline}</p>
              <div className="ll-hero-meta">
                <span className="ll-chip">{eventConfig.date}</span>
                <span className="ll-chip">{eventConfig.location}</span>
                <span className="ll-chip">hybrid event</span>
              </div>
              <div className="ll-hero-ctas">
                <a className="ll-btn ll-btn-primary" href="#register">
                  $ sudo apt install ticket
                </a>
                <a className="ll-btn ll-btn-cyan" href="#schedule">
                  $ cat schedule.txt
                </a>
              </div>
            </div>
          </section>

          {/* ── ABOUT ── */}
          <section id="about" className="ll-section">
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ man lowkey-linux(1)</div>
              <div>
                <ManPage
                  title={`lowkey-linux(1) — ${eventConfig.title}`}
                  blocks={[
                    { label: "NAME", body: [eventConfig.name] },
                    { label: "SYNOPSIS", body: [eventConfig.about.synopsis] },
                    { label: "DESCRIPTION", body: eventConfig.about.description },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ── OBJECTIVES ── */}
          <section id="objectives" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ systemctl status objectives</div>
              <div>
                <div className="ll-obj-grid">
                  {eventConfig.objectives.map((o, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="ll-obj-card"
                    >
                      <div className="ll-obj-title">{o.title}</div>
                      <div className="ll-obj-desc">{o.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── EVENT FORMAT / PHASES ── */}
          <section id="format" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ ls /phases</div>
              <div>
                {eventConfig.phases.map((phase) => (
                  <div key={phase.title} className="ll-phase">
                    <div className="ll-phase-title">{phase.title}</div>
                    <div className="ll-phase-sub">{phase.sub}</div>
                    {phase.items.map((item, i) => (
                      <div key={i} className="ll-phase-item">
                        <div className="ll-phase-time">{item.time}</div>
                        <div className="ll-phase-text">{item.text}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SCHEDULE (htop) ── */}
          <section id="schedule" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ htop</div>
              <div>
                <ProcessTable />
              </div>
            </div>
          </section>

          {/* ── JUDGING ── */}
          <section id="judging" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ cat judging.conf</div>
              <div>
                {eventConfig.judging.map((j, i) => (
                  <div key={i} className="ll-judge-row">
                    <div>
                      <div className="ll-judge-crit">{j.criterion}</div>
                      <div className="ll-judge-detail">{j.detail}</div>
                    </div>
                    <div className="ll-judge-weight">{j.weight}%</div>
                    <div className="ll-judge-bar">
                      <div
                        className="ll-judge-bar-fill"
                        style={{ width: `${j.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ man lowkey-linux-faq(1)</div>
              <div>
                <FaqSection items={eventConfig.faq} />
              </div>
            </div>
          </section>

          {/* ── REGISTER ── */}
          <RegisterBanner />

          <Footer />
        </motion.main>
      )}
    </div>
  );
}
