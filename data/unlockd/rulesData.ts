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
      "Unlock'D is an immersive 36-hour progressive software development challenge designed to foster technical proficiency and practical product-building skills.",
      "Unlike traditional hackathons, this is a guided product-building relay where teams start with a base application and progressively add features in timed rounds.",
      "The event is designed to feel practical, career-relevant, and portfolio-worthy for total beginners."
    ]
  },
  {
    id: 2,
    title: "Event Structure",
    points: [
      "Round 0: Setup and Understanding - Teams clone the starter repo, install dependencies, and verify their environment.",
      "Round 1: Feature Unlock Sprint - Teams add features sequentially. Each feature must pass a technical check before the next one is unlocked.",
      "Round 2: Polishing and Open Innovation - Focused on refining the UI/UX, improving performance, and adding creative improvements.",
      "Round 3: Demonstration and Judging - Final presentation and verification of the deployed product."
    ]
  },
  {
    id: 3,
    title: "Judging Criteria",
    points: [
      "Functionality: Does the feature work as intended and does the app behave correctly?",
      "Code Quality: Is the code organized, readable, and maintainable?",
      "Integration: Successful connection between frontend, backend, and third-party services.",
      "User Experience: Smooth flows, clean UI, and ease of use.",
      "Deployment: Is the application accessible and working outside the local environment?",
      "Teamwork and Explanation: Ability to explain the architecture, design choices, and feature roles.",
      "Error Handling: Graceful handling of invalid inputs and edge cases."
    ]
  },
  {
    id: 4,
    title: "AI Usage Policy",
    points: [
      "AI assistance is permitted, but teams must be able to explain the codebase and architecture.",
      "Live demos are mandatory; judges may ask technical and reasoning questions to verify the team's understanding.",
      "Commit history and architectural knowledge will be checked to ensure genuine contribution."
    ]
  },
  {
    id: 5,
    title: "General Guidelines",
    points: [
      "Teams must build upon the provided starter codebase; building from scratch is not permitted.",
      "Round progression is gated; teams cannot proceed to the next feature without judge verification.",
      "Participants are expected to maintain professional conduct and demonstrate collaborative teamwork."
    ]
  }
];
