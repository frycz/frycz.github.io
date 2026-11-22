const { test, expect } = require("@playwright/test");

test.describe("Navigation", () => {
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Adam Sawicki/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Adam Sawicki");
  });

  // The trailing slash depends on whether the click beat hydration: Gatsby's router keeps
  // "/blog", a plain anchor hit lets the server redirect to "/blog/". Either is the blog page.
  const BLOG = /\/blog\/?$/;

  test("navigate to blog page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL(BLOG);
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
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL("/");
  });

  // Arriving on a page is the text column's news, not the bar's: the bar is the same bar
  // before and after the click, and animating it would read as a full page reload.
  test("a page change animates the text column and leaves the bar alone", async ({ page }) => {
    await page.goto("/blog");

    const animation = (sel) =>
      page.locator(sel).first().evaluate((el) => getComputedStyle(el).animationName);

    expect(await animation(".mdr-main")).toBe("page-enter");
    expect(await animation(".site-footer")).toBe("page-enter");
    expect(await animation(".mdr-header")).toBe("none");

    // The column the click lands on is a new element, so it has its own entrance to make.
    // Watched rather than sampled: the entrance lasts 260ms, and a long post can take longer
    // than that to render, which would leave a sampled opacity already settled at 1.
    await page.evaluate(() => {
      window.__entered = new Promise((resolve) => {
        document.addEventListener("animationstart", (e) => {
          if (e.animationName === "page-enter" && e.target.classList.contains("mdr-main")) resolve(true);
        });
      });
    });

    await page.locator(".blog-post-title a").first().click();
    await expect(page).toHaveURL(/\/blog\/.+/);
    expect(await page.evaluate(() => window.__entered)).toBe(true);
    await expect.poll(() =>
      page.locator(".mdr-main").evaluate((el) => parseFloat(getComputedStyle(el).opacity)),
    ).toBe(1);
  });

  test("404 page displays for invalid route", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText("Page not found")).toBeVisible();
  });

  test("the site name in the bar leads home", async ({ page }) => {
    await page.goto("/blog");
    await page.getByRole("link", { name: "Adam Sawicki" }).click();
    await expect(page).toHaveURL("/");
  });

  // A list is a step down from the main page, and an article a step down from its list. Each
  // offers the way back up without making a reader find it in the bar.
  test("every page below the main page offers the way back up", async ({ page }) => {
    await page.goto("/blog");
    await page.getByRole("link", { name: "← Back to main page" }).click();
    await expect(page).toHaveURL("/");

    await page.goto("/projects");
    await page.getByRole("link", { name: "← Back to main page" }).click();
    await expect(page).toHaveURL("/");

    await page.goto("/blog");
    await page.locator(".blog-post-title a").first().click();
    await expect(page).toHaveURL(/\/blog\/.+/);
    // Offered twice: under the title, and at the end of the article where a reader who
    // finished actually is.
    await expect(page.getByRole("link", { name: "← Back to all posts" })).toHaveCount(2);
    await page.locator(".article-nav a").click();
    await expect(page).toHaveURL(BLOG);
  });

  // The bar is sticky, so it is also a way out from anywhere in a long post.
  test("the bar leads out of a blog post from anywhere in it", async ({ page }) => {
    await page.goto("/blog");
    await page.locator(".blog-post-title a").first().click();
    await expect(page).toHaveURL(/\/blog\/.+/);

    await page.mouse.wheel(0, 2000);
    await expect(page.locator(".mdr-header")).toBeInViewport();

    await page.getByRole("link", { name: "Blog" }).click();
    await expect(page).toHaveURL(BLOG);
  });
});
