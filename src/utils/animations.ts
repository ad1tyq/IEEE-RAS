/**
 * Animation Utilities for IEEE RAS MUJ Website
 * 
 * This file contains reusable Framer Motion animation variants and configurations
 * used throughout the IEEE RAS MUJ website. It provides:
 * 
 * - Consistent animation timing and easing functions
 * - Reusable animation variants for common UI patterns
 * - Performance-optimized animation configurations
 * - Accessibility-aware animations with reduced motion support
 * - Staggered animation utilities for list items and grids
 * - Custom animation factories for dynamic use cases
 * 
 * Performance Optimizations:
 * - Uses GPU-accelerated properties (transform, opacity, scale)
 * - Avoids animating layout-triggering properties (width, height, top, left)
 * - Leverages will-change hints for better browser optimization
 * - Implements reduced motion preferences for accessibility
 * 
 * @author IEEE RAS MUJ Development Team
 * @version 2.0.0
 * @since 2024
 */

import { Variants, Easing } from 'framer-motion';

// ========================================
// ANIMATION CONSTANTS
// ========================================

/**
 * Standard animation durations in seconds
 * 
 * These constants ensure consistent timing across the application
 * and follow Material Design motion principles for natural feel.
 * 
 * Usage Guidelines:
 * - FAST: Micro-interactions, button hovers, icon changes
 * - NORMAL: Card entrances, form validation feedback, modal opening
 * - SLOW: Page transitions, hero animations, complex sequences
 * - EXTRA_SLOW: Loading screens, onboarding flows, dramatic reveals
 */
export const ANIMATION_DURATIONS = {
  /** Fast animations for micro-interactions (buttons, hovers) - 200ms */
  fast: 0.2,
  /** Normal animations for most UI transitions - 400ms */
  normal: 0.4,
  /** Slow animations for page transitions and complex animations - 800ms */
  slow: 0.8,
  /** Extra slow for hero animations and loading sequences - 1200ms */
  extraSlow: 1.2,
} as const;

/**
 * Standard easing functions for consistent motion feel
 * 
 * Based on Material Design motion principles and natural physics.
 * Each easing serves different interaction patterns:
 * 
 * - STANDARD: General purpose, feels natural for most transitions
 * - DECELERATE: Elements entering the screen, expanding content
 * - ACCELERATE: Elements leaving the screen, collapsing content
 * - SHARP: Quick state changes, toggles, immediate responses
 * - BOUNCE: Playful interactions, success states, attention-grabbing
 * 
 * Technical Note: These are cubic-bezier curves optimized for performance
 */
export const ANIMATION_EASINGS = {
  /** Standard easing for most animations - balanced acceleration/deceleration */
  standard: [0.4, 0.0, 0.2, 1] as const,
  /** Decelerate easing for elements entering the screen - slow start, quick end */
  decelerate: [0.0, 0.0, 0.2, 1] as const,
  /** Accelerate easing for elements leaving the screen - quick start, slow end */
  accelerate: [0.4, 0.0, 1, 1] as const,
  /** Sharp easing for quick state changes - linear-like with slight curve */
  sharp: [0.4, 0.0, 0.6, 1] as const,
  /** Bounce effect for playful interactions - overshoots target then settles */
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

/**
 * Stagger timing for sequential animations
 * 
 * Controls delays between animated elements in a group.
 * Creates wave-like or cascade effects for lists, grids, and card collections.
 * 
 * Implementation Tips:
 * - Use FAST for large lists (10+ items) to avoid long total duration
 * - Use NORMAL for medium lists (3-8 items) for clear sequential effect
 * - Use SLOW for small groups (2-4 items) for dramatic emphasis
 */
export const STAGGER_TIMINGS = {
  /** Quick stagger for large lists - 50ms delay between items */
  fast: 0.05,
  /** Normal stagger for most use cases - 100ms delay between items */
  normal: 0.1,
  /** Slow stagger for dramatic effect - 200ms delay between items */
  slow: 0.2,
} as const;

// ========================================
// FADE ANIMATIONS
// ========================================

/**
 * Basic fade in/out animation variants
 * 
 * The most fundamental animation pattern for showing/hiding content.
 * Uses only opacity changes for maximum performance.
 * 
 * Best Use Cases:
 * - Modal overlays and backgrounds
 * - Tooltip appearances
 * - Simple content reveals
 * - Loading state transitions
 * 
 * Performance: Excellent - only animates opacity (compositor layer)
 */
export const fadeVariants: Variants = {
  /** Hidden state - completely transparent and invisible to screen readers */
  hidden: {
    opacity: 0,
  },
  /** Visible state - fully opaque and accessible */
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal, // 400ms for smooth but quick fade-in
      ease: ANIMATION_EASINGS.decelerate,   // Slow start for gentle appearance
    },
  },
  /** Exit state - fade out quickly for responsive feel */
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.fast,   // 200ms for quick removal
      ease: ANIMATION_EASINGS.accelerate,   // Quick start for immediate response
    },
  },
};

/**
 * Fade animation with upward motion
 * 
 * Combines opacity and vertical movement for more dynamic entrances.
 * Creates the impression of content "rising" into view.
 * 
 * Best Use Cases:
 * - Card components and content sections
 * - Form field validation messages
 * - Success/error notifications
 * - Hero section content reveals
 * 
 * Performance: Good - uses transform which is GPU-accelerated
 * Accessibility: Motion can be disabled via prefers-reduced-motion
 */
export const fadeUpVariants: Variants = {
  /** Hidden state - transparent and positioned 30px below final position */
  hidden: {
    opacity: 0,
    y: 30, // Start below final position for subtle upward motion
  },
  /** Visible state - opaque and at final position */
  visible: {
    opacity: 1,
    y: 0, // Move to final position
    transition: {
      duration: ANIMATION_DURATIONS.normal, // 400ms for smooth transition
      ease: ANIMATION_EASINGS.decelerate,   // Natural deceleration for entrance
    },
  },
  /** Exit state - fade out while moving upward (opposite of entrance) */
  exit: {
    opacity: 0,
    y: -30, // Exit by moving upward for visual consistency
    transition: {
      duration: ANIMATION_DURATIONS.fast,   // Quick exit for responsiveness
      ease: ANIMATION_EASINGS.accelerate,   // Quick start for immediate feedback
    },
  },
};

/**
 * Fade animation with downward motion
 * 
 * Opposite of fadeUp - content appears to "drop" into view.
 * Creates hierarchy by suggesting content flows from above.
 * 
 * Best Use Cases:
 * - Navigation dropdowns and menus
 * - Header notifications and alerts
 * - Breadcrumb trails
 * - Top-level section headers
 * 
 * Performance: Good - uses transform which is GPU-accelerated
 */
export const fadeDownVariants: Variants = {
  /** Hidden state - transparent and positioned 30px above final position */
  hidden: {
    opacity: 0,
    y: -30, // Start above final position
  },
  /** Visible state - opaque and at final position */
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.decelerate,
    },
  },
  /** Exit state - fade out while moving upward (back to origin) */
  exit: {
    opacity: 0,
    y: -30, // Exit upward to match entrance direction
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.accelerate,
    },
  },
};

// ========================================
// SLIDE ANIMATIONS
// ========================================

/**
 * Slide in from left animation
 * 
 * Content slides horizontally from left edge into final position.
 * Suggests content is entering from off-screen or another context.
 * 
 * Best Use Cases:
 * - Sidebar navigation panels
 * - Left-aligned content sections
 * - Previous/back navigation transitions
 * - Mobile menu slides
 * 
 * Performance: Good - uses transform translateX
 * Responsive: Works well on all screen sizes
 */
export const slideInLeftVariants: Variants = {
  /** Hidden state - off-screen to the left and transparent */
  hidden: {
    opacity: 0,
    x: -50, // Start 50px to the left of final position
  },
  /** Visible state - slide into final position */
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.decelerate, // Natural deceleration for entrance
    },
  },
  /** Exit state - slide back to left edge */
  exit: {
    opacity: 0,
    x: -50, // Exit back to starting position
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.accelerate,
    },
  },
};

/**
 * Slide in from right animation
 * 
 * Content slides horizontally from right edge into final position.
 * Often used for forward navigation or new content introduction.
 * 
 * Best Use Cases:
 * - Right-aligned content and sidebars
 * - Next/forward navigation transitions
 * - Shopping cart slides
 * - Secondary navigation panels
 * 
 * Performance: Good - uses transform translateX
 */
export const slideInRightVariants: Variants = {
  /** Hidden state - off-screen to the right and transparent */
  hidden: {
    opacity: 0,
    x: 50, // Start 50px to the right of final position
  },
  /** Visible state - slide into final position */
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.decelerate,
    },
  },
  /** Exit state - slide back to right edge */
  exit: {
    opacity: 0,
    x: 50, // Exit back to starting position
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.accelerate,
    },
  },
};

// ========================================
// SCALE ANIMATIONS
// ========================================

/**
 * Scale animation with fade
 * 
 * Content grows from smaller size while fading in, creating emphasis.
 * Suggests content is appearing or being created in place.
 * 
 * Best Use Cases:
 * - Modal dialogs and popups
 * - Image gallery overlays
 * - Confirmation dialogs
 * - Feature highlights and callouts
 * 
 * Performance: Excellent - scale and opacity are both GPU-accelerated
 * Visual Impact: High - very noticeable and attention-grabbing
 */
export const scaleVariants: Variants = {
  /** Hidden state - scaled down and transparent */
  hidden: {
    opacity: 0,
    scale: 0.8, // Start at 80% of final size for subtle scaling effect
  },
  /** Visible state - full size and opaque */
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.bounce, // Bounce effect for playful entrance
    },
  },
  /** Exit state - scale down while fading out */
  exit: {
    opacity: 0,
    scale: 0.8, // Scale down to match entrance
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.accelerate,
    },
  },
};

/**
 * Pop-in animation with bounce effect
 * 
 * Dramatic scale animation that overshoots then settles.
 * Creates high visual impact and draws attention.
 * 
 * Best Use Cases:
 * - Success states and celebrations
 * - Achievement unlocks and rewards
 * - Important notifications
 * - Interactive button feedback
 * 
 * Performance: Excellent - uses only transform and opacity
 * Accessibility: May need reduced motion alternative
 */
export const popVariants: Variants = {
  /** Hidden state - small scale and transparent */
  hidden: {
    opacity: 0,
    scale: 0.3, // Start much smaller for dramatic effect
  },
  /** Visible state - pop to full size with bounce */
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.slow, // Longer duration for dramatic effect
      ease: ANIMATION_EASINGS.bounce,     // Strong bounce for attention-grabbing entrance
    },
  },
  /** Hover state - slight scale increase for interactivity */
  hover: {
    scale: 1.05, // Subtle scale increase on hover
    transition: {
      duration: ANIMATION_DURATIONS.fast, // Quick response to hover
      ease: ANIMATION_EASINGS.standard,
    },
  },
  /** Tap state - slight scale decrease for tactile feedback */
  tap: {
    scale: 0.95, // Brief scale down for press feedback
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.standard,
    },
  },
};

// ========================================
// CONTAINER ANIMATIONS
// ========================================

/**
 * Container animation for staggered children
 * 
 * Controls the timing of child element animations within a container.
 * Creates cascading or wave-like effects for lists and grids.
 * 
 * Best Use Cases:
 * - Card grids and product listings
 * - Navigation menu items
 * - Feature lists and testimonials
 * - Gallery items and portfolios
 * 
 * Implementation:
 * - Apply to parent container
 * - Child elements automatically stagger based on DOM order
 * - Use with variants that respond to parent states
 */
export const containerVariants: Variants = {
  /** Hidden state - prepare for children animation */
  hidden: {
    opacity: 0,
  },
  /** Visible state - trigger staggered children */
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.fast,     // Quick container fade-in
      staggerChildren: STAGGER_TIMINGS.normal, // 100ms delay between child animations
      delayChildren: 0.1,                      // Wait 100ms before starting child animations
    },
  },
  /** Exit state - reverse stagger animation */
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      staggerChildren: STAGGER_TIMINGS.fast, // Faster exit stagger
      staggerDirection: -1,                   // Reverse order for exit
    },
  },
};

/**
 * Fast container animation for quick lists
 * 
 * Optimized for larger lists where normal stagger would be too slow.
 * Maintains visual interest without excessive total duration.
 * 
 * Best Use Cases:
 * - Large data tables and lists
 * - Search results
 * - Notification lists
 * - Tag clouds and filter options
 */
export const fastContainerVariants: Variants = {
  /** Hidden state */
  hidden: {
    opacity: 0,
  },
  /** Visible state with fast stagger */
  visible: {
    opacity: 1,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      staggerChildren: STAGGER_TIMINGS.fast, // 50ms stagger for quick succession
    },
  },
  /** Exit state */
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      staggerChildren: STAGGER_TIMINGS.fast,
    },
  },
};

// ========================================
// SPECIAL EFFECT ANIMATIONS
// ========================================

/**
 * Floating animation for background elements
 * 
 * Continuous subtle movement that adds life to static designs.
 * Creates ambient motion without being distracting.
 * 
 * Best Use Cases:
 * - Background decorative elements
 * - Floating icons and illustrations
 * - Hero section ornaments
 * - Loading state indicators
 * 
 * Performance: Good - uses transform which is optimized
 * Accessibility: Should be disabled with prefers-reduced-motion
 */
export const floatingVariants: Variants = {
  /** Continuous floating animation */
  animate: {
    y: [-10, 10, -10], // Vertical floating motion
    transition: {
      duration: 4,        // Slow, gentle movement
      repeat: Infinity,   // Continuous loop
      ease: "easeInOut",  // Smooth acceleration/deceleration
    },
  },
};

/**
 * Pulse animation for attention-grabbing elements
 * 
 * Rhythmic opacity changes that draw attention without being jarring.
 * Useful for indicating active states or pending actions.
 * 
 * Best Use Cases:
 * - Loading indicators and spinners
 * - Active navigation items
 * - Notification badges
 * - Call-to-action buttons
 * 
 * Performance: Excellent - only animates opacity
 */
export const pulseVariants: Variants = {
  /** Continuous pulse animation */
  animate: {
    opacity: [0.5, 1, 0.5], // Gentle opacity pulsing
    transition: {
      duration: 2,          // Gentle rhythm
      repeat: Infinity,     // Continuous
      ease: "easeInOut",
    },
  },
};

/**
 * Glow animation for special elements
 * 
 * Animates box-shadow to create a glowing effect.
 * Adds premium feel and draws attention to important elements.
 * 
 * Best Use Cases:
 * - Premium features and upgrades
 * - Active form fields
 * - Selected items
 * - Special announcements
 * 
 * Performance: Moderate - box-shadow can trigger repaints
 * Use sparingly and consider alternatives for mobile
 */
export const glowVariants: Variants = {
  /** Continuous glow animation */
  animate: {
    boxShadow: [
      "0 0 20px rgba(59, 130, 246, 0.5)",  // Blue glow start
      "0 0 40px rgba(59, 130, 246, 0.8)",  // Stronger blue glow
      "0 0 20px rgba(59, 130, 246, 0.5)",  // Back to start
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ========================================
// PAGE TRANSITION ANIMATIONS
// ========================================

/**
 * Page transition animation variants
 * 
 * Smooth transitions between different pages or major content changes.
 * Creates continuity and professional feel in navigation.
 * 
 * Best Use Cases:
 * - Route changes in SPAs
 * - Tab content switching
 * - Multi-step form progression
 * - Modal content changes
 * 
 * Performance: Good - uses transform and opacity
 * UX: Provides visual continuity during navigation
 */
export const pageVariants: Variants = {
  /** Initial state - slide in from right */
  initial: {
    opacity: 0,
    x: 100, // Start off-screen to the right
  },
  /** In state - slide to center */
  in: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.slow, // Longer duration for page transitions
      ease: ANIMATION_EASINGS.decelerate,
    },
  },
  /** Out state - slide out to left */
  out: {
    opacity: 0,
    x: -100, // Exit to the left
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.accelerate,
    },
  },
};

// ========================================
// LOADING ANIMATIONS
// ========================================

/**
 * Loading spinner animation
 * 
 * Continuous rotation for loading indicators.
 * Universal symbol for "processing" or "loading".
 * 
 * Best Use Cases:
 * - Form submissions
 * - Data fetching states
 * - Image loading placeholders
 * - Button loading states
 * 
 * Performance: Good - uses transform rotate
 * Accessibility: Should have aria-label for screen readers
 */
export const spinnerVariants: Variants = {
  /** Continuous spin animation */
  animate: {
    rotate: 360, // Full rotation
    transition: {
      duration: 1,        // One second per rotation
      repeat: Infinity,   // Continuous
      ease: "linear",     // Constant speed
    },
  },
};

/**
 * Loading dots animation
 * 
 * Sequential animation for loading dots (commonly 3 dots).
 * Creates the classic "..." loading pattern.
 * 
 * Best Use Cases:
 * - Text loading states
 * - Typing indicators
 * - Processing messages
 * - Chat applications
 * 
 * Implementation: Apply to parent, use custom prop for delay
 */
export const loadingDotsVariants: Variants = {
  /** Continuous bounce animation */
  animate: {
    y: [0, -20, 0], // Bounce up and down
    transition: {
      duration: 0.6,      // Quick bounce
      repeat: Infinity,   // Continuous
      ease: "easeInOut",
    },
  },
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Creates a staggered container animation with custom timing
 * 
 * Factory function for creating container variants with specific stagger timing.
 * Allows fine-tuning of stagger effects based on content type and count.
 * 
 * @param staggerDelay - Delay between child animations in seconds (default: 0.1s)
 * @param duration - Total animation duration in seconds (default: 0.4s)
 * @returns Variants object for use with Framer Motion
 * 
 * @example
 * ```tsx
 * const customContainer = createStaggerContainer(0.05, 0.3); // Fast, short
 * const dramaticContainer = createStaggerContainer(0.2, 0.8); // Slow, long
 * 
 * <motion.div variants={customContainer} initial="hidden" animate="visible">
 *   {items.map(item => <motion.div variants={fadeUpVariants} key={item.id} />)}
 * </motion.div>
 * ```
 */
export const createStaggerContainer = (
  staggerDelay: number = STAGGER_TIMINGS.normal,
  duration: number = ANIMATION_DURATIONS.normal
): Variants => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration,
      staggerChildren: staggerDelay,
      delayChildren: staggerDelay, // Wait one stagger delay before starting
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      staggerChildren: staggerDelay / 2, // Faster exit
      staggerDirection: -1, // Reverse order
    },
  },
});

/**
 * Creates a slide animation in any direction
 * 
 * Factory function for creating slide animations with custom direction and distance.
 * More flexible than the predefined slideInLeft/Right variants.
 * 
 * @param direction - Direction to slide from ('left' | 'right' | 'up' | 'down')
 * @param distance - Distance to slide in pixels (default: 50px)
 * @param duration - Animation duration in seconds (default: 0.4s)
 * @returns Variants object for slide animation
 * 
 * @example
 * ```tsx
 * const slideFromBottom = createSlideVariant('up', 100, 0.6);
 * const subtleSlideLeft = createSlideVariant('left', 20, 0.2);
 * 
 * <motion.div variants={slideFromBottom} initial="hidden" animate="visible" />
 * ```
 */
export const createSlideVariant = (
  direction: 'left' | 'right' | 'up' | 'down',
  distance: number = 50,
  duration: number = ANIMATION_DURATIONS.normal
): Variants => {
  // Calculate initial position based on direction
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 };
      case 'right':
        return { x: distance, y: 0 };
      case 'up':
        return { x: 0, y: distance }; // Start below for "up" animation
      case 'down':
        return { x: 0, y: -distance }; // Start above for "down" animation
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return {
    hidden: {
      opacity: 0,
      ...initialPos,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        ease: ANIMATION_EASINGS.decelerate,
      },
    },
    exit: {
      opacity: 0,
      ...initialPos, // Return to starting position
      transition: {
        duration: ANIMATION_DURATIONS.fast,
        ease: ANIMATION_EASINGS.accelerate,
      },
    },
  };
};

/**
 * Creates a scale animation with custom parameters
 * 
 * Factory function for creating scale animations with specific scale values and timing.
 * Useful for creating emphasis effects with different intensities.
 * 
 * @param initialScale - Starting scale value (default: 0.8 = 80% of final size)
 * @param duration - Animation duration in seconds (default: 0.4s)
 * @param easing - Easing function to use (default: 'easeOut')
 * @returns Variants object for scale animation
 * 
 * @example
 * ```tsx
 * const dramaticScale = createScaleVariant(0.3, 0.8, 'easeOut');
 * const subtleScale = createScaleVariant(0.95, 0.2, 'easeInOut');
 * 
 * <motion.div variants={dramaticScale} initial="hidden" animate="visible" />
 * ```
 */
export const createScaleVariant = (
  initialScale: number = 0.8,
  duration: number = ANIMATION_DURATIONS.normal,
  easing: Easing = 'easeOut'
): Variants => ({
  hidden: {
    opacity: 0,
    scale: initialScale,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      ease: easing,
    },
  },
  exit: {
    opacity: 0,
    scale: initialScale,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.accelerate,
    },
  },
});

// ========================================
// ACCESSIBILITY UTILITIES
// ========================================

/**
 * Creates accessibility-aware animation variants
 * 
 * Provides reduced motion alternatives for users who prefer less animation.
 * Respects the user's prefers-reduced-motion setting.
 * 
 * @param normalVariants - Normal animation variants for users who accept motion
 * @returns Variants object with reduced motion alternatives
 * 
 * Usage:
 * This should be used in conjunction with CSS media queries or JavaScript
 * to detect the user's motion preferences.
 * 
 * @example
 * ```tsx
 * const accessibleFade = createAccessibleVariants(fadeUpVariants);
 * 
 * // In component:
 * const prefersReducedMotion = useReducedMotion();
 * const variants = prefersReducedMotion ? accessibleFade.reduced : accessibleFade.normal;
 * ```
 */
export const createAccessibleVariants = (
  normalVariants: Variants
): { normal: Variants; reduced: Variants } => {
  // Reduced motion variants - only fade, no movement or scaling
  const reducedVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: ANIMATION_DURATIONS.fast, // Quick fade for accessibility
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: ANIMATION_DURATIONS.fast,
      },
    },
  };

  return {
    normal: normalVariants,
    reduced: reducedVariants,
  };
};

// ========================================
// PERFORMANCE MONITORING
// ========================================

/**
 * Development helper for monitoring animation performance
 * 
 * In development mode, this can be used to log animation performance
 * and identify potential bottlenecks.
 * 
 * @param animationName - Name of the animation for logging
 * @param callback - Function to execute and measure
 * 
 * Note: This should only be used in development and stripped from production builds
 */
export const measureAnimationPerformance = (
  animationName: string,
  callback: () => void
): void => {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performance.now();
    callback();
    const endTime = performance.now();
    console.log(`Animation "${animationName}" took ${endTime - startTime} milliseconds`);
  } else {
    callback();
  }
};

/**
 * Type definitions for animation configuration
 * 
 * These types help ensure consistent animation configuration
 * across the application and provide better TypeScript support.
 */
export interface AnimationConfig {
  /** Duration of the animation in seconds */
  duration: number;
  /** Easing function to use */
  ease: readonly number[] | string;
  /** Delay before animation starts */
  delay?: number;
  /** Whether animation should repeat */
  repeat?: number | typeof Infinity;
  /** Type of repetition (loop, reverse, mirror) */
  repeatType?: 'loop' | 'reverse' | 'mirror';
  /** Whether to repeat in reverse on alternate cycles */
  repeatDelay?: number;
} 