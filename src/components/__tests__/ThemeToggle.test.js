import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../ThemeToggle";
import { DEFAULTS, SETTINGS_KEY, updateSettings } from "../../lib/reader-settings";

const storedTheme = () => JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}").theme;

describe("ThemeToggle", () => {
  let mockMatchMedia;

  const mockSystemDark = (dark) => {
    mockMatchMedia.mockImplementation((query) => ({
      matches: dark,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  };

  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");

    mockMatchMedia = jest.fn();
    window.matchMedia = mockMatchMedia;
    mockSystemDark(false);

    // The settings module is a per-page singleton, so one test's choice would otherwise
    // still be in effect in the next one.
    updateSettings(DEFAULTS);
  });

  it("renders the toggle button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
  });

  it("uses the saved theme", () => {
    updateSettings({ theme: "dark" });
    render(<ThemeToggle />);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(screen.getByText("Light mode")).toBeInTheDocument();
  });

  it("follows the system preference until a choice is made", () => {
    mockSystemDark(true);
    render(<ThemeToggle />);

    expect(screen.getByText("Light mode")).toBeInTheDocument();
    // Following the system means claiming neither theme on the document.
    expect(document.documentElement.hasAttribute("data-theme")).toBe(false);
  });

  it("toggles the theme when clicked", () => {
    updateSettings({ theme: "light" });
    render(<ThemeToggle />);
    expect(screen.getByText("Dark mode")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText("Light mode")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(storedTheme()).toBe("dark");
  });

  it("makes the system theme explicit on the first click", () => {
    mockSystemDark(true);
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button"));

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(storedTheme()).toBe("light");
  });

  it("has correct accessibility attributes", () => {
    updateSettings({ theme: "dark" });
    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
    expect(button).toHaveAttribute("aria-pressed", "true");
  });

  it("cleans up the system theme listener on unmount", () => {
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

  // The toggle is the only setting on the site, but mounting it is also what applies the
  // reading values — which are md-reader's, the same ones the markdown viewer uses.
  it("applies the viewer's typography alongside the theme", () => {
    render(<ThemeToggle />);
    expect(document.documentElement.getAttribute("data-content-font")).toBe("mono");
    expect(document.documentElement.style.getPropertyValue("--font-size")).toBe("16px");
    expect(document.documentElement.style.getPropertyValue("--content-width")).toBe("75ch");
  });
});
