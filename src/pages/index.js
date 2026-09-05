import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = ({ data }) => {
  const projects = data.projects.edges;
  const posts = data.posts.edges;

  return (
    <Layout subtitle="Building reliable systems.">
      <section aria-labelledby="about-heading">
        <h2 id="about-heading">About me</h2>
        <p>
          I am a software engineer with over 13 years of professional
          experience. During that time, I worked on a variety of web-oriented
          projects with different architectures, approaches and technologies.
          Examples are: medical software, e-commerce platforms, ETL pipelines
          and more. Thanks to that, I got a solid understanding of web
          development challenges and I feel comfortable working across the full
          application stack - both front-end and back-end. I have also written C
          and C++, so I am no stranger to low-level memory management and
          optimization.
        </p>
        <p>
          In my current project (an ETL pipeline) I design and implement
          technical strategies, lead engineering teams through feature delivery,
          and mentor developers as they grow. I lead those teams AI-first —
          coding agents do a large share of the implementation, and my job is
          knowing where they don't hold up. We still own the architecture, data
          correctness, and the review that catches what the model got
          confidently wrong. Working this way buys time back, and we spend it on
          performance optimization and security.
        </p>
        <p>
          In my free time I experiment with AI by building small tools and apps,
          watching where coding agents really break and working out what
          actually makes them reliable. The pet project I am proudest of is{" "}
          <a href="https://www.geotraders.app">GeoTraders</a> — a GPS-based
          mobile app I built and still maintain, where people send
          “treasures” on tour and follow them as they travel. I also
          ride a bike, workout at the gym, hike, and enjoy drip coffee.
        </p>
      </section>

      <section aria-labelledby="work-heading">
        <h2 id="work-heading">Work experience</h2>
        <ul className="inline">
          <li>Staff Software Engineer @ Adverity, 2022 - present.</li>
          <li>Senior Software Engineer @ Adverity, 2020 - 2022.</li>
          <li>Senior Software Engineer @ Symphony Solutions, 2019 - 2020.</li>
          <li>Software Engineer @ Symphony Solutions, 2017 - 2019.</li>
          <li>Software Engineer @ Cyfrowa Foto, 2015 - 2017.</li>
          <li>Software Engineer @ Soft System, 2013 - 2015.</li>
        </ul>
      </section>

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">Side projects</h2>
        <p>I like building things. Here is what I decided to publish.</p>
        <ul className="inline">
          {projects.map(({ node }) => (
            <li key={node.frontmatter.slug}>
              <Link to={`/projects/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>{" "}
              - {node.frontmatter.description}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="blog-heading">
        <h2 id="blog-heading">Blog</h2>
        <p>
          I occasionally write about software development, tools, and workflows.
        </p>
        <ul className="inline">
          {posts.map(({ node }) => (
            <li key={node.frontmatter.slug}>
              <Link to={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
              </Link>
              <span className="muted"> — {node.frontmatter.date}</span>
            </li>
          ))}
        </ul>
        <p>
          <Link to="/blog">Read all posts →</Link>
        </p>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>Adam Sawicki — Software Engineer</title>
    <meta name="description" content="Building reliable systems." />
  </>
);

export const query = graphql`
  query {
    projects: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/projects/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            description
          }
        }
      }
    }
    posts: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
