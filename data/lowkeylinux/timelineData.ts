export type ScheduleRow = {
  pid: number;
  user: string;
  cpu: number;
  state: "R" | "S" | "Z";
  time: string;
  duration: string;
  command: string;
};

export const schedule: ScheduleRow[] = [
  { pid: 1001, user: "ras-core", cpu: 12, state: "S", time: "10:30 AM", duration: "30m", command: "Reporting and Registration" },
  { pid: 1002, user: "ras-core", cpu: 18, state: "S", time: "11:00 AM", duration: "30m", command: "Opening remarks & Terminal Environment setup" },
  { pid: 1003, user: "instructors", cpu: 42, state: "S", time: "11:30 AM", duration: "60m", command: "Navigation and File Management basics (cd, ls, cat)" },
  { pid: 1004, user: "instructors", cpu: 38, state: "S", time: "12:30 PM", duration: "60m", command: "Searching & Filtering masterclass (grep, find)" },
  { pid: 1005, user: "ras-core", cpu: 4, state: "S", time: "01:30 PM", duration: "45m", command: "Mandatory Lunch & Energy Break" },
  { pid: 1006, user: "instructors", cpu: 35, state: "S", time: "02:15 PM", duration: "35m", command: "Process Management & Permissions (kill, chmod)" },
  { pid: 1007, user: "instructors", cpu: 22, state: "S", time: "02:50 PM", duration: "10m", command: "Bootcamp Recap & Terminal Cheat Sheet distribution" },
  { pid: 1008, user: "ras-core", cpu: 51, state: "S", time: "03:00 PM", duration: "15m", command: "Competition Kickoff: Rules reveal & server_simulation.zip" },
  { pid: 1009, user: "teams", cpu: 88, state: "S", time: "03:15 PM", duration: "195m", command: "The Sabotaged Server — development round" },
  { pid: 1010, user: "teams", cpu: 64, state: "S", time: "06:30 PM", duration: "15m", command: "Competition ends — Submission form closes" },
  { pid: 1011, user: "judges", cpu: 46, state: "S", time: "06:45 PM", duration: "15m", command: "Live leaderboard reveal & Judges' deliberation" },
  { pid: 1012, user: "ras-core", cpu: 28, state: "S", time: "07:00 PM", duration: "—", command: "Results announcement, prize distribution, event concludes" },
];
