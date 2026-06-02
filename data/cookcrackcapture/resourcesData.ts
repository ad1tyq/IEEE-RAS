import { Terminal, Shield, Globe, Key, Monitor } from 'lucide-react';

export const ctfResources = [
  {
    name: 'Platforms',
    icon: Monitor,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    items: [
      {
        id: 1,
        title: 'picoCTF',
        description: 'A free computer security education program with original content built on a capture-the-flag framework.',
        logo: "/images/logos/logo.png",
        website: "https://cylabacademy.org/",
        linkedinUrl: ""
      },
      {
        id: 2,
        title: 'CTFd',
        description: 'An open-source Capture The Flag framework used by many competitions.',
        logo: "/images/logos/logo.png",
        website: "https://github.com/ctfd",
        linkedinUrl: ""
      }
    ]
  },
  {
    name: 'The Core Arsenal',
    icon: Terminal,
    color: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    items: [
      {
        id: 3,
        title: 'Linux Environment',
        description: 'Kali, Parrot OS, or a standard Ubuntu instance. Attempting these on native Windows will cause endless friction, especially for binary exploitation.',
        logo: "/images/logos/logo.png",
        website: "https://www.kali.org/",
        linkedinUrl: ""
      },
      {
        id: 4,
        title: 'Python 3',
        description: 'The absolute backbone for writing solver scripts.',
        logo: "/images/logos/logo.png",
        website: "https://www.python.org/",
        linkedinUrl: ""
      },
      {
        id: 5,
        title: 'Pwntools (Python Library)',
        description: 'Mandatory for the Binary Exploitation and Web Socket challenges.',
        logo: "/images/logos/logo.png",
        website: "https://docs.pwntools.com/",
        linkedinUrl: ""
      },
      {
        id: 6,
        title: 'Netcat (nc)',
        description: 'For initial manual probing of the TCP ports.',
        logo: "/images/logos/logo.png",
        website: "https://nmap.org/ncat/",
        linkedinUrl: ""
      }
    ]
  },
  {
    name: 'Binary Exploitation & RE',
    icon: Shield,
    color: 'from-red-500 to-orange-500',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    items: [
      {
        id: 7,
        title: 'Ghidra or IDA Free',
        description: 'For static analysis to decompile the C code and find offsets.',
        logo: "/images/logos/logo.png",
        website: "https://ghidra-sre.org/",
        linkedinUrl: ""
      },
      {
        id: 8,
        title: 'GDB (GNU Debugger)',
        description: 'Required for dynamic analysis.',
        logo: "/images/logos/logo.png",
        website: "https://www.sourceware.org/gdb/",
        linkedinUrl: ""
      },
      {
        id: 9,
        title: 'GEF or Pwndbg',
        description: 'Vanilla GDB is practically useless for modern heap exploitation. Plugins visualize heap chunks and track fastbins.',
        logo: "/images/logos/logo.png",
        website: "https://github.com/hugsy/gef",
        linkedinUrl: ""
      },
      {
        id: 10,
        title: 'Java Decompiler',
        description: 'Specifically for reading .class files if compiled (JD-GUI or CFR).',
        logo: "/images/logos/logo.png",
        website: "http://java-decompiler.github.io/",
        linkedinUrl: ""
      }
    ]
  },
  {
    name: 'Web Exploitation',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    items: [
      {
        id: 11,
        title: 'Burp Suite',
        description: 'Essential for intercepting and modifying HTTP requests, manipulating Base64 cookies, and testing payloads iteratively.',
        logo: "/images/logos/logo.png",
        website: "https://portswigger.net/burp",
        linkedinUrl: ""
      },
      {
        id: 12,
        title: 'Browser DevTools',
        description: 'For standard DOM inspection and debugging the client-side JavaScript.',
        logo: "/images/logos/logo.png",
        website: "https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools",
        linkedinUrl: ""
      }
    ]
  },
  {
    name: 'Cryptography',
    icon: Key,
    color: 'from-yellow-400 to-amber-500',
    glowColor: 'rgba(250, 204, 21, 0.4)',
    items: [
      {
        id: 13,
        title: 'CyberChef',
        description: 'The quickest way to strip initial Base64 layers and test custom ciphers visually.',
        logo: "/images/logos/logo.png",
        website: "https://gchq.github.io/CyberChef/",
        linkedinUrl: ""
      },
      {
        id: 14,
        title: 'PyCryptodome',
        description: 'Needed to programmatically handle AEAD structures like ChaCha20-Poly1305.',
        logo: "/images/logos/logo.png",
        website: "https://pycryptodome.readthedocs.io/",
        linkedinUrl: ""
      },
      {
        id: 15,
        title: 'OpenSSL (CLI)',
        description: 'Required to generate self-signed certificates and inject specific trusted organizational strings.',
        logo: "/images/logos/logo.png",
        website: "https://www.openssl.org/",
        linkedinUrl: ""
      }
    ]
  }
];