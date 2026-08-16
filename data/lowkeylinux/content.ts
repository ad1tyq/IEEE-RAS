// Plain object (not `as const`) so arrays stay assignable to component props.
export const eventConfig = {
  name: "LOWKEY LINUX",
  title: "System Override: The Linux Lockdown",
  tagline:
    "A single-day hybrid bootcamp + CTF-style server competition for absolute beginners. Zero command-line experience required.",
  date: "16th August 2026",
  dateShort: "16 AUG",
  location: "MUJ Campus",
  // Placeholder — replace with the real registration form URL when available.
  registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLScANoro9-Y4wdZ7nP-4bO-D-OE9vILH-4N_JCl9vq4UB-5nzA/viewform?usp=publish-editor",
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
