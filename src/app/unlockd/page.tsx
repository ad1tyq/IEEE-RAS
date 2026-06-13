'use client';

import { motion } from 'framer-motion';

export default function UnlockD() {
  return (
    <div className="min-h-screen text-white bg-black flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="font-pixel text-4xl md:text-6xl mb-6 text-purple-400">UNLOCK&apos;D</h1>
        <p className="font-mono-pixel text-xl text-gray-400">
          Page under construction...
        </p>
      </motion.div>
    </div>
  );
}
