export type Rule = {
  id: number;
  title: string;
  points: string[];
};

export const rulesData: Rule[] = [
  {
    id: 1,
    title: "Event Overview",
    points: [
      "TechnoVision 3.0: Unleashing the Future is an immersive 24-hour ideathon designed to foster innovation and interdisciplinary collaboration among students.",
      "Participants will leverage cutting-edge technologies and methodologies to ideate, prototype, and pitch their solutions.",
      "Organized by IEEE RAS MUJ."
    ]
  },
  {
    id: 2,
    title: "Event Structure",
    points: [
      "Round 1 (Online): Teams select a domain and submit a brief outline of their proposed solution via Google Form.",
      "Round 2 (Offline): Shortlisted teams prepare a comprehensive presentation including problem definition, tech stack, implementation strategy, and impact.",
      "Round 3 (Offline): Final presentation to a panel of judges, followed by a Q&A session."
    ]
  },
  {
    id: 3,
    title: "Objectives",
    points: [
      "Promote Technological Innovation in AI, IoT, cybersecurity, and other emerging fields.",
      "Facilitate Interdisciplinary Collaboration among students from diverse academic backgrounds.",
      "Enhance Problem-Solving Skills through practical application of theoretical concepts.",
      "Connect students with industry experts for mentorship and guidance."
    ]
  },
  {
    id: 4,
    title: "Evaluation Criteria",
    points: [
      "Creativity and originality of the proposed solution.",
      "Technical rigor and feasibility of the implementation.",
      "Alignment with the chosen domain and overall impact of the solution."
    ]
  },
  {
    id: 5,
    title: "Venue & Logistics",
    points: [
      "Online Phase: September 10th, 2025 starting at 06:00 PM.",
      "Offline Phase: September 11th, 2025 at AB2 (Sharda Pai Auditorium) and AB1 (Classrooms 022, 325-328).",
      "Registration is free for IEEE Global Members and ₹100/person for Non-IEEE Global Members."
    ]
  }
];
