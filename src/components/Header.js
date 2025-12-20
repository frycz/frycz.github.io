import React from "react";
import { Link } from "gatsby";

const Header = ({ title, subtitle, date, children }) => {
  return (
    <header className="container" role="banner">
      <h1>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          {title}
        </Link>
      </h1>
      {subtitle && <p className="muted">{subtitle}</p>}
      {date && <p className="muted small">{date}</p>}
      {children}
      <hr />
    </header>
  );
};

export default Header;
