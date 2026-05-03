# Food Delivery Backend - Codebase Documentation

This document provides a comprehensive explanation of the Food Delivery Backend project, detailing each file's purpose, the code within it, and how they interact to provide a functional REST API.

## Project Overview

The project is a Node.js-based REST API built using **Express** and **TypeScript**. It serves as a backend for a food delivery application, providing endpoints for browsing a menu, placing orders, listing orders, and tracking order status in real-time using Server-Sent Events (SSE).

---

## Directory Structure

```text
food-delivery-backend/
├───.env.example            # Template for environment variables
├───package.json            # Project dependencies and scripts
├───tsconfig.json           # TypeScript configuration
├───vitest.config.ts        # Vitest configuration for testing
├───__tests__/              # Automated test files
│   ├───api.test.ts         # Integration tests for API endpoints
│   ├───orders.service.test.ts # Unit tests for orders service
│   └───validation.test.ts  # Unit tests for input validation
└───src/
    ├───app.ts              # Express application configuration
    ├───index.ts            # Application entry point
    ├───controllers/        # Request handlers (logic for each route)
    │   ├───menu.controller.ts
    │   └───orders.controller.ts
    ├───lib/                # Shared utilities, types, and data
    │   ├───menu-data.ts    # Static menu item data
    │   ├───types.ts        # TypeScript interfaces and types
    │   └───validation.ts   # Payload validation logic
    ├───middleware/         # Express middleware
    │   ├───error.middleware.ts  # Error handling logic
    │   └───logger.middleware.ts # Request logging logic
    ├───routes/             # API route definitions
    │   ├───menu.routes.ts
    │   └───orders.routes.ts
    └───services/           # Business logic and data management
        └───orders.service.ts
```

---

## Detailed File Explanations

### Root Files

#### `package.json`
Defines the project's metadata, dependencies, and scripts.
- **Dependencies**: `express` (web framework), `cors` (cross-origin resource sharing), `uuid` (unique ID generation).
- **Scripts**:
    - `npm run dev`: Starts the server in development mode with `ts-node-dev` (auto-restarts on changes).
    - `npm run build`: Compiles TypeScript to JavaScript.
    - `npm start`: Runs the compiled JavaScript from the `dist` folder.
    - `npm test`: Runs automated tests using Vitest.

#### `tsconfig.json`
Configures the TypeScript compiler. It specifies `src` as the root directory, `dist` as the output directory, and enables strict type-checking to ensure code quality.

#### `vitest.config.ts`
Configures the Vitest testing framework, setting up aliases (like `@`) and specifying that tests should run in a Node.js environment.

---

### Source Code (`src/`)

#### `index.ts`
The entry point of the application. It imports the Express app from `app.ts` and starts the server on a specified port (default 5000). It also logs a fancy startup message with available routes.

#### `app.ts`
Initializes and configures the Express application.
- **Middleware**: Sets up CORS, JSON parsing, URL encoding, and the custom request logger.
- **Routes**: Mounts the menu and orders routes under `/api/menu` and `/api/orders`.
- **Health Check**: Provides a simple `/health` endpoint to verify the API is running.
- **Error Handlers**: Includes a 404 handler for unknown routes and a global error handler for catching exceptions.

#### `lib/types.ts`
Contains all the TypeScript interfaces and types used throughout the application. This ensures type safety across controllers, services, and tests. Key interfaces include `MenuItem`, `Order`, `OrderStatus`, and `ApiResponse`.

#### `lib/menu-data.ts`
An in-memory static array of `MenuItem` objects representing the restaurant's menu. Each item has an ID, name, description, price, image URL, and category.

#### `lib/validation.ts`
Contains the `validateOrderPayload` function, which checks if a POST request to create an order has all the required and valid data (items, delivery details, and total). It uses regex for phone number validation.

#### `middleware/logger.middleware.ts`
A custom middleware that logs every incoming request to the console, including the method, URL, status code (color-coded), and the time it took to process the request.

#### `middleware/error.middleware.ts`
- `notFoundHandler`: Catches any requests to routes that aren't defined and returns a 404 response.
- `errorHandler`: A central place to handle all errors that occur during request processing, returning a consistent JSON error response.

#### `services/orders.service.ts`
Handles the business logic for orders. It uses an in-memory `Map` to store orders.
- **`createOrder`**: Generates a new UUID, saves the order, and starts a **simulation** of the order status progression (from "Order Received" to "Delivered").
- **`simulateStatusProgression`**: Uses `setTimeout` to update the order status at predefined intervals, notifying any real-time subscribers.
- **`subscribeToOrder`**: Allows parts of the application (like the SSE controller) to listen for status changes for a specific order.

#### `controllers/menu.controller.ts`
Handles requests to the menu endpoints.
- `getMenu`: Returns the static list of menu items from `lib/menu-data.ts`.

#### `controllers/orders.controller.ts`
Handles requests to the order-related endpoints.
- `placeOrder`: Validates the payload and calls the service to create a new order.
- `listOrders`: Returns all orders stored in memory.
- `getOrder`: Returns a single order by its ID.
- `streamOrderStatus`: Implements **Server-Sent Events (SSE)**. It keeps a connection open with the client and pushes status updates as the order progresses through its lifecycle (simulated by the service).

#### `routes/menu.routes.ts` & `routes/orders.routes.ts`
Define the URL paths for the API and map them to the corresponding controller functions.

---

### Automated Tests (`__tests__/`)

The project uses **Vitest** and **Supertest** for testing.

#### `api.test.ts`
Integration tests that make actual HTTP requests to the running app (using Supertest) to verify that the endpoints (Health, Menu, Orders) return the expected status codes and data structures.

#### `orders.service.test.ts`
Unit tests for the `orders.service.ts`, ensuring that orders are created correctly, IDs are unique, and orders can be retrieved by ID.

#### `validation.test.ts`
Unit tests for the order payload validation logic in `lib/validation.ts`, checking both valid and various invalid (edge case) inputs.

---

## How it Works: Order Lifecycle

1.  **Placement**: A client sends a `POST /api/orders` request with items and delivery info.
2.  **Validation**: The `orders.controller` uses `lib/validation` to check the data.
3.  **Creation**: If valid, `orders.service` creates the order and stores it in memory.
4.  **Simulation**: The service immediately starts a timer-based simulation to change the order's status over time.
5.  **Tracking**: The client can then call `GET /api/orders/:id/stream` to receive real-time updates as the status changes (e.g., from "Preparing" to "Out for Delivery").
