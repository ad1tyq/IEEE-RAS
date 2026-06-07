/**
 * IEEE RAS MUJ Homepage Component
 *
 * This is the main landing page for the IEEE Robotics and Automation Society
 * at Manipal University Jaipur. It features:
 *
 * - Sophisticated squared neuronal circuit brain loading animation
 * - Responsive navigation with IEEE RAS branding
 * - Hero section with gradient text and call-to-action buttons
 * - About section with feature cards
 * - Events section highlighting Pixel Palettes hackathon
 * - Contact form with Google Sheets integration
 * - IEEE Global resources section
 * - Professional footer
 *
 * @author IEEE RAS MUJ Development Team
 * @version 2.0.0
 * @since 2024
 */

"use client";

// React hooks for state management and lifecycle
import { motion, useInView, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
// Next.js components for routing and image optimization
import Link from "next/link";
import Image from "next/image";

// Lucide React icons for UI elements
import { ChevronRight, Calendar, Users, Award, Mail, MapPin } from "lucide-react";

// Custom components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/**
 * CountUp Component
 * Animates a number from 0 to a target value when scrolled into view
 */
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && ref.current) {
      const controls = animate(0, end, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = Math.round(latest).toString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, end, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

/**
 * HomePage Component
 *
 * Main landing page component that handles:
 * - Loading animation state management
 * - Contact form functionality with Google Sheets integration
 * - Responsive design and animations
 * - Session storage for animation optimization
 */
export default function HomePage() {
  // ========================================
  // STATE MANAGEMENT
  // ========================================

  /**
   * Component mounting state
   * Prevents hydration mismatches by ensuring client-side rendering
   */
  const [mounted, setMounted] = useState(false);

  /**
   * Mobile menu visibility state
   * Controls whether the mobile navigation menu is open or closed
   */
  //  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Contact form data state
   * Manages user input for the contact form
   */
  const [formData, setFormData] = useState({
    name: "", // User's full name
    email: "", // User's email address
    message: "", // User's message content
  });

  /**
   * Form submission status
   * Displays success/error messages to the user
   */
  const [submitStatus, setSubmitStatus] = useState("");

  /**
   * Form submission loading state
   * Prevents multiple submissions and shows loading state
   */
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ========================================
  // LIFECYCLE EFFECTS
  // ========================================

  /**
   * Component initialization effect
   * Handles mounting state for hydration safety
   */
  useEffect(() => {
    // Set mounted state for hydration safety
    setMounted(true);
  }, []);

  // Prevent rendering until component is mounted (hydration safety)
  if (!mounted) return null;

  // ========================================
  // EVENT HANDLERS
  // ========================================

  /**
   * Form input change handler
   * Updates form data state when user types in form fields
   *
   * @param {React.ChangeEvent} e - The input change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Form submission handler
   * Sends form data to Google Sheets via Google Apps Script
   *
   * @param {React.FormEvent} e - The form submission event
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Prepare form data for Google Apps Script
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      // Send data to Google Apps Script endpoint
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxcx0kaGoBcyWS4eU9QuY1jJ18w4_yh8wyWhpVn95RFd173vgqDaOion3qzpgGsIonh/exec",
        {
          method: "POST",
          body: formDataToSend,
        },
      );

      if (response.ok) {
        // Success: Show confirmation and reset form
        setSubmitStatus("Message sent successfully! We will get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Error: Show error message
        setSubmitStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      // Network error: Log and show user-friendly message
      console.error("Error submitting form:", error);
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      // Reset submission state
      setIsSubmitting(false);
    }
  };

  // ========================================
  // ANIMATION VARIANTS
  // ========================================

  /**
   * Hero section animation variants
   * Controls the entrance animation for the main hero content
   */
  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut" as const,
      },
    },
  };

  /**
   * Floating background elements animation
   * Creates subtle floating motion for decorative elements
   */
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10], // Vertical floating motion
      rotate: [0, 5, -5, 0], // Subtle rotation
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  // ========================================
  // MAIN COMPONENT RENDER
  // ========================================

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* ========================================
          MAIN WEBSITE CONTENT
          ======================================== */}

      {/* ========================================
                ANIMATED BACKGROUND ELEMENTS
                ======================================== */}

      {/*
              Floating Background Decorations
              Subtle animated elements that add visual interest
              Uses different delays for organic movement
            */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Purple floating orb */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"
        />
        {/* Red floating orb with delay */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "2s" }}
          className="absolute top-40 right-20 w-24 h-24 bg-red-500/10 rounded-full blur-xl"
        />
        {/* Blue floating orb with delay */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
          className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
        />
      </div>
      <Navbar />
      {/* ========================================
                NAVIGATION BAR
                ======================================== */}

      {/*
              Fixed Navigation Header
              - Sticky positioning with backdrop blur
              - IEEE RAS logo with hover effects
              - Responsive navigation menu
              - Glass morphism design
            */}
      {/*<nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            {/* Logo Section */}
      {/*<Link href="/" className="flex items-center group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/images/logos/ieee-ras-logo.png"
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

            {/* Desktop Navigation Menu */}
      {/*<div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  {/* Hover background effect */}
      {/*<motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-red-500/20 rounded-lg backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
      {/*<div className="md:hidden">
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
      {/*{isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-800/50"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="px-4 py-3 text-lg font-medium text-gray-300 hover:text-white transition-colors duration-300 border-b border-gray-800/30 last:border-b-0"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </nav> */}

      {/* ========================================
                HERO SECTION
                ======================================== */}

      {/*
              Main Hero Section
              - Full-screen height with centered content
              - Gradient text effects for IEEE RAS branding
              - Call-to-action buttons with hover animations
              - Scroll indicator at bottom
            */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Main heading and tagline */}
            <div className="space-y-4">
              {/*
                      Main Title with Gradient Text
                      - Large responsive typography
                      - Gradient effect on IEEE RAS text
                      - Staggered animation entrance
                    */}
              <motion.h1
                className="text-5xl md:text-7xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                {/* IEEE RAS with gradient effect */}
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  IEEE RAS
                </span>
                <br />
                {/* University name in white */}
                <span className="text-white">Manipal University</span>
                <br />
                {/* Location in subtle gray */}
                <span className="text-gray-300 text-4xl md:text-5xl">Jaipur</span>
              </motion.h1>

              {/*
                      Tagline/Description
                      - Mission statement for the organization
                      - Delayed animation for reading flow
                    */}
              <motion.p
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Advancing the future of robotics and automation through innovation, research, and
                collaborative excellence.
              </motion.p>
            </div>

            {/*
                    Call-to-Action Buttons
                    - Primary and secondary action buttons
                    - Responsive layout (stack on mobile)
                    - Hover animations and effects
                  */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {/* Primary CTA Button - Explore Our Work */}
              <motion.a
                href="#about"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-red-600 rounded-full font-semibold text-white overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Explore Our Work</span>
                  {/* Arrow icon with hover animation */}
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
                {/* Hover overlay effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-700 to-red-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              {/* Secondary CTA Button - View Events */}
              <motion.a
                href="/events"
                className="px-8 py-4 border-2 border-purple-400/50 rounded-full font-semibold text-purple-400 hover:bg-purple-400/10 transition-all duration-300 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  borderColor: "rgba(168, 85, 247, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                View Events
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========================================
                ABOUT US SECTION
                ======================================== */}

      {/*
              About Us Section
              - Modern two-column layout with statistics and feature cards
              - Left side: Main content with stats
              - Right side: Feature cards highlighting key areas
              - Glass morphism design with hover effects
            */}
      <section id="about" className="py-20 relative bg-black">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Section Title */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                    About Us
                  </span>
                </h2>
                {/* Decorative underline */}
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-red-500 mb-8"></div>
              </div>

              {/* Main Heading */}
              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Pioneering the Future of Robotics
              </h3>

              {/* Description */}
              <div className="space-y-6">
                <p className="text-lg text-gray-300 leading-relaxed">
                  IEEE Robotics and Automation Society at Manipal University Jaipur is dedicated to
                  advancing the fields of robotics and automation through cutting-edge research,
                  innovative projects, and collaborative learning experiences.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Our community brings together passionate students, researchers, and industry
                  experts to explore the limitless possibilities of autonomous systems, artificial
                  intelligence, and robotic technologies.
                </p>
              </div>

              {/* Statistics */}
              <div className="flex flex-col sm:flex-row gap-8 pt-8">
                {/* Active Members Stat */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <div className="text-4xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      <CountUp end={400} suffix="+" />
                    </span>
                  </div>
                  <div className="text-gray-400 text-lg mt-2">Active Members</div>
                </motion.div>

                {/* Projects Completed Stat */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-center sm:text-left"
                >
                  <div className="text-4xl md:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                      <CountUp end={25} suffix="+" />
                    </span>
                  </div>
                  <div className="text-gray-400 text-lg mt-2">Projects Completed</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Feature Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Community Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Community</h4>
                    <p className="text-gray-400 text-sm">
                      Building connections and fostering collaboration
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Excellence Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Excellence</h4>
                    <p className="text-gray-400 text-sm">
                      Striving for innovation and technical mastery
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Events Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/8 transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar size={24} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Events</h4>
                    <p className="text-gray-400 text-sm">
                      Regular workshops, competitions, and seminars
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
                SPONSOR SECTION
                ======================================== */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto p-10 glass-card rounded-2xl backdrop-blur-md bg-white/5 border border-white/10"
          >
            {/* Section Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                BECOME A SPONSOR
              </span>
            </h2>
            {/* Decorative underline */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-red-500 mx-auto mb-8"></div>
            {/* Sponsor description */}
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Interested in sponsoring our events and initiatives? Join us in supporting the next
              generation of innovators and showcase your brand to talented developers, researchers,
              and engineers in robotics and automation.
            </p>
            {/* Contact CTA button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Mail size={20} />
              <span>Contact Us</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ========================================
                CONTACT SECTION
                ======================================== */}

      {/*
              Contact Section
              - Two-column layout with contact info and form
              - Google Sheets integration for form submissions
              - Glass morphism design with focus states
              - Real-time form validation and status messages
            */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            {/* Section Title */}
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            {/* Decorative underline */}
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-red-500 mx-auto mb-8"></div>
          </motion.div>

          {/* Contact Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              {/* Email Contact Card */}
              <div className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                <div className="flex items-center space-x-4">
                  {/* Email icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-red-500 rounded-full flex items-center justify-center">
                    <Mail size={24} className="text-white" />
                  </div>
                  {/* Email details */}
                  <div>
                    <h4 className="text-lg font-semibold text-white">Email</h4>
                    <p className="text-gray-400">ieeeras.muj@muj.manipal.edu</p>
                  </div>
                </div>
              </div>

              {/* Location Contact Card */}
              <div className="glass-card p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                <div className="flex items-center space-x-4 mb-4">
                  {/* Location icon */}
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-red-500 rounded-full flex items-center justify-center shrink-0">
                    <MapPin size={24} className="text-white" />
                  </div>
                  {/* Location details */}
                  <div>
                    <h4 className="text-lg font-semibold text-white">Location</h4>
                    <p className="text-gray-400">Manipal University Jaipur, Rajasthan</p>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="w-full h-48 rounded-xl overflow-hidden border border-white/10 mt-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.877283914113!2d75.5626593!3d26.8438552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396c4850e05bee9b%3A0x1b8d67402d4eb863!2sManipal%20University%20Jaipur!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{
                      border: 0,
                      filter: "invert(90%) hue-rotate(180deg)",
                    }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/*
                      Contact Form Container
                      - Glass morphism design
                      - Form submission with Google Sheets integration
                      - Real-time validation and status feedback
                    */}
              <div className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>

                {/* Contact Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Name Input Field */}
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                      required
                    />
                  </div>

                  {/* Email Input Field */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                      required
                    />
                  </div>

                  {/* Message Textarea Field */}
                  <div>
                    <textarea
                      rows={4}
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 rounded-lg font-semibold text-white hover:from-purple-700 hover:to-red-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>

                  {/* Form Status Message */}
                  {submitStatus && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-sm ${
                        submitStatus.includes("successfully") ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {submitStatus}
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================
                IEEE GLOBAL RESOURCES SECTION
                ======================================== */}

      {/*
              IEEE Global Links Section
              - Showcases global IEEE and IEEE RAS resources
              - Two-card layout with external links
              - Hover animations and visual feedback
              - Helps users connect with broader IEEE community
            */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900/20 border-t border-gray-800/30">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {/* Section Title */}
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">
                IEEE Global Resources
              </span>
            </h3>
            {/* Decorative underline */}
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-500 to-red-500 mx-auto mb-6"></div>
            {/* Section description */}
            <p className="text-gray-300 max-w-2xl mx-auto">
              Connect with the global IEEE community and explore robotics and automation resources
              worldwide.
            </p>
          </motion.div>

          {/* Global Resources Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            {/* IEEE Global Card */}
            <motion.a
              href="https://www.ieee.org"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-center">
                {/* IEEE Global Logo */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-white/10">
                  <Image
                    src="/images/logos/global.png"
                    alt="IEEE Global Logo"
                    width={64}
                    height={64}
                    className="object-contain w-full h-full p-2"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
                    }}
                  />
                </div>
                {/* Card Title */}
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  IEEE Global
                </h4>
                {/* Card Description */}
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">
                  Explore the world&apos;s largest technical professional organization dedicated to
                  advancing technology.
                </p>
                {/* Call-to-action link */}
                <div className="inline-flex items-center space-x-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span className="font-medium">Visit ieee.org</span>
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </motion.a>

            {/* IEEE RAS Global Card */}
            <motion.a
              href="https://www.ieee-ras.org"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="text-center">
                {/* IEEE RAS Logo */}
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden bg-white/10">
                  <Image
                    src="/images/logos/logo.png"
                    alt="IEEE RAS Logo"
                    width={64}
                    height={64}
                    className="object-contain w-full h-full p-2"
                    style={{
                      filter: "drop-shadow(0 0 8px rgba(239, 68, 68, 0.5))",
                    }}
                  />
                </div>
                {/* Card Title */}
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
                  IEEE RAS Global
                </h4>
                {/* Card Description */}
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors">
                  Discover cutting-edge research and developments in robotics and automation systems
                  worldwide.
                </p>
                {/* Call-to-action link */}
                <div className="inline-flex items-center space-x-2 text-red-400 group-hover:text-red-300 transition-colors">
                  <span className="font-medium">Visit ieee-ras.org</span>
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ========================================
                FOOTER SECTION
                ======================================== */}
      <Footer />
    </div>
  );
}

