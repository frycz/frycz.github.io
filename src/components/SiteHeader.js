import React from "react";
import { Link } from "gatsby";
import ThemeToggle from "./ThemeToggle";
import TocToggle from "./TocToggle";

// The bar that stays at the top of every page. md-reader owns the box; what sits in it is the
// site's own navigation and the one setting that belongs to every page: the theme.
//
// What is in the bar spans the block below it rather than the window, which means the bar has
// to know about the one thing that moves that block: the contents rail. `railOpen` is whether
// it currently takes a column, and `animated` whether the bar should travel when that changes
// or simply be where it belongs — the same question Article.js answers for the rail itself. A
// page with no rail says nothing and gets the text column alone.
//
// The contents switch is not in the bar: it floats under it, over the contents it opens. It
// hangs off the end of the bar's row all the same, because that row already ends on the edge
// the button has to line up with — the rail's, or the text's once the rail is closed.
const SiteHeader = ({ railOpen = false, animated = false, onToggleRail }) => {
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
        {onToggleRail && <TocToggle open={railOpen} onToggle={onToggleRail} />}
      </div>
    </header>
  );
};

export default SiteHeader;
