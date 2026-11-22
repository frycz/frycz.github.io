import React from "react";
import SiteHeader from "./SiteHeader";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/global.css";

// Every page that is not an article: the same bar and the same text column as an article has,
// without the contents rail. md-reader's grid leaves out the rail column when nothing is in
// it, so there is no empty gutter to account for here.
const Layout = ({ children, title, subtitle, date, headerNav }) => {
  return (
    <>
      <SiteHeader />

      <div className="mdr-layout">
        <main className="mdr-main" id="content" role="main">
          <Header
            title={title || "Adam Sawicki — Software Engineer"}
            subtitle={subtitle}
            date={date}
          >
            {headerNav}
          </Header>

          {children}
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
