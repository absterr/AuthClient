# AuthClient

<p align="center">
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" alt="Vite Badge"/>
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" alt="React Badge"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS Badge"/>
  <img src="https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=white" alt="React Query Badge"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white" alt="Axios Badge"/>
  <img src="https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=white" alt="React Router Badge"/>
  <img src="https://img.shields.io/badge/Bun-000000?logo=bun&logoColor=white" alt="Bun Badge"/>
  <img src="https://img.shields.io/badge/Zod-3066BE?logo=zod&logoColor=white" alt="Zod Badge"/>
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License"/>
</p>

**AuthClient** is a React frontend application built to demonstrate how to connect to **NodeAuth**.  
It is built with **Vite**, **React**, **Tailwind**, **React Query**, **axios**, **react-router-dom**, and **Bun**.

The app handles:

- User login and signup
- Email verification
- Password reset
- Session management

It uses a custom Axios instance (`api`) with credentials and interceptors to interact with the backend’s auth endpoints.  
**React Query** is used for data fetching and mutations, while **React Hook Form** with **Zod** handles form validation.

---

## ⚙️ Setup & Installation

### Prerequisites

Ensure **Bun** (or **Node.js** and **npm**) is installed.

#### Clone and Install

```bash
git clone <repo-url>
cd AuthClient
bun install     # or `npm install` if using npm
bun run dev     # or `npm run dev`
```

#### Configuration

Create a .env file in the project root with

```bash
VITE_API_URL=https://your-auth-backend.example.com
```

---

## File structure

```
AuthClient/
├── src/
│ ├── lib/
│ │ ├── api.ts
│ │ ├── auth-schema.ts
│ │ └── auth-api.ts
│ ├── pages/
│ │ ├── Login.tsx
│ │ ├── Signup.tsx
│ │ ├── Home.tsx
│ │ ├── ForgotPassword.tsx
│ │ ├── ResetPassword.tsx
│ │ └── VerifyEmail.tsx
│ ├── App.tsx
│ └── main.tsx
├── .env
├── vite.config.ts
├── package.json
└── README.md
```

---

### Future work

---
