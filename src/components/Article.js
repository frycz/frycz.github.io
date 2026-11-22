import React, { useCallback, useEffect, useState } from "react";
import { Link } from "gatsby";
import SiteHeader from "./SiteHeader";
import Header from "./Header";
import Footer from "./Footer";
import Reader from "./Reader";
import TocToggle from "./TocToggle";
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

  // The rail belongs to the reader, the button floats over the page, and the column they argue
  // over is the layout's. This is the one place that sees all three.
  const [hasToc, setHasToc] = useState(false);
  const [tocOpen, setTocOpen] = useState(true);
  const [animated, setAnimated] = useState(false);
  // Below md-reader's rail breakpoint there is no column to give the rail, so the same button
  // opens it as a panel over the article instead. False through the server render and the first
  // paint, which is what keeps a narrow screen from flashing the panel before it is measured.
  const [narrow, setNarrow] = useState(false);
  const toggleToc = useCallback(() => setTocOpen((open) => !open), []);

  // The breakpoint is md-reader's: at 1100px it drops the rail's column. Crossing it either way
  // resets the switch to what that width wants — open beside the text, closed over it.
  useEffect(() => {
    const query = window.matchMedia("(max-width: 1100px)");
    const apply = () => {
      setNarrow(query.matches);
      setTocOpen(!query.matches);
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  // The two ways out of a panel that an overlay is expected to offer. The scrim below is the
  // third, and the floating button is still there as the fourth.
  useEffect(() => {
    if (!narrow || !tocOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setTocOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [narrow, tocOpen]);

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
      <SiteHeader />

      {hasToc && <TocToggle open={tocOpen} onToggle={toggleToc} />}

      <div
        className={`mdr-layout${animated ? " toc-animated" : ""}${narrow ? " toc-panel" : ""}`}
        data-toc={tocOpen ? "on" : "off"}
      >
        {narrow && tocOpen && (
          <button
            type="button"
            className="toc-scrim"
            tabIndex={-1}
            aria-hidden="true"
            onClick={toggleToc}
          />
        )}

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
