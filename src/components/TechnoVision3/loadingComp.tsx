"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

function Loading() {
    const [isLoading, setIsLoading] = useState(true);

    const loadingVariants = {
        initial: { opacity: 1 },
        exit: {
            opacity: 0,
            transition: { duration: 1, ease: "easeInOut" as const }
        }
    };

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
                delay: i * 0.08,
                duration: 0.6,
                ease: "backOut" as const
            }
        })
    };

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
                duration: 1.5,
                repeat: Infinity,
                ease: "linear" as const
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    variants={loadingVariants}
                    initial="initial"
                    exit="exit"
                    className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    <div
                        className="absolute inset-0 opacity-30"
                        style={{
                            backgroundImage: `
                  linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
                `,
                            backgroundSize: '30px 30px',
                            transform: 'perspective(800px) rotateX(25deg)',
                            transformOrigin: 'center bottom'
                        }}
                    />

                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={`scanline-${i}`}
                                className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-80"
                                style={{ top: `${15 + i * 20}%` }}
                                animate={{ opacity: [0, 1, 0], scaleX: [0, 1, 0] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                            />
                        ))}
                    </div>

                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`vscanline-${i}`}
                                className="absolute h-full w-0.5 bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-60"
                                style={{ left: `${25 + i * 25}%` }}
                                animate={{ opacity: [0, 0.8, 0], scaleY: [0, 1, 0] }}
                                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6, ease: "easeInOut" }}
                            />
                        ))}
                    </div>

                    <div className="absolute inset-8 border-2 border-cyan-500/40 pointer-events-none">
                        {[
                            { corner: 'top-left', classes: 'top-0 left-0 border-l-4 border-t-4' },
                            { corner: 'top-right', classes: 'top-0 right-0 border-r-4 border-t-4' },
                            { corner: 'bottom-left', classes: 'bottom-0 left-0 border-l-4 border-b-4' },
                            { corner: 'bottom-right', classes: 'bottom-0 right-0 border-r-4 border-b-4' }
                        ].map((corner, i) => (
                            <motion.div
                                key={corner.corner}
                                className={`absolute w-12 h-12 border-cyan-500 ${corner.classes}`}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease: "backOut" }}
                            />
                        ))}
                    </div>

                    <div className="relative z-10 text-center mb-8">
                        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3 mb-4">
                            {"TECHNO".split("").map((letter, i) => (
                                <motion.span
                                    key={`techno-${i}`}
                                    custom={i}
                                    variants={letterVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-cyan-500 inline-block"
                                    style={{
                                        textShadow: '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.4)',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-3">
                            {"VISION 3.0".split("").map((letter, i) => (
                                <motion.span
                                    key={`vision-${i}`}
                                    custom={i + 6}
                                    variants={letterVariants}
                                    initial="initial"
                                    animate="animate"
                                    className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-purple-500 inline-block"
                                    style={{
                                        textShadow: '0 0 20px rgba(168, 85, 247, 0.8), 0 0 40px rgba(168, 85, 247, 0.4)',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </motion.span>
                            ))}
                        </div>

                        <motion.div
                            variants={glitchVariants}
                            initial="initial"
                            animate="animate"
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                background: 'linear-gradient(45deg, transparent 48%, rgba(168, 85, 247, 0.1) 49%, rgba(6, 182, 212, 0.1) 51%, transparent 52%)',
                                mixBlendMode: 'multiply'
                            }}
                        />
                    </div>

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
                                        'rgba(6, 182, 212, 0.8)',
                                        'rgba(168, 85, 247, 1)',
                                        'rgba(6, 182, 212, 1)',
                                        'rgba(168, 85, 247, 0.6)'
                                    ]
                                }}
                                transition={{
                                    duration: 1.6,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                                style={{ boxShadow: '0 0 15px rgba(6, 182, 212, 0.8)' }}
                            />
                        ))}
                    </div>

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
                                    '0 0 10px rgba(6, 182, 212, 0.5)',
                                    '0 0 20px rgba(6, 182, 212, 0.8)',
                                    '0 0 10px rgba(6, 182, 212, 0.5)'
                                ]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            INITIALIZING IDEATHON
                        </motion.div>

                        <motion.div
                            className="font-mono text-sm text-gray-400 tracking-wide"
                            animate={{ opacity: [0.4, 0.8, 0.4] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            Loading creative experience...
                        </motion.div>
                    </motion.div>

                    <div
                        className="absolute inset-0 pointer-events-none opacity-15"
                        style={{
                            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.15) 2px, rgba(6, 182, 212, 0.15) 4px)'
                        }}
                    />

                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(circle at center, transparent 40%, rgba(0, 0, 0, 0.3) 100%)' }}
                        animate={{ opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Loading;
