import React from "react";
import { Link } from "gatsby";

const Header = ({ title, subtitle }) => {
  return (
    <header className="container" role="banner">
      <h1>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          {title}
        </Link>
      </h1>
      <p className="muted">{subtitle}</p>
      <hr />
    </header>
  );
};

export default Header;
