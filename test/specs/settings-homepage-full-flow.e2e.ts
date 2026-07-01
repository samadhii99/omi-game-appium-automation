import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Settings - Homepage Full Flow (General, Music, Sound, Haptics, Rate Us, Support)", () => {
  it("should complete full settings navigation and feedback flow", async () => {
    // ── Step 1: Ensure WiFi/Data is turned ON ─────────────
    console.log("Step 1: Turning ON WiFi/Data");
    try {
      // Android-specific toggles (require driver capabilities to support these)
      await driver.toggleWiFi(true);
      await driver.toggleData(true);
    } catch (error) {
      console.log("⚠️ Could not toggle WiFi/Data automatically:", error);
    }
    await driver.pause(2000);

    // ── Step 2: Launch app / Go to Homepage ───────────────
    // Using activateApp() with the explicit package name instead of
    // launchApp(), because launchApp() re-activates whatever package is
    // CURRENTLY in the foreground. Toggling WiFi/Data can briefly bring
    // the Android home launcher to the front, and re-activating the
    // launcher itself throws "Unable to resolve the launchable activity".
    const OMI_PACKAGE = "com.ceydigital.oombigame";
    console.log("Step 2: Launching OMI app - Homepage");
    await driver.activateApp(OMI_PACKAGE);
    await driver.pause(30000);
    await takeScreenshotAndAttach("Step 2 - Home Page Loaded");

    // ── Step 3: Click Settings Button ─────────────────────
    const settingsX = 654;
    const settingsY = 103.9;
    console.log(
      `Step 3: Clicking Settings button at (${settingsX}, ${settingsY})`
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
    await takeScreenshotAndAttach("Step 3 - Settings Popup Opened");

    // ── Step 4: Click General Button ──────────────────────
    const generalX = 230.6;
    const generalY = 526.7;
    console.log(
      `Step 4: Clicking General button at (${generalX}, ${generalY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: generalX, y: generalY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 4 - General Tab Opened");

    // ── Step 5: Click Music Button ────────────────────────
    const musicX = 530.2;
    const musicY = 694.5;
    console.log(`Step 5: Clicking Music button at (${musicX}, ${musicY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: musicX, y: musicY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 5 - Music Toggled");

    // ── Step 6: Click Sound Button ────────────────────────
    const soundX = 549.2;
    const soundY = 768.5;
    console.log(`Step 6: Clicking Sound button at (${soundX}, ${soundY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: soundX, y: soundY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 6 - Sound Toggled");

    // ── Step 7: Click Haptics Button ──────────────────────
    const hapticsX = 554.2;
    const hapticsY = 846.5;
    console.log(
      `Step 7: Clicking Haptics button at (${hapticsX}, ${hapticsY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: hapticsX, y: hapticsY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 7 - Haptics Toggled");

    // ── Step 8: Open AND Close Language Dropdown (same tap twice) ──
    const languageX = 552.2;
    const languageY = 934.4;

    console.log(
      `Step 8a: Opening Language dropdown at (${languageX}, ${languageY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: languageX, y: languageY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 8a - Language Dropdown Opened");

    console.log(
      `Step 8b: Closing Language dropdown at (${languageX}, ${languageY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: languageX, y: languageY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 8b - Language Dropdown Closed");

    // ── Step 9: Click Rate Us Button ──────────────────────
    const rateUsX = 224.6;
    const rateUsY = 1055.3;
    console.log(`Step 9: Clicking Rate Us button at (${rateUsX}, ${rateUsY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: rateUsX, y: rateUsY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 9 - Rate Us Popup Opened");

    // ── Step 10: Add Stars ─────────────────────────────────
    const starsX = 531.2;
    const starsY = 777.5;
    console.log(`Step 10: Adding stars at (${starsX}, ${starsY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: starsX, y: starsY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 10 - Stars Added");

    // ── Step 11: Click Submit Button ──────────────────────
    const submitX = 346.5;
    const submitY = 958.4;
    console.log(`Step 11: Clicking Submit button at (${submitX}, ${submitY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: submitX, y: submitY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 11 - Rating Submitted");

    // ── Step 12: Click Support Request Button ─────────────
    const supportX = 448.3;
    const supportY = 1035.4;
    console.log(
      `Step 12: Clicking Support Request button at (${supportX}, ${supportY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: supportX, y: supportY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 12 - Support Request Opened");

    // ── Step 13: Click Sent Button ─────────────────────────
    const sentX = 357.5;
    const sentY = 1046.3;
    console.log(`Step 13: Clicking Sent button at (${sentX}, ${sentY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: sentX, y: sentY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 13 - Support Request Sent");

    // ── Step 14: Click Outside Twice to Close All Popups ──
    const outsideX = 121.8;
    const outsideY = 503.7;

    console.log(
      `Step 14a: Clicking outside (1st time) at (${outsideX}, ${outsideY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: outsideX, y: outsideY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 14a - First Popup Closed");

    console.log(
      `Step 14b: Clicking outside (2nd time) at (${outsideX}, ${outsideY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: outsideX, y: outsideY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 14b - All Popups Closed - Back to Home"
    );

    // ── Final: Validate app is still running ──────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe(OMI_PACKAGE);

    console.log(
      "✅ Settings - Homepage Full Flow Test Completed: General → Music → Sound → Haptics → Language → Rate Us → Support → Closed"
    );
  });
});
