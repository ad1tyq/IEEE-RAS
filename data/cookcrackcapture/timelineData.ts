export type TimelineItem = {
  time: string;
  title: string;
  desc: string;
  mode?: string;
  categories?: string[];
  isHeader?: boolean;
};

export const timeline: TimelineItem[] = [
  { time: "Round 1 – CTF (30th & 31st January 2026)", title: "", desc: "", isHeader: true },
  { 
    time: "6:00 PM – 11:00 PM", 
    title: "Foundational Challenges", 
    desc: "The competition begins with foundational challenges across multiple cybersecurity domains. Teams accumulate points by solving challenges and submitting valid flags.",
    mode: "Offline",
    categories: ["Digital Forensics", "Web Exploitation", "Reverse Engineering", "Cryptography", "Miscellaneous"]
  },
  { time: "Round 2 – CTF", title: "", desc: "", isHeader: true },
  { 
    time: "11:00 PM – 2:00 AM", 
    title: "Advanced Challenges", 
    desc: "Advanced challenges are released, testing deeper technical understanding and problem-solving ability.",
    mode: "Online",
    categories: ["Digital Forensics", "Web Exploitation", "Reverse Engineering", "Cryptography", "Miscellaneous"]
  },
  { time: "King of the Hill – Phase 1", title: "", desc: "", isHeader: true },
  { 
    time: "2:00 AM – 6:00 AM", 
    title: "Live Objectives", 
    desc: "A special competitive phase featuring King of the Hill–style challenges where teams compete for additional points by maintaining control over live objectives.",
    mode: "Online"
  },
  { time: "Round 3 – CTF", title: "", desc: "", isHeader: true },
  { 
    time: "6:00 AM – 2:00 PM", 
    title: "Final Challenges", 
    desc: "Final CTF challenges are released. Teams maximize their scores by solving remaining problems across all categories.",
    mode: "Offline",
    categories: ["Digital Forensics", "Web Exploitation", "Reverse Engineering", "Cryptography", "Miscellaneous"]
  },
  { time: "King of the Hill – Phase 2 (Final)", title: "", desc: "", isHeader: true },
  { 
    time: "2:00 PM – 6:00 PM", 
    title: "Final Opportunity", 
    desc: "The final King of the Hill phase offers the last opportunity to earn points before the competition concludes.",
    mode: "Online"
  },
  { time: "Winner Determination", title: "", desc: "", isHeader: true },
  {
    time: "End of Competition",
    title: "Crowning the Champion",
    desc: "The team with the highest total score at the end of all rounds and King of the Hill phases will be declared the winner. Ties broken by total challenges solved, then time of last correct submission.",
    mode: "Offline/Online"
  }
];
