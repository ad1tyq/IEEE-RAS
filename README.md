# IEEE RAS MUJ - Official Website

The official website of IEEE RAS MUJ 🚀

<details>
<summary>## File Tree</summary>

```bash
src/
├─ app/
│  ├─ cookcrackcapture/
│  │  ├─ gallery/
│  │  │  ├─ gallery.module.css
│  │  │  └─ page.tsx
│  │  ├─ resources/
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ events/
│  │  └─ page.tsx
│  ├─ pixelpalettes/
│  │  ├─ judges/
│  │  │  └─ page.tsx
│  │  ├─ problems/
│  │  │  └─ page.tsx
│  │  ├─ sponsors/
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ technovision3/
│  │  ├─ gallery/
│  │  │  ├─ gallery.module.css
│  │  │  └─ page.tsx
│  │  ├─ resources/
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ unlockd/
│  │  ├─ resources/
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ wingsandwires/
│  │  ├─ gallery/
│  │  │  ├─ gallery.module.css
│  │  │  └─ page.tsx
│  │  ├─ resources/
│  │  │  └─ page.tsx
│  │  └─ page.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ CookCrackCapture/
│  │  ├─ CookCrackCapturePreview.tsx
│  │  ├─ loadingComp.tsx
│  │  ├─ Navbar.tsx
│  │  └─ ToxicBackground.tsx
│  ├─ TechnoVision3/
│  │  ├─ loadingComp.tsx
│  │  ├─ Navbar.tsx
│  │  ├─ TechBackground.tsx
│  │  └─ TechnoVision3Preview.tsx
│  ├─ WingsAndWires/
│  │  ├─ CosmicBackground.tsx
│  │  ├─ loadingComp.tsx
│  │  └─ WingsAndWiresPreview.tsx
│  ├─ Footer.tsx
│  ├─ Navbar.tsx
│  ├─ PixelPalettesPreview.tsx
│  └─ SubmissionForm.tsx
└─ utils/
   └─ animations.ts
```

## Quick Start

### Prerequisites

Node.js: v18.0.0 or higher

npm: Package manager

Git: Version control

### Installation

Clone the repository:

```bash
git clone https://github.com/ad1tyq/IEEE-RAS.git
```

```bash
cd IEEE-RAS
```

Install dependencies:

```bash
npm install
```

Environment Setup:

Create a .env.local file in the root directory and configure:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YOUR_PUBLIC_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```

### Development & Contributions

Create your own separate branch:

```bash
git checkout -b your_branch_name
```

Start the development server:

```bash
npm run dev
```

The application will be accessible at <http://localhost:3000>.

### Technology Stack:

This platform follows a modern, full-stack architecture designed for seamless event management.

Frontend: Next.js 15+ (App Router), TypeScript, Tailwind CSS

<!-- Backend: Java Spring Boot (RESTful API), WebSockets for real-time updates
Database: PostgreSQL
ORM: Prisma
Authentication: JWT-based session management
Code Quality: ESLint, Prettier, Husky (Git hooks)-->

### Deployment & Production

Building

```bash
npm run build
```

```
npm run start
```

### Production Deployment

Frontend: Deployed via Vercel for optimal performance and edge caching.

<!-- Backend: Packaged as a .jar and hosted on Render or Railway to ensure 24/7 availability during event hours.
Database: Hosted on Neon.tech (Serverless PostgreSQL) for low-latency, resilient data storage.
Docker: For containerized local environments:docker build -t event-platform .
docker run -p 3000:3000 event-platform-->

### Contributing

We welcome contributions from club members.
Please create your own branch

```bash
git checkout -b your_branch_name
```

To push code do the following

```bash
git add .
git commit -m "your commit info"
git push origin your_branch_name
```

Please ensure you run

```bash
npm run lint
```

before submitting a Pull Request.

Made by IEEE RAS MUJ 🚀
