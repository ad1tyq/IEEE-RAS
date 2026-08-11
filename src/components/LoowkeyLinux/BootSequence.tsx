"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function BootSequence({
  lines,
  onComplete,
}: {
  lines: string[];
  onComplete: () => void;
}) {
  const [typed, setTyped] = useState<string[]>(lines.map(() => ""));
  const [skipLabel, setSkipLabel] = useState(false);
  const completedRef = useRef(false);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish(200);
      return;
    }
    (async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelledRef.current) return;
        await sleep(30 + Math.random() * 90);
        const line = lines[i];
        for (let c = 0; c <= line.length; c++) {
          if (cancelledRef.current) return;
          setTyped((prev) => prev.map((t, idx) => (idx === i ? line.slice(0, c) : t)));
          await sleep(8 + Math.random() * 5);
        }
      }
      finish(400);
    })();
    return () => {
      cancelledRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines]);

  useEffect(() => {
    const t = setTimeout(() => setSkipLabel(true), 1200);
    return () => clearTimeout(t);
  }, []);

  function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }

  function finish(ms: number) {
    if (completedRef.current) return;
    completedRef.current = true;
    cancelledRef.current = true;
    setTyped(lines.map((l) => l));
    setTimeout(() => {
      onComplete();
    }, ms);
  }

  useEffect(() => {
    const skip = () => finish(0);
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Do NOT return null here — the parent's <AnimatePresence> unmounts this
  // component when onComplete fires, which is what runs the exit fade.

  return (
    <motion.div
      className="ll-boot-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      aria-hidden
    >
      <pre className="ll-boot-log">
        {typed.map((t, i) => (
          <div key={i} className="ll-boot-line">
            {t}
          </div>
        ))}
        <span className="ll-boot-cursor">▮</span>
      </pre>
      {skipLabel && <div className="ll-boot-skip">press any key to skip</div>}
    </motion.div>
  );
}
