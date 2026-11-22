import React from "react";
import { Link } from "gatsby";
import ThemeToggle from "./ThemeToggle";

// The bar that stays at the top of every page. md-reader owns the box; what sits in it is the
// site's own navigation and the one setting that belongs to every page: the theme. The contents
// switch is not here — it floats under the bar, beside the contents it opens: see TocToggle.
const SiteHeader = () => {
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
    </header>
  );
};

export default SiteHeader;
