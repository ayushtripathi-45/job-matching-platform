# 🚀 JobMatch AI - Scalable AI Job Matching Platform

<p align="center">
  <img src="./screenshot.png" alt="JobMatch AI Banner" width="100%" style="border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
</p>

<p align="center">
  <a href="https://github.com/ayushtripathi-45/job-matching-platform/stargazers"><img src="https://img.shields.io/github/stars/ayushtripathi-45/job-matching-platform?color=ffdd00&labelColor=000000&style=for-the-badge" alt="Stars"></a>
  <a href="https://github.com/ayushtripathi-45/job-matching-platform/network/members"><img src="https://img.shields.io/github/forks/ayushtripathi-45/job-matching-platform?color=00ffdd&labelColor=000000&style=for-the-badge" alt="Forks"></a>
  <a href="https://github.com/ayushtripathi-45/job-matching-platform/issues"><img src="https://img.shields.io/github/issues/ayushtripathi-45/job-matching-platform?color=ff00dd&labelColor=000000&style=for-the-badge" alt="Issues"></a>
  <a href="https://github.com/ayushtripathi-45/job-matching-platform/blob/main/LICENSE"><img src="https://img.shields.io/github/license/ayushtripathi-45/job-matching-platform?color=00ff00&labelColor=000000&style=for-the-badge" alt="License"></a>
</p>

---

## ✨ Overview
**JobMatch AI** is a premium, high-performance job platform that leverages **Azure OpenAI** to intelligently match candidates with their dream jobs. Built with a modern **Glassmorphism** design, it features real-time notifications, intelligent resume scoring, and a fully containerized architecture ready for AWS deployment.

### 🌟 Key Features
- **🤖 AI Resume Scoring:** Leverages Azure OpenAI to analyze resumes and provide a match score against job descriptions.
- **⚡ Real-time Notifications:** Instant alerts for employers when new candidates apply, powered by Socket.io.
- **🛡️ Secure Auth:** Robust JWT-based authentication for Candidates and Employers.
- **🚀 Scalable Architecture:** Monorepo structure with Docker containerization.
- **💎 Premium UI:** Stunning dark-themed interface with smooth micro-animations.
- **📂 Cloud Storage:** Seamless resume uploads to AWS S3.

---

## 🛠️ Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" />
  <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
</p>

---

## 🚀 Live Demo
Check out the live deployment here:  
👉 **[JobMatch AI Live Demo](https://job-matching-platform-lemon.vercel.app/)** 🌐

---

## 📦 Getting Started

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/ayushtripathi-45/job-matching-platform.git
cd job-matching-platform
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
# Configure your .env file with DATABASE_URL, AWS, and OpenAI keys
npx prisma db push
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🐳 Docker Deployment
Run the entire stack with a single command:
```bash
docker-compose up --build
```

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/ayushtripathi-45">Ayush Tripathi</a>
</p>
