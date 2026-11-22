const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:9000",
    trace: "on-first-retry",
    // Wide enough for the contents rail, which is what the site is designed against.
    viewport: { width: 1440, height: 900 },
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: {
    command: "npm run build && npm run serve",
    url: "http://localhost:9000",
    reuseExistingServer: !process.env.CI,
    // A full Gatsby build, and one of the posts is long enough to make it several minutes.
    timeout: 480000,
  },
});
