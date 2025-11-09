import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout
      title={post.frontmatter.title}
      subtitle={post.frontmatter.date}
      headerNav={
        <p className="header-nav">
          <Link to="/blog">← Back to all posts</Link>
        </p>
      }
    >
      <article>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>

      <hr />

      <nav style={{ marginTop: "2rem" }}>
        <Link to="/blog">← Back to all posts</Link>
      </nav>
    </Layout>
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
