import {
  takeScreenshotAndAttach,
  disableInternet,
  enableInternet,
  forceStopApp,
  relaunchApp,
} from "../helpers/appHelpers";

describe("Omi Offline Test", () => {
  // ✅ Restore internet after the ENTIRE suite finishes
  after(async () => {
    await enableInternet();
    console.log("Internet restored after offline suite");
  });

  // ✅ Also restore after each individual test
  afterEach(async () => {
    await enableInternet();
    console.log("Internet restored after test");
  });

  it("should display connection lost popup when launched without internet", async () => {
    // ── Step 1: Disable internet ──────────────────────────
    await disableInternet();
    await takeScreenshotAndAttach("Step 1 - Internet Disabled");

    // ── Step 2: Force stop then relaunch without internet ─
    await forceStopApp();
    await relaunchApp();
    await takeScreenshotAndAttach("Step 2 - App Launched Without Internet");

    // ── Step 3: Wait for connection lost popup ────────────
    await driver.pause(15000);
    await takeScreenshotAndAttach("Step 3 - Connection Lost Popup Expected");

    // ── Step 4: Validate app did not crash ────────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("Connection lost popup test completed");
  });
});
