import React from "react";
import { graphql } from "gatsby";
import Article from "../components/Article";

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Article
      html={post.html}
      title={post.frontmatter.title}
      date={post.frontmatter.date}
      backTo="/blog"
      backLabel="Back to all posts"
    />
  );
};

export default BlogPostTemplate;

export const Head = ({ data }) => {
  const post = data.markdownRemark;
  return (
    <>
      <title>{post.frontmatter.title} — Adam</title>
      <meta name="description" content={post.excerpt} />
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
