"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// ========================================
// NAVIGATION CONFIGURATION
// ========================================

/**
 * Navigation menu items
 * Defines the main navigation structure with anchor links
 */
const navItems = [
    { name: 'About', href: '/#about' },
    { name: 'Events', href: '/events' },
    { name: 'Contact', href: '/#contact' }
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    /**
 * Close mobile menu when clicking outside
 * Improves user experience by allowing easy dismissal
 */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            const nav = document.querySelector('nav');

            if (isMobileMenuOpen && nav && !nav.contains(target)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isMobileMenuOpen]);
    return (
        <>
            {/* Navigation Bar - Fixed header with glassmorphism and minimal padding */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
                <div className="max-w-6xl mx-auto px-6" style={{ paddingTop: '1px', paddingBottom: '1px' }}>
                    <div className="flex items-center justify-between">
                        {/* Logo Section */}
                        <Link href="/" className="flex items-center group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Image
                                    src="/images/logos/logo.png"
                                    alt="IEEE RAS MUJ Logo"
                                    width={256}
                                    height={256}
                                    priority
                                    quality={100}
                                    className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
                                    style={{
                                        filter: 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.8))',
                                        imageRendering: 'crisp-edges'
                                    }}
                                    sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 128px"
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation Menu - Hidden on mobile */}
                        <div className="hidden md:flex space-x-8">
                            {navItems.map((item, index) => (
                                <Link href={item.href} key={index} className="text-xl hover:text-purple-400 transition-colors font-mono-pixel">
                                    {item.name}</Link>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-300 hover:text-white transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle mobile menu"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800/50"
                    >
                        <div className="max-w-6xl mx-auto px-6 py-4">
                            <div className="flex flex-col space-y-4">
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {navItems.map((item, index) => (
                                        <Link
                                            href={item.href} key={index}
                                            className="block px-4 py-3 text-lg font-mono-pixel text-gray-300 hover:text-purple-400 transition-colors duration-300 border-b border-gray-800/30"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </nav>
        </>
    );
}