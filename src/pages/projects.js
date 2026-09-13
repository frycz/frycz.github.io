import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

const ProjectsPage = ({ data }) => {
  const projects = data.allMarkdownRemark.edges;

  return (
    <Layout
      title="Projects"
      subtitle="Things I built and decided to publish."
      headerNav={
        <p className="header-nav">
          <Link to="/">← Back to main page</Link>
        </p>
      }
    >
      <section>
        <ul className="blog-list">
          {projects.map(({ node }) => (
            <li key={node.frontmatter.slug}>
              <h3 className="blog-post-title">
                <Link to={`/projects/${node.frontmatter.slug}`}>
                  {node.frontmatter.title}
                </Link>
              </h3>
              <p className="blog-post-meta muted">{node.frontmatter.date}</p>
              <p className="blog-post-excerpt">
                {node.frontmatter.description || node.excerpt}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default ProjectsPage;

export const Head = () => (
  <>
    <title>Projects — Adam</title>
    <meta name="description" content="Things I built and decided to publish." />
  </>
);

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            description
          }
          excerpt(pruneLength: 200)
        }
      }
    }
  }
`;
