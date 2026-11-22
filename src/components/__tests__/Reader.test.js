import React from "react";
import { render } from "@testing-library/react";
import Reader from "../Reader";

// The shape gatsby-transformer-remark produces: no heading ids, bare <pre><code>, and a
// mermaid fence that looks like any other code block.
const HTML = `
  <p>Intro paragraph.</p>
  <h2>First section</h2>
  <p>Body with an <a href="https://example.com">external link</a>.</p>
  <pre><code class="language-yaml">key: value</code></pre>
  <h2>Second section</h2>
  <pre><code class="language-mermaid">flowchart TD\n  A --> B</code></pre>
  <table><thead><tr><th>a</th></tr></thead><tbody><tr><td>1</td></tr></tbody></table>
  <h3>Nested heading</h3>
`;

describe("Reader", () => {
  beforeEach(() => {
    window.matchMedia = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it("gives headings slugged ids", () => {
    const { container } = render(<Reader html={HTML} />);
    const ids = [...container.querySelectorAll(".markdown-body h2, .markdown-body h3")].map((h) => h.id);
    expect(ids).toEqual(["first-section", "second-section", "nested-heading"]);
  });

  it("builds a contents list from the headings", () => {
    const { container } = render(<Reader html={HTML} />);
    const links = [...container.querySelectorAll(".mdr-toc-list a")];
    expect(links.map((a) => a.dataset.target)).toEqual(["first-section", "second-section", "nested-heading"]);
    expect(links.map((a) => a.className)).toEqual(["toc-lvl-2", "toc-lvl-2", "toc-lvl-3"]);
  });

  it("shows the rail only when there is something to navigate", () => {
    const { container } = render(<Reader html={HTML} />);
    expect(container.querySelector(".mdr-toc").hidden).toBe(false);

    const { container: plain } = render(<Reader html="<p>No headings at all.</p>" />);
    expect(plain.querySelector(".mdr-toc").hidden).toBe(true);
  });

  it("wraps code blocks and offers a copy button", () => {
    const { container } = render(<Reader html={HTML} />);
    const block = container.querySelector(".code-block");
    expect(block).toBeTruthy();
    expect(block.querySelector(".copy-btn")).toBeTruthy();
    expect(block.querySelector(".code-lang").textContent).toBe("yaml");
  });

  it("takes a mermaid fence out of the code blocks", () => {
    const { container } = render(<Reader html={HTML} />);
    const diagram = container.querySelector(".mermaid-block");
    expect(diagram).toBeTruthy();
    expect(diagram.closest(".code-block")).toBeNull();
    expect(diagram.querySelector(".mermaid-src").textContent).toContain("flowchart TD");
    // Only the yaml block became a code block.
    expect(container.querySelectorAll(".code-block")).toHaveLength(1);
  });

  it("wraps tables so they scroll on their own", () => {
    const { container } = render(<Reader html={HTML} />);
    expect(container.querySelector(".table-wrap > table")).toBeTruthy();
  });

  it("opens external links in a new tab", () => {
    const { container } = render(<Reader html={HTML} />);
    const link = container.querySelector('a[href="https://example.com"]');
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener");
  });
});
