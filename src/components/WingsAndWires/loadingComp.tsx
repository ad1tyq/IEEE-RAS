"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
function Loading() {
    const [isLoading] = useState(true);

    /**
 * Framer Motion animation variants for loading screen container
 * Controls the overall fade-out transition when loading completes
 */
    const loadingVariants = {
        initial: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: { duration: 1, ease: "easeInOut" as const }
        }
    };

    /**
     * Framer Motion animation variants for individual letters in loading animation
     * Creates staggered 3D letter animations with:
     * - Vertical slide-in motion (y: 50 to 0)
     * - 3D rotation effect (rotateX: -90 to 0)
     * - Scale transformation for dramatic entrance
     * - Staggered timing based on letter index
     */
    const letterVariants = {
        initial: {
            opacity: 0,
            y: 50,
            rotateX: -90,
            scale: 0.5
        },
        animate: (i: number) => ({
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1,
            transition: {
                delay: i * 0.08, // Staggered delay: 80ms per letter (quick reveal)
                duration: 0.6,   // Quick individual letter animation
                ease: "backOut" as const // Bounce-back easing for dramatic effect
            }
        })
    };

    /**
     * Framer Motion animation variants for glitch effects
     * Creates continuous color-shifting glitch overlay using hue-rotate filter
     * Cycles through full color spectrum (0-360 degrees) infinitely
     */
    const glitchVariants = {
        initial: { filter: "hue-rotate(0deg)" },
        animate: {
            filter: [
                "hue-rotate(0deg)",
                "hue-rotate(90deg)",
                "hue-rotate(180deg)",
                "hue-rotate(270deg)",
                "hue-rotate(360deg)"
            ],
            transition: {
                duration: 1.5,   // Quick glitch effect cycles
                repeat: Infinity,
                ease: "linear" as const
            }
        }
    };

  /**
   * Main effect hook for component initialization and loading logic
   * Handles:
   * - Setting mounted state for hydration safety
   * - Session storage tracking for loading animation control
   * - Timer management for extended loading screen duration
   * - Detection of page refresh vs navigation
   */

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    variants={loadingVariants}
                    initial="initial"
                    exit="exit"
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Enhanced Retro Grid Background with Perspective */}
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `
                  linear-gradient(rgba(0, 255, 255, 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 255, 255, 0.4) 1px, transparent 1px)
                `,
                            backgroundSize: '30px 30px',
                            transform: 'perspective(800px) rotateX(25deg)',
                            transformOrigin: 'center bottom'
                        }}
                    />

                    {/* Animated Horizontal Scanlines - Full width sweeping lines */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={`scanline-${i}`}
                                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80"
                                style={{
                                    top: `${15 + i * 20}%`,
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scaleX: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Vertical Scanlines */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`vscanline-${i}`}
                                className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-60"
                                style={{
                                    left: `${25 + i * 25}%`,
                                }}
                                animate={{
                                    opacity: [0, 0.8, 0],
                                    scaleY: [0, 1, 0]
                                }}
                                transition={{
                                    duration: 1.8,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Corner Frame Animations */}
                    <div className="absolute inset-8 border-2 border-cyan-400/40 pointer-events-none">
                        {/* Animated corner brackets */}
                        {[
                            { corner: 'top-left', classes: 'top-0 left-0 border-l-4 border-t-4' },
                            { corner: 'top-right', classes: 'top-0 right-0 border-r-4 border-t-4' },
                            { corner: 'bottom-left', classes: 'bottom-0 left-0 border-l-4 border-b-4' },
                            { corner: 'bottom-right', classes: 'bottom-0 right-0 border-r-4 border-b-4' }
                        ].map((corner, i) => (
                            <motion.div
                                key={corner.corner}
                                className={`absolute w-12 h-12 border-cyan-400 ${corner.classes}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 0.5 + i * 0.1,
                                    duration: 0.4,
                                    ease: "backOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Main Event Name - Split into PIXEL and PALETTES with different colors */}
                    <div className="relative z-10 text-center mb-8">
                        {/* PIXEL text in purple */}
                        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 mb-4">
                            {"TECHNO".split("").map((letter, i) => (
                                <motion.span
                                    key={`pixel-${i}`}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-purple-400 inline-block"
                                    style={{
                                        // Neon glow effect with multiple shadow layers
                                        textShadow: '0 0 20px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.4)',
                                        transformStyle: 'preserve-3d' // Enable 3D transforms
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* PALETTES text in cyan */}
                        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3">
                            {"VISION 3.0".split("").map((letter, i) => (
                                <motion.span
                                    key={`palettes-${i}`}
                                    custom={i + 5} // Offset delay to appear after PIXEL
                                    variants={letterVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cyan-400 inline-block"
                                    style={{
                                        textShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* Glitch Effect Overlay - Animated color-shifting overlay */}
                        <motion.div
                            variants={glitchVariants}
                            initial="initial"
                            animate="animate"
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                // Diagonal gradient with blend mode for glitch effect
                                background: 'linear-gradient(45deg, transparent 48%, rgba(255, 0, 255, 0.1) 49%, rgba(255, 0, 255, 0.1) 51%, transparent 52%)',
                                mixBlendMode: 'multiply'
                            }}
                        />
                    </div>

                    {/* Enhanced Loading Dots Matrix - More prominent and animated */}
                    <div className="flex space-x-3 mb-12">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={`dot-${i}`}
                                className="w-4 h-4 rounded-full"
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
                                    duration: 1.6,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                                style={{
                                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.8)'
                                }}
                            />
                        ))}
                    </div>

                    {/* Enhanced Loading Text - More prominent status indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.0, duration: 0.6 }}
                        className="text-center space-y-4"
                    >
                        <motion.div
                            className="font-mono text-xl font-bold tracking-wider text-gray-200"
                            animate={{
                                opacity: [0.7, 1, 0.7],
                                textShadow: [
                                    '0 0 10px rgba(0, 255, 255, 0.5)',
                                    '0 0 20px rgba(0, 255, 255, 0.8)',
                                    '0 0 10px rgba(0, 255, 255, 0.5)'
                                ]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            INITIALIZING HACKATHON
                        </motion.div>

                        <motion.div
                            className="font-mono text-sm text-gray-400 tracking-wide"
                            animate={{
                                opacity: [0.4, 0.8, 0.4]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            Loading creative experience...
                        </motion.div>
                    </motion.div>

                    {/* Enhanced CRT Effect - Multiple layer scanlines */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-15"
                        style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.15) 2px, rgba(0, 255, 255, 0.15) 4px)'
                        }}
                    />

                    {/* Additional subtle overlay for depth */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)'
                        }}
                        animate={{
                            opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Loading;