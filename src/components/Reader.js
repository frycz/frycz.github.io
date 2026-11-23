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
      // md-reader animates its way to a picked heading; here the heading is simply there.
      // The offset the scroll spy measures against is its default: --header-h plus breathing room.
      scrollTo: (el) => el.scrollIntoView(),
      onNavigate: (id) => {
        window.history.replaceState(null, "", `#${encodeURIComponent(id)}`);
        onNavigateRef.current?.(id);
      },
    });

    // The rail is worth its column only once a post has something to navigate. The button needs
    // to hear about it too: that is what decides whether there is one at all.
    const found = reader.toc.count() > 1;
    setHasToc(found);
    onTocRef.current?.(found);

    // Diagrams are drawn with the palette that was in effect, so a theme change has to redraw them.
    const unsubscribe = subscribeSettings((settings, patch) => {
      if ("theme" in patch) void reader.redrawDiagrams();
    });

    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash) document.getElementById(hash)?.scrollIntoView();

    return () => {
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

export default Reader;
