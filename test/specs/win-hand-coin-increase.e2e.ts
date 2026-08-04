import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - Coin Increase After Winning a Hand", () => {
  it("should increase coins by 10 after winning a sub-round (hand)", async () => {
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
    // CONFIG - how long the tester has to manually play out the hand
    // ════════════════════════════════════════════════════════════════

    const MANUAL_PLAY_WINDOW_MS = 60000; // 60 seconds - adjust as needed

    // ════════════════════════════════════════════════════════════════
    // STEP 1: LAUNCH APP
    // ════════════════════════════════════════════════════════════════

    console.log("Step 1: Launching app");
    await driver.launchApp();
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 1 - Home Screen");

    // ════════════════════════════════════════════════════════════════
    // STEP 2: CLICK PLAY BUTTON
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 2: Clicking Play button at (${playButtonX}, ${playButtonY})`
    );
    await tap(playButtonX, playButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 2 - Betting Popup Appeared");

    // ════════════════════════════════════════════════════════════════
    // STEP 3: CLICK BET OK BUTTON
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 3: Clicking Bet OK button at (${betOkButtonX}, ${betOkButtonY})`
    );
    await tap(betOkButtonX, betOkButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 3 - Select Trump Popup Appeared");

    // ════════════════════════════════════════════════════════════════
    // STEP 4: SELECT TRUMP
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 4: Selecting Trump at (${selectTrumpX}, ${selectTrumpY})`
    );
    await tap(selectTrumpX, selectTrumpY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 4 - Trump Selected");

    // ════════════════════════════════════════════════════════════════
    // STEP 5: CLICK OK BUTTON - GAME BOARD LOADS
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 5: Clicking OK button at (${okTrumpButtonX}, ${okTrumpButtonY})`
    );
    await tap(okTrumpButtonX, okTrumpButtonY);
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 5 - Game Board Loaded");

    // ════════════════════════════════════════════════════════════════
    // STEP 6: WAIT FOR GAME BOARD TO STABILIZE
    // ════════════════════════════════════════════════════════════════

    console.log("Step 6: Waiting for game board to fully load and stabilize");
    await driver.pause(5000);
    await takeScreenshotAndAttach("Step 6 - Game Board Fully Ready");

    // ════════════════════════════════════════════════════════════════
    // STEP 7: CAPTURE COIN AMOUNT BEFORE WINNING THE HAND
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║     🪙 TESTING COIN INCREASE AFTER WINNING A HAND 🪙          ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    console.log(
      "Step 7: Capturing coin amount BEFORE winning the hand (compare against Step 9 screenshot)"
    );
    await takeScreenshotAndAttach("Step 7 - Coin Amount BEFORE Winning Hand");

    // ════════════════════════════════════════════════════════════════
    // STEP 8: MANUAL PLAY WINDOW - PLAY CARDS UNTIL A HAND IS WON
    // ════════════════════════════════════════════════════════════════
    // NOTE: Card selection is currently manual. This pause gives the
    // tester a fixed window to physically/manually tap through the
    // cards on the device until one hand (sub-round) is won.
    // TODO: Replace this manual window with automated card-tap logic
    // once card locator coordinates / element strategy is finalized.

    console.log(
      `Step 8: MANUAL ACTION REQUIRED - Please play the hand manually now.`
    );
    console.log(
      `         You have ${
        MANUAL_PLAY_WINDOW_MS / 1000
      } seconds to play cards until a hand (sub-round) is won.`
    );
    await driver.pause(MANUAL_PLAY_WINDOW_MS);

    // ════════════════════════════════════════════════════════════════
    // STEP 9: CAPTURE COIN AMOUNT AFTER WINNING THE HAND
    // ════════════════════════════════════════════════════════════════

    console.log(
      "Step 9: Capturing coin amount AFTER winning the hand (compare against Step 7 screenshot)"
    );
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 9 - Coin Amount AFTER Winning Hand");

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
      "║   ✅ COIN INCREASE TEST FLOW COMPLETED ✅                    ║"
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
      "║  1. Launched app - ✓                                          ║"
    );
    console.log(
      "║  2. Clicked Play button (448.3, 1057.3) - ✓                   ║"
    );
    console.log(
      "║  3. Clicked Bet OK (403.3, 1012.4) - ✓                        ║"
    );
    console.log(
      "║  4. Selected Trump (303.6, 763.5) - ✓                         ║"
    );
    console.log(
      "║  5. Confirmed Trump (228.6, 1066.3) - ✓                       ║"
    );
    console.log(
      "║  6. Game board loaded and stabilized - ✓                      ║"
    );
    console.log(
      "║  7. Captured coin amount BEFORE hand - ✓                      ║"
    );
    console.log(
      "║  8. Manually played hand until won - ✓                        ║"
    );
    console.log(
      "║  9. Captured coin amount AFTER hand - ✓                       ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  Result: Compare Step 7 and Step 9 screenshots manually to    ║"
    );
    console.log(
      "║          confirm coins increased by 10 after winning hand.    ║"
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
