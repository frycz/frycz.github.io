// The module caches the settings for the life of the page, so each test loads its own copy.
const freshModule = () => {
  let mod;
  jest.isolateModules(() => {
    mod = require("../reader-settings");
  });
  return mod;
};

describe("reader settings", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it("defaults to following the system, and reads like the markdown viewer", () => {
    const { getSettings } = freshModule();
    expect(getSettings()).toMatchObject({ theme: "system", contentFont: "mono", fontSize: 16, contentWidth: 75 });
  });

  // Typography is md-reader's, not storage's, so an older stored shape cannot strand a
  // returning visitor on values the site has moved off.
  it("takes only the theme from storage", () => {
    const { SETTINGS_KEY } = freshModule();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ theme: "dark", contentFont: "sans", fontSize: 16 }));

    expect(freshModule().getSettings()).toMatchObject({ theme: "dark", contentFont: "mono", fontSize: 16 });
  });

  it("writes back the theme and nothing else", () => {
    const { updateSettings, SETTINGS_KEY } = freshModule();
    updateSettings({ theme: "light" });

    expect(JSON.parse(localStorage.getItem(SETTINGS_KEY))).toEqual({ theme: "light" });
  });

  it("carries a theme saved under the old key over to the new one", () => {
    localStorage.setItem("theme-preference", "dark");

    const { getSettings, SETTINGS_KEY } = freshModule();
    expect(getSettings().theme).toBe("dark");
    expect(JSON.parse(localStorage.getItem(SETTINGS_KEY)).theme).toBe("dark");
    // Migrated once, then forgotten.
    expect(localStorage.getItem("theme-preference")).toBeNull();
  });

  it("ignores a junk value under the old key", () => {
    localStorage.setItem("theme-preference", "chartreuse");

    const { getSettings } = freshModule();
    expect(getSettings().theme).toBe("system");
  });

  it("does not let the old key override an explicit new choice", () => {
    const { SETTINGS_KEY } = freshModule();
    localStorage.setItem(SETTINGS_KEY, JSON.stringify({ theme: "light" }));
    localStorage.setItem("theme-preference", "dark");

    expect(freshModule().getSettings().theme).toBe("light");
  });

  it("survives storage being unavailable", () => {
    const getItem = jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("denied");
    });
    const setItem = jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("denied");
    });

    const { getSettings, updateSettings } = freshModule();
    expect(getSettings().theme).toBe("system");
    expect(() => updateSettings({ theme: "dark" })).not.toThrow();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    getItem.mockRestore();
    setItem.mockRestore();
  });
});
