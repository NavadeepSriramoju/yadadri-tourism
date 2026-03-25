# 🛕 Yadadri Temple Tourism — Full-Stack Project

A complete full-stack web application for Yadadri Temple Tourism built with **React** (frontend) and **Spring Boot** (backend).

---

## 📁 Project Structure

```
yadadri-project/
├── frontend/                  ← React App
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── index.js
│   │   └── App.jsx            ← All UI components
│   └── package.json
│
└── backend/                   ← Spring Boot App
    ├── pom.xml
    └── src/main/
        ├── java/com/yadadri/temple/
        │   ├── TempleApplication.java
        │   ├── controller/
        │   │   ├── AuthController.java
        │   │   └── DarshanTimingController.java
        │   ├── model/
        │   │   └── DarshanTiming.java
        │   ├── repository/
        │   │   └── DarshanTimingRepository.java
        │   ├── service/
        │   │   └── DarshanTimingService.java
        │   ├── security/
        │   │   ├── JwtUtil.java
        │   │   └── JwtAuthFilter.java
        │   └── config/
        │       ├── SecurityConfig.java
        │       └── DataInitializer.java
        └── resources/
            └── application.properties
```

---

## ✅ Prerequisites

Make sure these are installed before starting:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 18+ | https://nodejs.org |
| Java JDK | 17+ | https://adoptium.net |
| Maven | 3.8+ | https://maven.apache.org (or use `./mvnw`) |
| VS Code | Latest | https://code.visualstudio.com |

### Recommended VS Code Extensions
- **Extension Pack for Java** (Microsoft)
- **Spring Boot Extension Pack** (VMware)
- **ES7+ React/Redux/React-Native Snippets**

---

## 🚀 Running the Project

### Step 1 — Start the Backend (Spring Boot)

Open a terminal in VS Code and run:

```bash
cd backend
mvn spring-boot:run
```

Or on Windows:
```bash
cd backend
mvn.cmd spring-boot:run
```

✅ Backend runs at: **http://localhost:8080**

> **Note:** Uses H2 in-memory database — no database installation needed!  
> H2 Console available at: http://localhost:8080/h2-console  
> (JDBC URL: `jdbc:h2:mem:yadadridb`, Username: `sa`, Password: _(empty)_)

---

### Step 2 — Start the Frontend (React)

Open a **new terminal** in VS Code:

```bash
cd frontend
npm install
npm start
```

✅ Frontend opens automatically at: **http://localhost:3000**

---

## 🔐 Admin Login

| Field | Value |
|-------|-------|
| Username | `admin` |
| Password | `admin123` |

---

## 🌐 API Endpoints

### Public (No Auth Required)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/darshan/public/timings` | Get active darshan timings |

### Auth
| Method | URL | Description |
|--------|-----|-------------|
| POST | `/api/auth/login` | Login and get JWT token |

**Login Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Login Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "username": "admin"
}
```

### Admin (JWT Required — Add `Authorization: Bearer <token>` header)
| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/darshan/admin/timings` | Get all timings (incl. inactive) |
| POST | `/api/darshan/admin/timings` | Add new timing |
| PUT | `/api/darshan/admin/timings/{id}` | Update timing |
| DELETE | `/api/darshan/admin/timings/{id}` | Delete timing |
| PATCH | `/api/darshan/admin/timings/{id}/toggle` | Toggle active/inactive |

**Timing JSON Body (for POST / PUT):**
```json
{
  "sevaName": "Thomala Seva",
  "timeSlot": "07:00 AM – 08:00 AM",
  "price": "Paid",
  "capacity": 100,
  "dayAvailability": "All Days",
  "active": true
}
```

---

## 🎨 Website Pages

| Page | Route (SPA) | Description |
|------|-------------|-------------|
| Home | `home` | Hero section + features |
| Darshan Timings | `timings` | Live data from backend with filters |
| Booking | `booking` | Devotee booking form |
| About | `about` | Temple history, location, how to reach |
| Admin | `admin` | Secured dashboard (JWT login) |

---

## ⚙️ Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Change port if needed
server.port=8080

# JWT secret — CHANGE THIS in production!
app.jwt.secret=YadadriTempleSecretKey2025SuperLongSecretForJWTSigning

# Token expiry (24 hours by default)
app.jwt.expiration-ms=86400000

# Frontend URL for CORS
app.cors.allowed-origins=http://localhost:3000
```

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|---------|
| Port 8080 already in use | Change `server.port` in `application.properties` |
| `npm install` fails | Delete `node_modules` and run again |
| CORS error in browser | Ensure backend is running before frontend |
| Maven not found | Install Maven or use `./mvnw spring-boot:run` |
| Java version error | Make sure JDK 17+ is installed and `JAVA_HOME` is set |

---

## 🛠 Tech Stack

**Frontend**
- React 18
- CSS3 (custom, no framework)
- Google Fonts (Cinzel Decorative, Crimson Pro)

**Backend**
- Spring Boot 3.2
- Spring Security (JWT)
- Spring Data JPA
- H2 In-Memory Database
- Lombok
- Java 17

---

## 🙏 Jai Sri Lakshmi Narasimha Swamy
