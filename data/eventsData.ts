export const eventsData = {
  completed: [
    {
      id: "1a",
      title: "Pixel Palettes",
      description:
        "24-hour AI-powered hackathon featuring cutting-edge challenges and expert mentorship.",
      href: "/pixelpalettes",
      status: "completed",
      year: "2025",
    },
    {
      id: "2a",
      title: "Techno Vision 3.0",
      description:
        "An immersive 24-hour ideathon designed to foster innovation and interdisciplinary collaboration.",
      href: "/technovision3",
      status: "completed",
      year: "2025",
    },
    {
      id: "3a",
      title: "Wings And Wires",
      description:
        "An educational workshop exploring the fundamentals, components, and working principles of drone technology.",
      href: "/wingsandwires",
      status: "completed",
      year: "2025",
    },
    {
      id: "1b",
      title: "Cook Crack Capture",
      description: "Capture the Flag cybersecurity event with a Breaking Bad twist.",
      href: "/cookcrackcapture",
      status: "completed",
      year: "2026",
    },
  ],
  upcoming: [
    {
      id: "4a",
      title: "Unlock'D",
      description:
        "An immersive 24-hour progressive software development challenge designed to bridge the gap between theory and practice.",
      href: "/unlockd",
      status: "upcoming",
      year: "2026",
    },
  ],
};

// 1. Combine your event arrays into a single list for rendering.
export const allEvents = [...eventsData.completed, ...eventsData.upcoming];
