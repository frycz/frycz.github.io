const { test, expect } = require("@playwright/test");

test.describe("Theme Toggle", () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test("theme toggle button is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /toggle theme/i })).toBeVisible();
  });

  test("clicking toggle changes theme", async ({ page }) => {
    await page.goto("/");

    const toggleButton = page.getByRole("button", { name: /toggle theme/i });
    const initialText = await toggleButton.textContent();

    await toggleButton.click();

    const newText = await toggleButton.textContent();
    expect(newText).not.toBe(initialText);

    // Check that data-theme attribute is set
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(theme).toBeTruthy();
  });

  test("theme persists after navigation", async ({ page }) => {
    await page.goto("/");

    // Toggle to dark mode
    const toggleButton = page.getByRole("button", { name: /toggle theme/i });
    await toggleButton.click();

    const themeAfterClick = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );

    // Navigate to blog
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL("/blog");

    // Theme should persist
    const themeAfterNav = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(themeAfterNav).toBe(themeAfterClick);
  });

  test("theme persists after page reload", async ({ page }) => {
    await page.goto("/");

    // Toggle theme
    await page.getByRole("button", { name: /toggle theme/i }).click();

    const themeBefore = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );

    // Reload page
    await page.reload();

    // Wait for theme toggle button to be visible (indicates JS has hydrated)
    await page.getByRole("button", { name: /toggle theme/i }).waitFor();

    const themeAfter = await page.evaluate(() =>
      document.documentElement.getAttribute("data-theme")
    );
    expect(themeAfter).toBe(themeBefore);
  });

  test("theme is saved to localStorage", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("button", { name: /toggle theme/i }).click();

    const savedTheme = await page.evaluate(() =>
      localStorage.getItem("theme-preference")
    );
    expect(savedTheme).toBeTruthy();
    expect(["light", "dark"]).toContain(savedTheme);
  });
});
