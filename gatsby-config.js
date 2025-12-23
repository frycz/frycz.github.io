module.exports = {
  siteMetadata: {
    title: "Adam Sawicki — Software Engineer",
    description: "Building reliable systems.",
    author: "Adam",
    siteUrl: "https://frycz.github.io",
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "blog",
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "projects",
        path: `${__dirname}/content/projects`,
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-feed",
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map((node) => {
                const isBlog = node.fileAbsolutePath.includes("/content/blog/");
                const path = isBlog ? "blog" : "projects";
                return {
                  title: node.frontmatter.title,
                  description: node.frontmatter.description,
                  date: node.frontmatter.date,
                  url: `${site.siteMetadata.siteUrl}/${path}/${node.frontmatter.slug}`,
                  guid: `${site.siteMetadata.siteUrl}/${path}/${node.frontmatter.slug}`,
                  custom_elements: [{ "content:encoded": node.html }],
                };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fileAbsolutePath: { regex: "/content/(blog|projects)/" } }
                  sort: { fields: [frontmatter___date], order: DESC }
                ) {
                  nodes {
                    html
                    fileAbsolutePath
                    frontmatter {
                      title
                      date
                      slug
                      description
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Adam Sawicki",
          },
        ],
      },
    },
  ],
};
