# IEEE RAS MUJ - Event Platform

The official website of IEEE RAS MUJ 🚀

## Quick Start

### Prerequisites:
Node.js: v18.0.0 or higher

npm: Package manager

Git: Version control

### Installation:
Clone the repository:
```
git clone https://github.com/ad1tyq/IEEE-RAS.git
```
```
cd IEEE-RAS
```

Install dependencies:
```
npm install
```

Environment Setup:

Create a .env.local file in the root directory and configure:
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Development:
Start the development server:
```
npm run dev
```

The application will be accessible at http://localhost:3000.

### Technology Stack:
This platform follows a modern, full-stack architecture designed for seamless event management.

Frontend: Next.js 15+ (App Router), TypeScript, Tailwind CSS
<!-- Backend: Java Spring Boot (RESTful API), WebSockets for real-time updates
Database: PostgreSQL
ORM: Prisma
Authentication: JWT-based session management
Code Quality: ESLint, Prettier, Husky (Git hooks)-->

### Deployment & Production:

Building

```
npm run build
```
```
npm run start
```

### Production Deployment:

Frontend: Deployed via Vercel for optimal performance and edge caching.
<!-- Backend: Packaged as a .jar and hosted on Render or Railway to ensure 24/7 availability during event hours.
Database: Hosted on Neon.tech (Serverless PostgreSQL) for low-latency, resilient data storage.
Docker: For containerized local environments:docker build -t event-platform .
docker run -p 3000:3000 event-platform-->

### Contributing:
We welcome contributions from club members.
Please ensure you run 
```
npm run lint
```
before submitting a Pull Request.

Made by IEEE RAS MUJ 🚀
