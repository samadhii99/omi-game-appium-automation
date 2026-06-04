import * as allure from "allure-js-commons";
import * as fs from "fs";
import * as path from "path";

export const config: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",
  port: 4723,

  // ✅ Run test.e2e.ts FIRST, then offline.e2e.ts
  specs: [
  "./test/specs/offline.e2e.ts",
  "./test/specs/settings-language.e2e.ts",
"./test/specs/profile-copy-playerid.e2e.ts",
  "./test/specs/profile-page-changes.e2e.ts",
  "./test/specs/profile-change-avatar.e2e.ts"
],

  // ✅ CRITICAL FIX 1: run ONE file at a time — only 1 device available
  maxInstances: 1,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Android",
      "appium:platformVersion": "13",
      "appium:automationName": "UiAutomator2",
      "appium:appPackage": "com.ceydigital.oombigame",
      "appium:appActivity": "com.google.firebase.MessagingUnityPlayerActivity",
      "appium:noReset": true,
      "appium:fullReset": false,
    },
  ],

  logLevel: "info",

  // ✅ CRITICAL FIX 2: allowInsecure belongs HERE in the service config
  services: [
    [
      "appium",
      {
        args: {
          allowInsecure: "uiautomator2:adb_shell", // ✅ must include driver name prefix
        },
      },
    ],
  ],

  framework: "mocha",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 120000,
  },

  // ✅ Only fires on failure — no duplicate screenshots
  afterTest: async function (test, _context, { error }) {
    if (!error) return;

    try {
      const screenshot = await browser.takeScreenshot();
      const buffer = Buffer.from(screenshot, "base64");
      allure.attachment(`FAILED - ${test.title}`, buffer, "image/png");

      const safeName = test.title.replace(/\s+/g, "-").replace(/[^\w-]/g, "");
      fs.writeFileSync(
        path.join("./allure-results", `FAILED-${safeName}-${Date.now()}.png`),
        buffer
      );
    } catch (screenshotError) {
      // ✅ CRITICAL FIX 3: if screenshot fails don't crash the hook
      console.warn("Could not take failure screenshot:", screenshotError);
    }
  },
};
