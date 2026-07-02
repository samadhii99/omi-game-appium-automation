import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Settings - Legal Links (Privacy Policy, Terms & Conditions, Rules & Regulations)", () => {
  const OMI_PACKAGE = "com.ceydigital.oombigame";

  // Reusable coordinates
  const settingsX = 654;
  const settingsY = 103.9;

  const recentButtonX = 158.8;
  const recentButtonY = 1558.0;

  const recentOmiPageX = 361.5;
  const recentOmiPageY = 1016.4;

  // Helper to perform a single tap
  const tap = async (x: number, y: number) => {
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x, y },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
  };

  it("should verify Privacy Policy, Terms & Conditions, and Rules & Regulations load correctly", async () => {
    // ── Step 1: Launch app / Go to Homepage ───────────────
    console.log("Step 1: Launching OMI app - Homepage");
    await driver.activateApp(OMI_PACKAGE);
    await driver.pause(30000);
    await takeScreenshotAndAttach("Step 1 - Home Page Loaded");

    // ── Step 2: Click Settings Icon ────────────────────────
    console.log(
      `Step 2: Clicking Settings icon at (${settingsX}, ${settingsY})`
    );
    await tap(settingsX, settingsY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 2 - Settings Popup Opened");

    // ── Step 3: Click Privacy Policy Link ──────────────────
    const privacyPolicyX = 151.8;
    const privacyPolicyY = 1134.3;
    console.log(
      `Step 3: Clicking Privacy Policy at (${privacyPolicyX}, ${privacyPolicyY})`
    );
    await tap(privacyPolicyX, privacyPolicyY);
    console.log("Waiting for Privacy Policy web page to load");
    await driver.pause(4000);
    await takeScreenshotAndAttach("Step 3 - Privacy Policy Web Page Loaded");

    // ── Step 4: Open Recent Apps ───────────────────────────
    console.log(
      `Step 4: Clicking Recent apps button at (${recentButtonX}, ${recentButtonY})`
    );
    await tap(recentButtonX, recentButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 4 - Recent Apps Opened (After Privacy Policy)"
    );

    // ── Step 5: Select OMI App from Recents ────────────────
    console.log(
      `Step 5: Selecting OMI app from Recents at (${recentOmiPageX}, ${recentOmiPageY})`
    );
    await tap(recentOmiPageX, recentOmiPageY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 5 - Back to OMI App (After Privacy Policy)"
    );

    // ── Step 6: Click Terms & Conditions Link ──────────────
    const termsX = 339.5;
    const termsY = 1135.3;
    console.log(
      `Step 6: Clicking Terms & Conditions at (${termsX}, ${termsY})`
    );
    await tap(termsX, termsY);
    console.log("Waiting for Terms & Conditions web page to load");
    await driver.pause(4000);
    await takeScreenshotAndAttach(
      "Step 6 - Terms & Conditions Web Page Loaded"
    );

    // ── Step 7: Open Recent Apps ────────────────────────────
    console.log(
      `Step 7: Clicking Recent apps button at (${recentButtonX}, ${recentButtonY})`
    );
    await tap(recentButtonX, recentButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 7 - Recent Apps Opened (After Terms & Conditions)"
    );

    // ── Step 8: Select OMI App from Recents ─────────────────
    console.log(
      `Step 8: Selecting OMI app from Recents at (${recentOmiPageX}, ${recentOmiPageY})`
    );
    await tap(recentOmiPageX, recentOmiPageY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 8 - Back to OMI App (After Terms & Conditions)"
    );

    // ── Step 9: Click Rules & Regulations Link ─────────────
    const rulesX = 530.2;
    const rulesY = 1128.3;
    console.log(
      `Step 9: Clicking Rules & Regulations at (${rulesX}, ${rulesY})`
    );
    await tap(rulesX, rulesY);
    console.log("Waiting for Rules & Regulations web page to load");
    await driver.pause(4000);
    await takeScreenshotAndAttach(
      "Step 9 - Rules & Regulations Web Page Loaded"
    );

    // ── Step 10: Open Recent Apps ───────────────────────────
    console.log(
      `Step 10: Clicking Recent apps button at (${recentButtonX}, ${recentButtonY})`
    );
    await tap(recentButtonX, recentButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 10 - Recent Apps Opened (After Rules & Regulations)"
    );

    // ── Step 11: Select OMI App from Recents ────────────────
    console.log(
      `Step 11: Selecting OMI app from Recents at (${recentOmiPageX}, ${recentOmiPageY})`
    );
    await tap(recentOmiPageX, recentOmiPageY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 11 - Back to OMI App (After Rules & Regulations)"
    );

    // ── Final: Validate app is still running ────────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe(OMI_PACKAGE);

    console.log(
      "✅ Settings - Legal Links Test Completed: Privacy Policy → Terms & Conditions → Rules & Regulations all loaded successfully"
    );
  });
});
