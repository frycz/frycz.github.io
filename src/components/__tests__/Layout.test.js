import React from "react";
import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

// Mock child components to isolate Layout testing
jest.mock("../ThemeToggle", () => () => <button>Theme Toggle</button>);

describe("Layout", () => {
  beforeEach(() => {
    // Mock matchMedia for ThemeToggle
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it("renders children", () => {
    render(
      <Layout>
        <p>Test content</p>
      </Layout>
    );
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Layout>Content</Layout>);

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/#projects-heading");
  });

  it("renders default title when not provided", () => {
    render(<Layout>Content</Layout>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Adam Sawicki — Software Engineer"
    );
  });

  it("renders custom title when provided", () => {
    render(<Layout title="Custom Title">Content</Layout>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Custom Title");
  });

  it("has main content area with correct role", () => {
    render(<Layout>Content</Layout>);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });

  it("includes ThemeToggle", () => {
    render(<Layout>Content</Layout>);
    expect(screen.getByText("Theme Toggle")).toBeInTheDocument();
  });

  it("renders RSS link with correct attributes", () => {
    render(<Layout>Content</Layout>);
    const rssLink = screen.getByRole("link", { name: "RSS" });
    expect(rssLink).toHaveAttribute("href", "/rss.xml");
    expect(rssLink).toHaveAttribute("title", "RSS Feed");
  });
});
