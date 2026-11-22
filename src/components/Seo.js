import React from "react";
import site from "../lib/site";

// Everything that belongs in a page's head and is not the page itself: what it is called, what
// it is about, where it canonically lives, and how it looks when someone shares the link.
// Used only from a page's `Head` export, so it takes plain props — no hooks, no queries.
//
// `pathname` comes from the `location` Gatsby hands the Head function, so each page states its
// own canonical URL. Without one, a page reachable at more than one address (a trailing slash,
// a query string someone appended) is a separate page as far as a crawler is concerned.
const Seo = ({ title, description, pathname = "/", article }) => {
  const url = `${site.siteUrl}${pathname}`;
  const pageTitle = title ? `${title} — ${site.author}` : site.title;
  const pageDescription = description || site.description;

  // A post says it is a post, and who wrote it. Everything else is the site itself.
  const schema = article
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description: pageDescription,
        datePublished: article.date,
        mainEntityOfPage: url,
        url,
        author: { "@type": "Person", name: site.author, url: site.siteUrl },
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.title,
        url: site.siteUrl,
        description: site.description,
        author: { "@type": "Person", name: site.author, url: site.siteUrl },
      };

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={site.title} />
      {article && <meta property="article:published_time" content={article.date} />}

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      {/* The feed's own <link rel="alternate"> is added by gatsby-plugin-feed, so it is not
          repeated here. */}
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </>
  );
};

export default Seo;
