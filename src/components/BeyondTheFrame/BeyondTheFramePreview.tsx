"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BeyondTheFramePreviewProps {
  size?: number;
  className?: string;
  speed?: number;
}

export default function BeyondTheFramePreview({
  size = 80,
  className = "",
  speed = 1,
}: BeyondTheFramePreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`relative overflow-hidden bg-[#0a0a0a] rounded-lg ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Beyond The Frame oscilloscope preview"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(160, 160, 160, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(160, 160, 160, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px',
        }}
      />
      {/* Scope line (sine wave approx using SVG path) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M 0,50 C 20,20 30,80 50,50 C 70,20 80,80 100,50"
            fill="none"
            stroke="#ffcc00"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0.8 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 2 / speed,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              filter: "drop-shadow(0px 0px 4px rgba(255, 204, 0, 0.8))"
            }}
          />
        </svg>
      </div>
    </div>
  );
}
