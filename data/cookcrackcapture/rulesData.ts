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
      "Cook · Crack · Capture is a forensics-focused Capture The Flag (CTF) competition conducted as part of TechIdeate – The Annual Technical Fest, organized by Randomize × IEEE RAS.",
      "The event emphasizes evidence-based reasoning and analytical accuracy over brute-force exploitation.",
      "Participants are required to analyze provided digital artifacts and derive conclusions based on forensic evidence."
    ]
  },
  {
    id: 2,
    title: "Event Duration",
    points: [
      "Dates: 30th & 31st January 2026",
      "Format: Continuous competitive event from 6:00 PM 30th Jan to 6:00 PM 31st Jan",
      "Mode: Offline & Online"
    ]
  },
  {
    id: 3,
    title: "Team Composition",
    points: [
      "Participation is team-based.",
      "Each team may consist of 1 to 4 members.",
      "Team members cannot change once the event begins."
    ]
  },
  {
    id: 4,
    title: "Event Structure",
    points: [
      "The competition consists of multiple forensic stages.",
      "Each stage presents CTF challenges.",
      "Challenges may involve Disk images, Log files, Network captures, Memory dumps, and Other forensic artifacts."
    ]
  },
  {
    id: 5,
    title: "Difficulty Levels",
    points: [
      "Each stage may provide multiple difficulty paths: Easy, Medium, Hard.",
      "Difficulty levels vary in complexity, noise, and depth of analysis."
    ]
  },
  {
    id: 6,
    title: "Flag Submission",
    points: [
      "Flags must be submitted in the format specified on the platform (e.g., ctf{...}).",
      "Flags are case-sensitive.",
      "Incorrect submissions may incur a time penalty or submission delay, depending on platform configuration.",
      "Brute-force flag submission is strictly prohibited."
    ]
  },
  {
    id: 7,
    title: "Scoring",
    points: [
      "Points are awarded upon successful flag submission.",
      "Higher difficulty challenges carry higher points.",
      "In case of a tie, the following will be considered: (a) Total number of challenges solved (b) Time of last correct submission."
    ]
  },
  {
    id: 8,
    title: "Prohibited Actions",
    points: [
      "Sharing flags, solutions, or hints with other teams.",
      "Attacking the competition infrastructure or hosting servers.",
      "Attempting to exploit platform vulnerabilities.",
      "Denial-of-Service (DoS/DDoS) attacks.",
      "Use of automated brute-force scripts unless explicitly permitted by a challenge.",
      "Violation of these rules may result in immediate disqualification."
    ]
  },
  {
    id: 9,
    title: "Fair Play & Ethics",
    points: [
      "Participants are expected to follow ethical hacking practices.",
      "Any attempt to gain unfair advantage outside the scope of the challenges will lead to penalties or disqualification.",
      "Decisions made by the organizing team are final and binding."
    ]
  },
  {
    id: 10,
    title: "Platform & Accessibility",
    points: [
      "The competition will be hosted on an online CTF platform.",
      "All challenge descriptions, artifacts, and updates will be displayed on the official event website.",
      "Participants are responsible for ensuring stable internet connectivity."
    ]
  },
  {
    id: 11,
    title: "Hints & Clarifications",
    points: [
      "Hints may be released at the discretion of the organizers.",
      "Clarifications will be posted on the official communication channels or website.",
      "No individual hints will be provided privately."
    ]
  },
  {
    id: 12,
    title: "Disqualification Policy",
    points: [
      "A team may be disqualified for: Violation of rules, Unsportsmanlike conduct, Use of unauthorized tools or methods, or Any activity deemed harmful to the integrity of the event."
    ]
  },
  {
    id: 13,
    title: "Amendments",
    points: [
      "The organizers reserve the right to modify rules if necessary.",
      "Any changes will be updated and displayed on the official event website.",
      "Participants are responsible for staying informed of updates."
    ]
  },
  {
    id: 14,
    title: "Contact & Support",
    points: [
      "For technical issues or queries, participants may contact the event coordinators through the official channels listed on the website."
    ]
  }
];
