import React from "react";

// The switch for the contents. It used to sit in the bar, among the site's own controls,
// which put it as far from the thing it opens as the bar is wide. Now it floats just under
// the bar at the edge the contents hang from, and stays there when they open: over the sheet
// rather than behind it, so the way out is where the way in was. SiteHeader renders it,
// because the bar's row is what that edge belongs to — see .toc-toggle in global.css.
const TocToggle = ({ open, onToggle }) => {
  return (
    <button
      type="button"
      className="mdr-icon-btn toc-toggle"
      onClick={onToggle}
      aria-label="Toggle table of contents"
      aria-expanded={open}
      aria-controls="toc"
      title="Toggle table of contents"
    >
      ≡
    </button>
  );
};

export default TocToggle;
