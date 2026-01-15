# 🌱 Farm2Home – Direct Farmer to Consumer Platform

Farm2Home is a full-stack web application that connects **farmers directly with consumers**, eliminating middlemen and enabling fair pricing, transparency, and efficient order management.

This project is built with **Django + Django REST Framework (Backend)** and **React (Frontend)** and is designed with **real-world production practices** in mind.

---

## 🚀 Features

### 👨‍🌾 Farmer
- Farmer registration & authentication
- Create, update, delete products
- View orders for their products
- Order status management (Confirmed, Delivered, Cancelled)
- Farmer dashboard with order insights

### 🛒 Customer
- User authentication
- Browse available farm products
- Place orders with multiple items
- View order history & order status
- Secure token-based access

### 🔐 Authentication & Authorization
- Token-based authentication
- Role-based permissions (Farmer / Customer)
- Secure access control for APIs

---

## 🛠️ Tech Stack

### Backend
- **Python**
- **Django**
- **Django REST Framework**
- Token Authentication
- SQLite (development)

### Frontend
- **React**
- **Axios**
- **Tailwind CSS**

### Tools & Practices
- Environment variables (`.env`)
- Git & GitHub
- RESTful API design
- Modular & scalable project structure

---

## 📁 Project Structure

### Backend (Django)

f2hbackend/
├── users/ # Custom user model & auth
├── products/ # Product management
├── orders/ # Orders & order items
├── f2h/ # Project settings
├── manage.py

### Frontend (React)

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.jsx


---

## ⚙️ Environment Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/farm2home.git
cd farm2home


2️⃣ Backend Setup

Create and activate virtual environment:
python -m venv venv
venv\Scripts\activate   # Windows

Install dependencies:
pip install -r requirements.txt

Create .env file:   
SECRET_KEY=your_secret_key
DEBUG=True

Run migrations:
python manage.py migrate

Start backend server:
python manage.py runserver

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


🔐 Security Practices

.env files are ignored using .gitignore

No secrets or credentials committed to GitHub

Role-based permissions enforced at API level

Token authentication for protected routes

📌 API Highlights

POST /users/register/

POST /users/login/

GET /products/

POST /orders/

GET /orders/history/

GET /farmers-dash/

(All protected routes require authentication token)


📈 Future Improvements

Payment gateway integration

Product reviews & ratings

Real-time order notifications

Deployment using Docker & AWS

Pagination & caching for performance

👨‍💻 Author

Jaspreet Singh
B.Tech Computer Science Student
Focused on Full-Stack Development & Now learning A.I. 


⭐ Acknowledgements

This project was built as a learning-focused, interview-ready full-stack application, following industry best practices in backend design, security, and frontend integration.

If you like this project, feel free to ⭐ the repository!