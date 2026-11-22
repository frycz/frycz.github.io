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

// Below md-reader's rail breakpoint there is no column for the contents, so the same button
// opens them over the article instead.
test.describe("Contents on a narrow screen", () => {
  test.use({ viewport: { width: 390, height: 780 } });

  test("the button opens the contents over the article and a section closes them", async ({ page }) => {
    await page.goto(POST);

    const toggle = page.getByRole("button", { name: /toggle table of contents/i });
    const rail = page.locator(".mdr-toc");
    // The rail costs the article its width here, so it starts out of the way.
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(rail).toBeHidden();

    await toggle.click();
    await expect(rail).toBeVisible();
    // Over the article rather than beside it, hung from the right under the button, and narrow
    // enough that the article is still visibly there behind it.
    const box = await rail.boundingBox();
    expect(box.width).toBeCloseTo(390 * 0.6, 0);
    expect(box.x + box.width).toBeCloseTo(390, 0);

    const link = rail.locator("a[data-target]").nth(1);
    const target = await link.getAttribute("data-target");
    await link.click();

    await expect(rail).toBeHidden();
    await expect(page.locator(`#${target}`)).toBeInViewport();
  });

  test("tapping the article and pressing Escape both close the contents", async ({ page }) => {
    await page.goto(POST);

    const toggle = page.getByRole("button", { name: /toggle table of contents/i });
    const rail = page.locator(".mdr-toc");

    await toggle.click();
    await expect(rail).toBeVisible();
    await page.locator(".toc-scrim").click({ position: { x: 120, y: 500 } });
    await expect(rail).toBeHidden();

    await toggle.click();
    await expect(rail).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(rail).toBeHidden();
  });
});

// A synced article: its code blocks carry region markers that the markdown renderer knows nothing
// about, so the folds are made in the browser.
test.describe("Folded code regions", () => {
  const POST_WITH_REGIONS = "/blog/modular-agent";
  const folded = ".code-block:has(details.code-region)";

  test("a block with region markers arrives folded", async ({ page }) => {
    await page.goto(POST_WITH_REGIONS);

    const block = page.locator(folded).first();
    await expect(block).toBeVisible();
    const region = block.locator("details.code-region").first();
    await expect(region).not.toHaveAttribute("open", /.*/);
    await expect(region.locator("summary")).toContainText("Needed from earlier sections");
    // The markers themselves are the fold, not something left in the code.
    await expect(block.locator("pre")).not.toContainText("# endregion");
  });

  test("the fold-all button opens and closes every region of its block", async ({ page }) => {
    await page.goto(POST_WITH_REGIONS);

    const block = page.locator(folded).first();
    const fold = block.locator(".fold-btn").first();
    await expect(fold).toHaveText("Expand all");

    await fold.click();
    await expect(fold).toHaveText("Collapse all");
    const open = await block.locator("details.code-region").evaluateAll((ds) => ds.every((d) => d.open));
    expect(open).toBe(true);

    await fold.click();
    await expect(fold).toHaveText("Expand all");
  });

  test("highlighting colors the folded code without flattening the fold", async ({ page }) => {
    await page.goto(POST_WITH_REGIONS);

    const block = page.locator(folded).first();
    await expect(block.locator("code.hljs")).toBeVisible();
    await block.locator(".fold-btn").first().click();
    // The region still exists, and the code inside it came out as tokens rather than plain text.
    await expect(block.locator("details.code-region .code-part .hljs-keyword").first()).toBeVisible();
  });

  test("the copy button has the code as it was written", async ({ page }) => {
    await page.goto(POST_WITH_REGIONS);

    const block = page.locator(folded).first();
    await expect(block).toHaveAttribute("data-code", /# region/);
  });
});
