import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container" role="contentinfo">
      <p className="muted">
        © {currentYear} Adam. Text-only. Monospace. Built with care.
      </p>
    </footer>
  );
};

export default Footer;
