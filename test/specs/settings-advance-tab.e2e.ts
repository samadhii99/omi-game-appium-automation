import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Settings - Advance Tab (Subscribe & Account Deletion Request)", () => {
  const OMI_PACKAGE = "com.ceydigital.oombigame";

  it("should open Advance tab, view Subscribe popup, then view Account Deletion popup", async () => {
    // ── Step 1: Launch app / Go to Homepage ───────────────
    console.log("Step 1: Launching OMI app - Homepage");
    await driver.activateApp(OMI_PACKAGE);
    await driver.pause(40000);
    await takeScreenshotAndAttach("Step 1 - Home Page Loaded");

    // ── Step 2: Click Settings Icon ────────────────────────
    const settingsX = 654;
    const settingsY = 103.9;
    console.log(
      `Step 2: Clicking Settings icon at (${settingsX}, ${settingsY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: settingsX, y: settingsY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 2 - Settings Popup Opened");

    // ── Step 3: Click Advance Tab ───────────────────────────
    const advanceX = 454.3;
    const advanceY = 537.7;
    console.log(`Step 3: Clicking Advance tab at (${advanceX}, ${advanceY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: advanceX, y: advanceY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 3 - Advance Tab Opened");

    // ── Step 4: Click Subscribe Button ─────────────────────
    const subscribeX = 498.2;
    const subscribeY = 711.5;
    console.log(
      `Step 4: Clicking Subscribe button at (${subscribeX}, ${subscribeY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: subscribeX, y: subscribeY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 4 - Subscribe Popup Opened");

    // ── Step 5: Click Outside to Close Subscribe Popup ─────
    const outsideX1 = 198.6;
    const outsideY1 = 639.5;
    console.log(
      `Step 5: Clicking outside at (${outsideX1}, ${outsideY1}) to close Subscribe popup`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: outsideX1, y: outsideY1 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 5 - Subscribe Popup Closed");

    // ── Step 6: Click Settings Icon Again ──────────────────
    console.log(
      `Step 6: Clicking Settings icon again at (${settingsX}, ${settingsY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: settingsX, y: settingsY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 6 - Settings Popup Reopened");

    // ── Step 7: Click Advance Tab Again ────────────────────
    console.log(
      `Step 7: Clicking Advance tab again at (${advanceX}, ${advanceY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: advanceX, y: advanceY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 7 - Advance Tab Reopened");

    // ── Step 8: Click Request Button (Account Deletion) ────
    const requestX = 514.2;
    const requestY = 803.5;
    console.log(
      `Step 8: Clicking Request button at (${requestX}, ${requestY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: requestX, y: requestY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 8 - Account Deletion Warning Popup Opened"
    );

    // ── Step 9: Click Outside to Close Account Deletion Popup ──
    const outsideX2 = 127.8;
    const outsideY2 = 505.7;
    console.log(
      `Step 9: Clicking outside at (${outsideX2}, ${outsideY2}) to close Account Deletion popup`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: outsideX2, y: outsideY2 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 9 - Account Deletion Popup Closed - Back to Home"
    );

    // ── Final: Validate app is still running ───────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe(OMI_PACKAGE);

    console.log(
      "✅ Settings - Advance Tab Test Completed: Subscribe Popup → Closed → Account Deletion Popup → Closed"
    );
  });
});
