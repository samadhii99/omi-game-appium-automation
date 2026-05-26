
export const config: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",
  port: 4723,

  specs: ["./test/specs/**/*.ts"],

  maxInstances: 10,

  capabilities: [
    {
      platformName: "Android",
      "appium:deviceName": "Android",
      "appium:platformVersion": "13",
      "appium:automationName": "UiAutomator2",
      "appium:appPackage": "com.ceydigital.oombigame",
      "appium:appActivity": "com.google.firebase.MessagingUnityPlayerActivity",
      "appium:noReset": true,
    },
  ],

  logLevel: "info",

  services: ["appium"],

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
    timeout: 60000,
  },

  afterTest: async function (_test, _context, { error }) {
    if (error) {
      const screenshot = await browser.takeScreenshot();

      await browser.call(() => {
        const fs = require("fs");
        fs.writeFileSync(
          `./allure-results/failure-${Date.now()}.png`,
          Buffer.from(screenshot, "base64")
        );
      });
    }
  },
};
