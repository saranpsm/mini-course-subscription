# mini-course-subscription
Mini Course Subscription Platform

A full-stack MERN application that allows users to browse courses, subscribe using promo codes, and manage their enrolled courses.
The platform includes authentication, protected routes, responsive UI, and cloud deployment.

🚀 Live Demo

👉 Frontend + Backend (All-in-One Hosted)
🔗 https://mini-course-subscription-1.onrender.com

🛠 Tech Stack
Frontend

⚛️ React (Create React App)

🎨 Tailwind CSS

🔁 React Router DOM

🌐 Axios

Backend

🟢 Node.js

🚀 Express.js

🍃 MongoDB Atlas

🔐 JWT Authentication

🔑 bcrypt.js

Hosting

☁️ Render (Free Tier)

🗂 GitHub (Version Control)


📂 Project Structure
mini-course-subscription/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── .env
│
└── README.md

🔑 Environment Variables
Backend (backend/.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Frontend (frontend/.env)
REACT_APP_API_URL=https://mini-course-subscription-1.onrender.com


⚠️ After changing .env, rebuild the frontend before deploying

▶️ Run Locally
1️⃣ Clone the repository
git clone https://github.com/saranpsm/mini-course-subscription.git
cd mini-course-subscription

2️⃣ Backend Setup
cd backend
npm install
npm start


Backend runs at:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm start


Frontend runs at:

http://localhost:3000

☁️ Deployment (Render – Free)

Single Web Service

Frontend built using npm run build

Backend serves frontend build

MongoDB hosted on MongoDB Atlas

Environment variables set in Render Dashboard

🔐 Authentication Flow

User signs up

JWT token generated

Token stored in localStorage

Protected routes verified using middleware

Secure API communication

🎟 Promo Code
Code	Discount
BFSALE25	50% OFF

some of to improve in this website like the store the token in the session storage




📸 Screenshots
