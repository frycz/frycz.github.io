import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../ThemeToggle";

describe("ThemeToggle", () => {
  let mockMatchMedia;

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");

    mockMatchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    window.matchMedia = mockMatchMedia;
  });

  it("renders the toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("uses saved theme from localStorage", () => {
    localStorage.setItem("theme-preference", "dark");
    render(<ThemeToggle />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(screen.getByText("Light mode")).toBeInTheDocument();
  });

  it("falls back to system preference when no saved theme", () => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: true, // dark mode
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    render(<ThemeToggle />);
    expect(screen.getByText("Light mode")).toBeInTheDocument();
  });

  it("toggles theme when clicked", () => {
    localStorage.setItem("theme-preference", "light");
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(screen.getByText("Dark mode")).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.getByText("Light mode")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(localStorage.getItem("theme-preference")).toBe("dark");
  });

  it("has correct accessibility attributes", () => {
    localStorage.setItem("theme-preference", "dark");
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("cleans up event listener on unmount", () => {
    const removeEventListener = jest.fn();
    mockMatchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener,
    }));

    const { unmount } = render(<ThemeToggle />);
    unmount();

    expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
  });
});
