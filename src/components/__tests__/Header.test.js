import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders the title", () => {
    render(<Header title="Test Title" />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Test Title");
  });

  it("renders subtitle when provided", () => {
    render(<Header title="Test" subtitle="A subtitle" />);
    expect(screen.getByText("A subtitle")).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    render(<Header title="Test" />);
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  it("renders date when provided", () => {
    render(<Header title="Test" date="January 1, 2024" />);
    expect(screen.getByText("January 1, 2024")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <Header title="Test">
        <nav>Navigation</nav>
      </Header>
    );
    expect(screen.getByText("Navigation")).toBeInTheDocument();
  });

  it("has banner role", () => {
    render(<Header title="Test" />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  it("title links to homepage", () => {
    render(<Header title="Test Title" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/");
  });
});
