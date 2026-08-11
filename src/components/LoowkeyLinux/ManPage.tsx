"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export function ManPage({
  title,
  blocks,
}: {
  title: string;
  blocks: { label: string; body: string[] }[];
}) {
  return (
    <div className="ll-man">
      <div className="ll-man-title">{title}</div>
      {blocks.map((b) => (
        <div key={b.label} className="ll-man-block">
          <div className="ll-man-label">{b.label}</div>
          <div className="ll-man-body">
            {b.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FaqSection({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className="ll-faq-item">
          <button
            className="ll-faq-q"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`faq-a-${i}`}
          >
            <span>
              <span aria-hidden style={{ color: "var(--ll-signal-amber-dim)", marginRight: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {item.q}
            </span>
            <span aria-hidden style={{ color: "var(--ll-signal-amber)" }}>{open === i ? "−" : "+"}</span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                id={`faq-a-${i}`}
                role="region"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="ll-faq-a"
              >
                {item.a}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
