// The site's identity in one place. gatsby-config.js reads it for siteMetadata and the feed,
// and the Seo component reads it for canonical URLs and social tags. It is a plain module
// rather than a GraphQL query because Gatsby's Head API runs outside the React tree, where
// useStaticQuery is not available.
const site = {
  title: "Adam Sawicki — Software Engineer",
  description: "Building reliable systems.",
  author: "Adam Sawicki",
  siteUrl: "https://frycz.github.io",
};

module.exports = site;
