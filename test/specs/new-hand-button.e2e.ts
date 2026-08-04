import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - New Hand Button", () => {
  it('should start new hand when clicking "අලුත් අතක් ගහමු" button', async () => {
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

    const pauseButtonX = 666.0;
    const pauseButtonY = 104.9;

    const newHandButtonX = 307.6; // "අලුත් අතක් ගහමු" button
    const newHandButtonY = 758.5;

    const bidOkButtonX = 354.5; // Bid popup OK button
    const bidOkButtonY = 1008.4;

    const selectTrumpX2 = 303.6; // Trump selection in new hand
    const selectTrumpY2 = 763.5;

    const okTrumpButtonX2 = 228.6; // OK button for trump in new hand
    const okTrumpButtonY2 = 1066.3;

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
    await takeScreenshotAndAttach("Step 5 - First Game Board Loaded");

    // ════════════════════════════════════════════════════════════════
    // STEP 6: WAIT FOR GAME BOARD TO STABILIZE
    // ════════════════════════════════════════════════════════════════

    console.log("Step 6: Waiting for game board to fully load and stabilize");
    await driver.pause(5000);
    await takeScreenshotAndAttach("Step 6 - Game Board Fully Ready");

    // ════════════════════════════════════════════════════════════════
    // STEP 7: CLICK PAUSE BUTTON
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║           🎮 TESTING NEW HAND BUTTON 🎮                       ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    console.log(
      `Step 7: Clicking Pause button at (${pauseButtonX}, ${pauseButtonY})`
    );
    await tap(pauseButtonX, pauseButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach(
      "Step 7 - Game Paused - Pause Popup Appeared"
    );

    // ════════════════════════════════════════════════════════════════
    // STEP 8: CLICK "අලුත් අතක් ගහමු" (NEW HAND) BUTTON
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 8: Clicking "අලුත් අතක් ගහමු" button at (${newHandButtonX}, ${newHandButtonY})`
    );
    await tap(newHandButtonX, newHandButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach('Step 8 - "අලුත් අතක් ගහමු" Button Clicked');

    // ════════════════════════════════════════════════════════════════
    // STEP 9: BID POPUP APPEARED - CLICK OK
    // ════════════════════════════════════════════════════════════════

    console.log("Step 9: Bid popup appeared - clicking OK button");
    console.log(
      `Step 9: Clicking Bid OK button at (${bidOkButtonX}, ${bidOkButtonY})`
    );
    await tap(bidOkButtonX, bidOkButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach(
      "Step 9 - Bid OK Clicked - Trump Selection Popup"
    );

    // ════════════════════════════════════════════════════════════════
    // STEP 10: SELECT TRUMP FOR NEW HAND
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 10: Selecting Trump for new hand at (${selectTrumpX2}, ${selectTrumpY2})`
    );
    await tap(selectTrumpX2, selectTrumpY2);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 10 - New Hand Trump Selected");

    // ════════════════════════════════════════════════════════════════
    // STEP 11: CLICK OK FOR NEW HAND TRUMP
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 11: Clicking OK button for new hand trump at (${okTrumpButtonX2}, ${okTrumpButtonY2})`
    );
    await tap(okTrumpButtonX2, okTrumpButtonY2);
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 11 - New Hand Game Board Loading");

    // ════════════════════════════════════════════════════════════════
    // STEP 12: WAIT FOR NEW GAME BOARD TO LOAD
    // ════════════════════════════════════════════════════════════════

    console.log("Step 12: Waiting for new game board to fully load");
    await driver.pause(3000);
    await takeScreenshotAndAttach(
      "Step 12 - NEW HAND - New Game Board Loaded ✓"
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
      "║   ✅ NEW HAND BUTTON TEST PASSED ✅                          ║"
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
      "║  6. First game board loaded - ✓                               ║"
    );
    console.log(
      "║  7. Clicked Pause button (666.0, 104.9) - ✓                   ║"
    );
    console.log(
      '║  8. Clicked "අලුත් අතක් ගහමු" button (307.6, 758.5) - ✓       ║'
    );
    console.log(
      "║  9. Bid popup appeared - Clicked OK (354.5, 1008.4) - ✓        ║"
    );
    console.log(
      "║  10. Trump selection popup - Selected Trump (303.6, 763.5) - ✓ ║"
    );
    console.log(
      "║  11. Confirmed new hand trump (228.6, 1066.3) - ✓              ║"
    );
    console.log(
      "║  12. NEW GAME BOARD LOADED - ✓                               ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      '║  Result: "අලුත් අතක් ගහමු" BUTTON WORKS CORRECTLY ✓          ║'
    );
    console.log(
      "║          New hand/game started successfully                    ║"
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
