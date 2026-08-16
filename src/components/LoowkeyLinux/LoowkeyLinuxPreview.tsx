"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoowkeyLinuxPreviewProps {
  size?: number;
  className?: string;
  speed?: number;
}

export default function LoowkeyLinuxPreview({
  size = 80,
  className = "",
  speed = 1,
}: LoowkeyLinuxPreviewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const mono = { fontFamily: "monospace" };

  return (
    <div
      className={`relative overflow-hidden bg-[#0b0e11] rounded-lg ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Loowkey Linux terminal preview"
    >
      {/* Amber scanlines */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 176, 32, 0.12) 2px, rgba(255, 176, 32, 0.12) 4px)`,
        }}
      />
      {/* Terminal frame */}
      <div className="absolute inset-1 border border-[#b8801a]/40 pointer-events-none">
        <div
          className="flex items-center gap-1 border-b border-[#b8801a]/30 px-2 py-1"
          style={mono}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5d5d]/70" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb020]/70" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#5fd97a]/70" />
        </div>
        <div className="flex flex-col justify-center px-2 py-1" style={mono}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 / speed, duration: 0.3 }}
            className="text-[#e8e6e1]"
            style={{ fontSize: size * 0.07 }}
          >
            user@lowkey:~$
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2 / speed, repeat: Infinity, delay: 0.6 / speed }}
            className="text-[#ffb020]"
            style={{ fontSize: size * 0.07, textShadow: "0 0 6px rgba(255,176,32,0.8)" }}
          >
            whoami
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.3, delay: 1.4 / speed }}
            className="text-[#4fd1c5]"
            style={{ fontSize: size * 0.07 }}
          >
            ras_member
          </motion.div>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1 / speed, repeat: Infinity }}
            className="text-[#ffb020]"
            style={{ fontSize: size * 0.07 }}
          >
            ▮
          </motion.span>
        </div>
      </div>
    </div>
  );
}