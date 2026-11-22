import React from "react";
import { render, screen } from "@testing-library/react";
import SiteHeader from "../SiteHeader";

jest.mock("../ThemeToggle", () => () => <button>Theme Toggle</button>);

describe("SiteHeader", () => {
  it("is the page's banner", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  // The site's name is the shortest way home, which is where a visitor expects to be taken.
  it("takes the site name home", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Adam Sawicki" })).toHaveAttribute("href", "/");
  });

  it("links to every section of the site", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Blog" })).toHaveAttribute("href", "/blog");
    expect(screen.getByRole("link", { name: "Projects" })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: "RSS" })).toHaveAttribute("href", "/rss.xml");
  });

  // The contents switch floats under the bar now, so the theme is the only setting in it.
  it("carries the theme toggle and nothing else", () => {
    render(<SiteHeader />);
    expect(screen.getByText("Theme Toggle")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: /table of contents/i })).not.toBeInTheDocument();
  });
});
