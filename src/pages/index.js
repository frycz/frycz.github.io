import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = () => {
  return (
    <Layout>
      <section aria-labelledby="about-heading">
        <h2 id="about-heading">About me</h2>
        <p>
          I am a software engineer with over 12 years of professional
          experience. During that time, I worked on a variety of web-oriented
          projects with different architectures, approaches and technologies.
          Examples are: medical software, e-commerce platforms, ETL pipelines
          and more. Thanks to that, I got a solid understanding of web
          development challenges and I feel comfortable working across the full
          application stack - both front-end and back-end.
        </p>
        <p>
          My role goes beyond writing code. In my current project (an ETL
          pipeline) I participate in designing and implementing technical
          strategies, I lead engineering teams during features implementation,
          and actively mentor other developers, helping them grow and improve
          their technical skills.
        </p>
        <p>
          I believe in the AI revolution and I actively integrate AI tools
          (Claude Code, CursorAI, Gemini, and more) into my daily workflow - it
          boosts my productivity and helps me experiment with new solutions.
        </p>
        <p>
          In my free time, I like trying new tools, libraries and ideas. I ride
          a bike, workout at the gym, hike, and enjoy drip coffee.
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
        <ul className="inline">
          <li>[Coming soon].</li>
        </ul>
      </section>

      <section aria-labelledby="blog-heading">
        <h2 id="blog-heading">Blog</h2>
        <p>
          I occasionally write about software development, tools, and workflows.{" "}
          <Link to="/blog">Read my posts →</Link>
        </p>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => (
  <>
    <title>Adam Sawicki — Software Developer</title>
    <meta name="description" content="Building reliable systems." />
  </>
);
