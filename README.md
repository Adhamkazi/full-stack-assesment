        1 # Feastly — Full-Stack Food Delivery Application
        2
        3 Feastly is a modern, responsive food delivery platform built with a focus on speed, real-time updates, and a seamless user experience. It
          features a Next.js frontend and a TypeScript Express backend.
        4
        5 ## 🚀 Live Demo
        6 - **Frontend**: [https://full-stack-assesment-eight.vercel.app/](https://full-stack-assesment-eight.vercel.app/)
        7 - **Backend**: [https://order-managment-backend-pyg9.onrender.com](https://order-managment-backend-pyg9.onrender.com)
     
       13 The project is split into two main components:
       14 1.  **Frontend (`food-delivery-frontend`)**: A Next.js 14 application using the App Router, Zustand for state management, and Tailwind CSS for
          styling.
       15 2.  **Backend (`food-delivery-backend`)**: A RESTful API built with Express and TypeScript, featuring real-time order tracking via Server-Sent
          Events (SSE).
       16
       17 ---
       18
       19 ## ✨ Features
       20
       21 - **Dynamic Menu**: Browse items by categories with server-side rendering for SEO and speed.
       22 - **Cart Management**: Add/remove items and update quantities with persistent storage (Zustand + LocalStorage).
       23 - **Smooth Checkout**: Form validation and a clean summary of the order.
       24 - **Real-time Tracking**: Live order status updates (Received → Preparing → Out for Delivery → Delivered) using Server-Sent Events.
       25 - **Responsive Design**: Fully optimized for mobile, tablet, and desktop views.
       26 - **CORS Optimized**: Configured with Next.js rewrites to ensure seamless cross-origin communication.
       27
       28 ---
       29
       30 ## 🛠️ Tech Stack
       31
       32 ### Frontend
       33 - **Framework**: Next.js 14 (App Router)
       34 - **Language**: TypeScript
       35 - **State Management**: Zustand
       36 - **Styling**: Tailwind CSS
       37 - **Icons**: Lucide React
       38 - **Testing**: Vitest + React Testing Library
       39
       40 ### Backend
       41 - **Runtime**: Node.js
       42 - **Framework**: Express.js
       43 - **Language**: TypeScript
       44 - **Real-time**: Server-Sent Events (SSE)
       45 - **Testing**: Vitest + Supertest
       46
       47 ---
       48
       49 ## 🚦 Getting Started
       50
       51 ### 1. Clone the Repository
       52 ```bash
       53 git clone https://github.com/your-username/full-stack-assesment.git
       54 cd full-stack-assesment
       55 ```
       56
       57 ### 2. Backend Setup
       58 ```bash
       59 cd food-delivery-backend
       60 npm install
       61 ```
       62 Create a `.env` file in the `food-delivery-backend` directory:
       63 ```env
       64 PORT=5000
       65 FRONTEND_URL=http://localhost:3000
       66 ```
       67 Start the backend:
       68 ```bash
       69 npm run dev
       70 ```
       71
       72 ### 3. Frontend Setup
       73 ```bash
       74 cd ../food-delivery-frontend
       75 npm install
       76 ```
       77 Create a `.env.local` file in the `food-delivery-frontend` directory:
       78 ```env
       79 NEXT_PUBLIC_API_URL=http://localhost:5000
       80 ```
       81 Start the frontend:
       82 ```bash
       83 npm run dev
       84 ```
       85
       86 ---
       87
       88 ## 🧪 Testing
       89
       90 Both projects include comprehensive test suites.
       91
       92 **To run frontend tests:**
       93 ```bash
       94 cd food-delivery-frontend
       95 npm test
       96 ```
       97
       98 **To run backend tests:**
       99 ```bash
      100 cd food-delivery-backend
      101 npm test
      102 ```
      103
      104 ---
      105
      106 ## 🌐 Deployment
      107
      108 ### Frontend (Vercel)
      109 - The frontend is optimized for Vercel.
      110 - Ensure `NEXT_PUBLIC_API_URL` is set to your deployed backend URL.
      111
      112 ### Backend (Render/Heroku)
      113 - The backend is a standard Node.js application.
      114 - **Important**: Set `FRONTEND_URL` in your backend environment variables (without a trailing slash) to allow CORS from your deployed
          frontend.
      115
      116 ---
      117
      118 ## 📝 Project Structure
      119
      120 ```text
      121 full-stack-assesment/
      122 ├── food-delivery-frontend/    # Next.js Application
      123 │   ├── app/                   # Routes & Pages
      124 │   ├── components/            # Reusable UI Components
      125 │   ├── store/                 # Zustand Cart Store
      126 │   └── lib/                   # API Service & Types
      127 └── food-delivery-backend/     # Express API
      128     ├── src/
      129     │   ├── controllers/       # Route Handlers
      130     │   ├── services/          # Business Logic (Order Simulation)
      131     │   ├── routes/            # API Endpoints
      132     │   └── middleware/        # CORS & Error Handling
      133 ```
      134
      135 ---
      136
      137 ## 🤝 Contributing
      138 1. Fork the project.
      139 2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
      140 3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
      141 4. Push to the branch (`git push origin feature/AmazingFeature`).
      142 5. Open a Pull Request.
