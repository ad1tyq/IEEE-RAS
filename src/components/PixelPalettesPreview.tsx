/**
 * Pixel Palettes Preview Animation Component
 * 
 * A scaled-down version of the actual Pixel Palettes loading animation designed to be embedded
 * within the event card on the main homepage. This component replicates the authentic
 * loading screen with "PIXEL PALETTES" text, loading dots, and grid background.
 * 
 * Features:
 * - Authentic loading animation matching the main Pixel Palettes screen
 * - Scaled-down design optimized for card embedding
 * - Continuous looping animation for ambient effect
 * - GPU-accelerated transforms for smooth performance
 * - Responsive scaling that adapts to container size
 * - Cyberpunk color scheme with purple and cyan gradients
 * 
 * Technical Implementation:
 * - Uses Framer Motion for smooth animations
 * - Staggered letter animations for "PIXEL PALETTES" text
 * - Animated loading dots with color transitions
 * - Grid background with perspective effect
 * - Optimized for performance with will-change hints
 * 
 * @component
 * @example
 * ```tsx
 * <PixelPalettesPreview 
 *   size={80} 
 *   className="opacity-90" 
 * />
 * ```
 * 
 * @author IEEE RAS MUJ Development Team
 * @version 2.0.0
 * @since 2024
 */

'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Props interface for the PixelPalettesPreview component
 */
interface PixelPalettesPreviewProps {
  /** Size of the animation container in pixels (default: 80) */
  size?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Animation speed multiplier (default: 1) */
  speed?: number;
}

/**
 * PixelPalettesPreview Component
 * 
 * Renders the authentic Pixel Palettes loading animation in a compact format
 * suitable for embedding in cards and other UI elements.
 */
export default function PixelPalettesPreview({
  size = 80,
  className = '',
  speed = 1
}: PixelPalettesPreviewProps) {
  /**
   * Component mount state for hydration safety
   * Prevents SSR/CSR mismatch issues in Next.js
   */
  const [mounted, setMounted] = useState(false);

  /**
   * Effect to handle component mounting
   * Sets mounted state to true after component mounts
   */
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering until component is mounted
  if (!mounted) return null;

  /**
   * Animation variants for individual letters in the loading animation
   * Creates staggered 3D letter animations with vertical slide-in motion
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
        delay: i * 0.1, // Staggered delay for each letter
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
      {/* Grid Background with Perspective */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: `${size * 0.15}px ${size * 0.15}px`,
          transform: 'perspective(200px) rotateX(20deg)',
          transformOrigin: 'center bottom'
        }}
      />

      {/* Corner Brackets */}
      <div className="absolute inset-1 border border-cyan-400/30 pointer-events-none">
        {[
          { corner: 'top-left', classes: 'top-0 left-0 border-l-2 border-t-2' },
          { corner: 'top-right', classes: 'top-0 right-0 border-r-2 border-t-2' },
          { corner: 'bottom-left', classes: 'bottom-0 left-0 border-l-2 border-b-2' },
          { corner: 'bottom-right', classes: 'bottom-0 right-0 border-r-2 border-b-2' }
        ].map((corner, i) => (
          <motion.div
            key={corner.corner}
            className={`absolute border-cyan-400 ${corner.classes}`}
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
        
        {/* Centered Text Container */}
        <div className="flex flex-col items-center justify-center space-y-0.5 mb-2">
          {/* PIXEL Text */}
          <div className="flex items-center justify-center space-x-0.5">
            {"PIXEL".split("").map((letter, i) => (
              <motion.span
                key={`pixel-${i}`}
                custom={i}
                variants={letterVariants}
                initial="initial"
                animate="animate"
                className="inline-block text-purple-400 font-bold"
                style={{
                  fontSize: size * 0.1,
                  textShadow: `0 0 ${size * 0.08}px rgba(147, 51, 234, 1), 0 0 ${size * 0.04}px rgba(147, 51, 234, 0.8)`,
                  fontFamily: 'monospace',
                  letterSpacing: '1px'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
          
          {/* PALETTES Text */}
          <div className="flex items-center justify-center space-x-0.5">
            {"PALETTES".split("").map((letter, i) => (
              <motion.span
                key={`palettes-${i}`}
                custom={i + 5} // Offset delay to appear after PIXEL
                variants={letterVariants}
                initial="initial"
                animate="animate"
                className="inline-block text-cyan-400 font-bold"
                style={{
                  fontSize: size * 0.1,
                  textShadow: `0 0 ${size * 0.08}px rgba(6, 182, 212, 1), 0 0 ${size * 0.04}px rgba(6, 182, 212, 0.8)`,
                  fontFamily: 'monospace',
                  letterSpacing: '1px'
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`dot-${i}`}
              className="rounded-full"
              style={{
                width: size * 0.045,
                height: size * 0.045,
                boxShadow: `0 0 ${size * 0.1}px rgba(0, 255, 255, 0.9)`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 1, 0.3],
                scale: [0, 1.2, 1, 0.8],
                backgroundColor: [
                  'rgba(147, 51, 234, 0.8)',
                  'rgba(0, 255, 255, 1)',
                  'rgba(147, 51, 234, 1)',
                  'rgba(0, 255, 255, 0.6)'
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
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ 
            duration: 2 / speed, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-center"
        >
          <div 
            className="text-gray-300 font-bold tracking-wider"
            style={{
              fontSize: size * 0.055,
              fontFamily: 'monospace',
              textShadow: `0 0 ${size * 0.02}px rgba(255, 255, 255, 0.5)`
            }}
          >
            INITIALIZING
          </div>
          <div 
            className="text-gray-400 tracking-wide"
            style={{
              fontSize: size * 0.045,
              fontFamily: 'monospace'
            }}
          >
            HACKATHON
          </div>
        </motion.div>
      </div>

      {/* Scanline Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`scanline-${i}`}
            className="absolute w-full bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
            style={{
              height: '1px',
              top: `${20 + i * 60}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0]
            }}
            transition={{
              duration: 2 / speed,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* CRT Effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)`
        }}
      />
    </div>
  );
} 