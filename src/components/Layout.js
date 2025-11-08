import React from "react";
import ThemeToggle from "./ThemeToggle";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/global.css";

const Layout = ({ children, title, subtitle }) => {
  return (
    <div className="page">
      <div className="topbar container">
        <div className="toggle-row">
          <ThemeToggle />
        </div>
      </div>

      <Header
        title={title || "Adam — Software Developer"}
        subtitle={subtitle || "Building reliable, minimal, and fast software."}
      />

      <main id="content" className="container" role="main">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
