# Deployment Guide

## 🐳 Docker Deployment (Recommended)

Run the entire application stack (Frontend, Backend, Database) locally using Docker Compose.

### Prerequisites
- Docker Desktop installed and running.

### Steps
1.  **Build and Start**:
    ```bash
    docker-compose up --build
    ```
2.  **Access**:
    - Frontend: `http://localhost:3000`
    - Backend API: `http://localhost:5001`
    - Swagger Docs: `http://localhost:5001/api-docs`

---

## ☁️ Render Deployment

### Backend
1.  Create a **Web Service** on Render connected to your repo.
2.  **Root Directory**: `backend`
3.  **Build Command**: `npm install`
4.  **Start Command**: `node index.js`
5.  **Environment Variables**:
    - `MONGO_URI`: Your MongoDB connection string.
    - `JWT_SECRET`: A secure random string.

### Frontend
1.  Create a **Static Site** on Render.
2.  **Build Command**: `npm run build`
3.  **Publish Directory**: `dist`
4.  **Environment Variables**:
    - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-backend.onrender.com/api`)
