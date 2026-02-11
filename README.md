# Equipay

Equipay is a full-stack expense sharing and settlement management application.  
It enables users to create groups, track shared expenses, settle balances, export monthly reports, and manage account preferences securely.

---

## Features

- User Authentication (JWT + Google OAuth)
- Create and Manage Groups
- Add and Split Expenses
- Real-time Expense Updates (Socket.io)
- Settlement Tracking
- Monthly PDF Report Export
- User Rating System (stored in database)
- Responsive UI

---

## Tech Stack

**Frontend**
- React (Vite)
- React Router
- Axios
- Recharts
- jsPDF
- React Toastify

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Passport Google OAuth
- Socket.io

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/riddhipatil28/equipay.git
cd equipay
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Start backend server:

```bash
node server.js
```

Server runs on:
```
http://localhost:3000
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## Environment Variables Explained

- `MONGO_URI` – Your MongoDB database connection string  
- `JWT_SECRET` – Any secure random string  
- `GOOGLE_CLIENT_ID` – From Google Cloud Console  
- `GOOGLE_CLIENT_SECRET` – From Google Cloud Console  

Each developer must create their own `.env` file.

---

## Project Structure

```
frontend/
backend/
```

- `frontend` – React application
- `backend` – Express API & database logic


---

## Author

Riddhi Patil  
GitHub: https://github.com/riddhipatil28

