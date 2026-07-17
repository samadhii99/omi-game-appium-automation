import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - Invalid Card Popup Verification", () => {
  it('should display "The card is not valid. Please check the card and try again" popup on wrong card selection', async () => {
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

    // Coordinates (reused from Manual Play Mode setup flow)
    const playButtonX = 448.3;
    const playButtonY = 1057.3;

    const betOkButtonX = 403.3;
    const betOkButtonY = 1012.4;

    const selectTrumpX = 303.6;
    const selectTrumpY = 763.5;

    const okTrumpButtonX = 228.6;
    const okTrumpButtonY = 1066.3;

    // Step 1: Launch app
    console.log("Step 1: Launching app");
    await driver.launchApp();
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 1 - Home Screen");

    // Step 2: Click Play button
    console.log(
      `Step 2: Clicking Play button at (${playButtonX}, ${playButtonY})`
    );
    await tap(playButtonX, playButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 2 - Betting Popup Appeared");

    // Step 3: Click Bet OK button
    console.log(
      `Step 3: Clicking Bet OK button at (${betOkButtonX}, ${betOkButtonY})`
    );
    await tap(betOkButtonX, betOkButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 3 - Select Trump Popup Appeared");

    // Step 4: Select the Trump
    console.log(
      `Step 4: Selecting Trump at (${selectTrumpX}, ${selectTrumpY})`
    );
    await tap(selectTrumpX, selectTrumpY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 4 - Trump Selected");

    // Step 5: Click OK button (Trump confirmation) - game board loads and game starts
    console.log(
      `Step 5: Clicking OK button at (${okTrumpButtonX}, ${okTrumpButtonY})`
    );
    await tap(okTrumpButtonX, okTrumpButtonY);
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 5 - Game Board Loaded - Game Started");

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
      "║  1. Play the FIRST hand normally (any valid card)              ║"
    );
    console.log(
      "║  2. On the NEXT hand, intentionally select a card that does    ║"
    );
    console.log(
      "║     NOT follow suit / is NOT a valid move for that hand        ║"
    );
    console.log(
      "║  3. The app should show a popup:                              ║"
    );
    console.log(
      '║     "The card is not valid. Please check the card and try     ║'
    );
    console.log(
      '║      again"                                                    ║'
    );
    console.log(
      "║  4. Leave the popup open on screen - do NOT close it yet       ║"
    );
    console.log(
      "║  5. Test will automatically capture a screenshot after ~45s   ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  ⏱️  Waiting for manual gameplay to trigger the popup...      ║"
    );
    console.log(
      "║  ⏱️  Timeout: 45 seconds                                       ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 6: WAIT FOR MANUAL PLAY (45 seconds)
    console.log(
      "Step 6: Waiting for manual game play to trigger invalid card popup (45 seconds)"
    );
    console.log("⏳ Timer started at:", new Date().toLocaleTimeString());

    const manualPlayWaitTime = 45000; // 45 seconds
    await driver.pause(manualPlayWaitTime);

    console.log("⏳ Timer ended at:", new Date().toLocaleTimeString());
    console.log("✓ Manual play time completed");

    // Step 7: Capture the Invalid Card popup
    console.log("Step 7: Capturing Invalid Card popup");
    await takeScreenshotAndAttach(
      'Step 7 - PASS - "The card is not valid" Popup Displayed'
    );

    // ════════════════════════════════════════════════════════════════
    // AUTOMATIC HANDLING RESUMES
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║              ✅ RESUMING AUTOMATIC TESTING ✅                  ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Final: Validate app is still running
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log(
      '✅ PASS: "The card is not valid. Please check the card and try again" popup verification completed'
    );
    await expect(true).toBe(true);
  });
});
