"use client";

import React, { useState } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import confetti from "canvas-confetti";
import { eventConfig } from "../../../data/beyondtheframe/content";
import { motion, useReducedMotion } from "framer-motion";

export default function RegisterCTA() {
  const [loading, setLoading] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Handle dead links from content config
  const isDeadLink =
    !eventConfig.registerUrl ||
    eventConfig.registerUrl === "#" ||
    eventConfig.registerUrl === "TBD";

  const handleClick = (e: React.MouseEvent) => {
    if (isDeadLink) {
      e.preventDefault();
      return;
    }
    
    e.preventDefault();
    setLoading(true);

    // Simulate "Flashing..." firmware state
    setTimeout(() => {
      setLoading(false);
      
      if (!shouldReduceMotion) {
        // Success confetti burst in project tokens
        const duration = 2000;
        const end = Date.now() + duration;

        const frame = () => {
          confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#A5E3E7", "#D17A22"], // --scope-ch1, --copper approximation
          });
          confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#E782A5", "#D17A22"], // --scope-ch2, --copper
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          } else {
            window.location.href = eventConfig.registerUrl;
          }
        };
        frame();
      } else {
        window.location.href = eventConfig.registerUrl;
      }
    }, 800); // short loading duration as per PRD
  };

  if (isDeadLink) {
    return (
      <div className="inline-block opacity-70 cursor-not-allowed">
        <ShimmerButton
          shimmerColor="transparent"
          background="var(--board-panel)"
          className="px-8 py-3 rounded-sm font-semibold pointer-events-none"
        >
          <span className="text-[var(--silkscreen-muted)]">Registration opens soon</span>
        </ShimmerButton>
      </div>
    );
  }

  return (
    <ShimmerButton
      onClick={handleClick}
      shimmerColor="var(--scope-ch1)"
      background="var(--board-panel)"
      className="px-8 py-3 rounded-sm font-semibold relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center justify-center">
        {loading ? "Flashing..." : `${eventConfig.registerCtaLabel} →`}
      </span>
      {/* Firmware Flash Progress Bar */}
      {loading && (
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-[var(--scope-ch1)]/30 z-0"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "linear" }}
        />
      )}
    </ShimmerButton>
  );
}
