export type TimelineItem = {
  time: string;
  title: string;
  desc: string;
  mode?: string;
  categories?: string[];
  isHeader?: boolean;
};

export const timeline: TimelineItem[] = [
  { time: "Day 1: September 10th, 2025 (Online)", title: "", desc: "", isHeader: true },
  { time: "06:00 PM", title: "Participant and Teams Report Online", desc: "Teams gather and report for the online session." },
  { time: "06:30 PM", title: "Last minute Registration Deadline", desc: "Final call for any pending registrations." },
  { time: "06:45 PM", title: "Opening Ceremony & Problem Statement Reveal", desc: "Official kick-off and unveiling of the ideathon problem statements." },
  { time: "09:00 PM", title: "Round 1: Domain Selection and Idea Brief Submission", desc: "Teams select their domains and submit their initial idea briefs." },
  { time: "11:30 PM", title: "End of Round 1", desc: "Filtering and shortlisting of teams based on submissions." },
  { time: "Day 2: September 11th, 2025 (Offline)", title: "", desc: "", isHeader: true },
  { time: "10:00 AM", title: "Round 2: Presentation Preparation", desc: "Preparation phase for shortlisted teams at AB2, Sharda Pai Auditorium & AB1 Classrooms." },
  { time: "02:00 PM", title: "Round 3: Final Presentation", desc: "Final presentation phase begins before the judges." },
  { time: "05:00 PM", title: "Event Conclusion & Winner Announcement", desc: "After the final presentations and Q&A with the Judges, the Winners are announced." }
];
