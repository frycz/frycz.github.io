import React from "react";
import { graphql } from "gatsby";
import Article from "../components/Article";
import Seo from "../components/Seo";

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

// The post's own description when it has one — it was written for a reader, and the excerpt
// is only the first 160 characters of the article, which rarely says what the post is about.
export const Head = ({ data, location }) => {
  const post = data.markdownRemark;
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      pathname={location.pathname}
      article={{ date: post.frontmatter.isoDate }}
    />
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        isoDate: date
      }
    }
  }
`;
