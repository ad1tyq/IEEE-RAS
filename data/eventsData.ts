export const eventsData = {
  completed: [
    {
      id: "1a",
      title: "Pixel Palettes",
      description: "24-hour AI-powered hackathon featuring cutting-edge challenges and expert mentorship.",
      href: "/pixelpalettes",
      status: "completed",
    },
    {
      id: "2a",
      title: "Techno Vision 3.0",
      description: "An immersive 24-hour ideathon designed to foster innovation and interdisciplinary collaboration.",
      href: "/technovision3",
      status: "completed",
    },
    {
      id: "3a",
      title: "Wings And Wires",
      description: "An educational workshop exploring the fundamentals, components, and working principles of drone technology.",
      href: "/wingsandwires",
      status: "completed",
    },
    {
      id: "1b",
      title: "Cook Crack Capture",
      description: "Capture the Flag cybersecurity event with a Breaking Bad twist.",
      href : "/cookcrackcapture",
      status: "completed",
    },
  ],
  upcoming: [],
};

// 1. Combine your event arrays into a single list for rendering.
export const allEvents = [...eventsData.completed, ...eventsData.upcoming];