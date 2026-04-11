##🚀 AI Job Tracker

Try the Web application here:
https://ai-job-tracker-bay.vercel.app/login

**AI Job Tracker** is a full-stack web application that helps users efficiently track and manage their job applications.  
The platform allows users to organize applications across different stages such as **Applied, Phone Screen, Interview, Offer, and Rejected**.
It also includes an **AI-powered Job Description Parser** that extracts important details like company name, role, skills, location, and salary from job descriptions to help users organize their job search more effectively.

##🌐 Live 


Github Repo --> 

---
##✨ Features
- Track job applications with a **Kanban-style dashboard**
- **AI-powered Job Description Parser**
- Generate **resume suggestions based on job description**
- **Secure authentication** using JWT
- Dashboard with **job application statistics**
- **Responsive and modern UI**
- Cloud database with **MongoDB Atlas**
- Fast frontend powered by **Vite + React**

## ScreenShots

<img width="1101" height="866" alt="image" src="https://github.com/user-attachments/assets/189822dc-35e1-40c1-b5bc-fb559ee32f8e" />

<img width="630" height="745" alt="image" src="https://github.com/user-attachments/assets/aa66a514-ec6d-4171-94ee-7fe0ee77b178" />

---
# 🖥️ Tech Stack
## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Query
- Zustand (State Management)

## Backend
- Node.js
- Express.js
- TypeScript
- JWT Authentication

## Database
- MongoDB Atlas
- Mongoose

## Deployment
Frontend(Vercel) --> https://ai-job-tracker-bay.vercel.app/login 
Backend(Render)  --> https://ai-job-tracker-1-9r35.onrender.com/
Database --> MongoDB Atlas  

-------
# 📂 Project Structure

AI-Job-Tracker
│
├── client # React Frontend (Vite + TypeScript)
│
│ ├── public
│ │
│ ├── src
│ │ ├── components
│ │ │ ├── common
│ │ │ │ ├── Button.tsx
│ │ │ │ ├── Input.tsx
│ │ │ │ ├── Loader.tsx
│ │ │ │ ├── Modal.tsx
│ │ │ │ ├── ProtectedRoute.tsx
│ │ │ │ └── Textarea.tsx
│ │ │
│ │ │ ├── dashboard
│ │ │ │ ├── AddApplicationModal.tsx
│ │ │ │ ├── ApplicationDetailModal.tsx
│ │ │ │ ├── JobCard.tsx
│ │ │ │ ├── KanbanBoard.tsx
│ │ │ │ ├── ResumeSuggestions.tsx
│ │ │ │ └── StatsCards.tsx
│ │ │
│ │ │ └── layout
│ │ │ ├── AppShell.tsx
│ │ │ └── Navbar.tsx
│ │
│ │ ├── hooks
│ │ │ ├── useAuth.ts
│ │ │ └── useJobs.ts
│ │
│ │ ├── lib
│ │ │ ├── api.ts
│ │ │ └── utils.ts
│ │
│ │ ├── pages
│ │ │ ├── DashboardPage.tsx
│ │ │ ├── LoginPage.tsx
│ │ │ └── RegisterPage.tsx
│ │
│ │ ├── store
│ │ │ └── authStore.ts
│ │
│ │ ├── types
│ │ │ └── index.ts
│ │
│ │ ├── App.tsx
│ │ ├── main.tsx
│ │ ├── index.css
│ │ └── vite-env.d.ts
│
│ ├── package.json
│ ├── tsconfig.json
│ ├── vite.config.ts
│
│
├── server # Express Backend (TypeScript)
│
│ ├── src
│ │
│ │ ├── config
│ │ │ ├── db.ts
│ │ │ └── env.ts
│ │
│ │ ├── controllers
│ │ │ ├── authController.ts
│ │ │ └── jobController.ts
│ │
│ │ ├── middleware
│ │ │ ├── authMiddleware.ts
│ │ │ └── errorMiddleware.ts
│ │
│ │ ├── models
│ │ │ ├── User.ts
│ │ │ └── Job.ts
│ │
│ │ ├── routes
│ │ │ ├── authRoutes.ts
│ │ │ └── jobRoutes.ts
│ │
│ │ ├── services
│ │ │ └── aiService.ts
│ │
│ │ ├── utils
│ │ │ ├── helpers.ts
│ │ │ └── jwt.ts
│ │
│ │ ├── validators
│ │ │ ├── authValidators.ts
│ │ │ └── jobValidators.ts
│ │
│ │ ├── app.ts
│ │ └── index.ts
│
│ ├── package.json
│ ├── tsconfig.json
│ └── .env
│
│
├── screenshots # Optional screenshots for README
│ ├── dashboard.png
│ └── login.png
│
├── .gitignore
├── README.md
└── package.json (optional)


2️⃣ Install Dependencies
## Frontend
cd client
npm install

## Backend
cd server
npm install

🎯 Future Improvements
AI-based resume optimization
Interview schedule reminders
Company-wise job analytics
Chrome extension for quick job saving

👨‍💻 Author
Rupesh Patel
GitHub --> https://github.com/rupeshtechy96
LinkedIn --> https://www.linkedin.com/in/rupeshtechy/


