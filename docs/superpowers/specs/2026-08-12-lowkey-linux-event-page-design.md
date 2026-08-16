# LOWKEY LINUX — Event Page Design Spec

## Overview

A single-page marketing/event site for the IEEE RAS "Loowkey Linux" event — "System Override: The Linux Lockdown", a single-day (16th August) hybrid event combining an offline CLI bootcamp (Phase 1) with an online CTF-style competition (Phase 2).

Primary goal: registrations. Secondary goal: position the club as technically credible — the page doubles as a portfolio piece.

The design follows the downloaded `design.md` + `PRD.md` (ROOT ACCESS design system) faithfully, adapted to the Loowkey Linux content and this repo's per-event page conventions.

## Confirmed decisions

- **Duration/format:** Single-day mega event on 16th August (bootcamp 11AM–3PM, competition 3PM–7PM). Contradictory "2-day" copy in the source brief is NOT used.
- **Hero headline:** LOWKEY LINUX (primary), "System Override: The Linux Lockdown" as subhead.
- **URL slug:** `/lowkey-linux`
- **Registration:** External form link — a placeholder constant in the content config, easy to swap later.
- **Approach:** Full design-system implementation (boot sequence + htop schedule signature moments).

## Architecture & File Structure

```
src/app/lowkey-linux/
  page.tsx                  # Main page ('use client')
  lowkey-linux.css          # Token system + Linux-themed styles

data/lowkeylinux/
  content.ts                # All editable copy (single config)
  timelineData.ts           # Schedule for htop table + detailed timeline

src/components/LoowkeyLinux/
  BootSequence.tsx          # dmesg-style boot intro overlay
  Navbar.tsx                # Sticky nav (appears after boot)
  ProcessTable.tsx          # htop-style schedule
  ManPage.tsx               # Shared man-page section (About + FAQ)
  RegisterBanner.tsx        # Terminal CTA
  LoowkeyLinuxPreview.tsx   # Animated card for /events page
  Footer.tsx                # Terminal-prompt footer
```

Plus edits:
- `data/eventsData.ts` — add `Loowkey Linux` to `upcoming[]`
- `src/app/events/page.tsx` — wire in `LoowkeyLinuxPreview` for the card

All content lives in one config (`content.ts`) so copy changes never touch component code. Boot-sequence log lines pull counts (sessions, speakers) from that config to stay in sync.

## Token System

CSS variables in `lowkey-linux.css` (design.md §1.1):

| Token | Hex | Role |
|---|---|---|
| `--ll-bg-void` | `#0B0E11` | Page background |
| `--ll-bg-panel` | `#12161B` | Card surfaces |
| `--ll-bg-panel-raised` | `#181D24` | Hover states |
| `--ll-fg-primary` | `#E8E6E1` | Body text |
| `--ll-fg-muted` | `#8A9199` | Captions/comments |
| `--ll-signal-amber` | `#FFB020` | Primary accent (phosphor amber) |
| `--ll-signal-amber-dim` | `#B8801A` | Borders/dividers (12-18% opacity) |
| `--ll-signal-cyan` | `#4FD1C5` | Links, secondary CTAs, focus rings |
| `--ll-signal-red` | `#FF5D5D` | Urgency only (deadline countdown) |
| `--ll-signal-green` | `#5FD97A` | Running-state only (htop state R) |

Amber over green: real terminal history (CRT phosphor), warmer, reads as more considered than generic hacker-green.

## Typography

- **JetBrains Mono** — display/headings, weight 700-800, via `next/font/google`
- **IBM Plex Sans** — body copy
- **IBM Plex Mono** — UI chrome, labels, timestamps, PIDs

Layout: 4px border radius everywhere, hairline amber borders (12-18% opacity) instead of shadows, 12-col grid / 1200px max content, 24px gutter, 160px section rhythm desktop / 80px mobile.

## Sections & Signature Elements

### BootSequence (first signature moment)
- Full-viewport fixed overlay, `--ll-bg-void`, plays once per session (sessionStorage flag), skippable on click/keypress, respects `prefers-reduced-motion` (instant cut)
- Types realistic boot log lines referencing the event: `[  0.000000] Mounting /dev/sda1: LOWKEY-LINUX-FEST`, `[ OK ] Started workshops.service`, ends `[ OK ] Reached target lowkey-linux.event — Welcome.`
- ~30-40ms/char typing, randomized 100-500ms line pauses, 400ms wipe to hero (already mounted underneath)

### Hero (post-boot)
- LOWKEY LINUX headline as large mono command, amber, persistent blinking cursor (1s, `steps()` timing)
- Subhead (Plex Sans): "System Override: The Linux Lockdown — a single-day hybrid bootcamp + CTF-style server competition for absolute beginners"
- Date/venue chips (16th August / MUJ campus)
- Primary CTA: `$ sudo apt install ticket` → register link; secondary: `cat schedule.txt` → scroll to schedule
- Subtle static CRT scanline texture (~4%), no animated overlays

### Section flow
1. **About** — `man lowkey-linux(1)`: NAME / SYNOPSIS / DESCRIPTION, two-column with mono left rail
2. **Objectives** — framed as boot-time services (`starting objectives.service`)
3. **Event Format** — Phase 1 (CLI Survival Bootcamp) / Phase 2 (The Sabotaged Server) breakdown
4. **Schedule** — htop-style ProcessTable (second signature moment)
5. **Judging Criteria** — 60% Speed / 30% Accuracy / 10% Automation as compact bars
6. **FAQ** — man-page accordion
7. **Register** — countdown banner, `sudo apt install ticket` CTA, red accent only near deadline
8. **Footer** — `user@lowkey:~$` terminal-prompt links

## Schedule (htop ProcessTable)

Real `<table>` markup styled like htop:
- Columns: `PID | USER | CPU% | STATE | TIME | COMMAND`
- `STATE`: R (running/current, green), S (upcoming, amber), Z (ended, muted)
- `CPU%`: decorative CSS bar mapped to seats-filled % if available, else omitted
- Load-average strip above pulling real counts from config (e.g. `load average: 10 sessions, 2 phases, 1 day`)
- Mobile <640px: stacked process cards keeping PID/STATE/COMMAND hierarchy

## Content (data/lowkeylinux/content.ts)

- name, tagline, date, location, registerUrl (placeholder constant)
- about: synopsis + description
- objectives: array of title+description
- phases/format: Phase 1 + Phase 2 breakdowns
- schedule: process-table rows {pid, user, cpu, state, time, command}
- judging: [{criterion, weight}]
- faq: [{q, a}]
- boot: log line templates referencing config counts (sessions, phases, day)

## Motion Principles

- One orchestrated moment (boot) + one ambient pulse (htop live-row). Most sections simply sit well-typeset, no scroll-triggered fade-ins everywhere.
- Hover: border color shift + 2-4px translate. No scale-up bounces, no glow blooms.
- Only looping animations: hero cursor blink, htop live-row pulse. Both slow, both quiet.
- All motion respects `prefers-reduced-motion`.

## Accessibility & Quality

- WCAG AA contrast (off-white on void ≈ 14:1; amber reserved for large text/accents)
- Real semantic `<table>` for schedule; `aria-hidden` on decorative mono chrome; real content in plain semantic HTML
- 2px cyan focus outline offset 2px; keyboard-navigable accordions
- Boot sequence skippable, never traps focus
- Responsive 360px→1920px, no horizontal scroll

## Verification

- `npm run lint` and `npm run build` pass
- Manual: boot sequence plays once per session, skippable, reduced-motion respected; schedule reflows to cards on mobile; events page shows the new card in Upcoming

## Out of scope (v1)

- User accounts/login, payment processing, CMS, multi-page site, live seat-count backend
