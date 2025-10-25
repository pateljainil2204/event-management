# 🎉 Event Management System (Backend)

A secure, scalable **Event Management System** built with the **MERN stack (Node.js, Express, MongoDB)**.  
This backend application provides a robust REST API for managing **events, user registrations, and admin approvals** — with secure authentication and **role-based access control (RBAC)**.

---

## ✨ Features at a Glance

| Category | Description |
| :--- | :--- |
| **🔐 User Authentication** | Secure login and registration using **JWT (JSON Web Tokens)**. |
| **📅 Event Management** | Users can **create, edit, and delete** their own events with key details such as title, description, date, time, location, and capacity. |
| **🧾 Event Registration** | Other users can **register** for events (with **capacity validation**) and **cancel** their registrations if needed. |
| **🔍 Event Browsing** | Browse and **filter events by date or location** for easy discovery. |
| **🛡️ Admin Approval System** | Admins can **review, approve, or reject** events before they become visible to the public. |
| **🛠️ Developer-Friendly** | RESTful API design with clear response models and Postman collection for immediate testing. |

---

## 🛠️ Tech Stack

| Category | Technologies Used |
| :--- | :--- |
| **Backend Framework** | **Node.js**, **Express.js** |
| **Database/ORM** | **MongoDB** (via **Mongoose ODM**) |
| **Authentication** | **JSON Web Tokens (JWT)** |
| **Environment Management** | **dotenv** |
| **Testing** | **Postman** (API usage) |
| **Version Control** | **Git**, **GitHub** |

---

## ⚙️ Installation and Setup

Follow these steps to run the backend locally:

### 1. Clone the Repository

```bash
git clone https://github.com/pateljainil2204/event-management
cd event-management
```
### 2. Install Dependencies

```bash
npm install
```
### 3. Create .env File
Create a .env file in the root directory and add your configuration:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
### 4. Run the Server

```bash
npm run dev
```

The API will be available at:

👉 http://localhost:5000

---

## 🔐 Authentication & Role-Based Access Control (RBAC)

This system uses **JWT** for authentication and **Role-Based Access Control (RBAC)** to restrict access based on user roles.  
Each user has one of the following roles:

- **User** – can create and register for events.  
- **Admin** – can approve, reject, or manage all events and registrations.

### 🔑 Authorization Header Format

All protected routes require a valid JWT token.

✅ **Correct Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

❌ **Incorrect:**  
Avoid sending tokens via query params or URL.

---

### 🧭 Role Permissions Matrix

| Action / Resource | **User** | **Admin** |
| :--- | :--- | :--- |
| **Create Event** | Create & Manage Own | Approve/Reject Any |
| **Edit/Delete Event** | Own Only | Any Event |
| **Register for Event** | Yes (if capacity available) | Read-Only |
| **View All Events** | Yes | Yes |
| **Filter by Date/Location** | Yes | Yes |
| **Manage Users & Registrations** | Own Only | Full Control |

---

## 🧪 Postman Collection (API Testing)

A **ready-to-use Postman Collection** is available to explore and test all API endpoints, including event creation, registration, and admin actions.

---

### 🔗 Postman Collection Link

```
https://pateljainil22-2328610.postman.co/workspace/JAINIL-PATEL's-Workspace~d608882a-766a-44c6-89e1-0d78fca8b51c/collection/48171917-cdc74970-4fb5-4449-977b-6c85b6c619f2?action=share&source=copy-link&creator=48171917
```


 ⚠️ Make sure your local server is running (`npm run dev`) before testing the endpoints.  
 For protected routes, set the **JWT token** as a **Bearer Token** in Postman’s Authorization tab.

---

## 💡 Future Scope & Roadmap

This roadmap outlines the upcoming improvements and strategic development of the platform.

### 🚀 V1.1: Stability & Optimization (Short-Term)

* **Comprehensive Testing:** Implement automated unit/integration tests for critical routes.
* **Advanced Filtering:** Add multi-criteria search (by organizer, date range, capacity, etc.).
* **Enhanced Validation:** Improve data validation for event times, overlapping schedules, and participant limits.

### ⚙️ V2.0: Advanced Features & Engagement (Mid-Term)

* **Email Notifications:** Notify users of successful registrations, cancellations, and admin approvals.
* **Event Analytics:** Track attendee statistics, registration rates, and event popularity metrics.
* **Payment Integration:** Enable paid events with integrated payment gateways (Stripe / Razorpay).

### 🌐 Long-Term Strategy

* **TypeScript Migration:** Transition to TypeScript for better maintainability and scalability.
* **Real-Time Updates:** Integrate WebSockets for live capacity tracking and real-time event status.
* **Cloud Integration:** Use AWS S3 or Google Cloud for event image uploads and large media files.
* **AI Recommendations:** Suggest events based on user interest and attendance history.

---

## 👨‍💻 Author

| Name | Contact | GitHub |
| :--- | :--- | :--- |
| **Jainil Patel** | pateljainil.2204@gmail.com | [github.com/pateljainil2204](https://github.com/pateljainil2204) |
