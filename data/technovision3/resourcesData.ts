import { Terminal, Shield, Globe, Key, Monitor, Lightbulb, PenTool, Layout } from 'lucide-react';

export const ctfResources = [
  {
    name: 'Ideation & Prototyping',
    icon: Lightbulb,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    items: [
      {
        id: 1,
        title: 'Figma',
        description: 'The industry standard for UI/UX design and prototyping your ideas.',
        logo: "/images/logos/logo.png",
        website: "https://www.figma.com/",
        linkedinUrl: ""
      },
      {
        id: 2,
        title: 'Miro',
        description: 'A visual workspace for innovation where teams can manage projects and design systems.',
        logo: "/images/logos/logo.png",
        website: "https://miro.com/",
        linkedinUrl: ""
      }
    ]
  },
  {
    name: 'Development & Tech Stack',
    icon: Terminal,
    color: 'from-purple-500 to-indigo-500',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    items: [
      {
        id: 3,
        title: 'Next.js',
        description: 'The React framework for the web, perfect for building robust web applications.',
        logo: "/images/logos/logo.png",
        website: "https://nextjs.org/",
        linkedinUrl: ""
      },
      {
        id: 4,
        title: 'Python (AI/ML)',
        description: 'Essential for integrating Artificial Intelligence and Machine Learning into your solutions.',
        logo: "/images/logos/logo.png",
        website: "https://www.python.org/",
        linkedinUrl: ""
      },
      {
        id: 5,
        title: 'Arduino/Raspberry Pi',
        description: 'Core platforms for IoT based projects and hardware integrations.',
        logo: "/images/logos/logo.png",
        website: "https://www.arduino.cc/",
        linkedinUrl: ""
      }
    ]
  },
  {
    name: 'Presentation & Pitch',
    icon: Layout,
    color: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    items: [
      {
        id: 6,
        title: 'Canva',
        description: 'Great tool for quickly assembling beautiful presentation decks.',
        logo: "/images/logos/logo.png",
        website: "https://www.canva.com/",
        linkedinUrl: ""
      },
      {
        id: 7,
        title: 'Pitch',
        description: 'Collaborative presentation software for modern teams.',
        logo: "/images/logos/logo.png",
        website: "https://pitch.com/",
        linkedinUrl: ""
      }
    ]
  }
];
