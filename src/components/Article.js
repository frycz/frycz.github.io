import React, { useCallback, useEffect, useState } from "react";
import { Link } from "gatsby";
import SiteHeader from "./SiteHeader";
import Header from "./Header";
import Footer from "./Footer";
import Reader from "./Reader";
import "../styles/global.css";

// A post or a project: the same page as the markdown viewer, with the site's bar on top.
// Reader fills both of the grid's columns, because the contents rail is a column of the
// layout rather than something floated into the margin.
// The way back out of an article is offered twice: once under the title, for a reader who has
// not started yet, and once at the end, where a reader who finished actually is.
const Article = ({ html, title, date, backTo, backLabel }) => {
  const back = backTo ? (
    <Link to={backTo}>← {backLabel}</Link>
  ) : null;

  // The rail belongs to the reader, the button to the bar, and the column they argue over is
  // the layout's. This is the one place that sees all three.
  const [hasToc, setHasToc] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);
  const [animated, setAnimated] = useState(false);
  const toggleToc = useCallback(() => setTocOpen((open) => !open), []);

  // The rail only knows whether it has anything to list once it has read the headings, so it
  // arrives a moment after the page does. That arrival is not a change anyone asked for, and
  // animating it would make every article open with the rail sliding in. The transition is
  // armed a frame later, by which time the page is settled and the only thing left that can
  // move the rail is the button.
  useEffect(() => {
    let second;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setAnimated(true));
    });
    return () => {
      cancelAnimationFrame(first);
      if (second) cancelAnimationFrame(second);
    };
  }, []);

  return (
    <>
      <SiteHeader toc={hasToc ? { open: tocOpen, toggle: toggleToc } : null} />

      <div
        className={`mdr-layout${animated ? " toc-animated" : ""}`}
        data-toc={tocOpen ? "on" : "off"}
      >
        <Reader
          html={html}
          onToc={setHasToc}
          head={
            <Header title={title} date={date}>
              {back && <p className="header-nav">{back}</p>}
            </Header>
          }
          foot={back && <nav className="article-nav">{back}</nav>}
        />

        <Footer />
      </div>
    </>
  );
};

export default Article;
