import React, { useEffect, useRef, useState } from "react";
import { mountReader } from "md-reader";
import { getSettings, subscribeSettings } from "../lib/reader-settings";

// An article: the rendered markdown plus the reading layer md-reader puts on top of it.
// Both of md-reader's layout columns come from here, because the contents rail is a sibling
// of the text column rather than something inside it.
const Reader = ({ html, head, foot, onToc, onNavigate }) => {
  const contentRef = useRef(null);
  const tocRef = useRef(null);
  const [hasToc, setHasToc] = useState(false);

  // Only the article's html decides whether the reader remounts. onToc and onNavigate are ways
  // to report upward, so they ride along in refs instead of becoming remount triggers.
  const onTocRef = useRef(onToc);
  onTocRef.current = onToc;
  const onNavigateRef = useRef(onNavigate);
  onNavigateRef.current = onNavigate;

  useEffect(() => {
    const reader = mountReader({
      content: contentRef.current,
      tocList: tocRef.current,
      tocDepth: getSettings().tocDepth,
      // The bar is sticky, so a heading counts as current once it clears the bar's height.
      offset: () => headerHeight() + 24,
      onNavigate: (id) => {
        window.history.replaceState(null, "", `#${encodeURIComponent(id)}`);
        onNavigateRef.current?.(id);
      },
    });

    // md-reader animates its way to a picked heading. Here the jump is instant, so the click is
    // caught on the way down and stopped before the reader's own handler, below, ever sees it.
    // What that handler did other than the animation is done here instead.
    const onTocClick = (event) => {
      const link = event.target.closest?.("a[data-target]");
      if (!link || !tocRef.current.contains(link)) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      event.stopPropagation();

      const id = link.dataset.target;
      document.getElementById(id)?.scrollIntoView();
      window.history.replaceState(null, "", `#${encodeURIComponent(id)}`);
      onNavigateRef.current?.(id);
    };
    tocRef.current.addEventListener("click", onTocClick, true);

    // The rail is worth its column only once a post has something to navigate. The button needs
    // to hear about it too: that is what decides whether there is one at all.
    const found = tocRef.current.querySelectorAll("a[data-target]").length > 1;
    setHasToc(found);
    onTocRef.current?.(found);

    // Diagrams are drawn with the palette that was in effect, so a theme change has to redraw them.
    const unsubscribe = subscribeSettings((settings, patch) => {
      if ("theme" in patch) void reader.redrawDiagrams();
    });

    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) document.getElementById(hash)?.scrollIntoView();

    const toc = tocRef.current;
    return () => {
      toc.removeEventListener("click", onTocClick, true);
      unsubscribe();
      reader.destroy();
    };
  }, [html]);

  return (
    <>
      <main className="mdr-main" id="content" role="main">
        {head}
        <article className="markdown-body" ref={contentRef} dangerouslySetInnerHTML={{ __html: html }} />
        {foot}
      </main>

      <aside className="mdr-toc" id="toc" hidden={!hasToc} aria-label="Contents">
        <div className="mdr-toc-head">Contents</div>
        <nav className="mdr-toc-list" ref={tocRef} />
      </aside>
    </>
  );
};

// --header-h is the one place the bar's height is written down; read it rather than repeating it.
function headerHeight() {
  const value = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  return parseFloat(value) || 0;
}

export default Reader;
