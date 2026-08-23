export const eventConfig = {
  name: "Build Your First Embedded System",
  organizer: "IEEE RAS",
  tagline: "Zero to flashed firmware in a weekend.",
  dates: "22–23 August",
  location: "MUJ Campus",
  registerUrl: "#",
  registerCtaLabel: "Flash Firmware",

  objectives: [
    "Introduce absolute-beginner students to microcontroller fundamentals — GPIO, Timers/PWM, and UART — using industry-standard tools (CubeIDE, CubeMX, CubeProgrammer) rather than hobbyist platforms.",
    "Provide a fast, confidence-building first success (blinking an LED) within the first 30 minutes of the workshop.",
    "Build toward non-blocking, timer/interrupt-driven firmware design instead of delay-based code.",
    "Create a fair, objectively judged competitive round using only provided hardware (STM32 Blue Pill + ST-Link) plus an oscilloscope for verification.",
    "Give participants a portfolio-relevant introduction to embedded systems."
  ],

  format: {
    day1: {
      label: "Day 1 — Workshop",
      duration: "3-hour hands-on session",
      items: [
        "Toolchain orientation: CubeMX → CubeIDE → CubeProgrammer",
        "GPIO fundamentals: PC13 output, custom blink patterns",
        "Timers & PWM: hardware timer-based LED fade",
        "UART: USART1 transmission, verified live on oscilloscope",
        "Non-blocking design: delay-based → timer-interrupt-driven"
      ]
    },
    day2: {
      label: "Day 2 — Signal Bench (Competition)",
      items: [
        "Problem statement reveal and rules briefing",
        "Teams transmit a judge-specified UART byte sequence, LED synced to transmission",
        "Mandatory tier: qualification. Stretch tier: ranking.",
        "Live evaluation on oscilloscope + judge Q&A"
      ]
    }
  },

  schedule: {
    day1: [
      { time: "12:00 PM", item: "Reporting and Registration" },
      { time: "12:30 PM", item: "Opening remarks + MCU/pinout/safety orientation" },
      { time: "12:45 PM", item: "Toolchain walkthrough — CubeMX → CubeIDE → CubeProgrammer" },
      { time: "01:00 PM", item: "GPIO — first blink, custom patterns" },
      { time: "02:00 PM", item: "Break" },
      { time: "02:15 PM", item: "Timers & PWM — LED fade" },
      { time: "02:50 PM", item: "UART — USART1 transmission, verified live on oscilloscope" },
      { time: "03:35 PM", item: "Non-blocking blink using timer interrupts" },
      { time: "03:50 PM", item: "Recap + Day 2 competition rules reveal" },
      { time: "04:00 PM", item: "Day 1 concludes" }
    ],
    day2: [
      { time: "12:00 PM", item: "Reporting and team check-in" },
      { time: "12:30 PM", item: "Problem statement reveal and rules briefing" },
      { time: "01:00 PM", item: "Development round begins (mandatory + stretch tiers)" },
      { time: "04:00 PM", item: "Development round ends — code freeze" },
      { time: "04:15 PM", item: "Live evaluation on oscilloscope, team by team" },
      { time: "06:30 PM", item: "Judges' deliberation" },
      { time: "07:00 PM", item: "Results announcement and prize distribution" },
      { time: "07:30 PM", item: "Event concludes" }
    ]
  },

  problemStatement: {
    summary: "Using only the STM32 Blue Pill and ST-Link provided, teams must write firmware so the board transmits a judge-specified byte sequence over UART (USART1) at a fixed baud rate — decodable live on an oscilloscope — while the onboard LED (PC13) runs a pattern synchronized to UART activity. Requires UART and timer-driven GPIO running concurrently in a single non-blocking main loop.",
    mandatory: [
      "Correct baud rate and byte sequence, cleanly decodable with no framing errors.",
      "LED activity demonstrably synchronized to UART transmission (non-blocking implementation)."
    ],
    stretch: [
      "Team-designed bonus payload (e.g. team name), verified live.",
      "PWM fade effect tied to transmission progress rather than simple on/off toggling.",
      "Configurable baud rate switchable at build time, demonstrated live."
    ]
  },

  judgingWeights: [
    { parameter: "UART correctness on oscilloscope", detail: "baud rate, framing, byte accuracy", weight: 35 },
    { parameter: "LED–UART synchronization", detail: "non-blocking design proof", weight: 20 },
    { parameter: "Stretch tier", detail: "bonus payload, PWM tie-in, configurable baud rate", weight: 25 },
    { parameter: "Code quality", detail: "correct use of CubeMX-generated project structure", weight: 10 },
    { parameter: "Live explanation to judges", detail: "", weight: 10 }
  ],

  beneficiaries: [
    "First-year (freshman) students of MUJ, particularly those with zero prior embedded/Arduino experience.",
    "IEEE RAS Student Branch Chapter Members."
  ]
};
