"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Hard budget for the full typing reveal (excl. exit fade) so the whole boot
// sequence stays under 2.5s end-to-end regardless of how many log lines exist.
const REVEAL_MS = 2000;
const EXIT_MS = 400;

// Module-scope skip latch. The listeners are attached as soon as this bundle
// executes — before React hydrates the SSR'd overlay — so a click/tap/keypress
// at t=0 (the very first frame the overlay is visible) still skips instantly.
// The latch only flips a boolean; the rAF loop consumes it on the next frame.
let pendingSkip = false;
if (typeof window !== "undefined") {
  const requestSkip = () => {
    pendingSkip = true;
  };
  window.addEventListener("keydown", requestSkip);
  window.addEventListener("pointerdown", requestSkip);
  window.addEventListener("touchstart", requestSkip, { passive: true });
}

export default function BootSequence({
  lines,
  onComplete,
}: {
  lines: string[];
  onComplete: () => void;
}) {
  const fullText = lines.join("\n");
  const totalChars = fullText.length;

  const [reveal, setReveal] = useState(0);
  const [skipLabel, setSkipLabel] = useState(false);
  // Detected at init (never in an effect) so reduced-motion users never start
  // the typing loop and get a short exit fade instead of the full one.
  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const rafRef = useRef<number | null>(null);
  const startRef = useRef(0);
  const skippedRef = useRef(false);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  function complete() {
    if (doneRef.current) return;
    doneRef.current = true;
    skippedRef.current = true;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    setReveal(totalChars);
    onCompleteRef.current();
  }

  // Consume the module-scope latch so even a pre-hydration input skips.
  useEffect(() => {
    if (pendingSkip) {
      pendingSkip = false;
      complete();
    }
  });

  // Single rAF-driven loop — one predictable clock, one state update per frame.
  // Elapsed time maps to how many total characters are visible, sliced from the
  // precomputed log string. No per-character or per-line timeouts.
  useEffect(() => {
    if (reduced) {
      requestAnimationFrame(() => onCompleteRef.current());
      return;
    }
    startRef.current = performance.now();
    const step = (now: number) => {
      if (skippedRef.current) return;
      const t = Math.min((now - startRef.current) / REVEAL_MS, 1);
      setReveal(Math.floor(t * totalChars));
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        complete();
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, lines, totalChars]);

  useEffect(() => {
    const t = setTimeout(() => setSkipLabel(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="ll-boot-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? EXIT_MS / 2 / 1000 : EXIT_MS / 1000 }}
      aria-hidden
    >
      <pre className="ll-boot-log">
        {fullText.slice(0, reveal)}
        <span className="ll-boot-cursor">▮</span>
      </pre>
      {skipLabel && <div className="ll-boot-skip">press any key to skip</div>}
    </motion.div>
  );
}
