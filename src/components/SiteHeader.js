import React from "react";
import { Link } from "gatsby";
import ThemeToggle from "./ThemeToggle";

// The bar that stays at the top of every page. md-reader owns the box; what sits in it is the
// site's own navigation and the two controls a reader gets: the theme, and — on a page that
// has a contents rail to hide — the rail. `toc` is absent on a page without one, and the
// button goes with it rather than standing there doing nothing.
const SiteHeader = ({ toc }) => {
  return (
    <header className="mdr-header" role="banner">
      <Link className="mdr-header-title site-title" to="/">
        Adam Sawicki
      </Link>
      <div className="mdr-spacer" />
      <nav className="site-nav" aria-label="Site">
        <Link to="/">Home</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/projects">Projects</Link>
        <a href="/rss.xml" title="RSS Feed">
          RSS
        </a>
      </nav>
      <ThemeToggle />
      {toc && (
        <button
          className="mdr-icon-btn toc-toggle"
          onClick={toc.toggle}
          aria-label="Toggle table of contents"
          aria-expanded={toc.open}
          aria-controls="toc"
          title="Toggle table of contents"
        >
          ≡
        </button>
      )}
    </header>
  );
};

export default SiteHeader;
