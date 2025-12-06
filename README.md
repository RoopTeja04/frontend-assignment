
# MERN Scalable Web App 
.  
It demonstrates **Authentication, Dashboard with CRUD, Protected Routes, and Backend Integration** using the **MERN stack**.

---

## 🚀 Tech Stack
- **Frontend:** React.js, TailwindCSS, Axios, React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Auth:** JWT-based Authentication, bcrypt password hashing
- **Other:** CORS, dotenv

---

## ⚡ Features
- User Registration & Login (JWT)
- Protected Dashboard Route
- Profile Fetch & Update
- CRUD operations on Tasks (create, read, update, delete)
- Search & Filter Tasks
- Logout Flow
- Responsive UI with TailwindCSS

---

## 🚀 Live Demo

- Frontend: [![Frontend](https://img.shields.io/badge/Frontend-Live-blue?style=for-the-badge&logo=react)](https://frontend-assignment-sand-kappa.vercel.app/)
- Backend: [![Backend](https://img.shields.io/badge/Backend-Live-green?style=for-the-badge&logo=node.js)](https://frontend-assignment-sa3w.onrender.com)

## 📌 API Documentation

### Auth Routes
- **POST** `/api/auth/register` → Register new user  
  **Body:** `{ name, email, password }`  

- **POST** `/api/auth/login` → Login user and return JWT  
  **Body:** `{ email, password }`  

### Profile Routes
- **GET** `/api/profile` → Fetch logged-in user profile (JWT required)  
- **PUT** `/api/profile` → Update user profile (JWT required)  

### Task Routes
- **GET** `/api/tasks` → Get all tasks (JWT required)  
- **POST** `/api/tasks` → Create a new task (JWT required)  
  **Body:** `{ title, description }`  

- **PUT** `/api/tasks/:id` → Update task (JWT required)  
  **Body:** `{ title, description }`  

- **DELETE** `/api/tasks/:id` → Delete task (JWT required)  

---

## 📂 Project Structure

```
frontend-assignment/
│
├── server/               # Express + MongoDB API
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes (auth, profile, tasks)
│   ├── middleware/        # JWT auth middleware
│   └── server.js          # Entry point
│
├── client/              # React app
│   ├── src/
│   │   ├── pages/         # Login, Register, Dashboard, Profile
│   │   ├── components/    # Navbar, Forms, etc.
│   │   ├── services/      # Axios API calls
│   │   └── App.js
│
└── README.md
```

---

## 📈 Scaling Strategy (Production)

To make this app production-ready and scalable:

### Frontend
- Build React app (`npm run build`) and host on **Vercel / Netlify / AWS S3 + CloudFront CDN**.
- Use environment variables for API base URLs.

### Backend
- Deploy backend to **Render, Railway, AWS, or Heroku**.
- Use **Docker** for containerization.
- Add **NGINX / Load Balancer** for handling multiple server instances.

### Database
- Use **MongoDB Atlas (Cloud DB)** with replication & automatic scaling.
- Enable indexing for queries (search/filter tasks).

### Security
- Use HTTPS in production.
- Store JWT tokens securely (HttpOnly cookies or secure storage).
- Rate limiting & input validation.

### Scalability
- CI/CD pipeline (GitHub Actions).
- Horizontal scaling with **Kubernetes / Docker Swarm**.
- Add caching (Redis) for frequently accessed data.

---

## 🧪 API Testing
You can test the APIs using **Postman**.  
A ready-made collection can be imported from `postman_collection.json` (if exported).

---

## 📝 How to Run Locally

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

---
