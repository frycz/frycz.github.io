import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

const ProjectTemplate = ({ data }) => {
  const project = data.markdownRemark;

  return (
    <Layout
      title={project.frontmatter.title}
      subtitle={project.frontmatter.date}
      headerNav={
        <p className="header-nav">
          <Link to="/">← Back to main page</Link>
        </p>
      }
    >
      <article>
        <div dangerouslySetInnerHTML={{ __html: project.html }} />
      </article>

      <hr />

      <nav style={{ marginTop: "2rem" }}>
        <Link to="/">← Back to main page</Link>
      </nav>
    </Layout>
  );
};

export default ProjectTemplate;

export const Head = ({ data }) => {
  const project = data.markdownRemark;
  return (
    <>
      <title>{project.frontmatter.title} — Adam</title>
      <meta name="description" content={project.excerpt} />
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
