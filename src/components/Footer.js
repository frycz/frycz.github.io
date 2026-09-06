import React from "react";

/* global __BUILD_DATE__ */

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const buildDate = typeof __BUILD_DATE__ !== "undefined" ? __BUILD_DATE__ : "";

  return (
    <footer className="container" role="contentinfo">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p className="muted">© {currentYear} Adam Sawicki</p>
        {buildDate && (
          <p
            className="muted"
            style={{ fontSize: "0.5rem" }}
          >{`Build: ${buildDate}`}</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
