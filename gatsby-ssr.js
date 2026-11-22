import React from "react";
import { themeBootstrap } from "md-reader";
import { SETTINGS_KEY } from "./src/lib/reader-settings";

export const onRenderBody = ({
  setHeadComponents,
  setPreBodyComponents,
  setHtmlAttributes,
}) => {
  // Gatsby's default document leaves <html> without a language, and the Head API only takes
  // tags that go inside the head, so this is the one place the attribute can be set.
  setHtmlAttributes({ lang: "en" });

  setHeadComponents([
    React.createElement("script", {
      key: "counter-dev",
      src: "https://cdn.counter.dev/script.js",
      "data-id": "a4bffa24-a702-4959-9a55-3b0242c17b42",
      "data-utcoffset": "1",
      async: true,
    }),
  ]);

  // Blocking and before the body, so a saved theme is on the document before the first paint.
  // Without it every visitor who chose a non-default theme sees a flash of the other one.
  setPreBodyComponents([
    React.createElement("script", {
      key: "mdr-theme",
      dangerouslySetInnerHTML: { __html: themeBootstrap(SETTINGS_KEY) },
    }),
  ]);
};
