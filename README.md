# 🏟️ Football Field Booking System

A full-stack web application for managing football field reservations. Admins can manage users, fields, and bookings. Regular users can view fields and book available timeslots.
---

## 📌 Features

### 👤 Authentication & Authorization

* JWT-based login & registration
* Admin and user roles
* Protected routes (frontend & backend)

### 🗓️ Booking Management

* Create, update, delete bookings
* View available fields with details
* Role-based access for managing status (admin-only)

### ⚙️ Admin Panel

* Manage users, fields, and all bookings
* View booking status and history

---

## 🖼️ Tech Stack

### ⚙️ Backend

* Java 17 + Spring Boot
* Spring Security + JWT
* Hibernate + JPA + H2/MySQL
* RESTful API

### 💻 Frontend

* React + TypeScript
* React Router + Hooks
* Axios + JWT auth

---

## 📁 Project Structure

```
├── football_booking/
│   ├── config/              # CORS, SecurityConfig
│   ├── controller/          # REST Controllers
│   ├── model/               # Entities (User, Booking, Field)
│   ├── repository/          # Spring JPA Repositories
│   ├── service/             # Business logic
│   └── security/            # JWT filter, UserDetailsService
│
└── football-booking-react/
    ├── components/          # Reusable React components
    ├── pages/               # Login, Register, Bookings, Admin views
    ├── services/            # API calls (Axios)
    └── styles/              # CSS Modules
```

---

## 💠 Installation

### Backend

```bash
cd football_booking
./mvnw spring-boot:run
```

### Frontend

```bash
cd football-booking-react
npm install
npm run dev
```

---

## 🧪 Test Data

```
Admin:
email: admin@example.com
password: admin123

User:
email: user@example.com
password: user123
```

---


## 🧑‍💻 Author

**Created by:** Maksym Khairullin
Front-end & Full-stack Developer aspirant
---
