const React = require("react");

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement("script", {
      key: "counter-dev",
      src: "https://cdn.counter.dev/script.js",
      "data-id": "a4bffa24-a702-4959-9a55-3b0242c17b42",
      "data-utcoffset": "1",
      async: true,
    }),
  ]);
};
