# LOWKEY LINUX Event Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the LOWKEY LINUX single-page event site ("System Override: The Linux Lockdown") at `/lowkey-linux`, implementing the downloaded ROOT ACCESS design system (boot sequence + htop schedule) per the design spec.

**Architecture:** A standalone client-rendered Next.js App Router page at `src/app/lowkey-linux/page.tsx` composed of focused components under `src/components/LoowkeyLinux/`, all copy driven by a single config at `data/lowkeylinux/content.ts`, styled by a dedicated CSS token system in `lowkey-linux.css`. The event card is wired into the existing `/events` page via `eventsData.ts` and a preview component.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS 4 (globals already imported), Framer Motion (v12, already installed), lucide-react, `next/font/google` (JetBrains Mono, IBM Plex Sans, IBM Plex Mono).

**Verification model:** No unit test framework exists in this repo (package.json has no test runner). Verification is via `npm run lint` and `npm run build`, plus manual browser checks described per task.

**Spec:** `docs/superpowers/specs/2026-08-12-lowkey-linux-event-page-design.md`

---

## File Structure

| File | Responsibility |
|---|---|
| `data/lowkeylinux/content.ts` | Single source of all editable copy + boot log lines |
| `data/lowkeylinux/timelineData.ts` | Schedule rows for the htop ProcessTable |
| `src/app/lowkey-linux/lowkey-linux.css` | Token system (CSS vars) + all Linux-themed styles |
| `src/app/lowkey-linux/page.tsx` | Assembles fonts, boot gate, sections; 'use client' |
| `src/components/LoowkeyLinux/BootSequence.tsx` | dmesg-style boot overlay |
| `src/components/LoowkeyLinux/Navbar.tsx` | Sticky nav, appears post-boot |
| `src/components/LoowkeyLinux/ProcessTable.tsx` | htop-style schedule table + load average strip |
| `src/components/LoowkeyLinux/ManPage.tsx` | Shared man-page section (About + FAQ) |
| `src/components/LoowkeyLinux/RegisterBanner.tsx` | Countdown + `sudo apt install ticket` CTA |
| `src/components/LoowkeyLinux/Footer.tsx` | Terminal-prompt footer |
| `src/components/LoowkeyLinux/LoowkeyLinuxPreview.tsx` | Animated terminal card for `/events` |
| `data/eventsData.ts` | Add Loowkey Linux to `upcoming[]` |
| `src/app/events/page.tsx` | Wire LoowkeyLinuxPreview into the event card |

---

## Task 1: Content config (`data/lowkeylinux/`)

**Files:**
- Create: `data/lowkeylinux/content.ts`
- Create: `data/lowkeylinux/timelineData.ts`

- [ ] **Step 1: Create `data/lowkeylinux/content.ts`**

```ts
export const eventConfig = {
  name: "LOWKEY LINUX",
  title: "System Override: The Linux Lockdown",
  tagline:
    "A single-day hybrid bootcamp + CTF-style server competition for absolute beginners. Zero command-line experience required.",
  date: "16th August 2026",
  dateShort: "16 AUG",
  location: "MUJ Campus",
  // Placeholder — replace with the real registration form URL when available.
  registerUrl: "#register",
  about: {
    synopsis:
      "Take freshmen from zero terminal experience to full system control in one day — a hands-on CLI bootcamp followed by a simulated server rescue competition.",
    description: [
      "System Override: The Linux Lockdown is a single-day mega event by IEEE RAS that introduces absolute beginners — freshmen with no prior command-line or backend experience — to fundamental Linux system operations.",
      "Phase 1 is an instructor-led offline bootcamp covering essential CLI tools, file navigation, and process management. Phase 2 is a time-based competition where teams use their newly acquired terminal skills to navigate a safely simulated virtual server environment, fix system errors, and extract a final flag.",
    ],
  },
  objectives: [
    {
      title: "BACKEND FUNDAMENTALS",
      description:
        "Introduce absolute-beginner students to critical software engineering and backend fundamentals — terminal navigation, data filtering, and process management — using industry-standard tools.",
    },
    {
      title: "INSTANT FEEDBACK",
      description:
        "A fast, interactive learning environment where students bypass theoretical lectures and immediately execute commands to see instant system responses.",
    },
    {
      title: "ZERO-FRICTION COMPETITION",
      description:
        "A competitive round using local, lightweight simulations (a downloadable .zip environment) for total accessibility without cloud-hosting budgets or complex installations.",
    },
    {
      title: "PORTFOLIO-RELEVANT",
      description:
        "A portfolio-relevant introduction to backend systems and cybersecurity logic that motivates freshmen to explore software engineering and join the technical community.",
    },
  ],
  beneficiaries: [
    "First-year (freshman) students of MUJ targeting Computer Science, backend development, or cybersecurity",
    "IEEE RAS Student Branch Chapter members",
  ],
  phases: [
    {
      title: "PHASE 1 — WORKSHOP",
      sub: "The CLI Survival Bootcamp · 4-hour hands-on session",
      items: [
        {
          time: "ENVIRONMENT SETUP",
          text: "Ensure every participant has a functional terminal (Git Bash, WSL, or native Linux/macOS) and basic interface familiarity.",
        },
        {
          time: "NAVIGATION",
          text: "Moving through directories using cd, pwd, and ls. Reading and editing files via cat and nano.",
        },
        {
          time: "SEARCH & FILTER",
          text: "Using grep to parse massive log files and locate hidden strings across directories.",
        },
        {
          time: "PROCESS MANAGEMENT",
          text: "Identifying active system tasks with ps aux and terminating rogue scripts using kill.",
        },
        {
          time: "SYSTEM SECURITY",
          text: "Understanding and modifying file read/write access permissions using chmod.",
        },
      ],
    },
    {
      title: "PHASE 2 — COMPETITION",
      sub: "The Sabotaged Server",
      items: [
        {
          time: "REVEAL & DISTRIBUTE",
          text: "Problem statement reveal and distribution of the server_simulation.zip environment via the official offline network or community channels.",
        },
        {
          time: "LOCAL HUNTING",
          text: "Teams extract the simulated environment locally and use terminal skills to hunt for clues — no internet access or cloud VMs required.",
        },
        {
          time: "4-STAGE PUZZLE",
          text: "Breadcrumb tracking (grep) → Rogue Process termination (kill) → Permission Wall bypassing (chmod) → Final Extraction (scripting/decoding).",
        },
        {
          time: "LIVE TRACKING",
          text: "Team progress tracked via a central submission platform, concluding with immediate judge verification and final prize distribution.",
        },
      ],
    },
  ],
  judging: [
    {
      criterion: "Speed of Completion",
      detail: "Time taken to extract and submit the final flag",
      weight: 60,
    },
    {
      criterion: "Accuracy",
      detail: "Correct submission of intermediate stage flags",
      weight: 30,
    },
    {
      criterion: "Automation Bonus",
      detail: "Demonstrated use of custom scripts or piped commands to solve stages faster",
      weight: 10,
    },
  ],
  faq: [
    {
      q: "Do I need any command-line or Linux experience?",
      a: "No. This event is designed for absolute beginners — freshmen with zero prior terminal experience. Phase 1 teaches everything you need from scratch.",
    },
    {
      q: "What do I need to bring?",
      a: "A laptop with a functional terminal. Git Bash (Windows), WSL, or a native Linux/macOS terminal all work. We'll help with setup during Phase 1.",
    },
    {
      q: "Is the competition online or offline?",
      a: "The event is hybrid. The bootcamp is instructor-led and offline; the competition runs online using a local, downloadable server_simulation.zip — no cloud VMs or internet required during the competition.",
    },
    {
      q: "Do I need a team?",
      a: "Teams work together during the competition. You can form your own team or join one at the event.",
    },
    {
      q: "Who can participate?",
      a: "First-year MUJ students, particularly those targeting CS, backend development, or cybersecurity, along with IEEE RAS Student Branch Chapter members.",
    },
  ],
  boot: {
    lines: [
      "[  0.000000] Booting IEEE RAS Kernel 6.8.0-lowkey",
      "[  0.041200] Mounting /dev/sda1: LOWKEY-LINUX-FEST [ OK ]",
      "[  0.132500] Starting workshops.service [ OK ]",
      "[  0.245001] Loading participants [ OK ]",
      "[  0.310044] Starting competition.service [ OK ]",
      "[  0.452310] Found 5 scheduled stages [ OK ]",
      "[  0.520000] Starting X11 session lowkey@ras-muj [ OK ]",
      "[  1.001110] Reached target lowkey-linux.event — Welcome.",
    ],
  },
};
```

Note: `eventConfig` is a plain object (no `as const`) so its arrays stay mutable and assignable to component props (`string[]`, `{q,a}[]`, etc.) in later tasks. This matches repo convention (`data/unlockd/*`).

- [ ] **Step 2: Create `data/lowkeylinux/timelineData.ts`**

```ts
export type ScheduleRow = {
  pid: number;
  user: string;
  cpu: number;
  state: "R" | "S" | "Z";
  time: string;
  duration: string;
  command: string;
};

export const schedule: ScheduleRow[] = [
  { pid: 1001, user: "ras-core", cpu: 12, state: "S", time: "10:30 AM", duration: "30m", command: "Reporting and Registration" },
  { pid: 1002, user: "ras-core", cpu: 18, state: "S", time: "11:00 AM", duration: "30m", command: "Opening remarks & Terminal Environment setup" },
  { pid: 1003, user: "instructors", cpu: 42, state: "S", time: "11:30 AM", duration: "60m", command: "Navigation and File Management basics (cd, ls, cat)" },
  { pid: 1004, user: "instructors", cpu: 38, state: "S", time: "12:30 PM", duration: "60m", command: "Searching & Filtering masterclass (grep, find)" },
  { pid: 1005, user: "ras-core", cpu: 4, state: "S", time: "01:30 PM", duration: "45m", command: "Mandatory Lunch & Energy Break" },
  { pid: 1006, user: "instructors", cpu: 35, state: "S", time: "02:15 PM", duration: "35m", command: "Process Management & Permissions (kill, chmod)" },
  { pid: 1007, user: "instructors", cpu: 22, state: "S", time: "02:50 PM", duration: "10m", command: "Bootcamp Recap & Terminal Cheat Sheet distribution" },
  { pid: 1008, user: "ras-core", cpu: 51, state: "S", time: "03:00 PM", duration: "15m", command: "Competition Kickoff: Rules reveal & server_simulation.zip" },
  { pid: 1009, user: "teams", cpu: 88, state: "S", time: "03:15 PM", duration: "195m", command: "The Sabotaged Server — development round" },
  { pid: 1010, user: "teams", cpu: 64, state: "S", time: "06:30 PM", duration: "15m", command: "Competition ends — Submission form closes" },
  { pid: 1011, user: "judges", cpu: 46, state: "S", time: "06:45 PM", duration: "15m", command: "Live leaderboard reveal & Judges' deliberation" },
  { pid: 1012, user: "ras-core", cpu: 28, state: "S", time: "07:00 PM", duration: "—", command: "Results announcement, prize distribution, event concludes" },
];
```

- [ ] **Step 3: Verify types compile**

Run: `npx tsc --noEmit`
Expected: no errors referencing `data/lowkeylinux/*`.

- [ ] **Step 4: Commit**

```bash
git add data/lowkeylinux
git commit -m "feat(lowkey-linux): add content and schedule config"
```

---

## Task 2: CSS token system (`lowkey-linux.css`)

**Files:**
- Create: `src/app/lowkey-linux/lowkey-linux.css`

- [ ] **Step 1: Create the CSS file**

```css
/* LOWKEY LINUX — design tokens + component styles */
/* Derived from docs/superpowers/specs/2026-08-12-lowkey-linux-event-page-design.md */

:root {
  --ll-bg-void: #0b0e11;
  --ll-bg-panel: #12161b;
  --ll-bg-panel-raised: #181d24;
  --ll-fg-primary: #e8e6e1;
  --ll-fg-muted: #8a9199;
  --ll-signal-amber: #ffb020;
  --ll-signal-amber-dim: #b8801a;
  --ll-signal-cyan: #4fd1c5;
  --ll-signal-red: #ff5d5d;
  --ll-signal-green: #5fd97a;

  /* Font families are injected by next/font `variable` classes on the page
     wrapper (--ll-font-display, --ll-font-body, --ll-font-mono). */

  --ll-border: rgba(184, 128, 26, 0.15);
  --ll-radius: 4px;
}

/* ── Boot sequence ─────────────────────────────────────────── */
.ll-boot-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: var(--ll-bg-void);
  color: var(--ll-signal-amber);
  font-family: var(--ll-font-mono);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4vh 6vw;
  overflow: hidden;
}
.ll-boot-log {
  font-size: clamp(11px, 1.6vw, 16px);
  line-height: 1.7;
  letter-spacing: 0.02em;
  white-space: pre-wrap;
  word-break: break-word;
}
.ll-boot-line {
  min-height: 1.7em;
}
.ll-boot-cursor {
  animation: ll-blink 1s steps(1) infinite;
}
@keyframes ll-blink {
  50% { opacity: 0; }
}
.ll-boot-skip {
  position: absolute;
  bottom: 24px;
  right: 32px;
  font-size: 12px;
  color: var(--ll-fg-muted);
  letter-spacing: 0.05em;
}

/* ── Page shell ────────────────────────────────────────────── */
.ll-page {
  background: var(--ll-bg-void);
  color: var(--ll-fg-primary);
  font-family: var(--ll-font-body);
  overflow-x: hidden;
}
.ll-crt {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  background:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.12) 3px,
      rgba(0, 0, 0, 0.12) 4px
    );
  opacity: 0.4;
}

/* ── Nav ───────────────────────────────────────────────────── */
.ll-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(11, 14, 17, 0.82);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--ll-border);
  font-family: var(--ll-font-mono);
}
.ll-nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.ll-nav-brand {
  font-family: var(--ll-font-display);
  font-weight: 800;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: var(--ll-fg-primary);
}
.ll-nav-brand em {
  color: var(--ll-signal-amber);
  font-style: normal;
}
.ll-nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 14px;
}
.ll-nav-links a {
  color: var(--ll-fg-muted);
  transition: color 0.2s;
}
.ll-nav-links a:hover {
  color: var(--ll-signal-cyan);
}
.ll-nav-links .ll-nav-register {
  color: var(--ll-signal-amber);
}
.ll-nav-toggle {
  display: none;
  background: none;
  border: 1px solid var(--ll-border);
  color: var(--ll-fg-muted);
  border-radius: var(--ll-radius);
  padding: 6px 10px;
  font-size: 16px;
  cursor: pointer;
}
.ll-nav-mobile {
  display: none;
  flex-direction: column;
  gap: 12px;
  padding: 0 24px 16px;
  font-size: 14px;
}
.ll-nav-mobile a {
  color: var(--ll-fg-muted);
}
@media (max-width: 640px) {
  .ll-nav-links { display: none; }
  .ll-nav-toggle { display: block; }
  .ll-nav-mobile.open { display: flex; }
}

/* ── Hero ──────────────────────────────────────────────────── */
.ll-hero {
  min-height: 88vh;
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 24px;
}
.ll-hero-eyebrow {
  font-family: var(--ll-font-mono);
  font-size: 14px;
  letter-spacing: 0.04em;
  color: var(--ll-signal-cyan);
  margin-bottom: 20px;
}
.ll-hero-title {
  font-family: var(--ll-font-display);
  font-weight: 800;
  font-size: clamp(56px, 10vw, 96px);
  line-height: 0.95;
  letter-spacing: -0.01em;
  color: var(--ll-signal-amber);
}
.ll-hero-cursor {
  display: inline-block;
  width: 0.6em;
  height: 1.05em;
  margin-left: 8px;
  background: var(--ll-signal-amber);
  vertical-align: baseline;
  animation: ll-blink 1s steps(1) infinite;
}
.ll-hero-sub {
  font-family: var(--ll-font-body);
  font-size: clamp(18px, 2.4vw, 24px);
  line-height: 1.3;
  color: var(--ll-fg-primary);
  max-width: 640px;
  margin-top: 24px;
}
.ll-hero-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}
.ll-chip {
  font-family: var(--ll-font-mono);
  font-size: 13px;
  letter-spacing: 0.02em;
  color: var(--ll-fg-muted);
  border: 1px solid var(--ll-border);
  border-radius: var(--ll-radius);
  padding: 6px 12px;
}
.ll-hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
  margin-top: 40px;
}
.ll-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--ll-font-mono);
  font-size: 16px;
  border: 1px solid var(--ll-signal-amber-dim);
  border-radius: var(--ll-radius);
  padding: 12px 22px;
  color: var(--ll-signal-amber);
  background: transparent;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s, transform 0.15s;
}
.ll-btn:hover {
  border-color: var(--ll-signal-amber);
  transform: translateY(-2px);
}
.ll-btn-primary {
  background: rgba(255, 176, 32, 0.08);
}
.ll-btn-cyan {
  color: var(--ll-signal-cyan);
  border-color: rgba(79, 209, 197, 0.4);
}
.ll-btn-cyan:hover {
  border-color: var(--ll-signal-cyan);
}

/* ── Sections ──────────────────────────────────────────────── */
.ll-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 160px 24px;
}
.ll-section-rail {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 32px;
}
.ll-section-rail .ll-rail-num {
  font-family: var(--ll-font-mono);
  font-size: 13px;
  color: var(--ll-signal-amber-dim);
  padding-top: 8px;
  letter-spacing: 0.05em;
}
@media (max-width: 640px) {
  .ll-section { padding: 80px 20px; }
  .ll-section-rail { grid-template-columns: 1fr; }
  .ll-section-rail .ll-rail-num { padding-top: 0; }
}

/* ── Man page blocks ───────────────────────────────────────── */
.ll-man {
  border: 1px solid var(--ll-border);
  border-radius: var(--ll-radius);
  background: var(--ll-bg-panel);
  padding: 32px;
  font-family: var(--ll-font-mono);
  font-size: 14px;
  line-height: 1.7;
  overflow-x: auto;
}
.ll-man-title {
  color: var(--ll-signal-amber);
  font-weight: 700;
  margin-bottom: 16px;
}
.ll-man-block {
  margin-bottom: 20px;
}
.ll-man-label {
  color: var(--ll-signal-amber-dim);
  font-weight: 700;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}
.ll-man-body {
  color: var(--ll-fg-muted);
}
.ll-man-body p {
  margin-bottom: 10px;
}
.ll-faq-item {
  border-bottom: 1px solid var(--ll-border);
  padding: 20px 0;
}
.ll-faq-q {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--ll-fg-primary);
  font-family: var(--ll-font-mono);
  font-size: 16px;
  font-weight: 700;
  text-align: left;
  padding: 0;
}
.ll-faq-q:focus-visible,
.ll-btn:focus-visible,
.ll-nav-toggle:focus-visible {
  outline: 2px solid var(--ll-signal-cyan);
  outline-offset: 2px;
}
.ll-faq-a {
  color: var(--ll-fg-muted);
  font-family: var(--ll-font-body);
  font-size: 15px;
  line-height: 1.7;
  margin-top: 12px;
}

/* ── Objectives ────────────────────────────────────────────── */
.ll-obj-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.ll-obj-card {
  border: 1px solid var(--ll-border);
  border-radius: var(--ll-radius);
  background: var(--ll-bg-panel);
  padding: 24px;
  transition: border-color 0.2s, transform 0.2s;
}
.ll-obj-card:hover {
  border-color: var(--ll-signal-amber);
  transform: translateY(-4px);
}
.ll-obj-title {
  font-family: var(--ll-font-mono);
  font-size: 13px;
  letter-spacing: 0.05em;
  color: var(--ll-signal-amber);
  margin-bottom: 10px;
}
.ll-obj-desc {
  color: var(--ll-fg-muted);
  font-size: 15px;
  line-height: 1.7;
}
@media (max-width: 640px) {
  .ll-obj-grid { grid-template-columns: 1fr; }
}

/* ── Phases ────────────────────────────────────────────────── */
.ll-phase {
  border: 1px solid var(--ll-border);
  border-radius: var(--ll-radius);
  background: var(--ll-bg-panel);
  padding: 28px;
  margin-bottom: 24px;
}
.ll-phase-title {
  font-family: var(--ll-font-mono);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.02em;
  color: var(--ll-signal-amber);
}
.ll-phase-sub {
  font-family: var(--ll-font-mono);
  color: var(--ll-fg-muted);
  font-size: 14px;
  margin: 6px 0 20px;
}
.ll-phase-item {
  display: flex;
  gap: 16px;
  padding: 10px 0;
  border-top: 1px solid var(--ll-border);
}
.ll-phase-time {
  font-family: var(--ll-font-mono);
  font-size: 12px;
  color: var(--ll-signal-cyan);
  min-width: 130px;
  padding-top: 3px;
}
.ll-phase-text {
  color: var(--ll-fg-muted);
  font-size: 15px;
  line-height: 1.7;
}

/* ── htop ProcessTable ─────────────────────────────────────── */
.ll-loadavg {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-family: var(--ll-font-mono);
  font-size: 13px;
  color: var(--ll-fg-muted);
  margin-bottom: 16px;
  padding: 12px 16px;
  border: 1px solid var(--ll-border);
  border-radius: var(--ll-radius);
  background: var(--ll-bg-panel);
}
.ll-loadavg b {
  color: var(--ll-signal-amber);
  font-weight: 700;
}
.ll-table-wrap {
  border: 1px solid var(--ll-border);
  border-radius: var(--ll-radius);
  overflow: hidden;
  background: var(--ll-bg-panel);
}
.ll-table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--ll-font-mono);
  font-size: 14px;
}
.ll-table th {
  text-align: left;
  color: var(--ll-fg-muted);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 12px 16px;
  border-bottom: 1px solid var(--ll-border);
  background: rgba(255, 176, 32, 0.04);
}
.ll-table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--ll-border);
  color: var(--ll-fg-primary);
}
.ll-table tr:last-child td {
  border-bottom: none;
}
.ll-table tr.state-r td {
  animation: ll-pulse 3s ease-in-out infinite;
}
@keyframes ll-pulse {
  0%, 100% { background: rgba(95, 217, 122, 0.06); }
  50% { background: rgba(95, 217, 122, 0.18); }
}
.ll-state-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 8px;
}
.ll-state-r .ll-state-dot { background: var(--ll-signal-green); }
.ll-state-s .ll-state-dot { background: var(--ll-signal-amber); }
.ll-state-z .ll-state-dot { background: var(--ll-fg-muted); }
.ll-cpu-bar {
  display: inline-block;
  width: 60px;
  height: 6px;
  border-radius: 2px;
  background: rgba(232, 230, 225, 0.08);
  overflow: hidden;
  vertical-align: middle;
}
.ll-cpu-fill {
  height: 100%;
  background: var(--ll-signal-amber);
}
.ll-table-cards {
  display: none;
}
@media (max-width: 640px) {
  .ll-table { display: none; }
  .ll-table-cards { display: flex; flex-direction: column; gap: 12px; }
  .ll-card {
    border: 1px solid var(--ll-border);
    border-radius: var(--ll-radius);
    background: var(--ll-bg-panel);
    padding: 16px;
  }
  .ll-card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    font-family: var(--ll-font-mono);
    font-size: 13px;
    color: var(--ll-fg-muted);
    margin-bottom: 8px;
  }
  .ll-card-command {
    font-family: var(--ll-font-mono);
    font-size: 15px;
    color: var(--ll-fg-primary);
  }
  .ll-card-time {
    font-family: var(--ll-font-mono);
    font-size: 12px;
    color: var(--ll-signal-cyan);
    margin-top: 6px;
  }
}

/* ── Judging ───────────────────────────────────────────────── */
.ll-judge-row {
  display: grid;
  grid-template-columns: 1fr 70px;
  gap: 16px;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--ll-border);
}
.ll-judge-crit {
  font-family: var(--ll-font-mono);
  font-size: 15px;
  color: var(--ll-fg-primary);
  font-weight: 700;
}
.ll-judge-detail {
  font-family: var(--ll-font-body);
  font-size: 14px;
  color: var(--ll-fg-muted);
  margin-top: 4px;
}
.ll-judge-weight {
  font-family: var(--ll-font-mono);
  font-size: 22px;
  font-weight: 800;
  color: var(--ll-signal-amber);
  text-align: right;
}
.ll-judge-bar {
  grid-column: 1 / -1;
  height: 6px;
  border-radius: 2px;
  background: rgba(232, 230, 225, 0.08);
  overflow: hidden;
}
.ll-judge-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--ll-signal-amber), var(--ll-signal-cyan));
}

/* ── Register banner ───────────────────────────────────────── */
.ll-register {
  text-align: center;
  border-top: 1px solid var(--ll-border);
  border-bottom: 1px solid var(--ll-border);
  background:
    linear-gradient(180deg, rgba(255, 176, 32, 0.06), transparent 30%),
    var(--ll-bg-panel);
  padding: 120px 24px;
}
.ll-countdown {
  font-family: var(--ll-font-mono);
  font-size: 14px;
  color: var(--ll-signal-amber);
  letter-spacing: 0.03em;
  margin-bottom: 16px;
}
.ll-countdown.urgent {
  color: var(--ll-signal-red);
}
.ll-register-title {
  font-family: var(--ll-font-display);
  font-weight: 800;
  font-size: clamp(32px, 5vw, 48px);
  color: var(--ll-fg-primary);
  margin-bottom: 28px;
}

/* ── Footer ────────────────────────────────────────────────── */
.ll-footer {
  border-top: 1px solid var(--ll-border);
  font-family: var(--ll-font-mono);
  font-size: 14px;
  color: var(--ll-fg-muted);
  padding: 40px 24px;
}
.ll-footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.ll-footer-line {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ll-footer-line a {
  color: var(--ll-signal-cyan);
  text-decoration: none;
}
.ll-footer-line a:hover {
  color: var(--ll-fg-primary);
}
.ll-footer-prompt {
  color: var(--ll-signal-amber);
}

/* ── Reduced motion ────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .ll-hero-cursor,
  .ll-boot-cursor {
    animation: none;
  }
  .ll-table tr.state-r td {
    animation: none;
  }
  .ll-btn,
  .ll-obj-card,
  .ll-nav-links a,
  .ll-nav-toggle {
    transition: none;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/lowkey-linux/lowkey-linux.css
git commit -m "feat(lowkey-linux): add design token stylesheet"
```

---

## Task 3: BootSequence component

**Files:**
- Create: `src/components/LoowkeyLinux/BootSequence.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
        await sleep(120 + Math.random() * 380);
        const line = lines[i];
        for (let c = 0; c <= line.length; c++) {
          if (cancelledRef.current) return;
          setTyped((prev) => prev.map((t, idx) => (idx === i ? line.slice(0, c) : t)));
          await sleep(30 + Math.random() * 12);
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
```

Note: the parent must wrap this in `<AnimatePresence>` for the exit fade to run.

- [ ] **Step 2: Commit**

```bash
git add src/components/LoowkeyLinux/BootSequence.tsx
git commit -m "feat(lowkey-linux): add boot sequence component"
```

---

## Task 4: Navbar component

**Files:**
- Create: `src/components/LoowkeyLinux/Navbar.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoowkeyLinux/Navbar.tsx
git commit -m "feat(lowkey-linux): add navbar component"
```

---

## Task 5: ProcessTable component (htop schedule)

**Files:**
- Create: `src/components/LoowkeyLinux/ProcessTable.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useEffect, useState } from "react";
import { schedule, type ScheduleRow } from "data/lowkeylinux/timelineData";
import { eventConfig } from "data/lowkeylinux/content";

const STATE_LABEL: Record<ScheduleRow["state"], string> = {
  R: "running",
  S: "sleeping",
  Z: "zombie",
};

export default function ProcessTable() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // Live detection: a row whose time window matches the current hour is
  // promoted to state R (running). Otherwise the row keeps its scheduled state.
  const rows = schedule.map((row) =>
    timeWindowMatches(row.time, now)
      ? { ...row, state: "R" as const }
      : row
  );

  const sessionCount = schedule.length;
  const phaseCount = eventConfig.phases.length;
  const runningCount = rows.filter((r) => r.state === "R").length;

  return (
    <div>
      <div className="ll-loadavg">
        <span>
          load average: <b>{runningCount}</b> running, <b>{sessionCount}</b> sessions,{" "}
          <b>{phaseCount}</b> phases
        </span>
      </div>

      {/* Desktop table */}
      <div className="ll-table-wrap">
        <table className="ll-table">
          <thead>
            <tr>
              <th scope="col">PID</th>
              <th scope="col">USER</th>
              <th scope="col">CPU%</th>
              <th scope="col">STATE</th>
              <th scope="col">TIME</th>
              <th scope="col">COMMAND</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.pid} className={`state-${r.state.toLowerCase()}`}>
                <td>{r.pid}</td>
                <td>{r.user}</td>
                <td>
                  <span className="ll-cpu-bar">
                    <span
                      className="ll-cpu-fill"
                      style={{ width: `${r.cpu}%` }}
                    />
                  </span>{" "}
                  {r.cpu}%
                </td>
                <td className={`state-${r.state.toLowerCase()}`}>
                  <span className="ll-state-dot" aria-hidden />
                  {r.state} · {STATE_LABEL[r.state]}
                </td>
                <td>{r.time}</td>
                <td>{r.command}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="ll-table-cards">
        {rows.map((r) => (
          <div key={r.pid} className="ll-card">
            <div className="ll-card-head">
              <span>
                PID {r.pid} · {r.user}
              </span>
              <span className={`state-${r.state.toLowerCase()}`}>
                <span className="ll-state-dot" aria-hidden />
                {r.state} · {STATE_LABEL[r.state]}
              </span>
            </div>
            <div className="ll-card-command">{r.command}</div>
            <div className="ll-card-time">{r.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function timeWindowMatches(time: string, now: Date): boolean {
  const [hourStr] = time.split(":");
  const hour = parseInt(hourStr, 10) % 12;
  const isPm = time.includes("PM");
  const nowHour = now.getHours();
  return nowHour === hour + (isPm ? 12 : 0);
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoowkeyLinux/ProcessTable.tsx
git commit -m "feat(lowkey-linux): add htop-style process table"
```

---

## Task 6: ManPage component (shared About + FAQ)

**Files:**
- Create: `src/components/LoowkeyLinux/ManPage.tsx`

- [ ] **Step 1: Create the component**

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoowkeyLinux/ManPage.tsx
git commit -m "feat(lowkey-linux): add man-page and faq components"
```

---

## Task 7: RegisterBanner component

**Files:**
- Create: `src/components/LoowkeyLinux/RegisterBanner.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useEffect, useState } from "react";
import { eventConfig } from "data/lowkeylinux/content";

// Event starts 10:30 AM IST (MUJ campus is in India). Explicit offset avoids
// viewer-local timezone drift in the countdown.
const EVENT_ISO = "2026-08-16T10:30:00+05:30";

export default function RegisterBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    const update = () => {
      const ms = new Date(EVENT_ISO).getTime() - Date.now();
      if (ms <= 0) {
        setDaysLeft(-1);
        return;
      }
      setDaysLeft(Math.ceil(ms / 86_400_000));
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const urgent = daysLeft !== null && daysLeft >= 0 && daysLeft < 3;

  return (
    <section id="register" className="ll-register">
      {daysLeft !== null && (
        <div className={`ll-countdown ${urgent ? "urgent" : ""}`}>
          {daysLeft < 0
            ? "registration closed"
            : daysLeft === 0
              ? "registration closes today"
              : `registration closes in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`}
        </div>
      )}
      <h2 className="ll-register-title">
        Gain root access on {eventConfig.dateShort}
      </h2>
      <a className="ll-btn ll-btn-primary" href={eventConfig.registerUrl}>
        $ sudo apt install ticket
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoowkeyLinux/RegisterBanner.tsx
git commit -m "feat(lowkey-linux): add register banner with countdown"
```

---

## Task 8: Footer component

**Files:**
- Create: `src/components/LoowkeyLinux/Footer.tsx`

- [ ] **Step 1: Create the component**

```tsx
export default function Footer() {
  const links = [
    { cmd: "cat contact.txt", href: "mailto:ieee.ras.muj@gmail.com", label: "ieee.ras.muj@gmail.com" },
    { cmd: "./instagram.sh", href: "https://www.instagram.com/ieeerasmuj/", label: "@ieeerasmuj" },
    { cmd: "./linkedin.sh", href: "https://www.linkedin.com/company/ieee-ras-muj/", label: "IEEE RAS MUJ" },
    { cmd: "cat events.txt", href: "/events", label: "more events" },
  ];

  return (
    <footer className="ll-footer">
      <div className="ll-footer-inner">
        {links.map((l) => (
          <div key={l.cmd} className="ll-footer-line">
            <span className="ll-footer-prompt">user@lowkey:~$</span>
            <span>{l.cmd}</span>
            <span>→</span>
            <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
              {l.label}
            </a>
          </div>
        ))}
        <div className="ll-footer-line">
          <span className="ll-footer-prompt">user@lowkey:~$</span>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <span>echo "© 2026 IEEE RAS MUJ"</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/LoowkeyLinux/Footer.tsx
git commit -m "feat(lowkey-linux): add terminal-prompt footer"
```

---

## Task 9: Main page (`src/app/lowkey-linux/page.tsx`)

**Files:**
- Create: `src/app/lowkey-linux/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { JetBrains_Mono, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import { eventConfig } from "data/lowkeylinux/content";
import BootSequence from "@/components/LoowkeyLinux/BootSequence";
import Navbar from "@/components/LoowkeyLinux/Navbar";
import ProcessTable from "@/components/LoowkeyLinux/ProcessTable";
import { ManPage, FaqSection } from "@/components/LoowkeyLinux/ManPage";
import RegisterBanner from "@/components/LoowkeyLinux/RegisterBanner";
import Footer from "@/components/LoowkeyLinux/Footer";
import "./lowkey-linux.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--ll-font-display",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--ll-font-body",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--ll-font-mono",
  display: "swap",
});

export default function LoowkeyLinuxPage() {
  const [bootDone, setBootDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasBooted = sessionStorage.getItem("llBooted");
    if (hasBooted) setBootDone(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      id="top"
      className={`${jetbrains.variable} ${plexSans.variable} ${plexMono.variable} ll-page`}
    >
      <div className="ll-crt" aria-hidden />
      <AnimatePresence>
        {!bootDone && (
          <BootSequence
            lines={eventConfig.boot.lines}
            onComplete={() => {
              sessionStorage.setItem("llBooted", "true");
              setBootDone(true);
            }}
          />
        )}
      </AnimatePresence>
      {bootDone && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ position: "relative", zIndex: 2 }}
        >
          <Navbar />

          {/* ── HERO ── */}
          <section className="ll-hero">
            <div>
              <div className="ll-hero-eyebrow">IEEE RAS MUJ presents</div>
              <h1 className="ll-hero-title">
                LOWKEY LINUX<span className="ll-hero-cursor" aria-hidden />
              </h1>
              <p className="ll-hero-sub">{eventConfig.tagline}</p>
              <div className="ll-hero-meta">
                <span className="ll-chip">{eventConfig.date}</span>
                <span className="ll-chip">{eventConfig.location}</span>
                <span className="ll-chip">hybrid event</span>
              </div>
              <div className="ll-hero-ctas">
                <a className="ll-btn ll-btn-primary" href="#register">
                  $ sudo apt install ticket
                </a>
                <a className="ll-btn ll-btn-cyan" href="#schedule">
                  $ cat schedule.txt
                </a>
              </div>
            </div>
          </section>

          {/* ── ABOUT ── */}
          <section id="about" className="ll-section">
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ man lowkey-linux(1)</div>
              <div>
                <ManPage
                  title={`lowkey-linux(1) — ${eventConfig.title}`}
                  blocks={[
                    { label: "NAME", body: [eventConfig.name] },
                    { label: "SYNOPSIS", body: [eventConfig.about.synopsis] },
                    { label: "DESCRIPTION", body: eventConfig.about.description },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* ── OBJECTIVES ── */}
          <section id="objectives" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ systemctl status objectives</div>
              <div>
                <div className="ll-obj-grid">
                  {eventConfig.objectives.map((o, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      className="ll-obj-card"
                    >
                      <div className="ll-obj-title">{o.title}</div>
                      <div className="ll-obj-desc">{o.description}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── EVENT FORMAT / PHASES ── */}
          <section id="format" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ ls /phases</div>
              <div>
                {eventConfig.phases.map((phase) => (
                  <div key={phase.title} className="ll-phase">
                    <div className="ll-phase-title">{phase.title}</div>
                    <div className="ll-phase-sub">{phase.sub}</div>
                    {phase.items.map((item, i) => (
                      <div key={i} className="ll-phase-item">
                        <div className="ll-phase-time">{item.time}</div>
                        <div className="ll-phase-text">{item.text}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SCHEDULE (htop) ── */}
          <section id="schedule" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ htop</div>
              <div>
                <ProcessTable />
              </div>
            </div>
          </section>

          {/* ── JUDGING ── */}
          <section id="judging" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ cat judging.conf</div>
              <div>
                {eventConfig.judging.map((j, i) => (
                  <div key={i} className="ll-judge-row">
                    <div>
                      <div className="ll-judge-crit">{j.criterion}</div>
                      <div className="ll-judge-detail">{j.detail}</div>
                    </div>
                    <div className="ll-judge-weight">{j.weight}%</div>
                    <div className="ll-judge-bar">
                      <div
                        className="ll-judge-bar-fill"
                        style={{ width: `${j.weight}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" className="ll-section" style={{ paddingTop: 0 }}>
            <div className="ll-section-rail">
              <div className="ll-rail-num">$ man lowkey-linux-faq(1)</div>
              <div>
                <FaqSection items={eventConfig.faq} />
              </div>
            </div>
          </section>

          {/* ── REGISTER ── */}
          <RegisterBanner />

          <Footer />
        </motion.main>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Lint the page**

Run: `npx eslint src/app/lowkey-linux/page.tsx src/components/LoowkeyLinux`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/lowkey-linux
git commit -m "feat(lowkey-linux): add main event page"
```

---

## Task 10: Events page integration (preview + data + wiring)

**Files:**
- Create: `src/components/LoowkeyLinux/LoowkeyLinuxPreview.tsx`
- Modify: `data/eventsData.ts`
- Modify: `src/app/events/page.tsx`

- [ ] **Step 1: Create the preview component**

```tsx
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
```

- [ ] **Step 2: Add event to `data/eventsData.ts`**

Add to the `upcoming` array:

```ts
    {
      id: "5a",
      title: "Loowkey Linux",
      description:
        "System Override: The Linux Lockdown — a single-day bootcamp + simulated server rescue competition for absolute beginners.",
      href: "/lowkey-linux",
      status: "upcoming",
      year: "2026",
    },
```

- [ ] **Step 3: Wire the preview into `src/app/events/page.tsx`**

Add the import after line 12:

```ts
import LoowkeyLinuxPreview from '@/components/LoowkeyLinux/LoowkeyLinuxPreview';
```

Add a branch in the event animation conditional (after the `Unlock'D` branch):

```tsx
                    ) : event.title === "Loowkey Linux" ? (
                      <div className="flex justify-center mb-6">
                        <LoowkeyLinuxPreview size={80} className="opacity-90" speed={1} />
                      </div>
                    ) : (
```

- [ ] **Step 4: Lint + build**

Run: `npx eslint src/app/events/page.tsx data/eventsData.ts`
Then: `npm run build`
Expected: both pass, no type errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/LoowkeyLinux/LoowkeyLinuxPreview.tsx data/eventsData.ts src/app/events/page.tsx
git commit -m "feat(lowkey-linux): add events page card and preview"
```

---

## Task 11: Full build + manual verification

**Files:** none (verification only)

- [ ] **Step 1: Full lint + build**

Run: `npm run lint`
Run: `npm run build`
Expected: both pass with no errors or warnings.

- [ ] **Step 2: Manual checks (dev server)**

Run: `npm run dev`, open `http://localhost:3000/lowkey-linux`
Verify:
- Boot sequence types out the dmesg log, is skippable on click/keypress, and plays once per session (refresh after boot → no replay)
- Hero shows LOWKEY LINUX with blinking cursor; both CTAs work (`#register` scroll, `#schedule` scroll)
- Schedule table renders with PID/USER/CPU%/STATE/TIME/COMMAND; load-average strip shows real counts; collapses to stacked cards below 640px
- FAQ accordion expands/collapses and is keyboard-operable (Tab + Enter)
- Register banner shows countdown; footer shows terminal-prompt links
- `prefers-reduced-motion: reduce` skips the boot typing (instant cut to hero)

Open `http://localhost:3000/events`: the Upcoming tab shows a "Loowkey Linux" card with the amber terminal preview; clicking it navigates to `/lowkey-linux`.

- [ ] **Step 3: Final commit if any fixes applied**

```bash
git add -A
git commit -m "fix(lowkey-linux): address verification issues"
```

---

## Self-Review Notes

- **Spec coverage:** tokens (Task 2), typography (Task 9 fonts), boot (Task 3), hero (Task 9), about man-page (Task 6/9), objectives (Task 9), format/phases (Task 9), htop schedule (Task 5/9), judging (Task 9), FAQ (Task 6/9), register (Task 7), footer (Task 8), preview + events integration (Task 10), reduced-motion + a11y (Task 2 CSS focus styles + Task 3 motion check), responsive (Task 2 CSS breakpoints).
- **Register URL:** placeholder `#register` in `content.ts` — flagged to swap for the real external form URL.
- **Type consistency:** `ScheduleRow` shape defined in Task 1 and consumed by `ProcessTable` in Task 5; `eventConfig` shape defined in Task 1 and consumed across Tasks 6-9.
