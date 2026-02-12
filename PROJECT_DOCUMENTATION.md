# Equipay  
---

## 1. Project Overview

Equipay is a full-stack expense management and group settlement platform built using the MERN stack. The application allows users to create groups, add shared expenses, split costs automatically, track balances, settle payments, and generate monthly financial reports.

The project simulates a real-world fintech-style system with secure authentication, structured database design, real-time updates, and professional reporting.

---

## 2. Problem Statement

Managing shared expenses manually often results in:

- Incorrect balance calculations  
- Lack of transparency  
- No structured settlement history  
- No financial reporting system  
- No audit trail  

Equipay addresses these issues by automating balance computation, maintaining settlement logs, and generating structured monthly reports.

---

## 3. Technology Stack

### Frontend
- React.js
- React Router
- Axios
- Recharts (Data Visualization)
- jsPDF + jspdf-autotable (Report Generation)
- React Toastify (Notifications)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Passport.js (Google OAuth)
- Socket.IO (Real-time communication)

---

## 4. System Architecture

Client (React Application)  
↓  
REST API (Express Server)  
↓  
MongoDB Database  
↓  
Socket.IO for real-time updates  

Architecture Principles:
- Modular route structure
- Middleware-based authentication
- Separation of concerns
- Token-based authorization

---

## 5. Core Features Implemented

### Authentication System
- Phone number + password login
- Google OAuth integration
- JWT-based secure sessions
- Protected API routes

Learning Outcome:
- Implemented secure token-based authentication
- Understood OAuth workflow
- Built custom middleware for request validation

---

### Group Management
- Create and manage expense groups
- Add multiple members
- Delete groups securely

Learning Outcome:
- Designed relational schemas using ObjectId references
- Used MongoDB population for structured data retrieval

---

### Expense Management
- Add categorized expenses
- Automatic equal splitting logic
- Real-time UI update using Socket.IO
- Dynamic balance recalculation

Learning Outcome:
- Built real-time event-based communication
- Designed financial split logic
- Managed frontend state synchronization

---

### Settlement System
- Record settlements between users
- Store transaction history
- Display settlement timestamps
- Generate monthly settlement reports

Learning Outcome:
- Designed transaction schema
- Implemented audit logging
- Structured financial data storage

---

### PDF Report Generation
- Monthly expense report
- Settlement report
- Balance summary
- Professionally formatted output

Learning Outcome:
- Generated dynamic PDF documents
- Converted database data into structured financial reports

---

### Rating System
- 1–5 star rating feature
- Database persistence
- Editable rating
- Auto-load previous rating

Learning Outcome:
- Implemented upsert database logic
- Managed user-specific persisted data

---

## 6. Security Implementation

- Password hashing using bcrypt
- JWT verification middleware
- Protected backend routes
- Environment variable management
- Secure token handling
- Removal of sensitive files via .gitignore

Learning Outcome:
- Understood production-level authentication
- Debugged 401/404 errors
- Secured REST endpoints

---

## 7. Database Design

### Collections

**Users**
- name
- email
- phoneNumber
- password
- provider

**Groups**
- name
- members
- createdBy

**Expenses**
- groupId
- title
- category
- amount
- paidBy
- participants

**Settlements**
- groupId
- from
- to
- amount
- createdAt

**Ratings**
- user
- stars

Learning Outcome:
- Implemented normalized schema design
- Managed references vs embedding
- Modeled financial relationships

---

## 8. Challenges Faced

- JWT profile loading errors  
- Settlement PDF encoding issues  
- 404 API routing errors  
- State management conflicts  
- Logout triggering incorrect modal  

Resolution:
- Fixed middleware validation
- Corrected route registration
- Improved state handling logic
- Debugged request-response lifecycle

---

## 9. Key Technical Learnings

- Full-stack system architecture
- Real-time communication design
- Secure authentication workflows
- Financial data modeling
- API structuring
- Production debugging
- Git version control management

---

## 10. Future Enhancements

- Email invitation system (SMTP integration)
- Payment gateway integration
- Role-based permissions
- Analytics dashboard
- Cloud deployment (Render / AWS)
- CI/CD integration

---

## 11. Conclusion

This internship project significantly strengthened my understanding of:

- Backend architecture design
- Secure authentication implementation
- Database relationship modeling
- Real-time application development
- Financial reporting systems
- Debugging full-stack production issues

Equipay demonstrates practical implementation of scalable full-stack development principles and simulates a real-world expense management platform.

---
