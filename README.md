# CRM-sales Management System

CRM Sales Management System is a full-stack MERN application developed to help sales teams manage leads, track deal progress, and organize customer interactions efficiently.

---

## Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected routes
- Logout functionality

### Dashboard
- Total leads count
- Lead status statistics
- Total deal value
- Won deal value

### Lead Management
- Create leads
- View all leads
- Update lead status
- Delete leads
- Add notes to leads

### Search & Filtering
- Search leads by:
  - Lead name
  - Company name
  - Email
- Filter leads by status

### UI Features
- Responsive interface
- Table-based lead list
- Color-coded lead statuses

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

---

## Project Structure

```bash
crm-sales-management-system/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd crm-sales
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend` folder.

### Required Variables

```env
PORT=5000
MONGO_URI=mongodb_connection_string
JWT_SECRET=secret_key
```

---

## Running the Application

### Run Backend Server

```bash
cd backend
nodemon server.js
```

### Run Frontend

```bash
cd frontend
npm run dev
```

---

## Test Login Credentials

### Admin Account

```txt
Email: admin@gmail.com
Password: admin@123
```

Or register a new user through the registration page.

---

## Database Setup

This project uses MongoDB Atlas as the cloud database.

### Steps

1. Create a MongoDB Atlas account
2. Create a cluster
3. Create a database user
4. Whitelist your IP address
5. Copy the MongoDB connection string
6. Add the connection string to the `.env` file

Collections are automatically created by Mongoose when data is inserted.

---

## API Functionality Overview

### Authentication Routes
- Register user
- Login user
- Verify JWT token

### Lead Routes
- Create lead
- Fetch all leads
- Update lead details/status
- Delete lead
- Add notes to leads

---

## Known Limitations

- No profile management
- No password reset functionality
- No pagination for large lead lists
- Basic frontend validation only
- Minimal role-based authorization
- Notes cannot be edited or deleted

---

## Learning Outcomes

This project helped strengthen understanding of:

- REST API development
- MongoDB integration
- JWT authentication
- React state management
- Protected routing
- CRUD operations
- Frontend and backend integration

One of the biggest challenges was implementing authentication flow and maintaining secure communication between frontend and backend services. Building protected routes and dynamically managing lead data provided valuable hands-on experience in developing real-world full-stack applications.


