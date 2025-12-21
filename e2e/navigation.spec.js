const { test, expect } = require("@playwright/test");

test.describe("Navigation", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Adam Sawicki/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Adam Sawicki");
  });

  test("navigate to blog page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL("/blog");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Blog");
  });

  test("navigate to blog post", async ({ page }) => {
    await page.goto("/blog");
    // Click the first blog post link
    const firstPostLink = page.locator(".blog-post-title a").first();
    const postTitle = await firstPostLink.textContent();
    await firstPostLink.click();

    // Should be on a blog post page
    await expect(page).toHaveURL(/\/blog\/.+/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(postTitle);
  });

  test("navigate back to homepage via About link", async ({ page }) => {
    await page.goto("/blog");
    await page.getByRole("link", { name: "About" }).click();
    await expect(page).toHaveURL("/");
  });

  test("404 page displays for invalid route", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText("Page not found")).toBeVisible();
  });

  test("blog post has back link to blog", async ({ page }) => {
    await page.goto("/blog");
    const firstPostLink = page.locator(".blog-post-title a").first();
    await firstPostLink.click();

    // Should have a link back to blog
    await page.getByRole("link", { name: "← Back to all posts" }).first().click();
    await expect(page).toHaveURL("/blog");
  });
});
