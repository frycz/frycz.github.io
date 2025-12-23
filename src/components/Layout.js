import React from "react";
import { Link } from "gatsby";
import ThemeToggle from "./ThemeToggle";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/global.css";

const Layout = ({ children, title, subtitle, date, headerNav }) => {
  return (
    <div className="page">
      <div className="topbar container">
        <div className="toggle-row">
          <Link to="/">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/#projects-heading">Projects</Link>
          <a href="/rss.xml" title="RSS Feed" className="rss-link">RSS</a>
          <ThemeToggle />
        </div>
      </div>

      <Header
        title={title || "Adam Sawicki — Software Engineer"}
        subtitle={subtitle}
        date={date}
      >
        {headerNav}
      </Header>

      <main id="content" className="container" role="main">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
