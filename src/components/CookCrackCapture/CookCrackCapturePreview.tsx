'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Props interface for the CookCrackCapturePreview component
 */
interface CookCrackCapturePreviewProps {
  /** Size of the animation container in pixels (default: 80) */
  size?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Animation speed multiplier (default: 1) */
  speed?: number;
}

/**
 * CookCrackCapturePreview Component
 * * Renders an authentic loading animation with a synthwave color palette
 * inspired by the provided reference image.
 */
export default function CookCrackCapturePreview({
  size = 80,
  className = '',
  speed = 1
}: CookCrackCapturePreviewProps) {
  /**
   * Component mount state for hydration safety
   */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  /**
   * Animation variants for individual letters
   */
  const letterVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "backOut" as const
      }
    })
  };

  return (
    <div 
      className={`relative overflow-hidden bg-black rounded-lg ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Grid Background with Perspective - Changed to Green */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: `${size * 0.15}px ${size * 0.15}px`,
          transform: 'perspective(200px) rotateX(20deg)',
          transformOrigin: 'center bottom'
        }}
      />

      {/* Corner Brackets - Changed to Green */}
      <div className="absolute inset-1 border border-green-500/30 pointer-events-none">
        {[
          { corner: 'top-left', classes: 'top-0 left-0 border-l-2 border-t-2' },
          { corner: 'top-right', classes: 'top-0 right-0 border-r-2 border-t-2' },
          { corner: 'bottom-left', classes: 'bottom-0 left-0 border-l-2 border-b-2' },
          { corner: 'bottom-right', classes: 'bottom-0 right-0 border-r-2 border-b-2' }
        ].map((corner, i) => (
          <motion.div
            key={corner.corner}
            className={`absolute border-green-500 ${corner.classes}`} // Changed from border-orange-400
            style={{ 
              width: size * 0.15, 
              height: size * 0.15 
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2 + i * 0.1,
              duration: 0.4,
              ease: "backOut"
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        
        <div className="flex flex-col items-center justify-center space-y-0.5 mb-2">
          {/* COOK Text - Changed to Green */}
          <div className="flex items-center justify-center space-x-0.5">
            {"COOK".split("").map((letter, i) => (
              <motion.span
                key={`pixel-${i}`} custom={i} variants={letterVariants} initial="initial" animate="animate"
                className="inline-block text-green-500 font-bold" // Changed from text-fuchsia-400
                style={{
                  fontSize: size * 0.1,
                  textShadow: `0 0 ${size * 0.08}px rgba(34, 197, 94, 1), 0 0 ${size * 0.04}px rgba(34, 197, 94, 0.8)`, // Changed color
                  fontFamily: 'monospace', letterSpacing: '1px'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* CRACK Text - Changed to Yellow */}
          <div className="flex items-center justify-center space-x-0.5">
            {"CRACK".split("").map((letter, i) => (
              <motion.span
                key={`palettes-${i}`} custom={i + 5} variants={letterVariants} initial="initial" animate="animate"
                className="inline-block text-yellow-500 font-bold" // Changed from text-orange-400
                style={{
                  fontSize: size * 0.1,
                  textShadow: `0 0 ${size * 0.08}px rgba(234, 179, 8, 1), 0 0 ${size * 0.04}px rgba(234, 179, 8, 0.8)`, // Changed color
                  fontFamily: 'monospace', letterSpacing: '1px'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Loading Dots - Changed to Violet/Purple 
        <div className="flex space-x-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`dot-${i}`} className="rounded-full"
              style={{
                width: size * 0.045, height: size * 0.045,
                boxShadow: `0 0 ${size * 0.1}px rgba(139, 92, 246, 0.9)` // Changed color
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0.3], scale: [0, 1.2, 1, 0.8],
                backgroundColor: [ // Changed color palette
                  'rgba(168, 85, 247, 0.8)', // Purple
                  'rgba(139, 92, 246, 1)',   // Violet
                  'rgba(168, 85, 247, 1)',   // Purple
                  'rgba(139, 92, 246, 0.6)'  // Violet
                ]
              }}
              transition={{
                duration: 1.6 / speed, repeat: Infinity, delay: i * 0.2, ease: "easeInOut"
              }}
            />
          ))}
        </div> */}

        {/* Loading Dots */}
        <div className="flex space-x-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="rounded-full"
              style={{
                width: size * 0.045,
                height: size * 0.045,
                boxShadow: `0 0 ${size * 0.1}px rgba(34, 197, 94, 0.9)`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0.3],
                scale: [0, 1.2, 1, 0.8],
                backgroundColor: [
                  'rgba(34, 197, 94, 0.8)',
                  'rgba(234, 179, 8, 1)',
                  'rgba(34, 197, 94, 1)',
                  'rgba(234, 179, 8, 0.6)'
                ]
              }}
              transition={{
                duration: 1.6 / speed,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Status Text */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2 / speed, repeat: Infinity, ease: "easeInOut" }}
          className="text-center"
        >
          <div className="text-gray-300 font-bold tracking-wider" style={{ fontSize: size * 0.055, fontFamily: 'monospace', textShadow: `0 0 ${size * 0.02}px rgba(255, 255, 255, 0.5)`}}>INITIALIZING</div>
          <div className="text-gray-400 tracking-wide" style={{ fontSize: size * 0.045, fontFamily: 'monospace' }}>CTF</div>
        </motion.div>
      </div>

      {/* Scanline Effects - Changed to Green/Yellow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`scanline-${i}`}
            className="absolute w-full bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" // Changed from via-orange-400/30
            style={{ height: '1px', top: `${20 + i * 60}%`}}
            animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
            transition={{ duration: 2 / speed, repeat: Infinity, delay: i * 1, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* CRT Effect - Changed to Green */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 197, 94, 0.1) 2px, rgba(34, 197, 94, 0.1) 4px)` // Changed color
        }}
      />
    </div>
  );
}

