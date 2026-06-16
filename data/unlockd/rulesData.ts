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
    id: 3,
    title: "General Guidelines",
    points: [
      "Teams must build upon the provided starter codebase; building from scratch is not permitted.",
      "Round progression is gated; teams cannot proceed to the next feature without judge verification.",
      "Participants are expected to maintain professional conduct and demonstrate collaborative teamwork."
    ]
  }
];
