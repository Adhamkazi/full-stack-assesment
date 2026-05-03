# Feastly — Full-Stack Food Delivery Application

Feastly is a modern, responsive food delivery platform built with a focus on speed, real-time updates, and a seamless user experience. It features a Next.js frontend and a TypeScript Express backend.

## 🚀 Live Demo
- **Frontend**: [https://full-stack-assesment-eight.vercel.app/](https://full-stack-assesment-eight.vercel.app/)
- **Backend**: [https://order-managment-backend-pyg9.onrender.com](https://order-managment-backend-pyg9.onrender.com)

---

## 🏗️ Architecture

The project is split into two main components:
1.  **Frontend (`food-delivery-frontend`)**: A Next.js 14 application using the App Router, Zustand for state management, and Tailwind CSS for styling.
2.  **Backend (`food-delivery-backend`)**: A RESTful API built with Express and TypeScript, featuring real-time order tracking via Server-Sent Events (SSE).

---

## ✨ Features

- **Dynamic Menu**: Browse items by categories with server-side rendering for SEO and speed.
- **Cart Management**: Add/remove items and update quantities with persistent storage (Zustand + LocalStorage).
- **Smooth Checkout**: Form validation and a clean summary of the order.
- **Real-time Tracking**: Live order status updates (Received → Preparing → Out for Delivery → Delivered) using Server-Sent Events.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
- **CORS Optimized**: Configured with Next.js rewrites to ensure seamless cross-origin communication.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Real-time**: Server-Sent Events (SSE)
- **Testing**: Vitest + Supertest

---

## 🚦 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/full-stack-assesment.git
cd full-stack-assesment
```

### 2. Backend Setup
```bash
cd food-delivery-backend
npm install
```
Create a `.env` file in the `food-delivery-backend` directory:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../food-delivery-frontend
npm install
```
Create a `.env.local` file in the `food-delivery-frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
Start the frontend:
```bash
npm run dev
```

---

## 🧪 Testing

Both projects include comprehensive test suites.

**To run frontend tests:**
```bash
cd food-delivery-frontend
npm test
```

**To run backend tests:**
```bash
cd food-delivery-backend
npm test
```

---

## 🌐 Deployment

### Frontend (Vercel)
- The frontend is optimized for Vercel.
- Ensure `NEXT_PUBLIC_API_URL` is set to your deployed backend URL.

### Backend (Render/Heroku)
- The backend is a standard Node.js application.
- **Important**: Set `FRONTEND_URL` in your backend environment variables (without a trailing slash) to allow CORS from your deployed frontend.

---

## 📝 Project Structure

```text
full-stack-assesment/
├── food-delivery-frontend/    # Next.js Application
│   ├── app/                   # Routes & Pages
│   ├── components/            # Reusable UI Components
│   ├── store/                 # Zustand Cart Store
│   └── lib/                   # API Service & Types
└── food-delivery-backend/     # Express API
    ├── src/
    │   ├── controllers/       # Route Handlers
    │   ├── services/          # Business Logic (Order Simulation)
    │   ├── routes/            # API Endpoints
    │   └── middleware/        # CORS & Error Handling
```

---

## 🤝 Contributing
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
