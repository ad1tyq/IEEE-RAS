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
    desc: "Teams report online to begin the development journey and verify registrations.",
  },
  {
    time: "09:45 AM",
    title: "Opening Ceremony, Rules Briefing & Problem Statement Reveal",
    desc: "Official kick-off, rules briefing, and the reveal of the secret base application / problem statement.",
  },
  {
    time: "09:45 AM - 10:15 AM",
    title: "Round 0: System Setup and Comprehension",
    desc: "Teams initialize the provided starter repository, configure local development environments, and complete a technical checkpoint to demonstrate their understanding of the base architecture before development begins.",
  },
  {
    time: "10:30 AM - 08:30 PM",
    title: "Round 1: Progressive Feature Sprints",
    desc: "Teams engage in sequential development rounds to implement core functional modules, such as authentication systems and database routing. A feature must be successfully reviewed for technical accuracy by the judging panel before the team's subsequent development phase is unlocked. (Easy: 1hr, Medium: 1.5hr, Hard: 2-2.5hrs).",
  },
  {
    time: "08:30 PM - 11:30 PM",
    title: "Elimination Phase",
    desc: "Submission evaluation and grading of Round 1 features. 11:30 PM: Announcement of results (Out of 100, 50 teams remain).",
  },
  {
    time: "Day 2: July 4th, 2026 (Online)",
    title: "",
    desc: "",
    isHeader: true,
  },
  {
    time: "12:00 AM - 06:00 AM",
    title: "Round 2: Optimization and Open Innovation",
    desc: "Participants focus on system performance, UI/UX refinement, cloud deployment, and the integration of optional innovative features to enhance the product's overall value and usability.",
  },
  {
    time: "06:00 AM - 08:00 AM",
    title: "Elimination & Review",
    desc: "Grading of Round 2 submissions. 08:00 AM: Announcement of results (Out of 50, 10 teams remain).",
  },
  {
    time: "08:30 AM - 10:30 AM",
    title: "Round 3: Final Demonstration and Evaluation",
    desc: "Teams present their fully deployed applications to the judging panel. Participants will articulate their architectural decisions, demonstrate their integrated features, and participate in a structured technical Q&A session. (5 minutes for presentation, 5 mins for Q&A).",
  },
  {
    time: "11:00 AM",
    title: "End of Event",
    desc: "Wrap-up of presentations and final Q&A, followed by the official closing and announcement of winners.",
  },
];
