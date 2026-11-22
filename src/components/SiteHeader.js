import React from "react";
import { Link } from "gatsby";
import ThemeToggle from "./ThemeToggle";

// The bar that stays at the top of every page. md-reader owns the box; what sits in it is the
// site's own navigation and the one setting that belongs to every page: the theme. The contents
// switch is not here — it floats under the bar, beside the contents it opens: see TocToggle.
//
// What is in the bar lines up with the article's text rather than with the window, which means
// the bar has to know about the one thing that moves the text: the contents rail. `railOpen`
// is whether it currently takes a column, and `animated` whether the bar should travel when
// that changes or simply be where it belongs — the same question Article.js answers for the
// rail itself. A page with no rail says nothing and gets the window.
const SiteHeader = ({ railOpen = false, animated = false }) => {
  return (
    <header
      className={`mdr-header site-header${animated ? " toc-animated" : ""}`}
      role="banner"
      data-toc={railOpen ? "on" : "off"}
    >
      <div className="site-header-inner">
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
      </div>
    </header>
  );
};

export default SiteHeader;
