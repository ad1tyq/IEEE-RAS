'use client';

import { motion } from 'framer-motion';
import { useState, ElementType } from 'react';
import { ChevronDown, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { problemDomains } from 'data/problemsData';

/**
 * Problem Statements Page Component
 * 
 * This component displays all problem statements for the Pixel Palettes hackathon,
 * organized by domain with collapsible sections. Features cyberpunk styling
 * consistent with the main event page.
 * 
 * Key Features:
 * - Domain-wise organization of problem statements
 * - Collapsible sections for better navigation
 * - Responsive design with glassmorphism effects
 * - Smooth animations and transitions
 * - Icon-based domain identification
 * - Back navigation to main event page
 * 
 * Domains:
 * - LegalTech - Legal technology and AI verification
 * - Blockchain - Decentralized systems and transparency
 * - Disaster Management - Emergency response and prediction
 * - FinTech - Financial technology and trading
 * - Healthcare - Medical AI and IoT monitoring
 * - Open Innovation - Creative and adaptive platforms
 * - EdTech - Educational technology and adaptive learning
 * 
 * @returns {JSX.Element} Complete Problem Statements page
 */
// --- Define the type for a single problem statement ---
type Problem = {
  id: number;
  title: string;
  description: string;
};

// --- Define the type for a single domain object ---
type ProblemDomain = {
  name: string;
  icon: ElementType; // Type for a React component like lucide-react icons
  color: string;
  glowColor: string;
  problems: Problem[];
};
export default function ProblemsPage() {
  /**
   * State to track which domain sections are expanded
   * Each domain can be independently expanded/collapsed
   */
  const [expandedDomains, setExpandedDomains] = useState<Record<string, boolean>>({});

  /**
   * Toggle the expansion state of a domain section
   * @param domain - The domain name to toggle
   */
  const toggleDomain = (domain: string) => {
    setExpandedDomains(prev => ({
      ...prev,
      [domain]: !prev[domain]
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-900/20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link
              href="/pixelpalettes"
              className="inline-flex items-center space-x-2 font-mono-pixel text-cyan-400 hover:text-cyan-300 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Event</span>
            </Link>
          </motion.div>

          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="font-pixel text-4xl md:text-6xl lg:text-7xl mb-6 neon-glow break-words">
              PROBLEM STATEMENTS
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="font-mono-pixel text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Choose your challenge and build the future with AI-powered solutions across diverse domains
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Domains Section */}
      <section className="py-16 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-6">
            {(problemDomains as ProblemDomain[]).map((domain, domainIndex) => {
              const IconComponent = domain.icon;
              const isExpanded = expandedDomains[domain.name];

              return (
                <motion.div
                  key={domain.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: domainIndex * 0.1 }}
                  className="glass modern-card rounded-2xl overflow-hidden"
                >
                  {/* Domain Header - Clickable */}
                  <motion.button
                    onClick={() => toggleDomain(domain.name)}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center space-x-4">
                      {/* Domain Icon */}
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${domain.color} flex items-center justify-center`}
                        style={{
                          boxShadow: `0 0 20px ${domain.glowColor}`
                        }}
                      >
                        <IconComponent size={24} className="text-white" />
                      </div>

                      {/* Domain Title */}
                      <div className="text-left">
                        <h2 className="font-pixel text-2xl md:text-3xl mb-1">
                          {domain.name}
                        </h2>
                        <p className="font-mono-pixel text-sm text-gray-400">
                          {domain.problems.length} Problem{domain.problems.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse Icon */}
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} className="text-gray-400" />
                    </motion.div>
                  </motion.button>

                  {/* Domain Problems - Collapsible */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-6">
                      <div className="space-y-4">
                        {domain.problems.map((problem, problemIndex) => (
                          <motion.div
                            key={problem.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -20 }}
                            transition={{ duration: 0.4, delay: problemIndex * 0.1 }}
                            className="glass-strong rounded-xl p-6 border-l-4"
                            style={{
                              borderLeftColor: domain.glowColor.replace('0.4', '0.8')
                            }}
                          >
                            {/* Problem Header */}
                            <div className="flex items-start space-x-3 mb-4">
                              <div
                                className="w-8 h-8 rounded-lg bg-gradient-to-r flex items-center justify-center flex-shrink-0 mt-1"
                                style={{
                                  background: `linear-gradient(45deg, ${domain.glowColor}, ${domain.glowColor.replace('0.4', '0.6')})`
                                }}
                              >
                                <span className="font-pixel text-sm text-white">
                                  {problem.id}
                                </span>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-pixel text-lg md:text-xl mb-3 text-white">
                                  {problem.title}
                                </h3>
                                <p className="font-mono-pixel text-base text-gray-300 leading-relaxed">
                                  {problem.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>


        </div>
      </section>
    </div>
  );
} 