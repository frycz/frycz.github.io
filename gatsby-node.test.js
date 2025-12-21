const { createPages } = require("./gatsby-node");

describe("gatsby-node createPages", () => {
  let mockCreatePage;
  let mockGraphql;

  beforeEach(() => {
    mockCreatePage = jest.fn();
  });

  it("creates blog pages with correct paths", async () => {
    mockGraphql = jest.fn().mockResolvedValue({
      data: {
        allMarkdownRemark: {
          edges: [
            {
              node: {
                frontmatter: { slug: "my-first-post" },
                parent: { sourceInstanceName: "blog" },
              },
            },
          ],
        },
      },
    });

    await createPages({ graphql: mockGraphql, actions: { createPage: mockCreatePage } });

    expect(mockCreatePage).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/blog/my-first-post",
        context: { slug: "my-first-post" },
      })
    );
  });

  it("creates project pages with correct paths", async () => {
    mockGraphql = jest.fn().mockResolvedValue({
      data: {
        allMarkdownRemark: {
          edges: [
            {
              node: {
                frontmatter: { slug: "my-project" },
                parent: { sourceInstanceName: "projects" },
              },
            },
          ],
        },
      },
    });

    await createPages({ graphql: mockGraphql, actions: { createPage: mockCreatePage } });

    expect(mockCreatePage).toHaveBeenCalledWith(
      expect.objectContaining({
        path: "/projects/my-project",
        context: { slug: "my-project" },
      })
    );
  });

  it("uses correct template for blog posts", async () => {
    mockGraphql = jest.fn().mockResolvedValue({
      data: {
        allMarkdownRemark: {
          edges: [
            {
              node: {
                frontmatter: { slug: "test" },
                parent: { sourceInstanceName: "blog" },
              },
            },
          ],
        },
      },
    });

    await createPages({ graphql: mockGraphql, actions: { createPage: mockCreatePage } });

    expect(mockCreatePage).toHaveBeenCalledWith(
      expect.objectContaining({
        component: expect.stringContaining("blog-post.js"),
      })
    );
  });

  it("uses correct template for projects", async () => {
    mockGraphql = jest.fn().mockResolvedValue({
      data: {
        allMarkdownRemark: {
          edges: [
            {
              node: {
                frontmatter: { slug: "test" },
                parent: { sourceInstanceName: "projects" },
              },
            },
          ],
        },
      },
    });

    await createPages({ graphql: mockGraphql, actions: { createPage: mockCreatePage } });

    expect(mockCreatePage).toHaveBeenCalledWith(
      expect.objectContaining({
        component: expect.stringContaining("project.js"),
      })
    );
  });

  it("throws on GraphQL errors", async () => {
    mockGraphql = jest.fn().mockResolvedValue({
      errors: ["Something went wrong"],
    });

    await expect(
      createPages({ graphql: mockGraphql, actions: { createPage: mockCreatePage } })
    ).rejects.toEqual(["Something went wrong"]);
  });

  it("handles multiple content types", async () => {
    mockGraphql = jest.fn().mockResolvedValue({
      data: {
        allMarkdownRemark: {
          edges: [
            {
              node: {
                frontmatter: { slug: "post-1" },
                parent: { sourceInstanceName: "blog" },
              },
            },
            {
              node: {
                frontmatter: { slug: "project-1" },
                parent: { sourceInstanceName: "projects" },
              },
            },
          ],
        },
      },
    });

    await createPages({ graphql: mockGraphql, actions: { createPage: mockCreatePage } });

    expect(mockCreatePage).toHaveBeenCalledTimes(2);
    expect(mockCreatePage).toHaveBeenCalledWith(
      expect.objectContaining({ path: "/blog/post-1" })
    );
    expect(mockCreatePage).toHaveBeenCalledWith(
      expect.objectContaining({ path: "/projects/project-1" })
    );
  });
});
