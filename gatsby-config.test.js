const config = require("./gatsby-config");

describe("gatsby-config RSS feed", () => {
  const feedPlugin = config.plugins.find(
    (p) => p.resolve === "gatsby-plugin-feed"
  );

  it("has gatsby-plugin-feed configured", () => {
    expect(feedPlugin).toBeDefined();
  });

  it("outputs to /rss.xml", () => {
    const feed = feedPlugin.options.feeds[0];
    expect(feed.output).toBe("/rss.xml");
  });

  it("queries both blog and projects content", () => {
    const feed = feedPlugin.options.feeds[0];
    expect(feed.query).toMatch(/content\/\(blog\|projects\)/);
  });

  it("serializes items with correct URL paths", () => {
    const feed = feedPlugin.options.feeds[0];
    const mockSite = {
      siteMetadata: { siteUrl: "https://example.com" },
    };

    const blogNode = {
      fileAbsolutePath: "/content/blog/test-post.md",
      frontmatter: { title: "Test Post", date: "2025-01-01", slug: "test-post" },
      html: "<p>Content</p>",
    };

    const projectNode = {
      fileAbsolutePath: "/content/projects/test-project.md",
      frontmatter: { title: "Test Project", date: "2025-01-02", slug: "test-project" },
      html: "<p>Project</p>",
    };

    const result = feed.serialize({
      query: {
        site: mockSite,
        allMarkdownRemark: { nodes: [blogNode, projectNode] },
      },
    });

    expect(result[0].url).toBe("https://example.com/blog/test-post");
    expect(result[1].url).toBe("https://example.com/projects/test-project");
  });
});
