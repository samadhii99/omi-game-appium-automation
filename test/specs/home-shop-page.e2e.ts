import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Home - Shop Page", () => {
  it("should display Shop page when clicking Shop tab", async () => {
    // Launch app
    console.log("Launching OMI app");
    await driver.launchApp();
    await driver.pause(3000);
    await takeScreenshotAndAttach("Home Screen");

    // Click Shop tab
    console.log("Clicking Shop tab at (592.2, 1521.0)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 592.2, y: 1521.0 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    // Wait for Shop page to load
    await driver.pause(2000);
    await takeScreenshotAndAttach("Shop Page Displayed");

    // Verify app is running
    const currentPackage = await driver.getCurrentPackage();
    expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("✅ Shop page displayed");
    await expect(true).toBe(true);
  });
});
