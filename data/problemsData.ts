import { Code, Shield, AlertTriangle, DollarSign, Heart, Lightbulb, GraduationCap } from 'lucide-react';
  /**
   * Problem statements data organized by domain
   * Each domain contains an icon, color scheme, and list of problems
   */
export const problemDomains = [
    {
      name: 'LegalTech',
      icon: Shield,
      color: 'from-purple-500 to-indigo-500',
      glowColor: 'rgba(147, 51, 234, 0.4)',
      problems: [
        {
          id: 1,
          title: 'AI Legal Content Verification',
          description: 'With AI increasingly used for generating legal advice and summaries, verifying its accuracy becomes critical. Your task is to build a system that reverse-traces AI-generated legal content back to authentic laws, judgments, or regulations ensuring transparency, accountability, and jurisdictional accuracy.'
        },
        {
          id: 2,
          title: 'Legal Document Risk Analysis',
          description: 'Legal policies, bills, and political drafts often contain hidden risks or biases that go unnoticed by the general public. Your task is to build a system that analyzes such documents and flags potential threats while making complex language understandable to everyday citizens.'
        },
        {
          id: 3,
          title: 'Adversarial Legal Argumentation',
          description: 'Legal argumentation often lacks balanced representation and critical counterpoints. Your task is to build a system that generates both sides of a legal argument from a given case, simulating real adversarial reasoning and referencing applicable precedents.'
        }
      ]
    },
    {
      name: 'Blockchain',
      icon: Code,
      color: 'from-cyan-500 to-blue-500',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      problems: [
        {
          id: 1,
          title: 'Disaster Relief Blockchain Platform',
          description: 'Disaster relief efforts often suffer from fraud, mismanagement, and lack of coordination. Your task is to design a blockchain-powered platform that transparently tracks aid supplies, verifies delivery, and enables identity-based claims all without centralized control or trust dependencies.'
        },
        {
          id: 2,
          title: 'Supply Chain Disruption Prediction',
          description: 'Global trade disruptions are rarely detected before they cause ripple effects. Your task is to build an AI-driven system that monitors ports, logistics data, and financial signals to predict upcoming supply chain shocks and visualize the impacted SKUs or commodities in real time.'
        },
        {
          id: 3,
          title: 'Fair Blockchain Auction Platform',
          description: 'Many online auctions can be unfair due to fake accounts or repeated bidding from the same person. Your task is to build a basic blockchain-based auction platform where users can place secure bids, and simple checks ensure fair and transparent participation.'
        }
      ]
    },
    {
      name: 'Disaster Management',
      icon: AlertTriangle,
      color: 'from-red-500 to-orange-500',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      problems: [
        {
          id: 1,
          title: 'Urban Risk Forecasting System',
          description: 'Urban environments face hidden patterns of risk that often go unnoticed until it\'s too late. Your task is to build a web-based system that forecasts high-probability zones for accidents, crimes, or emergencies up to 7 days in advance using non-biomedical, real-world urban data.'
        },
        {
          id: 2,
          title: 'Disease Outbreak Prediction',
          description: 'Global health systems often fail to anticipate disease spread until it\'s too late. Your task is to build a system that identifies early signals of chain-reaction outbreaks and predicts their escalation across regions enabling preemptive containment before crises unfold.'
        },
        {
          id: 3,
          title: 'Disaster Response Coordination',
          description: 'In the wake of natural disasters, cities face two core challenges: real-time risk awareness and coordinated aid delivery. Your task is to build a system that anticipates disaster impact zones and facilitates transparent, verifiable relief distribution even when traditional infrastructure is failing.'
        }
      ]
    },
    {
      name: 'FinTech',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      glowColor: 'rgba(34, 197, 94, 0.4)',
      problems: [
        {
          id: 1,
          title: 'Secure Cab Booking System',
          description: 'Modern ride-booking apps struggle with fragmented interfaces and security blind spots. Your task is to build a secure, full-stack cab booking system with real-time tracking, distinct user and captain portals, and protected transactions all built from scratch.'
        },
        {
          id: 2,
          title: 'AI Trading Intelligence Platform',
          description: 'In fast-moving markets, traders lack real-time, predictive intelligence at their fingertips. Your task is to build an AI-driven platform that analyzes live token and equity data to forecast trends, trigger buy/sell alerts, and deliver insights instantly to users\' devices.'
        },
        {
          id: 3,
          title: 'Gen Z Finance Advisor',
          description: 'Gen Z often earns from freelancing, gig work, or content creation, and spends based on trends, subscriptions, or lifestyle shifts. Traditional budgeting tools offer charts, but no real guidance. Your task is to build an AI-powered finance advisor that understands spending behavior, predicts risks, and offers helpful, personalized advice.'
        }
      ]
    },
    {
      name: 'Healthcare',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      glowColor: 'rgba(236, 72, 153, 0.4)',
      problems: [
        {
          id: 1,
          title: 'Mental Health Crisis Detection',
          description: 'Mental health crises often go unnoticed until they escalate. Your task is to build a proactive AI system that detects early signs of population-level stress and burnout by analyzing public sentiment, biometric cues, and behavioral patterns enabling timely, targeted interventions.'
        },
        {
          id: 2,
          title: 'IoT Healthcare Monitoring',
          description: 'Despite rapid IoT adoption, healthcare systems struggle with secure, real-time patient monitoring at scale. Your task is to build a system that leverages IoT devices to track vitals, detect anomalies, and deliver responsive care while overcoming data privacy, latency, and reliability barriers.'
        },
        {
          id: 3,
          title: 'Drug Interaction Checker',
          description: 'As more individuals self-medicate or combine prescriptions without medical oversight, the risk of harmful drug interactions increases. Your task is to build a system that helps everyday users check for adverse drug interactions and receive contextual, easy-to-understand explanations.'
        }
      ]
    },
    {
      name: 'Open Innovation',
      icon: Lightbulb,
      color: 'from-yellow-500 to-amber-500',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      problems: [
        {
          id: 1,
          title: 'Adaptive Personal Browser',
          description: 'Online content feeds are addictive but generic. Your task is to build a personal internet browser that evolves with the user\'s thought patterns curating memes, games, and posts based on their mood, attention span, and interaction style, while preserving full privacy.'
        },
        {
          id: 2,
          title: 'Dynamic Content Rewriting Platform',
          description: 'Most online content is static and one-size-fits-all. Your task is to build a platform that rewrites blogs, books, or posts in real time adapting tone, length, and structure based on the user\'s reading patterns, time of day, and session context.'
        },
        {
          id: 3,
          title: 'Personalized Content Adaptation',
          description: 'The internet serves the same static content to everyone. Your task is to build a platform that rewrites books, blogs, and posts in real time adjusting tone, structure, and length based on the user\'s mood, time of day, and behavior, all while protecting their privacy.'
        }
      ]
    },
    {
      name: 'EdTech',
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-500',
      glowColor: 'rgba(99, 102, 241, 0.4)',
      problems: [
        {
          id: 1,
          title: 'Subconscious Learning AI',
          description: 'Current educational platforms fail to adapt to subconscious learning behavior. Your task is to build an AI-powered system that silently observes micro-reactions (scrolling hesitation, rereads, blink rate via webcam, etc.) to detect confusion in real time and restructures the lesson dynamically for each learner.'
        },
        {
          id: 2,
          title: 'AI Virtual Teacher Platform',
          description: 'Students often learn through static platforms that neither adapt to their pace nor verify real engagement. Your task is to build an AI-powered virtual teacher that explains topics, answers doubts in real time, and tests understanding through interactive quizzes. Track all meaningful learning activity and reward users with on-chain credentials based on verified progress.'
        },
        {
          id: 3,
          title: 'True Understanding Detection',
          description: 'Human learning is shaped by emotion, memory, and multisensory context, none of which current EdTech platforms capture. Your task is to build a system that detects when a student is truly understanding a concept instead of memorizing it. The system must also identify copied or AI-generated content and track how learning evolves across sessions.'
        }
      ]
    }
  ];