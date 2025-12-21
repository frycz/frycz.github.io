import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders copyright with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Adam Sawicki`)).toBeInTheDocument();
  });

  it("has contentinfo role", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders build date from global variable", () => {
    render(<Footer />);
    expect(screen.getByText(/Build: 2024-01-01 12:00 CET/)).toBeInTheDocument();
  });
});
