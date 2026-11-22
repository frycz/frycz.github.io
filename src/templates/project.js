import React from "react";
import { graphql } from "gatsby";
import Article from "../components/Article";

const ProjectTemplate = ({ data }) => {
  const project = data.markdownRemark;

  return (
    <Article
      html={project.html}
      title={project.frontmatter.title}
      date={project.frontmatter.date}
      backTo="/projects"
      backLabel="Back to all projects"
    />
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
