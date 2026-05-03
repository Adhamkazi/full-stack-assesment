# Feastly — Food Delivery Frontend Documentation

This document provides a comprehensive overview of the **Feastly** frontend codebase, explaining the architecture, file structure, and application flow.

---

## 🏗️ Architecture Overview

The application is built using a modern stack designed for performance, type safety, and real-time updates:
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand (with Persist middleware)
- **Styling**: Tailwind CSS
- **Real-time**: Server-Sent Events (SSE)
- **Testing**: Vitest + React Testing Library

---

## 📁 File-by-File Explanation

### 1. Root Configuration
*   **`package.json`**: Defines dependencies and scripts (`dev`, `build`, `test`).
*   **`tsconfig.json`**: TypeScript configuration. (Modified to exclude tests and vitest config from the production build).
*   **`tailwind.config.ts`**: Customizes the design system (fonts, colors like `orange-500`).
*   **`vitest.config.ts`**: Configures the testing environment, including mocks for Next.js components.

### 2. Core Logic (`/lib`, `/store`)
*   **`lib/types.ts`**: The "Source of Truth" for data structures. Defines `MenuItem`, `CartItem`, `Order`, and `OrderStatus`.
*   **`lib/api.ts`**: Centralized API service. Handles `fetch` calls to the backend. 
    *   `getMenu()`: Fetches food items.
    *   `placeOrder()`: Submits the cart.
    *   `getStreamUrl()`: Returns the endpoint for real-time status updates.
*   **`store/cart-store.ts`**: The global state engine using **Zustand**. 
    *   Uses `persist` to keep the cart in `localStorage`.
    *   Contains logic for `addItem`, `removeItem`, and `updateQuantity`.

### 3. Application Routes (`/app`)
*   **`layout.tsx`**: The root wrapper. Sets up global fonts (DM Sans & Playfair Display) and includes the `Navbar`.
*   **`page.tsx` (Home)**: The storefront. Fetches data on the server, filters by category, and renders the menu.
*   **`cart/page.tsx`**: A client-side page that lets users review their selection and adjust quantities.
*   **`checkout/page.tsx`**: Contains the delivery form with client-side validation logic.
*   **`order-status/[id]/page.tsx`**: The tracking dashboard. Uses `EventSource` to listen for live status changes from the server.

### 4. Components (`/components`)
*   **`Navbar.tsx`**: The top navigation. Displays the live cart count (fixed to handle hydration correctly).
*   **`MenuItemCard.tsx`**: Individual food cards with "Add to Cart" functionality and quantity indicators.
*   **`CategoryFilter.tsx`**: Pill-shaped buttons that update the URL search params to filter the menu.
*   **`OrderStatusTracker.tsx`**: A visual progress bar that maps the `OrderStatus` string to a 4-step UI.

---

## 🌊 Application Flow

### 1. Discovery Phase
User lands on `/`. The page performs a server-side fetch to get the menu. The `CategoryFilter` allows users to narrow down choices without a full page reload by using Next.js URL state.

### 2. Selection Phase
User clicks "Add" on a `MenuItemCard`.
1.  The card calls `addItem(item)` in the Zustand store.
2.  The store checks if the item exists; if so, increments `quantity`.
3.  The `Navbar` (subscribed to the store) updates the cart badge immediately.

### 3. Review & Checkout
1.  **Cart**: User reviews items. The total price is calculated dynamically.
2.  **Checkout**: User fills in delivery details.
3.  **Order Placement**: On clicking "Place Order", the app sends the cart and info to the backend. On success, the local cart is cleared, and the user is redirected.

### 4. Real-time Tracking
Once on the `/order-status/[id]` page:
1.  The component fetches the initial order state.
2.  It opens a `new EventSource(api_url)`.
3.  The backend pushes updates (e.g., `{"status": "Preparing"}`).
4.  The `useEffect` in the page updates the local `status` state, which causes the `OrderStatusTracker` to move the progress bar forward.

---

## 🧪 Testing Strategy
*   **Unit Tests**: Located in `__tests__/api`, testing the cart logic in isolation.
*   **Component Tests**: Located in `__tests__/components`, verifying that UI elements (like the Navbar and Cards) react correctly to user input and state changes.
