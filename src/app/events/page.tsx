'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { eventsData } from 'data/eventsData';
import PixelPalettesPreview from '@/components/PixelPalettesPreview';
import WingsAndWiresPreview from '@/components/WingsAndWires/WingsAndWiresPreview';
import CookCrackCapturePreview from '@/components/CookCrackCapture/CookCrackCapturePreview';
import TechnoVision3Preview from '@/components/TechnoVision3/TechnoVision3Preview';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('completed');

  const displayedEvents = activeTab === 'upcoming' 
    ? [...eventsData.upcoming].reverse() 
    : [...eventsData.completed].reverse();

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mt-10 mb-5">
              <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                Events & Activities
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto mb-8"></div>
          </motion.div>

          {/* Toggle Switch */}
          <div className="flex justify-center mb-16">
            <div className="flex relative p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              {['completed', 'upcoming'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 z-10 ${
                    activeTab === tab ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-red-600 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {tab === 'completed' ? 'Completed Events' : 'Upcoming Events'}
                </button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          {displayedEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <div className="text-3xl text-white font-light mb-4 drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]">
                Coming soon...
              </div>
              <p className="text-gray-300 text-lg font-light drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                Stay tuned for exciting new events!
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedEvents.map((event) => (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="group"
                  key={event.id}
                >
                  <motion.div
                    className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-300 h-full flex flex-col"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Event Animation */}
                    {event.title === "Pixel Palettes" ? (
                      <div className="flex justify-center mb-6">
                        <PixelPalettesPreview size={80} className="opacity-90" speed={1} />
                      </div>
                    ) : event.title === "Wings And Wires" ? (
                      <div className="flex justify-center mb-6">
                        <WingsAndWiresPreview size={80} className="opacity-90" speed={1} />
                      </div>
                    ) : event.title === "Cook Crack Capture" ? (
                      <div className="flex justify-center mb-6">
                        <CookCrackCapturePreview size={80} className="opacity-90" speed={1} />
                      </div>
                    ) : event.title === "Techno Vision 3.0" ? (
                      <div className="flex justify-center mb-6">
                        <TechnoVision3Preview size={80} className="opacity-90" speed={1} />
                      </div>
                    ) : (
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Users size={32} className="text-white" />
                        </div>
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-white mb-4 text-center">{event.title}</h3>
                    <p className="text-gray-300 text-center mb-8 flex-grow leading-relaxed">
                      {event.description}
                    </p>

                    <div className="text-center">
                      <Link
                        href={event.href}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 rounded-full font-medium text-white transition-all duration-300 hover:from-purple-700 hover:to-red-700 hover:scale-105"
                      >
                        <span>Explore Event</span>
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
