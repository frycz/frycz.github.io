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

  // A page with no rail has nothing to switch, so the theme is the only control there.
  it("carries the theme toggle and nothing else", () => {
    render(<SiteHeader />);
    expect(screen.getByText("Theme Toggle")).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: /table of contents/i })).not.toBeInTheDocument();
  });

  // The switch floats under the bar rather than sitting in it, but it hangs off the end of the
  // bar's row, which is the edge it has to line up with — so this is where it is rendered.
  it("hangs the contents switch off its row when there is a rail to switch", () => {
    const onToggleRail = jest.fn();
    render(<SiteHeader railOpen onToggleRail={onToggleRail} />);

    const button = screen.getByRole("button", { name: /toggle table of contents/i });
    expect(button).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(button);
    expect(onToggleRail).toHaveBeenCalledTimes(1);
  });

  // The bar's contents line up with the article's text, so the bar has to leave room for the
  // same rail the text does. A page without one says nothing and gets the whole window.
  describe("the room it leaves for the contents rail", () => {
    it("is none by default", () => {
      render(<SiteHeader />);
      expect(screen.getByRole("banner")).toHaveAttribute("data-toc", "off");
    });

    it("is the rail's column while the rail is open", () => {
      const { rerender } = render(<SiteHeader railOpen />);
      expect(screen.getByRole("banner")).toHaveAttribute("data-toc", "on");

      rerender(<SiteHeader railOpen={false} />);
      expect(screen.getByRole("banner")).toHaveAttribute("data-toc", "off");
    });

    // Arriving at the right width is not a movement anyone asked to watch; see Article.js.
    it("travels there only once the page has settled", () => {
      const { rerender } = render(<SiteHeader railOpen />);
      expect(screen.getByRole("banner")).not.toHaveClass("toc-animated");

      rerender(<SiteHeader railOpen animated />);
      expect(screen.getByRole("banner")).toHaveClass("toc-animated");
    });
  });
});
