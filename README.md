# Full Stack User Authentication System – (Task 1:- Prodigy Infotech)

## 📌 Overview

This project is a secure full-stack user authentication system built as part of Prodigy Infotech internship. It provides essential authentication features like user registration, login, logout, session handling, and JWT-based security.

## ✨ Features

- 📝 User Registration – New users can create an account securely.
- 🔑 Login Authentication – Existing users can log in using email & password.
- 📝 Reset Password – Users can reset there accout password securely.
- 🛡️ Password Hashing – Uses bcrypt/argon2 to securely store passwords.
- 🔒 JWT Authentication / Session Handling – Secure access to protected routes.
- 📧 Email Verification (Optional) – Verifies users via email link/OTP.
- 📱 Responsive UI – Built with a clean and user-friendly frontend.
- 🚀 Full Stack Implementation – Backend API + Database + Frontend integration.

## 🛠️ Tech Stack

- Frontend: React.js, Tailwind 
- Backend: Node.js + Express.js 
- Database: MongoDB 
- Authentication: JSON Web Tokens (JWT) , Nodemailer (Sending Email)
- Security: Bcrypt (for password hashing), Helmet, CORS
- Other Tools: Axios , Redux , Context API

## ⚙️ How It Works

   🔑 User Registration

- 📧 User enters email & password
- 🔒 Password is hashed and stored in the database

🔑 Login
- 👤 User logs in with credentials
- 🛡️ Server verifies password and generates a JWT / session token

🔑 Protected Routes
- 🚫❌ Unauthorized users cannot access certain routes/pages
- ✅ Only authenticated users can access protected routes

🔑 Logout
- 🔓 Token/session is destroyed
- 👋 User is logged out securely

---

<h4 align="center" style="color:gold;">✨ Thank You ✨</h4> 
<h3 align="center" style="color:#e74c3c;">Created By: Aniket</h3>



