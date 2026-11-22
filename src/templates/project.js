import React from "react";
import { graphql } from "gatsby";
import Article from "../components/Article";
import Seo from "../components/Seo";

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

export const Head = ({ data, location }) => {
  const project = data.markdownRemark;
  return (
    <Seo
      title={project.frontmatter.title}
      description={project.frontmatter.description || project.excerpt}
      pathname={location.pathname}
      article={{ date: project.frontmatter.isoDate }}
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
