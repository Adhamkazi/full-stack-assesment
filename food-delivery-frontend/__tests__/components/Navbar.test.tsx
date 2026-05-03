import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Navbar from "@/components/Navbar";
import { useCartStore } from "@/store/cart-store";
import { MenuItem } from "@/lib/types";

const mockItem: MenuItem = {
  id: "test-1",
  name: "Test Pizza",
  description: "A test pizza",
  price: 12.99,
  image: "https://example.com/pizza.jpg",
  category: "Pizza",
};

describe("Navbar", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  it("does not show badge when cart is empty", () => {
    render(<Navbar />);
    expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();
  });

  it("shows the correct count when items are added", async () => {
    render(<Navbar />);
    
    // Initially empty
    expect(screen.queryByTestId("cart-badge")).not.toBeInTheDocument();

    // Add item to store
    act(() => {
      useCartStore.getState().addItem(mockItem);
    });

    // Should update automatically
    expect(screen.getByTestId("cart-badge")).toHaveTextContent("1");

    // Add another item
    act(() => {
      useCartStore.getState().addItem(mockItem);
    });

    expect(screen.getByTestId("cart-badge")).toHaveTextContent("2");
  });
});
