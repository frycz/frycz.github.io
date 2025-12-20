const path = require("path");
const webpack = require("webpack");

exports.onCreateWebpackConfig = ({ actions }) => {
  const now = new Date();
  const buildDate = now.toLocaleString("sv-SE", { timeZone: "Europe/Warsaw" }).slice(0, 16) + " CET";
  actions.setWebpackConfig({
    plugins: [
      new webpack.DefinePlugin({
        __BUILD_DATE__: JSON.stringify(buildDate),
      }),
    ],
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
            parent {
              ... on File {
                sourceInstanceName
              }
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const nodes = result.data.allMarkdownRemark.edges;

  nodes.forEach(({ node }) => {
    const sourceInstanceName = node.parent.sourceInstanceName;

    if (sourceInstanceName === "blog") {
      createPage({
        path: `/blog/${node.frontmatter.slug}`,
        component: path.resolve("./src/templates/blog-post.js"),
        context: {
          slug: node.frontmatter.slug,
        },
      });
    } else if (sourceInstanceName === "projects") {
      createPage({
        path: `/projects/${node.frontmatter.slug}`,
        component: path.resolve("./src/templates/project.js"),
        context: {
          slug: node.frontmatter.slug,
        },
      });
    }
  });
};
