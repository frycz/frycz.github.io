import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout
      title="Blog"
      subtitle="Thoughts on software development and technology."
      headerNav={
        <p className="header-nav">
          <Link to="/">← Back to main page</Link>
        </p>
      }
    >
      <section>
        <ul className="blog-list">
          {posts.map(({ node }) => (
            <li key={node.frontmatter.slug}>
              <h3 className="blog-post-title">
                <Link to={`/blog/${node.frontmatter.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h3>
              <p className="blog-post-meta muted">{node.frontmatter.date}</p>
              <p className="blog-post-excerpt">{node.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default BlogPage;

export const Head = () => (
  <>
    <title>Blog — Adam</title>
    <meta name="description" content="Thoughts on software development and technology." />
  </>
);

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;
