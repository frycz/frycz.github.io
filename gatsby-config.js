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
    "gatsby-transformer-remark",
  ],
};
