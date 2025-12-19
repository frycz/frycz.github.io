import React from "react";
import { Link } from "gatsby";
import Layout from "../components/Layout";

const NotFoundPage = () => {
  return (
    <Layout>
      <section>
        <h2>Page not found</h2>
        <p>
          Sorry, the page you're looking for doesn't exist.{" "}
          <Link to="/">Go back home →</Link>
        </p>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = () => <title>404 — Page not found</title>;
