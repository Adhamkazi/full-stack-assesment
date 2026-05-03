import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CategoryFilter from "@/components/CategoryFilter";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

describe("CategoryFilter", () => {
  it("renders all categories", () => {
    const categories = ["All", "Pizza", "Burgers"];
    render(<CategoryFilter categories={categories} active="All" />);
    
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Burgers")).toBeInTheDocument();
  });

  it("highlights the active category (case-insensitive)", () => {
    const categories = ["All", "Pizza", "Burgers"];
    const { rerender } = render(<CategoryFilter categories={categories} active="Pizza" />);
    
    const pizzaBtn = screen.getByTestId("category-filter-Pizza");
    expect(pizzaBtn).toHaveClass("bg-orange-500");

    // Test case-insensitive highlighting
    rerender(<CategoryFilter categories={categories} active="pizza" />);
    expect(pizzaBtn).toHaveClass("bg-orange-500");
  });

  it("calls router.push with correct URL when a category is clicked", () => {
    const push = vi.fn();
    (useRouter as any).mockReturnValue({ push });
    
    const categories = ["All", "Pizza"];
    render(<CategoryFilter categories={categories} active="All" />);
    
    fireEvent.click(screen.getByText("Pizza"));
    expect(push).toHaveBeenCalledWith("/?category=Pizza");

    fireEvent.click(screen.getByText("All"));
    expect(push).toHaveBeenCalledWith("/");
  });
});
