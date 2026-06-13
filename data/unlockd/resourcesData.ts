export type Resource = {
  id: number;
  title: string;
  link: string;
  desc: string;
  category: "Documentation" | "Tooling" | "Learning";
};

export const resourcesData: Resource[] = [
  {
    id: 1,
    title: "Official Git Documentation",
    link: "https://git-scm.com/doc",
    desc: "Essential guide for version control, branching, and managing repository history.",
    category: "Documentation",
  },
  {
    id: 2,
    title: "Postman API Platform",
    link: "https://www.postman.com/downloads/",
    desc: "Primary tool for testing backend API routes and debugging requests during development.",
    category: "Tooling",
  },
  {
    id: 3,
    title: "Next.js Learning Path",
    link: "https://nextjs.org/learn",
    desc: "Comprehensive tutorials for building full-stack applications with the Next.js framework.",
    category: "Learning",
  },
  {
    id: 4,
    title: "PostgreSQL Documentation",
    link: "https://www.postgresql.org/docs/",
    desc: "Official documentation for managing database schemas and performing SQL queries.",
    category: "Documentation",
  },
  {
    id: 5,
    title: "Vercel Deployment Guide",
    link: "https://vercel.com/docs",
    desc: "Step-by-step instructions for deploying frontend and backend applications to the cloud.",
    category: "Tooling",
  },
  {
    id: 6,
    title: "Prisma ORM",
    link: "https://www.prisma.io/docs/",
    desc: "Next-generation ORM for Node.js and TypeScript, essential for type-safe database access.",
    category: "Documentation",
  },
  {
    id: 7,
    title: "React Documentation",
    link: "https://react.dev/",
    desc: "Official documentation for building user interfaces with React components.",
    category: "Learning",
  },
  {
    id: 8,
    title: "JavaScript Info",
    link: "https://javascript.info/",
    desc: "Modern JavaScript tutorial covering everything from fundamentals to advanced topics.",
    category: "Learning",
  },
  {
    id: 9,
    title: "System Design Primer",
    link: "https://github.com/donnemartin/system-design-primer",
    desc: "Comprehensive resources to help you learn how to design large-scale systems and architecture.",
    category: "Learning",
  },
];
