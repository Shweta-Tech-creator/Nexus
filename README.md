# Nexus

A modern, full-stack SaaS dashboard featuring a secure Node.js backend and a dynamic React frontend with tactical UI design.,

## 🚀 Features

- **Full Stack Architecture**: React (Vite) frontend + Node.js/Express backend + MongoDB.
- **Authentication**: Secure JWT-based auth with `x-auth-token`.
- **Tactical UI**: Custom "Cyberpunk/Industrial" design system with glassmorphism and animations.
- **API Documentation**: Integrated Swagger UI for interactive API testing.
- **Containerized**: Fully Dockerized for easy deployment.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion.
- **Backend**: Node.js, Express, Mongoose.
- **Database**: MongoDB.
- **DevOps**: Docker, Docker Compose.

## 🏁 Quick Start

### Option 1: Docker (Recommended)

Run the entire stack with a single command:

\`\`\`bash
docker-compose up --build
\`\`\`

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:5001](http://localhost:5001)
- **API Docs**: [http://localhost:5001/api-docs](http://localhost:5001/api-docs)

### Option 2: Local Development

**1. Backend Setup**
\`\`\`bash
cd backend
npm install
# Create .env file (see .env.example)
npm start
\`\`\`

**2. Frontend Setup**
\`\`\`bash
# In root directory
npm install
npm run dev
\`\`\`

## 📚 Documentation

- [Deployment Guide](./docs/DEPLOYMENT.md) - How to deploy to Render or use Docker.
- [API Reference](./docs/API_REFERENCE.md) - Endpoints and Swagger usage.
- [Development](./docs/DEVELOPMENT.md) - Local setup details.

## 📝 License

This project is licensed under the MIT License.
