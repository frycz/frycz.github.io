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
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: `/blog/${node.frontmatter.slug}`,
      component: path.resolve("./src/templates/blog-post.js"),
      context: {
        slug: node.frontmatter.slug,
      },
    });
  });
};
