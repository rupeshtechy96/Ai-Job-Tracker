# 🚀 AI Job Tracker

An **AI-assisted job application tracker** that helps users organize and manage their job applications efficiently.

This project allows users to track applications across different stages like **Applied, Phone Screen, Interview, Offer, and Rejected** while also providing **AI-based job description parsing and resume suggestions**.

--------------------------------------

## ✨ Features

- 📋 Track job applications in a **Kanban-style dashboard**
- 🤖 **AI-powered job description parser**
- 🧠 Resume bullet **suggestions for each job**
- 🔐 **Secure authentication** using JWT
- 📊 Dashboard with **application statistics**
- 🧩 Fully responsive and modern UI
- ☁️ Cloud database with **MongoDB Atlas**
- ⚡ Fast frontend using **Vite + React**

-------------------------------

## 🖥️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Zustand

### Backend
- Node.js
- Express
- TypeScript
- JWT Authentication

### Database
- MongoDB Atlas
- Mongoose

### Deployment
- Vercel (Frontend)
- Render (Backend)

------------------------------

## 📂 Project Structure

AI-Job-Tracker
│
├── client                         # React Frontend (Vite + TypeScript)
│
│   ├── public
│   │
│   ├── src
│   │   ├── components
│   │   │
│   │   │   ├── common
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Loader.tsx
│   │   │   │   ├── Modal.tsx
│   │   │   │   ├── ProtectedRoute.tsx
│   │   │   │   └── Textarea.tsx
│   │   │
│   │   │   ├── dashboard
│   │   │   │   ├── AddApplicationModal.tsx
│   │   │   │   ├── ApplicationDetailModal.tsx
│   │   │   │   ├── JobCard.tsx
│   │   │   │   ├── KanbanBoard.tsx
│   │   │   │   ├── ResumeSuggestions.tsx
│   │   │   │   └── StatsCards.tsx
│   │   │
│   │   │   └── layout
│   │   │       ├── AppShell.tsx
│   │   │       └── Navbar.tsx
│   │
│   │   ├── hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useJobs.ts
│   │
│   │   ├── lib
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │
│   │   ├── pages
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │
│   │   ├── store
│   │   │   └── authStore.ts
│   │
│   │   ├── types
│   │   │   └── index.ts
│   │
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── index.css
│   │   └── vite-env.d.ts
│
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
│
├── server                         # Express Backend (TypeScript)
│
│   ├── src
│   │
│   │   ├── config
│   │   │   ├── db.ts
│   │   │   └── env.ts
│   │
│   │   ├── controllers
│   │   │   ├── authController.ts
│   │   │   └── jobController.ts
│   │
│   │   ├── middleware
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorMiddleware.ts
│   │
│   │   ├── models
│   │   │   ├── User.ts
│   │   │   └── Job.ts
│   │
│   │   ├── routes
│   │   │   ├── authRoutes.ts
│   │   │   └── jobRoutes.ts
│   │
│   │   ├── services
│   │   │   └── aiService.ts
│   │
│   │   ├── types
│   │   │   └── index.ts
│   │
│   │   ├── utils
│   │   │   ├── helpers.ts
│   │   │   └── jwt.ts
│   │
│   │   ├── validators
│   │   │   ├── authValidators.ts
│   │   │   └── jobValidators.ts
│   │
│   │   ├── app.ts
│   │   └── index.ts
│
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
│
├── screenshots                    # Optional (for README)
│   ├── dashboard.png
│   └── login.png
│
├── .gitignore
├── README.md
└── package.json (optional root)


-----------------------------------

## ⚙️ Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/AI-Job-Tracker.git
cd AI-Job-Tracker

2️⃣ Install dependencies
Client
cd client
npm install

Server
cd ../server
npm install

3️⃣ Environment variables
Create a .env file inside the server folder:
PORT=5000
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string

4️⃣ Run backend
cd server
npm run dev

5️⃣ Run frontend
cd client
npm run dev

🌐 Deployment
Frontend

Deployed on Vercel

Backend

Deployed on Render

Database

Hosted on MongoDB Atlas


📸 Screenshots
Dashboard

Login Page

ScreenShots


🎯 Future Improvements
AI resume optimization suggestions
Email reminders for interview schedules
Company-wise analytics
Chrome extension for auto job saving
Dark/Light theme toggle


👨‍💻 Author

Rupesh Patel

GitHub: https://github.com/rupeshtechy96
LinkedIn: https://www.linkedin.com/in/rupeshtechy/


⭐ Support
If you like this project, consider giving it a ⭐ on GitHub!