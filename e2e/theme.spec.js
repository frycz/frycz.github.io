const { test, expect } = require("@playwright/test");

const SETTINGS_KEY = "mdr:settings";

const storedTheme = (page) =>
  page.evaluate((key) => JSON.parse(localStorage.getItem(key) || "{}").theme, SETTINGS_KEY);

const toggle = (page) => page.getByRole("button", { name: /toggle theme/i });

test.describe("Theme toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    // The button is in the server-rendered HTML before it does anything, so a click that beats
    // hydration is swallowed. With storage cleared, this attribute is written by the toggle
    // mounting and by nothing else, which makes it the signal that the button is live.
    await page.waitForFunction(() => !!document.documentElement.dataset.contentFont);
  });

  test("the toggle is visible", async ({ page }) => {
    await expect(toggle(page)).toBeVisible();
  });

  test("follows the system theme until the first click", async ({ page }) => {
    await expect(page.locator("html")).not.toHaveAttribute("data-theme", /.+/);
  });

  test("clicking changes the theme", async ({ page }) => {
    const initial = await toggle(page).getAttribute("aria-pressed");

    await toggle(page).click();

    expect(await toggle(page).getAttribute("aria-pressed")).not.toBe(initial);
    await expect(page.locator("html")).toHaveAttribute("data-theme", /^(light|dark)$/);
  });

  // The icon is chosen by the stylesheet from the theme the bootstrap script already put on the
  // document, so the button is correct in the first paint rather than corrected after hydration.
  test("the icon matches the theme from the first paint", async ({ page }) => {
    await page.evaluate(
      ([key, value]) => localStorage.setItem(key, value),
      [SETTINGS_KEY, JSON.stringify({ theme: "dark" })],
    );
    await page.goto("/", { waitUntil: "commit" });

    const sun = page.locator(".theme-icon-sun");
    const moon = page.locator(".theme-icon-moon");
    // A dark page offers the way back to light, and only that. Checked before the bundles are
    // asked for, which is exactly when the old label was still showing the wrong word.
    await expect(sun).toBeVisible();
    await expect(moon).toBeHidden();

    await toggle(page).click();
    await expect(moon).toBeVisible();
    await expect(sun).toBeHidden();
  });

  test("clicking twice returns to where it started", async ({ page }) => {
    await toggle(page).click();
    const first = await storedTheme(page);

    await toggle(page).click();
    expect(await storedTheme(page)).not.toBe(first);

    await toggle(page).click();
    expect(await storedTheme(page)).toBe(first);
  });

  test("the theme persists across navigation", async ({ page }) => {
    await toggle(page).click();
    const chosen = await page.locator("html").getAttribute("data-theme");

    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL("/blog/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", chosen);
  });

  test("the theme persists across a reload", async ({ page }) => {
    await toggle(page).click();
    const chosen = await page.locator("html").getAttribute("data-theme");

    await page.reload();
    await expect(toggle(page)).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-theme", chosen);
  });

  test("the theme is saved to localStorage", async ({ page }) => {
    await toggle(page).click();
    expect(["light", "dark"]).toContain(await storedTheme(page));
  });

  test("a stored theme is on the document before the page paints", async ({ page }) => {
    await page.evaluate(
      ([key, value]) => localStorage.setItem(key, value),
      [SETTINGS_KEY, JSON.stringify({ theme: "dark" })],
    );

    // The inline bootstrap script runs before the body, so the attribute is already there
    // when the DOM is first readable, not only after the bundles hydrate.
    await page.goto("/blog", { waitUntil: "commit" });
    await page.waitForFunction(() => !!document.documentElement.dataset.theme);
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("the site's typography is the viewer's, applied without being offered as a choice", async ({ page }) => {
    await expect(page.locator("html")).toHaveAttribute("data-content-font", "mono");
    await expect(page.locator("html")).toHaveAttribute("style", /--font-size: 16px/);
  });

  // The reading font is the prose font and only the prose font. The rail, like the rest of the
  // chrome, keeps the UI font, which is what tells a reader it is not part of the article.
  test("prose is set in the reading font and the contents rail is not", async ({ page }) => {
    await page.goto("/blog/triangle-of-success");

    const family = (sel) =>
      page.locator(sel).first().evaluate((el) => getComputedStyle(el).fontFamily.split(",")[0]);

    const prose = await family(".markdown-body p");
    const rail = await family(".mdr-toc-list a");
    const bar = await family(".site-nav a");

    expect(prose).not.toBe(rail);
    expect(bar).toBe(rail);
  });

  // Closing the rail is the reader's call, and the text column takes the space back.
  test("the floating contents button opens and closes the rail", async ({ page }) => {
    await page.goto("/blog/triangle-of-success");

    const button = page.getByRole("button", { name: /toggle table of contents/i });
    const rail = page.locator(".mdr-toc");
    const railWidth = () => rail.evaluate((el) => el.getBoundingClientRect().width);
    // The prose itself is capped at --content-width, so what the rail gives back shows up in
    // the column around it rather than in the line length.
    const columnWidth = () =>
      page.locator(".mdr-main").evaluate((el) => el.getBoundingClientRect().width);

    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect(rail).toBeVisible();
    await expect.poll(railWidth).toBeGreaterThan(0);
    const openWidth = await columnWidth();

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "false");
    // The column closes over the rail rather than the rail leaving the page outright, so what
    // settles is its width, not whether the element is still there.
    await expect.poll(railWidth).toBe(0);
    expect(await columnWidth()).toBeGreaterThan(openWidth);

    await button.click();
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await expect.poll(columnWidth).toBe(openWidth);
    expect(await railWidth()).toBeGreaterThan(0);
  });

  // A page with no headings worth listing has no rail, and so has no button for one either.
  test("a page without a rail is not offered the button", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.getByRole("button", { name: /toggle table of contents/i })).toHaveCount(0);
  });

  // The rail is a column of the layout, not something floated into the margin, so it sits
  // beside the prose at any width rather than over it.
  test("the contents rail takes its own space next to the text column", async ({ page }) => {
    await page.goto("/blog/triangle-of-success");

    const rail = page.locator(".mdr-toc");
    await expect(rail).toBeVisible();

    const article = await page.locator(".markdown-body").evaluate((el) => el.getBoundingClientRect().right);
    const railLeft = await rail.evaluate((el) => el.getBoundingClientRect().left);
    expect(article).toBeLessThanOrEqual(railLeft);
  });
});
