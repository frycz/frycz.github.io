// One owner for the reader settings, so the theme toggle and the article reader agree on the
// current values without passing them through the page tree.

import { applySettings, createSettingsStore, DEFAULT_SETTINGS } from "md-reader";

export const SETTINGS_KEY = "mdr:settings";

// Theme is the only setting a reader gets to choose, and the toggle in the bar is the whole
// interface for it. Everything else — the size of the text, the width of the column, how deep
// the contents go — is md-reader's default, so the site reads the way the viewer does.
//
// The prose font and its size are what the site picks for itself: the reading font, which
// leaves --font-ui to the bar, the footer and the contents rail, at the size the bar is set in.
// global.css says the same thing, and has to: this is applied by a script, and a page that
// waited for it would paint its first screen in the wrong font.
export const DEFAULTS = { ...DEFAULT_SETTINGS, theme: "system", contentFont: "mono", fontSize: 16 };

const isBrowser = typeof window !== "undefined";

// The theme is the only field written, and the only one read back — which is the store's own
// `persist`, so storage can neither strand a returning visitor on the typography the site had
// the day they last read something, nor hand the bootstrap script stale values to stamp on the
// document before the page paints.
const store = createSettingsStore({ key: SETTINGS_KEY, defaults: DEFAULTS, persist: ["theme"] });

let current = null;
const subscribers = new Set();

// The theme used to live in its own key as a bare string. Carry a returning visitor's choice
// over once, then let it go.
function migrateLegacyTheme(settings) {
  try {
    const legacy = localStorage.getItem("theme-preference");
    if (legacy !== "light" && legacy !== "dark") return settings;
    localStorage.removeItem("theme-preference");
    const migrated = { ...settings, theme: legacy };
    store.save(migrated);
    return migrated;
  } catch {
    return settings;
  }
}

export function getSettings() {
  if (!isBrowser) return { ...DEFAULTS };
  if (!current) {
    const stored = store.load();
    current = stored.theme === "system" ? migrateLegacyTheme(stored) : stored;
  }
  return current;
}

export function updateSettings(patch) {
  current = { ...getSettings(), ...patch };
  store.save(current);
  applySettings(current);
  for (const fn of subscribers) fn(current, patch);
}

export function subscribeSettings(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

// The inline bootstrap script already stamped the theme from storage; this applies the
// resolved settings so a legacy migration, or a visitor with nothing stored, still lands.
export function initSettings() {
  if (!isBrowser) return;
  applySettings(getSettings());
}
