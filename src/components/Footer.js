import React from "react";

/* global __BUILD_DATE__ */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const buildDate = typeof __BUILD_DATE__ !== "undefined" ? __BUILD_DATE__ : "";

  // The inner row carries the width, so the footer lines up with the text column above it
  // the same way md-reader lines up everything else in that column.
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer-row">
        <p className="muted">© {currentYear} Adam Sawicki</p>
        {buildDate && <p className="muted build-date">{`Build: ${buildDate}`}</p>}
      </div>
    </footer>
  );
};

export default Footer;
