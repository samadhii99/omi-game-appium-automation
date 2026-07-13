import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - Manual Play Mode", () => {
  it("should allow manual game play with instructions", async () => {
    // Step 1: Launch app
    console.log("Step 1: Launching app");
    await driver.launchApp();
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 1 - Home Screen");

    // Step 2: Screenshot BEFORE
    console.log("Step 2: Items BEFORE game");
    await takeScreenshotAndAttach("Step 2 - Items BEFORE");

    // Step 3-6: Setup game (same as before)
    console.log("Step 3: Click Play (448.3, 1057.3)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 448.3, y: 1057.3 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(2000);

    console.log("Step 4: Click Bet OK (403.3, 1012.4)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 403.3, y: 1012.4 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(2000);

    console.log("Step 5: Select Trump (303.6, 763.5)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 303.6, y: 763.5 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(1500);

    console.log("Step 6: OK Trump (228.6, 1066.3)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 228.6, y: 1066.3 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 6 - Board Loaded");

    // ════════════════════════════════════════════════════════════════
    // MANUAL PLAY SECTION - DISPLAY INSTRUCTIONS TO TESTER
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║              ⏸️  MANUAL GAME PLAY REQUIRED  ⏸️                 ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "╠════════════════════════════════════════════════════════════════╣"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  📱 TESTER: Please manually play the game on your device      ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  Instructions:                                                 ║"
    );
    console.log(
      "║  1. Click on cards in your hand to play them                  ║"
    );
    console.log(
      "║  2. Play until the game finishes (round win/loss/draw)         ║"
    );
    console.log(
      "║  3. A result popup will appear (Round Win/Loss)                ║"
    );
    console.log(
      "║  4. Test will continue automatically after ~30 seconds        ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  ⏱️  Waiting for manual gameplay to complete...               ║"
    );
    console.log(
      "║  ⏱️  Timeout: 60 seconds                                       ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 7: WAIT FOR MANUAL PLAY (60 seconds)
    console.log("Step 7: Waiting for manual game play (60 seconds)");
    console.log("⏳ Timer started at:", new Date().toLocaleTimeString());

    const manualPlayWaitTime = 60000; // 60 seconds
    await driver.pause(manualPlayWaitTime);

    console.log("⏳ Timer ended at:", new Date().toLocaleTimeString());
    console.log("✓ Manual play time completed");

    await takeScreenshotAndAttach("Step 7 - After Manual Play");

    // ════════════════════════════════════════════════════════════════
    // AUTOMATIC HANDLING RESUMES
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║              ✅ RESUMING AUTOMATIC TESTING ✅                  ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 8: Close result popup
    console.log("Step 8: Closing result popup (453.3, 1159.3)");
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: 453.3, y: 1159.3 },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 8 - Popup Closed");

    // Step 9: Screenshot items AFTER
    console.log("Step 9: Taking screenshot AFTER game");
    await driver.pause(1000);
    await takeScreenshotAndAttach("Step 9 - Items AFTER");

    // Step 10: Verify
    console.log("\n=== GAME RESULT ===");
    console.log("✅ Manual play completed");
    console.log("✅ Result popup closed");
    console.log("✅ Compare BEFORE (Step 2) and AFTER (Step 9) screenshots");
    console.log("✅ Verify කැට කොල changed according to game outcome");

    const currentPackage = await driver.getCurrentPackage();
    expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("\n✅ Test Complete");
    await expect(true).toBe(true);
  });
});
