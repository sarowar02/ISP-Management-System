#  ISP Management System

A full-stack ISP (Internet Service Provider) management system that automates user management, billing, and service control. This system includes both an admin dashboard and a public customer portal.

---

##  Features

###  Admin Panel

* User Management (Add, Update, Activate/Deactivate)
* Package Management
* Automated Billing System 
* Bill Search & Filtering
* Manual Payment Handling (Cash)
* Dashboard Analytics (Users, Revenue, Due)

###  Customer Portal

* View Internet Packages
* Check Bills using Username + Phone
* Online Payment Flow (Mock)

### Authentication

* JWT-based Admin Login
* Protected Routes (Admin Only Access)

---

## 🛠 Tech Stack

### Backend

* Spring Boot
* Spring Data JPA
* MySQL

### Frontend

* React.js
* CSS

---

##  API Highlights

### User

* `GET /api/users`
* `POST /api/users`
* `PUT /api/users/{id}/status`

### Bills

* `GET /api/bills`
* `GET /api/bills/search?keyword=`
* `POST /api/bills/pay/{id}` (Admin)

### Public

* `POST /api/public/bills` (Check bill)

### Auth

* `POST /api/login`

---

##  Setup Instructions

### Backend

```bash
cd backend
./mvnw spring-boot:run
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## Screenshot 
<h3 text-align="center" >Homepage</h3>
<img src="Screenshot/home.png" alt="home">

<h3 text-align="center" >Login Page</h3>
<img src="Screenshot/loginpage.png" alt="loginpage">

<h3 text-align="center" >User Page</h3>
<img src="Screenshot/user.png" alt="users">

<h3 text-align="center" >Package Page</h3>
<img src="Screenshot/package.png" alt="package">

<h3 text-align="center" >Bills</h3>
<img src="Screenshot/bills.png" alt="bills">

<h3 text-align="center" >Stat</h3>
<img src="Screenshot/stat.png" alt="stat">



##  Future Improvements

* Payment Gateway Integration (bKash, Nagad)
* OTP Verification for Users
* MikroTik Router Integration
* Role-based Authentication
* Mobile Responsive UI

---

##  Author

Golam Sarowar <br>
CSE @MBSTU

---
