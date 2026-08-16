"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#about", label: "about" },
    { href: "#schedule", label: "schedule" },
    { href: "#judging", label: "judging" },
    { href: "#faq", label: "faq" },
  ];

  return (
    <header className="ll-nav">
      <div className="ll-nav-inner">
        <a href="#top" className="ll-nav-brand">
          LOWKEY<em>LINUX</em>
        </a>
        <nav className="ll-nav-links">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
          <a className="ll-nav-register" href="#register">
            $ sudo register
          </a>
        </nav>
        <button
          className="ll-nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      <nav className={`ll-nav-mobile ${open ? "open" : ""}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href="#register" onClick={() => setOpen(false)} className="ll-nav-register">
          $ sudo register
        </a>
      </nav>
    </header>
  );
}
