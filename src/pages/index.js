import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <section aria-labelledby="about-heading">
        <h2 id="about-heading">About me</h2>
        <p>
          I'm a software developer who enjoys turning complex problems into
          small, dependable systems. I work across the stack with a focus on
          TypeScript, Node.js, and modern web foundations.
        </p>
      </section>

      <section aria-labelledby="work-heading">
        <h2 id="work-heading">Work experience</h2>
        <ul className="inline">
          <li>
            Senior Software Developer — [Your Company], [Years]. Focused on
            platform reliability, DX, and performance.
          </li>
          <li>
            Software Developer — [Previous Company], [Years]. Shipped web
            apps and services used by thousands.
          </li>
        </ul>
      </section>

      <section aria-labelledby="projects-heading">
        <h2 id="projects-heading">Side projects</h2>
        <ul className="inline">
          <li>Minimal static site starter (text-first, no build tooling).</li>
          <li>CLI utilities for workflow automation.</li>
          <li>Small experimental services for learning and fun.</li>
        </ul>
      </section>

      <section aria-labelledby="blog-heading">
        <h2 id="blog-heading">Blog</h2>
        <p>
          I occasionally write about software development, tools, and
          workflows. <Link to="/blog">Read my posts →</Link>
        </p>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>Adam — Software Developer</title>
    <meta name="description" content="Building reliable, minimal, and fast software." />
  </>
);
