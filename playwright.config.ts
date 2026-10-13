import { defineConfig, devices } from "@playwright/test";
const port = Number(process.env.PORT || 3000);
const serverCommand = process.env.TEST_PRODUCTION
  ? `npm run start -- --hostname 127.0.0.1 --port ${port}`
  : `npm run dev -- --hostname 127.0.0.1 --port ${port}`;
export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: { baseURL: `http://127.0.0.1:${port}`, ...devices["Desktop Chrome"] },
  webServer: {
    command: serverCommand,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
