# 🚀 JobMatch AI - Premium AI Job Matching Ecosystem

<p align="center">
  <img src="./screenshot.png" alt="JobMatch AI Banner" width="100%" style="border-radius: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Outfit&size=24&pause=1000&color=00FFDD&center=true&vCenter=true&width=500&lines=Intelligent+Resume+Matching;Real-time+Employer+Alerts;Scalable+Micro-Architecture;Next-Gen+Glassmorphism+UI" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/ayushtripathi-45/job-matching-platform/stargazers"><img src="https://img.shields.io/github/stars/ayushtripathi-45/job-matching-platform?color=ffdd00&labelColor=000000&style=for-the-badge" alt="Stars"></a>
  <a href="https://github.com/ayushtripathi-45/job-matching-platform/network/members"><img src="https://img.shields.io/github/forks/ayushtripathi-45/job-matching-platform?color=00ffdd&labelColor=000000&style=for-the-badge" alt="Forks"></a>
  <a href="https://job-matching-platform-lemon.vercel.app/"><img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo"></a>
</p>

---

## 💎 The Vision
**JobMatch AI** isn't just a job board; it's a high-performance ecosystem designed to bridge the gap between talent and opportunity using cutting-edge AI. Experience a seamless, real-time interface that handles everything from resume parsing to intelligent scoring with millisecond latency.

---

## 🏗️ Project Structure
```bash
job-matching-platform/
├── 📂 backend/           # Node.js + Express + Prisma (The Engine)
│   ├── 📂 prisma/        # Database Schema & Migrations (SQLite)
│   ├── 📂 src/
│   │   ├── 📂 routes/    # Auth, Jobs, Applications APIs
│   │   ├── 📂 services/  # AI (OpenAI), Storage (S3), Cache (Redis)
│   │   └── 📂 middleware/# Auth & Security Layers
│   └── 📄 Dockerfile     # Backend Containerization
├── 📂 frontend/          # Next.js + Tailwind (The Interface)
│   ├── 📂 src/app/       # App Router (Pages & Layouts)
│   ├── 📂 context/       # Socket.io Real-time State
│   └── 📄 vercel.json    # Vercel Deployment Config
├── 📄 docker-compose.yml # Full Stack Orchestration
└── 📄 render.yaml        # Infrastructure-as-Code for Render
```

---

## ⚡ Core Functionalities

### 🧠 1. AI Resume Scoring (Azure OpenAI)
Our proprietary matching algorithm sends resume data and job requirements to **Azure OpenAI**. It returns a calculated match score based on skills, experience, and context.
- **Service:** `backend/src/services/openai.ts`

### 📢 2. Real-time Notifications (WebSockets)
Employers receive **instant desktop notifications** the second a candidate applies. No refreshing required.
- **Engine:** `Socket.io`
- **Frontend Link:** `NotificationContext.tsx`

### 🚀 3. Multi-Layer Caching (Redis)
Job searches are lightning-fast. The system caches common search results in **Redis**, reducing database load by up to 80%.
- **Implementation:** `backend/src/routes/jobs.ts`

### 📂 4. Secure Asset Storage (AWS S3)
Resumes are handled securely using **AWS S3** with unique UUIDs, ensuring high availability and permanent storage.
- **Service:** `backend/src/services/s3.ts`

---

## 🛠️ Tech Stack & Tools

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white" />
  <img src="https://img.shields.io/badge/Azure_OpenAI-0078D4?style=for-the-badge&logo=microsoftazure&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

---

## 🔮 Future Enhancements
- [ ] **PDF Data Extraction:** Integrate `pdf-parse` for automated resume text extraction.
- [ ] **AI Interviewer:** Add a chatbot to screen candidates before they apply.
- [ ] **Email Alerts:** Send formatted HTML emails to candidates on status changes.
- [ ] **Dark Mode Toggle:** Smooth transition between dark and light themes.
- [ ] **Mobile App:** React Native companion for instant job alerts on the go.

---

## ⚙️ Installation & Deployment

### 🐳 The "Easy" Way (Docker)
```bash
docker-compose up --build
```

### ⌨️ The "Developer" Way
1. **Setup Env:** Copy `.env.example` to `.env` in both folders.
2. **Install:** `npm install` in both `frontend` and `backend`.
3. **Run:** `npm run dev` in both folders.

---

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%"/>
</p>

<p align="center">
  Developed with Precision by <a href="https://github.com/ayushtripathi-45"><b>Ayush Tripathi</b></a>
</p>
