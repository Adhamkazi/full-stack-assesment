// All API calls go through this file.
// Set NEXT_PUBLIC_API_URL in .env.local to point to the Express backend.

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const api = {
  // GET /api/menu
  async getMenu() {
    const res = await fetch(`${BASE_URL}/api/menu`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch menu");
    return res.json();
  },

  // POST /api/orders
  async placeOrder(payload: {
    items: unknown[];
    delivery: { name: string; address: string; phone: string };
    total: number;
  }) {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  // GET /api/orders/:id
  async getOrder(id: string) {
    const res = await fetch(`${BASE_URL}/api/orders/${id}`);
    if (!res.ok) throw new Error("Order not found");
    return res.json();
  },

  // Returns the SSE stream URL (used with EventSource)
  getStreamUrl(id: string) {
    return `${BASE_URL}/api/orders/${id}/stream`;
  },
};
