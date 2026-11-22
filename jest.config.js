module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    // md-reader is ESM only, so jest cannot resolve it through the package exports map.
    "^md-reader$": "<rootDir>/node_modules/md-reader/dist/index.js",
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.cache/", "/public/", "/e2e/"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby|gatsby-script|md-reader)/)"],
  globals: {
    __BUILD_DATE__: "2024-01-01 12:00 CET",
  },
};
