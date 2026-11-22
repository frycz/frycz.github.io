import React from "react";

// The page's own title block, at the top of the text column. The site identity and the way
// home live in the bar above it, so this is only about the page: its title, what it is, and
// when it was written.
const Header = ({ title, subtitle, date, children }) => {
  return (
    <header className="page-head">
      <h1>{title}</h1>
      {subtitle && <p className="muted">{subtitle}</p>}
      {date && <p className="muted small">{date}</p>}
      {children}
      <hr />
    </header>
  );
};

export default Header;
