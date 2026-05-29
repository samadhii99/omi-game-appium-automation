import {
  takeScreenshotAndAttach,
  waitForHomeScreen,
  forceStopApp,
  relaunchApp,
} from "../helpers/appHelpers";

describe("Omi Game Launch Test", () => {

  // ✅ Force stop and relaunch before suite starts
  before(async () => {
    await forceStopApp();
    await relaunchApp();
    console.log("App freshly launched before test suite");
  });

  // ── Case 1 ────────────────────────────────────────────────────────────
  it("should launch the Omi game successfully", async () => {
    // Wait 10 seconds for app to load
    await browser.pause(10000);

    // Take screenshot and attach to Allure report
    await takeScreenshotAndAttach("App Launch Screen");

    console.log("Omi game launched successfully");
  });

  // ── Case 2 ────────────────────────────────────────────────────────────
  it("should move to home screen without crashing", async () => {
    // Poll every 2 seconds until home screen is ready (max 55 seconds)
    await waitForHomeScreen(55000);

    // Take screenshot after home screen fully renders
    await takeScreenshotAndAttach("Home Screen Loaded");

    // Validate app is still running
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);

    await expect(currentPackage).toBe("com.ceydigital.oombigame");
    console.log("Home screen loaded successfully without crash");
  });

});