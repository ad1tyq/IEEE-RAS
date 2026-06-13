export type TimelineItem = {
  time: string;
  title: string;
  desc: string;
  mode?: string;
  categories?: string[];
  isHeader?: boolean;
};

export const timeline: TimelineItem[] = [
  {
    time: "Day 1: July 3rd, 2026 (Online)",
    title: "",
    desc: "",
    isHeader: true,
  },
  {
    time: "09:00 AM",
    title: "Participant Reporting and Registration",
    desc: "Teams report online to begin the development journey.",
  },
  {
    time: "09:45 AM",
    title: "Opening Ceremony & Briefing",
    desc: "Official kick-off, rules briefing, and the reveal of the secret base application.",
  },
  {
    time: "10:00 AM",
    title: "Round 1: Progressive Feature Sprints Begin",
    desc: "Teams start building. Features must be unlocked sequentially. Example tasks include setting up core modules, implementing dynamic data routing, and integrating external APIs.",
  },
  {
    time: "10:30 PM",
    title: "End of Round 1",
    desc: "Conclusion of the primary development phase.",
  },
  {
    time: "Day 2: July 4th, 2026 (Online)",
    title: "",
    desc: "",
    isHeader: true,
  },
  {
    time: "12:00 AM",
    title: "Round 2: Optimization and Open Innovation",
    desc: "Phase focused on UI/UX refinement, performance optimization, and creative bonus feature implementations.",
  },
  {
    time: "07:00 AM",
    title: "Final Code Freeze",
    desc: "All development ceases; teams prepare for final submission and demonstration.",
  },
  {
    time: "08:00 AM",
    title: "Round 3: Final Demonstration and Judging",
    desc: "Teams present their fully deployed applications, explaining their architecture and demonstrating core functionality.",
  },
  {
    time: "11:00 AM",
    title: "Event Conclusion",
    desc: "Final Q&A session with judges followed by the announcement of the winners.",
  },
];
