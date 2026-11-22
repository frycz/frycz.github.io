import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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

  // A page with no contents rail has nothing to hide, so the theme is the only setting there.
  it("carries the theme toggle and nothing else", () => {
    render(<SiteHeader />);
    expect(screen.getByText("Theme Toggle")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(1);
  });

  describe("the contents button", () => {
    const tocButton = () => screen.queryByRole("button", { name: /toggle table of contents/i });

    it("is offered only on a page that has a rail to hide", () => {
      render(<SiteHeader />);
      expect(tocButton()).not.toBeInTheDocument();
    });

    it("says whether the rail is open", () => {
      const { rerender } = render(<SiteHeader toc={{ open: true, toggle: () => {} }} />);
      expect(tocButton()).toHaveAttribute("aria-expanded", "true");

      rerender(<SiteHeader toc={{ open: false, toggle: () => {} }} />);
      expect(tocButton()).toHaveAttribute("aria-expanded", "false");
    });

    it("asks for the rail to be toggled when clicked", () => {
      const toggle = jest.fn();
      render(<SiteHeader toc={{ open: true, toggle }} />);

      fireEvent.click(tocButton());
      expect(toggle).toHaveBeenCalledTimes(1);
    });
  });
});
