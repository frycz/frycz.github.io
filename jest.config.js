module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/", "/.cache/", "/public/", "/e2e/"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby|gatsby-script)/)"],
  globals: {
    __BUILD_DATE__: "2024-01-01 12:00 CET",
  },
};
