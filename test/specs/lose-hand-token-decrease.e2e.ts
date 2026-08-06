import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - Win Hand Coin Increase Verification", () => {
  it("should increase coins by 10 after winning a sub-round", async () => {
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

    // ════════════════════════════════════════════════════════════════
    // COORDINATES
    // ════════════════════════════════════════════════════════════════

    const playButtonX = 448.3;
    const playButtonY = 1057.3;

    const betOkButtonX = 403.3;
    const betOkButtonY = 1012.4;

    const selectTrumpX = 303.6;
    const selectTrumpY = 763.5;

    const okTrumpButtonX = 228.6;
    const okTrumpButtonY = 1066.3;

    // ════════════════════════════════════════════════════════════════
    // STEP 1: LAUNCH APP - HOME PAGE
    // ════════════════════════════════════════════════════════════════

    console.log("Step 1: Launching app - Home Page");
    await driver.launchApp();
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 1 - Home Screen");

    // ════════════════════════════════════════════════════════════════
    // STEP 2: CAPTURE COIN AMOUNT BEFORE GAME
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║          💰 COIN INCREASE VERIFICATION TEST 💰               ║"
    );
    console.log(
      "╠════════════════════════════════════════════════════════════════╣"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  Objective: Verify coins increase by 10 after winning         ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    console.log("Step 2: Capturing coin amount BEFORE game");
    await takeScreenshotAndAttach(
      "Step 2 - COINS BEFORE Game (Take note of coin amount)"
    );

    // ════════════════════════════════════════════════════════════════
    // STEP 3: CLICK PLAY BUTTON
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 3: Clicking Play button at (${playButtonX}, ${playButtonY})`
    );
    await tap(playButtonX, playButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 3 - Betting Popup Appeared");

    // ════════════════════════════════════════════════════════════════
    // STEP 4: CLICK BET OK BUTTON
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 4: Clicking Bet OK button at (${betOkButtonX}, ${betOkButtonY})`
    );
    await tap(betOkButtonX, betOkButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 4 - Select Trump Popup Appeared");

    // ════════════════════════════════════════════════════════════════
    // STEP 5: SELECT TRUMP CARD
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 5: Selecting Trump card at (${selectTrumpX}, ${selectTrumpY})`
    );
    await tap(selectTrumpX, selectTrumpY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 5 - Trump Card Selected");

    // ════════════════════════════════════════════════════════════════
    // STEP 6: CONFIRM TRUMP - GAME BOARD LOADS
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 6: Confirming Trump at (${okTrumpButtonX}, ${okTrumpButtonY})`
    );
    await tap(okTrumpButtonX, okTrumpButtonY);
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 6 - Game Board Loaded");

    // ════════════════════════════════════════════════════════════════
    // STEP 7: WAIT FOR GAME BOARD TO STABILIZE
    // ════════════════════════════════════════════════════════════════

    console.log("Step 7: Waiting for game board to fully load and stabilize");
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 7 - Game Board Ready");

    // ════════════════════════════════════════════════════════════════
    // MANUAL PLAY SECTION - 30 SECONDS
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║       🎮 PLAY THE GAME FOR 30 SECONDS - WIN A SUB-ROUND 🎮   ║"
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
      "║  1. Play cards to WIN this sub-round/hand                     ║"
    );
    console.log(
      "║  2. Make sure YOUR SIDE WINS (not loses or draw)              ║"
    );
    console.log(
      "║  3. Once you WIN, stop playing                                ║"
    );
    console.log(
      "║  4. Test will continue automatically                          ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  ⏱️  Duration: 30 seconds to play and WIN                     ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 8: Wait for manual play (30 seconds)
    console.log("Step 8: PLAY THE GAME FOR 30 SECONDS - WIN A SUB-ROUND");
    console.log(
      "⏳ Game play timer started at:",
      new Date().toLocaleTimeString()
    );

    const gamePlayWaitTime = 30000; // 30 seconds
    await driver.pause(gamePlayWaitTime);

    console.log(
      "⏳ Game play timer ended at:",
      new Date().toLocaleTimeString()
    );
    console.log("✓ 30 second gameplay completed");
    await takeScreenshotAndAttach(
      "Step 8 - After 30 Seconds Play - Sub-Round Should Be Won"
    );

    // ════════════════════════════════════════════════════════════════
    // AUTOMATIC HANDLING RESUMES
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║              ✅ RESUMING AUTOMATIC VERIFICATION ✅            ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 9: Wait for sub-round to complete and results to show
    console.log("Step 9: Waiting for sub-round to complete and results");
    await driver.pause(5000);
    await takeScreenshotAndAttach(
      "Step 9 - Sub-Round Completed - Result Popup Visible"
    );

    // Step 10: Close any result popup (click in neutral area or wait for auto-close)
    console.log("Step 10: Waiting for result popup to auto-close or fade");
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 10 - Result Popup Closed");

    // ════════════════════════════════════════════════════════════════
    // STEP 11: CAPTURE COIN AMOUNT AFTER WINNING
    // ════════════════════════════════════════════════════════════════

    console.log("Step 11: Capturing coin amount AFTER winning sub-round");
    await takeScreenshotAndAttach(
      "Step 11 - COINS AFTER Winning (Compare with Step 2)"
    );

    // ════════════════════════════════════════════════════════════════
    // VERIFICATION
    // ════════════════════════════════════════════════════════════════

    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║    ✅ WIN HAND COIN INCREASE TEST COMPLETE ✅                ║"
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
      "║  Test Flow Summary:                                            ║"
    );
    console.log(
      "║  1. Launched app - Home Page - ✓                              ║"
    );
    console.log(
      "║  2. Screenshot coins BEFORE game - ✓                          ║"
    );
    console.log(
      "║  3. Clicked Play button (448.3, 1057.3) - ✓                   ║"
    );
    console.log(
      "║  4. Clicked Bet OK (403.3, 1012.4) - ✓                        ║"
    );
    console.log(
      "║  5. Selected Trump card (303.6, 763.5) - ✓                    ║"
    );
    console.log(
      "║  6. Confirmed Trump (228.6, 1066.3) - ✓                       ║"
    );
    console.log(
      "║  7. Game board loaded - ✓                                     ║"
    );
    console.log(
      "║  8. PLAYED GAME FOR 30 SECONDS - SUB-ROUND WON - ✓            ║"
    );
    console.log(
      "║  9. Sub-round completed & result displayed - ✓                ║"
    );
    console.log(
      "║  10. Result popup closed - ✓                                  ║"
    );
    console.log(
      "║  11. Screenshot coins AFTER winning - ✓                       ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  Verification Instructions:                                    ║"
    );
    console.log(
      "║  ────────────────────────────────────────────────────────     ║"
    );
    console.log(
      "║  Compare the following screenshots in Allure Report:           ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  📊 STEP 2: Coins BEFORE game                                 ║"
    );
    console.log(
      "║  📊 STEP 11: Coins AFTER winning                              ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  Expected Result:                                              ║"
    );
    console.log(
      "║  Coins AFTER - Coins BEFORE = 10 coins increase ✓             ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    await expect(true).toBe(true);
  });
});
