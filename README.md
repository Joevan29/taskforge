# TaskForge 🚀
**Premium SaaS Project Management Platform**

> Flutter (Mobile) · Next.js 16 (Web) · .NET 8 (Backend)

---

## 📦 Struktur Project

```
TaskForge/
├── backend/          → .NET 8 ASP.NET Core API + SignalR
├── web/              → Next.js 16 Dashboard (App Router)
├── mobile/           → Flutter Mobile App (iOS & Android)
└── database/         → SQL Schema & Seed Data
```

---

## 🚀 Quick Start

### 1. Setup Database (PostgreSQL)

```bash
# Install PostgreSQL dari https://www.postgresql.org/download/windows/
# Buka pgAdmin atau psql, lalu jalankan:
psql -U postgres -c "CREATE DATABASE taskforge;"
psql -U postgres -d taskforge -f database/01_schema.sql
psql -U postgres -d taskforge -f database/02_seed.sql
```

**Demo Accounts (password: `password123`):**
| Email | Role |
|---|---|
| budi@taskforge.com | Admin / PM |
| rina@taskforge.com | Member / Teknisi |
| dino@taskforge.com | Owner |
| ahmad@taskforge.com | Member / Dev |
| siti@taskforge.com | Member / Designer |

---

### 2. Backend (.NET 8)

```bash
# Install .NET 8 SDK dari: https://dotnet.microsoft.com/download/dotnet/8.0

cd backend

# Edit connection string di TaskForge.API/appsettings.json:
# "DefaultConnection": "Host=localhost;Port=5432;Database=taskforge;Username=postgres;Password=YOUR_PASSWORD"

# Build dan run
dotnet run --project TaskForge.API

# API akan berjalan di: http://localhost:5001
# Swagger UI: http://localhost:5001/swagger
```

---

### 3. Web Dashboard (Next.js)

```bash
cd web

# Edit environment variables
# cp .env.local (sudah ada)
# Edit NEXT_PUBLIC_API_URL jika perlu

npm install    # sudah dilakukan saat setup
npm run dev

# Dashboard: http://localhost:3000
```

---

### 4. Mobile (Flutter)

```bash
cd mobile

flutter pub get
flutter run

# Atau untuk emulator spesifik:
flutter run -d android
flutter run -d ios
```

---

## 🛠️ Tech Stack

| Layer | Teknologi | Versi |
|---|---|---|
| Backend | ASP.NET Core | .NET 8 |
| Database | PostgreSQL | 15+ |
| ORM | Entity Framework Core | 8.x |
| Real-time | SignalR | built-in |
| Auth | JWT + BCrypt | — |
| Web | Next.js | 16 (App Router) |
| CSS | Tailwind CSS | 3.x |
| State | Zustand + TanStack Query | Latest |
| Mobile | Flutter | 3.19+ |
| State (mobile) | Riverpod | 2.x |
| HTTP (mobile) | Dio | 5.x |

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/api/auth/register` | Register akun baru |
| POST | `/api/auth/login` | Login + JWT |
| POST | `/api/auth/refresh-token` | Refresh access token |
| GET | `/api/auth/me` | Info user aktif |
| GET | `/api/workspaces` | Daftar workspace |
| GET | `/api/workspaces/{id}/projects` | Proyek di workspace |
| GET | `/api/workspaces/{id}/members` | Member workspace |
| GET | `/api/columns/{id}/tasks` | Task per kolom |
| POST | `/api/columns/{id}/tasks` | Buat task baru |
| PATCH | `/api/tasks/{id}/move` | Pindah task antar kolom |
| POST | `/api/tasks/{id}/comments` | Tambah komentar |

**Swagger UI:** `http://localhost:5001/swagger`

---

## 📱 Web Dashboard Pages

| URL | Halaman |
|---|---|
| `/login` | Login |
| `/register` | Register |
| `/dashboard/overview` | Bento Grid Overview |
| `/dashboard/board` | Kanban Board |
| `/dashboard/chat` | Chat Messenger |
| `/dashboard/calendar` | Kalender |
| `/dashboard/members` | Team Members |
| `/dashboard/reports` | Activity & Reports |

---

## 🔧 Konfigurasi

### Backend: `backend/TaskForge.API/appsettings.json`
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=taskforge;Username=postgres;Password=YOUR_PASSWORD"
  },
  "Jwt": {
    "Secret": "TaskForge-Super-Secret-Key-2026-MinLength32Characters!"
  }
}
```

### Web: `web/.env.local`
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
NEXT_PUBLIC_SIGNALR_URL=http://localhost:5001
```

### Mobile: `mobile/lib/core/config/app_config.dart`
```dart
static const String baseUrl = 'http://10.0.2.2:5001/api';  // Android emulator
// static const String baseUrl = 'http://localhost:5001/api';  // iOS simulator
```

---

## 📊 Phase Development

| Fase | Status | Deliverable |
|---|---|---|
| **Fase 1** Foundation | ✅ Done | Auth, workspace CRUD, project setup |
| **Fase 2** Core | ✅ Done | Kanban board, task management, SignalR |
| **Fase 3** Advanced | 🔶 Scaffolded | File upload, analytics, push notif |
| **Fase 4** Polish | 🔶 Scaffolded | Offline mode, dark mode, Docker, deploy |

---

## 🔐 Demo Mode

Web dashboard dapat dijalankan **tanpa backend** dalam demo mode:
- Login dengan email apapun + password apapun → masuk ke dashboard
- Semua data menggunakan mock/static data
- SignalR badge tampil sebagai UI element (tidak connect ke server)

---

## 👥 Tim & Personas

| Persona | Platform | Role |
|---|---|---|
| Budi (PM) | Web | Admin — kelola task, assign anggota |
| Rina (Teknisi) | Mobile | Member — update status, upload foto |
| Dino (Owner) | Web | Owner — pantau progress keseluruhan |

---

*© 2026 TaskForge Inc. — Built with ❤️ by the TaskForge Team*
