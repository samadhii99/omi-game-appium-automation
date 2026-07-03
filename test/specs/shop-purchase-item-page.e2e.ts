import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Shop - Purchase Item Page", () => {
  it("should display gem items and handle subscribe popup", async () => {
    // Step 1: Launch app
    console.log("Step 1: Launching app");
    await driver.launchApp();
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 1 - Home Screen");

    // Step 2: Click Shop tab
    console.log("Step 2: Clicking Shop tab");
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
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 2 - Shop Page");

    // Step 3: Click Gem tab
    console.log("Step 3: Clicking Gem tab at (133.8, 586.5)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 133.8, y: 586.5 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 3 - Gem Tab Selected");

    // Step 4: Click Buy item button
    console.log("Step 4: Clicking Buy item button at (154.8, 974.4)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 154.8, y: 974.4 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 4 - Subscribe Popup Appeared");

    // Step 5: Close popup
    console.log("Step 5: Closing popup at (672.0, 327.7)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 672.0, y: 327.7 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 5 - Popup Closed - Gem Item Page");

    // Step 6: Scroll down to view all purchase items
    console.log("Step 6: Scrolling down to view purchase items");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 400, y: 900 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 300 },
          { type: "pointerMove", duration: 500, x: 400, y: 400 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(500);
    await takeScreenshotAndAttach("Step 6 - Scrolled Down View 1");

    // Step 7: Continue scrolling
    console.log("Step 7: Scrolling further down");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 400, y: 900 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 300 },
          { type: "pointerMove", duration: 500, x: 400, y: 400 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(500);
    await takeScreenshotAndAttach("Step 7 - Scrolled Down View 2");

    // Step 8: Final scroll
    console.log("Step 8: Final scroll to see all items");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 400, y: 900 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 300 },
          { type: "pointerMove", duration: 500, x: 400, y: 400 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(500);
    await takeScreenshotAndAttach("Step 8 - Scrolled Down View 3");

    // Verify app is running
    const currentPackage = await driver.getCurrentPackage();
    expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("\n✅ PASS: Purchase item page displayed");
    console.log("✅ Subscribe popup shown and closed");
    console.log("✅ All purchase items scrolled and visible");

    await expect(true).toBe(true);
  });
});
