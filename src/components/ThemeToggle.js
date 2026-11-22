import React, { useEffect, useState } from "react";
import { onSystemThemeChange, resolvedTheme } from "md-reader";
import { getSettings, initSettings, subscribeSettings, updateSettings } from "../lib/reader-settings";

// Until the first click the theme follows the OS. Clicking picks one explicitly, and that
// choice sticks: the same two states the site has always had.
const ThemeToggle = () => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    initSettings();
    setTheme(resolvedTheme());

    // While no explicit choice has been made, the OS is still in charge of the label.
    const stopWatching = onSystemThemeChange(() => {
      if (getSettings().theme === "system") setTheme(resolvedTheme());
    });
    const unsubscribe = subscribeSettings(() => setTheme(resolvedTheme()));

    return () => {
      stopWatching();
      unsubscribe();
    };
  }, []);

  const toggleTheme = () => updateSettings({ theme: theme === "dark" ? "light" : "dark" });

  // Both icons are always in the markup and CSS shows one, because which one is right is
  // already written on the document by the bootstrap script that runs before the body. Picking
  // here instead would mean rendering the wrong one until hydration, which is what used to make
  // the button flicker on arrival.
  return (
    <button
      className="mdr-icon-btn theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
      title="Toggle theme"
    >
      <MoonIcon />
      <SunIcon />
    </button>
  );
};

// Shown on a light page: the moon is where the button goes, not where it is.
const MoonIcon = () => (
  <svg className="theme-icon theme-icon-moon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <path
      d="M13.8 9.6A6.2 6.2 0 0 1 6.4 2.2 6.2 6.2 0 1 0 13.8 9.6Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  </svg>
);

const SunIcon = () => (
  <svg className="theme-icon theme-icon-sun" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
    <g fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <circle cx="8" cy="8" r="3.1" />
      <path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.2 3.2l1.1 1.1M11.7 11.7l1.1 1.1M12.8 3.2l-1.1 1.1M4.3 11.7l-1.1 1.1" />
    </g>
  </svg>
);

export default ThemeToggle;
