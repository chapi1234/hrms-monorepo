<h1 align="center">
  🏢 HRMS Monorepo
</h1>

<p align="center">
  <strong>Human Resource Management System — Full-Stack Monorepo</strong><br/>
  A modern, modular, production-ready HRMS built with Next.js, Expo, Express, and MongoDB, orchestrated by Turborepo.
</p>

<p align="center">
  <img alt="Node" src="https://img.shields.io/badge/Node-%3E%3D18-brightgreen?logo=node.js&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript&logoColor=white" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" />
  <img alt="Expo" src="https://img.shields.io/badge/Expo-SDK-000020?logo=expo&logoColor=white" />
  <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" />
  <img alt="Turborepo" src="https://img.shields.io/badge/Turborepo-2.x-EF4444?logo=turborepo&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
</p>

---

## 📖 Table of Contents

- [✨ Overview](#-overview)
- [🏗️ Architecture](#-architecture)
- [📦 Apps & Packages](#-apps--packages)
- [🔌 API Modules](#-api-modules)
- [🛠️ Tech Stack](#-tech-stack)
- [⚡ Getting Started](#-getting-started)
- [🌍 Environment Variables](#-environment-variables)
- [🚀 Running the Project](#-running-the-project)
- [📋 Available Scripts](#-available-scripts)
- [🗄️ Database & Seeding](#-database--seeding)
- [🔐 Authentication](#-authentication)
- [📡 API Reference](#-api-reference)
- [📁 Project Structure](#-project-structure)
- [🔄 Remote Caching](#-remote-caching)
- [🤝 Contributing](#-contributing)

---

## ✨ Overview

**HRMS Monorepo** is a comprehensive, enterprise-grade Human Resource Management System designed to streamline every aspect of workforce management. From employee onboarding to payroll, attendance tracking, performance reviews, and recruitment pipelines — this system covers it all under one unified, monorepo architecture.

### 🎯 Key Highlights

| Feature | Description |
|---|---|
| 🌐 **Web Dashboard** | Rich Next.js admin panel for HR managers |
| 📱 **Mobile App** | Cross-platform Expo (React Native) app for employees |
| ⚙️ **REST API** | Robust Express.js backend with MongoDB |
| 🔄 **Real-time** | Socket.io integration for live notifications |
| 🔐 **Secure Auth** | JWT access + refresh token strategy |
| 📦 **Modular Packages** | Shared logic across web and mobile |
| ⚡ **Turborepo** | Blazing-fast, cached monorepo builds |

---

## 🏗️ Architecture

```
hrms-monorepo/
├── apps/
│   ├── api/          🔵  Express + MongoDB REST API (port 5000)
│   ├── web/          🟢  Next.js Admin Dashboard (port 3000)
│   ├── mobile/       🟠  Expo React Native Employee App
│   └── docs/         📄  Documentation site
│
├── packages/
│   ├── @hrms/ui              🎨  Shared React component library
│   ├── @hrms/auth            🔐  Auth logic & hooks
│   ├── @hrms/employees       👤  Employee data layer
│   ├── @hrms/departments     🏬  Department logic
│   ├── @hrms/attendance      🕐  Attendance tracking
│   ├── @hrms/leave           🌴  Leave management
│   ├── @hrms/payroll         💰  Payroll calculations
│   ├── @hrms/profile         🪪  Profile management
│   ├── @hrms/recruitment     📋  Recruitment pipeline
│   ├── @hrms/performance     📈  Performance reviews
│   ├── @hrms/api-client      🔗  Typed API client (shared)
│   ├── @hrms/types           📝  Shared TypeScript types
│   ├── @repo/ui              🧱  Base UI primitives
│   ├── @repo/eslint-config   📏  ESLint configuration
│   └── @repo/typescript-config  ⚙️  Shared tsconfig
```

---

## 📦 Apps & Packages

### 🔵 `apps/api` — Backend REST API
The heart of the system. An **Express.js** server powered by **MongoDB (Mongoose)** providing a secure, scalable REST API for all HR operations.

- 🔒 Helmet + CORS security headers
- 📋 Request logging with Morgan
- 🔌 Real-time events via **Socket.io**
- ✅ Input validation with `express-validator`
- 📁 File uploads with Multer
- 🧾 Structured logging via Winston
- 💉 Graceful shutdown handling

### 🟢 `apps/web` — Next.js Admin Dashboard
A feature-rich **Next.js 16** dashboard built for HR administrators with TypeScript, Tailwind CSS, and Lucide icons. Consumes all shared `@hrms/*` packages.

### 🟠 `apps/mobile` — Expo React Native App
A mobile-first experience for employees, built with **Expo Router**, supporting both iOS and Android. Uses typed routes, React Compiler, and automatic dark/light mode.

### 📄 `apps/docs` — Documentation Site
Internal developer documentation powered by Next.js.

---

## 🔌 API Modules

The API exposes **15 feature modules** under the `/api` base path:

| Module | Endpoint | Description |
|---|---|---|
| 🔐 Auth | `/api/auth` | Login, register, refresh tokens, password reset |
| 👤 Employees | `/api/employees` | CRUD, search, filter, export employees |
| 🏬 Departments | `/api/departments` | Department structure & hierarchy |
| 🕐 Attendance | `/api/attendance` | Clock-in/out, daily records, reports |
| 🌴 Leave | `/api/leave` | Leave requests, approvals, balances |
| 💰 Payroll | `/api/payroll` | Pay slips, salary computation, history |
| 🪪 Profile | `/api/profile` | Employee self-service profile updates |
| 📋 Recruitment | `/api/recruitment` | Job postings, candidates, interviews |
| 📈 Performance | `/api/performance` | Reviews, goals, ratings |
| ✅ Tasks | `/api/tasks` | Task assignment & tracking |
| 📄 Documents | `/api/documents` | Document upload & management |
| 📊 Reports | `/api/reports` | HR analytics & report generation |
| 🕓 Shifts | `/api/shifts` | Shift scheduling & assignment |
| ⚙️ Settings | `/api/settings` | System-wide configuration |
| 🔔 Notifications | `/api/notifications` | Real-time notification delivery |

### 💚 Health Check
```
GET /api/health
→ { "status": "ok", "timestamp": "...", "version": "1.0.0" }
```

---

## 🛠️ Tech Stack

### Backend (`apps/api`)
| Technology | Purpose |
|---|---|
| **Node.js ≥ 18** | Runtime |
| **Express.js 4** | Web framework |
| **MongoDB + Mongoose 8** | Database & ODM |
| **JSON Web Tokens (JWT)** | Authentication |
| **bcryptjs** | Password hashing |
| **Socket.io 4** | Real-time communication |
| **Multer** | File uploads |
| **Helmet** | HTTP security headers |
| **Morgan** | HTTP request logging |
| **Winston** | Application logging |
| **express-validator** | Input validation |
| **dotenv** | Environment management |
| **nodemon** | Dev auto-reload |

### Frontend (`apps/web`)
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework |
| **React 19** | UI library |
| **TypeScript 5.9** | Type safety |
| **Tailwind CSS 3** | Utility-first styling |
| **Lucide React** | Icon library |
| **clsx + tailwind-merge** | Conditional classnames |

### Mobile (`apps/mobile`)
| Technology | Purpose |
|---|---|
| **Expo SDK** | React Native platform |
| **Expo Router** | File-based navigation |
| **TypeScript** | Type safety |
| **React Compiler** | Auto-optimization |

### Monorepo Tooling
| Tool | Purpose |
|---|---|
| **Turborepo 2.x** | Build orchestration & caching |
| **npm Workspaces** | Package management |
| **ESLint** | Code linting |
| **Prettier** | Code formatting |
| **TypeScript** | Static type checking |

---

## ⚡ Getting Started

### Prerequisites

Make sure you have the following installed:

- ✅ **Node.js** `>= 18.x` — [Download](https://nodejs.org/)
- ✅ **npm** `>= 11.x` (comes with Node)
- ✅ **MongoDB** — [Local install](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)
- ✅ **Turbo CLI** (optional but recommended) — `npm install -g turbo`

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-org/hrms-monorepo.git
cd hrms-monorepo
```

### 2️⃣ Install Dependencies

```sh
npm install
```

> This installs dependencies for **all apps and packages** in the workspace simultaneously.

### 3️⃣ Configure Environment Variables

```sh
# Copy the example env file for the API
cp apps/api/.env.example apps/api/.env
```

Then edit `apps/api/.env` with your actual values (see [Environment Variables](#-environment-variables) below).

### 4️⃣ Seed the Database (Optional)

```sh
node apps/api/seed.js
```

This populates your MongoDB with demo data for testing.

---

## 🌍 Environment Variables

Create `apps/api/.env` based on the example below:

```env
# ── Server ────────────────────────────────────────────────────────────────────
NODE_ENV=development
PORT=5000

# ── Database ──────────────────────────────────────────────────────────────────
MONGODB_URI=mongodb://localhost:27017/component-hrms

# ── JWT ───────────────────────────────────────────────────────────────────────
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_REFRESH_EXPIRES_IN=30d

# ── CORS ──────────────────────────────────────────────────────────────────────
# Comma-separated list of allowed origins
CORS_ORIGINS=http://localhost:3000,http://localhost:8081

# ── File Upload ───────────────────────────────────────────────────────────────
UPLOAD_DIR=uploads
MAX_FILE_SIZE=10485760        # 10 MB

# ── Frontend URL (for password reset emails) ──────────────────────────────────
FRONTEND_URL=http://localhost:3000

# ── Email (Optional — stub used in development) ───────────────────────────────
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=your@email.com
# SMTP_PASS=yourpassword
# EMAIL_FROM=noreply@hrms.com
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 🚀 Running the Project

### Run Everything (Recommended)

Start all apps in parallel with a single command:

```sh
turbo dev
# or without global turbo:
npx turbo dev
```

| App | URL |
|---|---|
| 🟢 Web Dashboard | http://localhost:3000 |
| 🔵 API Server | http://localhost:5000 |
| 🟠 Mobile App | Expo DevTools (see terminal) |

---

### Run a Specific App

```sh
# Run only the API
turbo dev --filter=api

# Run only the web dashboard
turbo dev --filter=web

# Run only the mobile app
turbo dev --filter=mobile
```

---

## 📋 Available Scripts

Run these from the **monorepo root**:

| Command | Description |
|---|---|
| `npm run dev` | Start all apps in development mode |
| `npm run build` | Build all apps and packages |
| `npm run lint` | Lint all packages |
| `npm run format` | Format all `.ts`, `.tsx`, `.md` files with Prettier |
| `npm run check-types` | Run TypeScript type checking across all packages |

---

## 🗄️ Database & Seeding

The API uses **MongoDB** with **Mongoose 8**. The following models are defined:

| Model | Description |
|---|---|
| 👤 `User` | Authentication & role-based access |
| 🪪 `Profile` | Extended employee profile data |
| 👥 `Employee` | Core employee records |
| 🏬 `Department` | Organizational departments |
| 🕐 `Attendance` | Daily attendance logs |
| 🌴 `Leave` / `LeaveType` | Leave requests & types |
| 💰 `Payroll` | Salary and pay slip records |
| 📋 `Job` / `Candidate` / `Interview` | Recruitment pipeline |
| 📈 `PerformanceReview` / `Goal` | Performance tracking |
| ✅ `Task` | Task management |
| 📄 `Document` | Document storage metadata |
| 🕓 `Shift` | Work shift definitions |
| 🔔 `Notification` | In-app notifications |
| 🏢 `Company` | Company/tenant settings |
| 📢 `Announcement` | Company-wide announcements |
| 🔑 `Role` | Role definitions for RBAC |
| 📊 `Report` | Generated report metadata |
| 🧾 `AuditLog` | System audit trail |

### Seeding

```sh
node apps/api/seed.js
```

---

## 🔐 Authentication

The API uses a **dual-token JWT strategy**:

- 🔑 **Access Token** — short-lived (`7d` by default), sent with every request
- 🔄 **Refresh Token** — long-lived (`30d`), used to silently renew access tokens

### Auth Endpoints

```
POST /api/auth/register      — Register new user
POST /api/auth/login         — Login & receive tokens
POST /api/auth/refresh       — Refresh access token
POST /api/auth/logout        — Invalidate refresh token
POST /api/auth/forgot-password   — Send password reset email
POST /api/auth/reset-password    — Set new password
```

All protected routes require the `Authorization: Bearer <token>` header.

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

> 💡 Use the health check endpoint to verify connectivity:
> ```
> GET /api/health
> ```

All API responses follow a consistent structure:

```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [ ... ]
}
```

---

## 📁 Project Structure

```
hrms-monorepo/
│
├── 📁 apps/
│   ├── 📁 api/                    # Express.js backend
│   │   ├── src/
│   │   │   ├── app.js             # Express app setup
│   │   │   ├── server.js          # HTTP server entry point
│   │   │   ├── routes.js          # Root router (all modules)
│   │   │   ├── config/            # DB connection, env validation
│   │   │   ├── middleware/        # Auth, error handler, etc.
│   │   │   ├── models/            # Mongoose schemas (22 models)
│   │   │   ├── modules/           # Feature modules (15 modules)
│   │   │   │   ├── auth/
│   │   │   │   ├── employees/
│   │   │   │   ├── attendance/
│   │   │   │   ├── leave/
│   │   │   │   ├── payroll/
│   │   │   │   ├── recruitment/
│   │   │   │   ├── performance/
│   │   │   │   ├── tasks/
│   │   │   │   ├── documents/
│   │   │   │   ├── reports/
│   │   │   │   ├── shifts/
│   │   │   │   ├── notifications/
│   │   │   │   ├── departments/
│   │   │   │   ├── profile/
│   │   │   │   └── settings/
│   │   │   ├── socket/            # Socket.io real-time layer
│   │   │   └── utils/             # Shared utilities & helpers
│   │   ├── uploads/               # Uploaded files (gitignored)
│   │   ├── seed.js                # Database seeder
│   │   └── .env.example           # Environment variable template
│   │
│   ├── 📁 web/                    # Next.js admin dashboard
│   │   ├── app/                   # App Router pages & layouts
│   │   └── public/                # Static assets
│   │
│   ├── 📁 mobile/                 # Expo React Native app
│   │   ├── app/                   # Expo Router screens
│   │   ├── components/            # Reusable mobile components
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── constants/             # App constants
│   │   └── assets/                # Images, icons, fonts
│   │
│   └── 📁 docs/                   # Documentation site
│
└── 📁 packages/                   # Shared workspace packages
    ├── @hrms/ui                   # Component library
    ├── @hrms/auth                 # Auth hooks & utilities
    ├── @hrms/employees            # Employee data layer
    ├── @hrms/departments          # Department data layer
    ├── @hrms/attendance           # Attendance utilities
    ├── @hrms/leave                # Leave management logic
    ├── @hrms/payroll              # Payroll calculations
    ├── @hrms/profile              # Profile management
    ├── @hrms/recruitment          # Recruitment helpers
    ├── @hrms/performance          # Performance logic
    ├── @hrms/api-client           # Typed HTTP client
    ├── @hrms/types                # Shared TypeScript types
    ├── @repo/eslint-config        # ESLint configuration
    └── @repo/typescript-config   # TypeScript config
```

---

## 🔄 Remote Caching

Turborepo supports **Remote Caching** to share build artifacts across machines and CI/CD pipelines — dramatically speeding up builds in team environments.

> [!TIP]
> Vercel Remote Cache is **free for all plans**. [Sign up at vercel.com](https://vercel.com/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache)

### Enable Remote Caching

```sh
# 1. Authenticate with Vercel
turbo login

# 2. Link your repo to the remote cache
turbo link
```

After linking, all cached task outputs (builds, linting, type-checking) are shared across your team and CI runners automatically.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch: `git checkout -b feature/your-feature`
3. 💾 Commit your changes: `git commit -m "feat: add your feature"`
4. 📤 Push to your branch: `git push origin feature/your-feature`
5. 🔁 Open a Pull Request

Please ensure your code:
- ✅ Passes linting: `npm run lint`
- ✅ Passes type checking: `npm run check-types`
- ✅ Is formatted: `npm run format`

---

## 📚 Useful Links

| Resource | Link |
|---|---|
| 📘 Turborepo Docs | https://turborepo.dev/docs |
| 📗 Next.js Docs | https://nextjs.org/docs |
| 📙 Expo Docs | https://docs.expo.dev |
| 📕 Mongoose Docs | https://mongoosejs.com/docs |
| 📓 Express Docs | https://expressjs.com |
| 📔 Socket.io Docs | https://socket.io/docs |

---

<p align="center">
  Built with ❤️ using <strong>Turborepo</strong> · <strong>Next.js</strong> · <strong>Expo</strong> · <strong>Express</strong> · <strong>MongoDB</strong>
</p>
