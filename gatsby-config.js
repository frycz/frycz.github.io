module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: "Adam — Software Developer",
    description: "Building reliable, minimal, and fast software.",
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
    "gatsby-transformer-remark",
  ],
};
