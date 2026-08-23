"use client";

import React, { useEffect, useRef } from 'react';
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './styles.css';
import { eventConfig } from '../../../data/beyondtheframe/content';

import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Particles } from "@/components/ui/particles";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Dock, DockIcon } from "@/components/ui/dock";
import RegisterCTA from "@/components/BeyondTheFrame/RegisterCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Home, Info, Calendar, Trophy, Mail } from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['600', '700'], display: 'swap' });
const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], display: 'swap' });

export default function BeyondTheFramePage() {
  const scheduleRef = useRef<HTMLElement>(null);
  const q = gsap.utils.selector(scheduleRef);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Draw in the schedule pulses on scroll
    gsap.fromTo(q(".schedule-pulse"), 
      { scaleX: 0, opacity: 0 },
      { 
        scaleX: 1, 
        opacity: 1, 
        stagger: 0.1, 
        ease: "power2.out", 
        scrollTrigger: {
          trigger: scheduleRef.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1
        }
      }
    );
  }, []);

  const navItems = [
    { name: "Home", link: "#", icon: <Home className="h-4 w-4 text-[var(--scope-ch1)]" /> },
    { name: "Objectives", link: "#objectives", icon: <Info className="h-4 w-4 text-white" /> },
    { name: "Schedule", link: "#schedule", icon: <Calendar className="h-4 w-4 text-[var(--scope-ch2)]" /> },
    { name: "Judging", link: "#judging", icon: <Trophy className="h-4 w-4 text-[var(--alert)]" /> }
  ];

  return (
    <div className={`btf-container ${plexSans.className}`}>
      <FloatingNav navItems={navItems} />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center px-6 py-20 max-w-7xl mx-auto border-b btf-divider overflow-hidden">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="var(--scope-ch1)"
        />
        {/* Animated Scope Trace Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 z-0 flex items-center">
          <div className="scope-trace w-[200%] h-32 flex">
            {/* simple SVG square wave pattern */}
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-1/2 h-full stroke-[var(--scope-ch1)] fill-none stroke-2">
              <path d="M0,50 L100,50 L100,10 L200,10 L200,50 L300,50 L300,90 L400,90 L400,50 L500,50 L500,10 L600,10 L600,50 L700,50 L700,90 L800,90 L800,50 L900,50 L900,10 L1000,10 L1000,50" />
            </svg>
            <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-1/2 h-full stroke-[var(--scope-ch1)] fill-none stroke-2">
              <path d="M0,50 L100,50 L100,10 L200,10 L200,50 L300,50 L300,90 L400,90 L400,50 L500,50 L500,10 L600,10 L600,50 L700,50 L700,90 L800,90 L800,50 L900,50 L900,10 L1000,10 L1000,50" />
            </svg>
          </div>
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <div className={`${plexMono.className} text-[var(--scope-ch1)] mb-4 uppercase tracking-widest text-sm`}>
            {eventConfig.dates} &middot; {eventConfig.location}
          </div>
          <TextGenerateEffect 
            words={eventConfig.name} 
            className={`${spaceGrotesk.className} text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-[var(--silkscreen)] leading-tight`}
            duration={1.5}
            filter={true}
          />
          <p className="text-xl md:text-2xl text-[var(--silkscreen-muted)] mb-10 max-w-2xl">
            {eventConfig.tagline}
          </p>
          <div className="flex flex-wrap gap-4">
            <RegisterCTA />
            <a href="#schedule" className="btf-cta-ch2 px-8 py-3 rounded-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center">
              View Schedule
            </a>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section id="objectives" className="py-24 px-6 max-w-7xl mx-auto border-b btf-divider">
        <TracingBeam className="px-6">
          <h2 className={`${spaceGrotesk.className} text-3xl mb-12 text-[var(--silkscreen)]`}>Objectives</h2>
          <div className="grid gap-8">
            {eventConfig.objectives.map((obj, i) => (
              <div key={i} className="flex items-start max-w-4xl">
                <span className={`${plexMono.className} text-[var(--silkscreen-muted)] mr-6 mt-1`}>
                  {String(i + 1).padStart(2, '0')} —
                </span>
                <p className="text-lg leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </TracingBeam>
      </section>

      {/* Format */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-b btf-divider">
        <h2 className={`${spaceGrotesk.className} text-3xl mb-12 text-[var(--silkscreen)]`}>Event Format</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <CardContainer className="w-full m-0 p-0">
            <CardBody className="btf-panel w-full p-8 relative h-full flex flex-col">
              <BorderBeam size={250} duration={12} delay={9} colorFrom="var(--scope-ch1)" colorTo="transparent" />
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--scope-ch1)]"></div>
              <CardItem translateZ={30} className={`${spaceGrotesk.className} text-2xl mb-2 text-[var(--scope-ch1)]`}>
                {eventConfig.format.day1.label}
              </CardItem>
              <CardItem translateZ={20} className="text-[var(--silkscreen-muted)] mb-6">
                {eventConfig.format.day1.duration}
              </CardItem>
              <CardItem translateZ={10} className="w-full">
                <ul className="space-y-3">
                  {eventConfig.format.day1.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[var(--scope-ch1)] mr-3 mt-1 text-xs">■</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardItem>
            </CardBody>
          </CardContainer>
          
          <CardContainer className="w-full m-0 p-0">
            <CardBody className="btf-panel w-full p-8 relative h-full flex flex-col">
              <BorderBeam size={250} duration={12} delay={2} colorFrom="var(--scope-ch2)" colorTo="transparent" />
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--scope-ch2)]"></div>
              <CardItem translateZ={30} className={`${spaceGrotesk.className} text-2xl mb-6 text-[var(--scope-ch2)]`}>
                {eventConfig.format.day2.label}
              </CardItem>
              <CardItem translateZ={10} className="w-full">
                <ul className="space-y-3">
                  {eventConfig.format.day2.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[var(--scope-ch2)] mr-3 mt-1 text-xs">■</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </section>

      {/* Schedule */}
      <section id="schedule" ref={scheduleRef as React.RefObject<HTMLDivElement>} className="py-24 px-6 max-w-7xl mx-auto border-b btf-divider overflow-hidden">
        <h2 className={`${spaceGrotesk.className} text-3xl mb-12 text-[var(--silkscreen)]`}>Schedule</h2>
        <div className="mb-16">
          <h3 className={`${spaceGrotesk.className} text-xl mb-6 text-[var(--scope-ch1)] flex items-center`}>
            <span className="w-4 h-4 bg-[var(--scope-ch1)] mr-3 inline-block"></span>
            Day 1 Timing
          </h3>
          <div className="w-full overflow-x-auto pb-6 hide-scrollbar">
            <div className="min-w-[800px] flex items-end gap-1 pt-6 border-b border-[var(--copper)]/30 pb-2">
              {eventConfig.schedule.day1.map((item, i) => (
                <div key={i} className="flex-1 min-w-[150px] relative group schedule-pulse">
                  <div className={`${plexMono.className} text-[var(--silkscreen-muted)] text-xs mb-2 pl-2 border-l border-[var(--silkscreen-muted)]/20`}>{item.time}</div>
                  <div className="h-auto min-h-[4rem] bg-[var(--board-panel)] border-t-2 border-l border-r border-[var(--scope-ch1)] group-hover:bg-[var(--board-panel-raised)] transition-colors p-3 flex flex-col justify-center origin-bottom">
                    <span className={`${plexMono.className} text-sm text-[var(--silkscreen)] leading-tight`}>{item.item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className={`${spaceGrotesk.className} text-xl mb-6 text-[var(--scope-ch2)] flex items-center`}>
            <span className="w-4 h-4 bg-[var(--scope-ch2)] mr-3 inline-block"></span>
            Day 2 Timing
          </h3>
          <div className="w-full overflow-x-auto pb-6 hide-scrollbar">
            <div className="min-w-[800px] flex items-end gap-1 pt-6 border-b border-[var(--copper)]/30 pb-2">
              {eventConfig.schedule.day2.map((item, i) => (
                <div key={i} className="flex-1 min-w-[150px] relative group schedule-pulse">
                  <div className={`${plexMono.className} text-[var(--silkscreen-muted)] text-xs mb-2 pl-2 border-l border-[var(--silkscreen-muted)]/20`}>{item.time}</div>
                  <div className="h-auto min-h-[4rem] bg-[var(--board-panel)] border-t-2 border-l border-r border-[var(--scope-ch2)] group-hover:bg-[var(--board-panel-raised)] transition-colors p-3 flex flex-col justify-center origin-bottom">
                    <span className={`${plexMono.className} text-sm text-[var(--silkscreen)] leading-tight`}>{item.item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Judging & Problem Statement */}
      <section id="judging" className="py-24 px-6 max-w-7xl mx-auto border-b btf-divider">
        <h2 className={`${spaceGrotesk.className} text-3xl mb-12 text-[var(--silkscreen)]`}>Problem Statement & Judging</h2>
        <p className="text-lg leading-relaxed max-w-4xl mb-12">{eventConfig.problemStatement.summary}</p>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h4 className={`${plexMono.className} text-sm uppercase text-[var(--alert)] tracking-widest mb-4`}>Mandatory Tier</h4>
            <ul className="space-y-4">
              {eventConfig.problemStatement.mandatory.map((req, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[var(--alert)] mr-3 mt-1 text-xs">■</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className={`${plexMono.className} text-sm uppercase text-[var(--scope-ch2)] tracking-widest mb-4`}>Stretch Tier</h4>
            <ul className="space-y-4">
              {eventConfig.problemStatement.stretch.map((req, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-[var(--scope-ch2)] mr-3 mt-1 text-xs">■</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left btf-panel border-collapse">
            <thead>
              <tr className={`${plexMono.className} text-[var(--silkscreen-muted)] text-sm border-b border-[var(--copper)]/30`}>
                <th className="p-4 font-normal">PARAMETER</th>
                <th className="p-4 font-normal">DETAIL</th>
                <th className="p-4 font-normal text-right">WEIGHT</th>
              </tr>
            </thead>
            <tbody>
              {eventConfig.judgingWeights.map((w, i) => (
                <tr key={i} className="border-b border-[var(--copper)]/10 hover:bg-[var(--board-panel-raised)] transition-colors group">
                  <td className="p-4">{w.parameter}</td>
                  <td className="p-4 text-[var(--silkscreen-muted)]">{w.detail}</td>
                  <td className={`${plexMono.className} p-4 text-right text-[var(--scope-ch2)]`}>
                    <NumberTicker value={w.weight} className="text-[var(--scope-ch2)]" />%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Beneficiaries & CTA */}
      <section className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
        <Particles 
          className="absolute inset-0 z-0" 
          quantity={150} 
          ease={80} 
          color="#A5E3E7" // --scope-ch1
          refresh 
        />
        <div className="relative z-10">
          <h2 className={`${spaceGrotesk.className} text-3xl mb-8 text-[var(--silkscreen)]`}>Who Should Come</h2>
          <ul className="space-y-4 max-w-3xl mb-24">
            {eventConfig.beneficiaries.map((b, i) => (
              <li key={i} className="flex items-start text-lg">
                <span className="text-[var(--copper)] mr-4 mt-2 text-xs">◆</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="btf-panel p-10 md:p-16 text-center border-t-4 border-t-[var(--scope-ch1)] rounded-md">
            <h2 className={`${spaceGrotesk.className} text-4xl md:text-5xl mb-6`}>Ready to build?</h2>
            <p className="text-xl text-[var(--silkscreen-muted)] mb-10 max-w-2xl mx-auto">
              {eventConfig.dates} &middot; {eventConfig.location} &middot; Teams formed on Day 2
            </p>
            <RegisterCTA />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-[var(--silkscreen-muted)] text-sm border-t border-[var(--board-panel-raised)]">
        &copy; {new Date().getFullYear()} {eventConfig.organizer}. All rights reserved.
      </footer>
    </div>
  );
}
