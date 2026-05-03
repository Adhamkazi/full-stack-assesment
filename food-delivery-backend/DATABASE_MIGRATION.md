# Database Migration Guide: From In-Memory to Persistent Storage

This guide outlines the steps required to transition the Food Delivery Backend from its current in-memory storage to a persistent database (e.g., PostgreSQL or MongoDB).

## Why Switch?
- **Persistence**: Data survives server restarts.
- **Scalability**: Handles larger datasets and concurrent users more efficiently.
- **Data Integrity**: Enforces relationships and constraints (especially with SQL).
- **Complex Queries**: Allows for sophisticated filtering, searching, and reporting.

---

## Recommended Stack: PostgreSQL + Prisma

For this TypeScript project, we recommend using **PostgreSQL** with **Prisma ORM**. Prisma provides excellent type safety and a great developer experience.

### Phase 1: Setup & Configuration

1. **Install Dependencies**
   ```bash
   npm install prisma @prisma/client
   npx prisma init
   ```

2. **Configure Environment Variables**
   Update your `.env` file with the database connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/food_delivery"
   ```

3. **Define the Schema**
   Edit `prisma/schema.prisma` to define your models:
   ```prisma
   model MenuItem {
     id          String  @id @default(uuid())
     name        String
     description String
     price       Float
     image       String
     category    String
     badge       String?
   }

   model Order {
     id        String   @id @default(uuid())
     total     Float
     status    String   @default("Order Received")
     createdAt DateTime @default(now())
     items     Json     // Store items as JSON or create a separate OrderItem model
     delivery  Json     // Store delivery info as JSON
   }
   ```

### Phase 2: Implementation Changes

1. **Database Client (`src/lib/db.ts`)**
   Create a singleton instance of the Prisma client:
   ```typescript
   import { PrismaClient } from '@prisma/client'
   export const prisma = new PrismaClient()
   ```

2. **Migrate Menu Data**
   - Create a seeding script to move data from `src/lib/menu-data.ts` to the `MenuItem` table.
   - Update `src/controllers/menu.controller.ts` to fetch from `prisma.menuItem.findMany()`.

3. **Refactor Orders Service (`src/services/orders.service.ts`)**
   - Replace the `Map<string, Order>` with Prisma calls.
   - **`createOrder`**: Use `prisma.order.create(...)`.
   - **`getOrderById`**: Use `prisma.order.findUnique(...)`.
   - **`getAllOrders`**: Use `prisma.order.findMany(...)`.
   - **`updateStatus`**: Use `prisma.order.update(...)` inside the simulation logic.

4. **Async/Await Conversion**
   Since database operations are asynchronous, ensure all service methods and controller handlers use `async/await`.

### Phase 3: Validation & Testing

1. **Run Migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

2. **Update Tests**
   - Refactor `__tests__/orders.service.test.ts` to use a test database or a mock for the Prisma client.
   - Ensure integration tests in `api.test.ts` still pass with the database connected.

---

## Alternative: MongoDB + Mongoose

If you prefer a NoSQL approach (closer to the current JSON-like structure):

1. **Setup**: `npm install mongoose`.
2. **Models**: Define Mongoose schemas for `Menu` and `Order`.
3. **Logic**: Replace Map operations with `Model.create()`, `Model.find()`, etc.
4. **Pros**: Very flexible schema, easy to store nested objects (like `items` and `delivery`).

---

## Summary of Files to Modify

| File | Change Required |
| :--- | :--- |
| `src/lib/menu-data.ts` | Deprecate or use only for seeding. |
| `src/services/orders.service.ts` | Major refactor: replace Map logic with DB queries. |
| `src/controllers/menu.controller.ts` | Update to fetch menu from DB. |
| `src/controllers/orders.controller.ts` | Update handlers to handle async service calls. |
| `.env` | Add `DATABASE_URL`. |
| `package.json` | Add DB-related dependencies and scripts. |
