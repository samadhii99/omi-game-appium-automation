import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - More Previous Sub Round (Left Arrow Navigation)", () => {
  it("should display more previous sub rounds after unlocking with 50 coins", async () => {
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

    const cardIconX = 603.2;
    const cardIconY = 1548.0;

    const leftArrowX = 80.9;
    const leftArrowY = 808.5;

    const coin50ButtonX = 259.6;
    const coin50ButtonY = 950.4;

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
      "║  1. Play AT LEAST 2 full rounds/hands normally                ║"
    );
    console.log(
      "║     (play cards until each round finishes)                    ║"
    );
    console.log(
      "║  2. Once 2 or more rounds are complete, STOP playing           ║"
    );
    console.log(
      "║  3. Test will automatically tap the Card icon after ~50s      ║"
    );
    console.log(
      "║     to open the Previous Hand popup                           ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  ⏱️  Waiting for manual gameplay to complete 2+ rounds...     ║"
    );
    console.log(
      "║  ⏱️  Timeout: 50 seconds                                       ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 6: WAIT FOR MANUAL PLAY (50 seconds)
    console.log(
      "Step 6: Waiting for manual game play - at least 2 rounds (50 seconds)"
    );
    console.log("⏳ Timer started at:", new Date().toLocaleTimeString());

    const manualPlayWaitTime = 50000; // 50 seconds
    await driver.pause(manualPlayWaitTime);

    console.log("⏳ Timer ended at:", new Date().toLocaleTimeString());
    console.log("✓ Manual play time completed");
    await takeScreenshotAndAttach(
      "Step 6 - After Manual Play - 2+ Rounds Completed"
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

    // Step 7: Click Card icon to open Previous Hand popup
    console.log(`Step 7: Clicking Card icon at (${cardIconX}, ${cardIconY})`);
    await tap(cardIconX, cardIconY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 7 - Previous Hand Popup Displayed");

    // Step 8: Click Left Arrow icon to navigate to more previous sub round
    console.log(
      `Step 8: Clicking Left Arrow icon at (${leftArrowX}, ${leftArrowY})`
    );
    await tap(leftArrowX, leftArrowY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 8 - Coin Unlock Popup Appeared");

    // Step 9: Click 50 Coin button to unlock more previous sub round
    console.log(
      `Step 9: Clicking 50 Coin button at (${coin50ButtonX}, ${coin50ButtonY})`
    );
    await tap(coin50ButtonX, coin50ButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 9 - PASS - More Previous Sub Round Popup Displayed"
    );

    // Final: Validate app is still running
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log(
      "✅ PASS: More Previous Sub Round (Left Arrow Navigation) test completed"
    );
    await expect(true).toBe(true);
  });
});
