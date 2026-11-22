const { test, expect } = require("@playwright/test");

// This post has headings, several code fences and a mermaid diagram, so it exercises the
// whole reading layer.
const POST = "/blog/triangle-of-success";

test.describe("Article reader", () => {
  test("the contents rail lists the post's headings", async ({ page }) => {
    await page.goto(POST);

    const rail = page.locator(".mdr-toc");
    await expect(rail).toBeVisible();
    await expect(rail.getByText("Contents")).toBeVisible();
    expect(await rail.locator("a[data-target]").count()).toBeGreaterThan(1);
  });

  test("a contents link jumps to its heading and marks itself current", async ({ page }) => {
    await page.goto(POST);

    const link = page.locator(".mdr-toc a[data-target]").nth(1);
    const target = await link.getAttribute("data-target");
    await link.click();

    await expect(page).toHaveURL(new RegExp(`#${target}$`));
    const heading = page.locator(`#${target}`);
    await expect(heading).toBeInViewport();
    await expect(page.locator(`.mdr-toc a[data-target="${target}"]`)).toHaveClass(/active/);
  });

  test("headings get ids so they can be linked", async ({ page }) => {
    await page.goto(POST);
    // The ids are assigned once the reader mounts, so wait for that rather than for load.
    await expect(page.locator(".mdr-toc a[data-target]").first()).toBeVisible();

    const ids = await page.locator(".markdown-body h2").evaluateAll((hs) => hs.map((h) => h.id));
    expect(ids.length).toBeGreaterThan(0);
    expect(ids.every(Boolean)).toBe(true);
  });

  test("code blocks get a copy button and a language tag", async ({ page }) => {
    await page.goto(POST);

    const block = page.locator(".code-block").first();
    await expect(block).toBeVisible();
    await expect(block.locator(".copy-btn")).toBeVisible();
    expect(await page.locator(".code-block .code-lang").count()).toBeGreaterThan(0);
  });

  test("code is syntax highlighted", async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator(".code-block code.hljs").first()).toBeVisible();
  });

  test("the mermaid fence is drawn as a diagram", async ({ page }) => {
    await page.goto(POST);

    const diagram = page.locator(".mermaid-block");
    await expect(diagram).toHaveAttribute("data-state", "done", { timeout: 20000 });
    await expect(diagram.locator(".mermaid-svg svg")).toBeVisible();
    // The source is replaced by the drawing, not shown alongside it.
    await expect(diagram.locator(".mermaid-src")).toBeHidden();
  });

  test("clicking a diagram opens it full screen", async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator(".mermaid-block")).toHaveAttribute("data-state", "done", { timeout: 20000 });

    await page.locator(".mermaid-svg").click();
    const lightbox = page.locator(".mdr-lightbox");
    await expect(lightbox).toBeVisible();
    await expect(lightbox.locator(".mdr-lb-svg svg")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(lightbox).toBeHidden();
  });
});
