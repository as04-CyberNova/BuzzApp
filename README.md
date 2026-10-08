<div align="center">
  <img src="./frontend/src/assets/hero.png" alt="BuzzApp Logo" width="120" style="border-radius: 20px; box-shadow: 0 4px 14px rgba(236, 72, 153, 0.39);" />
  
  # 🐝 BuzzApp
  
  **Next-Generation Secure Messaging with Intelligent Spam Protection**
  
  [![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
  [![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)](https://socket.io/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
</div>

<br />

## ✨ Features

- 🔒 **End-to-End Security** - Your messages stay private with robust JWT authentication and secure bcrypt password hashing.
- ⚡ **Real-Time Communication** - Instant message delivery powered by WebSockets (`Socket.io`).
- 🛡️ **Intelligent Spam Protection** - Built-in smart filters to keep your inbox clean and relevant.
- 🎨 **Premium UI/UX** - A gorgeous, responsive glassmorphism interface built with Tailwind CSS v4, featuring fluid micro-animations and a sleek Dark Mode.

## 🛠️ Technology Stack

### Frontend (Client)
- **Framework**: React 19 + Vite for lightning-fast builds
- **Styling**: Tailwind CSS v4 (with custom `@theme` variables and utility classes)
- **Linting**: Oxlint for blazingly fast code analysis

### Backend (Server)
- **Environment**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Real-Time Engine**: Socket.io

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/as04-CyberNova/BuzzApp.git
cd BuzzApp
```

### 2. Set up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with your environment variables:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server in development mode:
```bash
npm run dev
```

### 3. Set up the Frontend

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
```

## 📂 Project Structure

```text
BuzzApp/
├── backend/               # Express.js REST API & Socket.io server
│   ├── package.json
│   └── ...                # Models, Routes, Controllers
└── frontend/              # React + Vite application
    ├── src/
    │   ├── index.css      # Global styles & Tailwind config
    │   ├── App.jsx        # Main application component
    │   └── ...            # React Components, Hooks, Assets
    ├── vite.config.js
    └── package.json
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the [issues page](https://github.com/as04-CyberNova/BuzzApp/issues) if you want to contribute.

---

<div align="center">
  Built with ❤️ for a better, safer messaging experience.
</div>
