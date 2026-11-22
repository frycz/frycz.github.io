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

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      aria-pressed={theme === "dark"}
    >
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </button>
  );
};

export default ThemeToggle;
