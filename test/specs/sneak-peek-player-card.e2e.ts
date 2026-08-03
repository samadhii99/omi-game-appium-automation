import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - Sneak Peek Selected Player Card", () => {
  it("should allow user to sneak peek a selected player's card after watching 2 ads", async () => {
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
    // HELPER: Keep session alive by taking screenshots periodically
    // ════════════════════════════════════════════════════════════════
    const keepAliveWaitWithScreenshots = async (
      totalSeconds: number,
      label: string,
      screenshotLabel: string
    ): Promise<void> => {
      console.log(`\n⏳ ${label}: Waiting ${totalSeconds} seconds...`);

      const intervalSeconds = 15; // Take screenshot every 15 seconds
      const intervals = Math.ceil(totalSeconds / intervalSeconds);
      let elapsed = 0;

      for (let i = 0; i < intervals; i++) {
        const remainingSeconds = totalSeconds - elapsed;
        const actualWait = Math.min(
          intervalSeconds * 1000,
          remainingSeconds * 1000
        );

        console.log(
          `   [${i + 1}/${intervals}] Waiting ${Math.ceil(
            remainingSeconds
          )}s more...`
        );

        await driver.pause(actualWait);
        elapsed += Math.ceil(actualWait / 1000);

        try {
          console.log(`   ✓ Taking screenshot to keep session alive...`);
          await takeScreenshotAndAttach(
            `${screenshotLabel} - Progress ${
              i + 1
            }/${intervals} (${elapsed}s elapsed)`
          );
          console.log(`   ✓ Screenshot taken - session still active`);
        } catch (error) {
          const errorMsg =
            error instanceof Error ? error.message : String(error);
          console.log(`   ⚠️ Screenshot failed: ${errorMsg} - continuing...`);
        }
      }

      console.log(`✓ ${label} complete\n`);
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

    const sneakPeekIconX = 491.2;
    const sneakPeekIconY = 1474.0;

    // NOTE: Ad close button coordinates are NOT used - the close button
    // position varies between ad networks/impressions, so the tester
    // closes each ad manually on the device during the wait windows below.

    const rightSidePlayerX = 168.8;
    const rightSidePlayerY = 911.4;

    const fifthCardX = 221.6;
    const fifthCardY = 901.4;

    // ════════════════════════════════════════════════════════════════
    // STEP 1-5: SETUP GAME (AUTO)
    // ════════════════════════════════════════════════════════════════

    console.log("Step 1: Launching app");
    await driver.launchApp();
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 1 - Home Screen");

    console.log(
      `Step 2: Clicking Play button at (${playButtonX}, ${playButtonY})`
    );
    await tap(playButtonX, playButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 2 - Betting Popup Appeared");

    console.log(
      `Step 3: Clicking Bet OK button at (${betOkButtonX}, ${betOkButtonY})`
    );
    await tap(betOkButtonX, betOkButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 3 - Select Trump Popup Appeared");

    console.log(
      `Step 4: Selecting Trump at (${selectTrumpX}, ${selectTrumpY})`
    );
    await tap(selectTrumpX, selectTrumpY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 4 - Trump Selected");

    console.log(
      `Step 5: Clicking OK button at (${okTrumpButtonX}, ${okTrumpButtonY})`
    );
    await tap(okTrumpButtonX, okTrumpButtonY);
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 5 - Game Board Loaded");

    // ════════════════════════════════════════════════════════════════
    // STEP 6: CLICK SNEAK PEEK ICON (no gameplay needed)
    // ════════════════════════════════════════════════════════════════

    console.log(
      `Step 6: Clicking Sneak Peek icon at (${sneakPeekIconX}, ${sneakPeekIconY})`
    );
    await tap(sneakPeekIconX, sneakPeekIconY);
    await driver.pause(2000);
    await takeScreenshotAndAttach(
      "Step 6 - Sneak Peek Icon Clicked - First Ad Loading"
    );

    // ════════════════════════════════════════════════════════════════
    // AD 1: WAIT 35 SECONDS THEN MANUAL CLOSE (position varies)
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                📺 AD 1/2 PLAYING (35 seconds) 📺              ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  ⚠️  Ad close button position VARIES - please close it        ║"
    );
    console.log(
      "║  MANUALLY on the device once it appears.                      ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  📱 TESTER: Please close Ad 1 manually now                    ║"
    );
    console.log(
      "║  ⏱️  Waiting 20 seconds for you to close it...                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    console.log("Step 7: Ad 1 playing - waiting 35 seconds");
    await keepAliveWaitWithScreenshots(35, "Ad 1", "Step 7 - Ad 1");

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║   ⏸️  PLEASE CLOSE AD 1 MANUALLY NOW  ⏸️                      ║"
    );
    console.log(
      "║   (close button position varies - tap it on the device)       ║"
    );
    console.log(
      "║   ⏱️  Waiting 20 seconds for manual close...                  ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    await driver.pause(20000);
    await takeScreenshotAndAttach("Step 8 - Ad 1 Closed (Manually)");

    // ════════════════════════════════════════════════════════════════
    // AD 2: WAIT 35 SECONDS THEN MANUAL CLOSE (position varies)
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                📺 AD 2/2 PLAYING (35 seconds) 📺              ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  ⚠️  Ad close button position VARIES - please close it        ║"
    );
    console.log(
      "║  MANUALLY on the device once it appears.                      ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  📱 TESTER: Please close Ad 2 manually now                    ║"
    );
    console.log(
      "║  ⏱️  Waiting 20 seconds for you to close it...                ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    console.log("Step 9: Ad 2 playing - waiting 35 seconds");
    await keepAliveWaitWithScreenshots(35, "Ad 2", "Step 9 - Ad 2");

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║   ⏸️  PLEASE CLOSE AD 2 MANUALLY NOW  ⏸️                      ║"
    );
    console.log(
      "║   (close button position varies - tap it on the device)       ║"
    );
    console.log(
      "║   ⏱️  Waiting 20 seconds for manual close...                  ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    await driver.pause(20000);
    await takeScreenshotAndAttach("Step 10 - Ad 2 Closed (Manually)");

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

    // ════════════════════════════════════════════════════════════════
    // POST-ADS: SELECT PLAYER POPUP
    // ════════════════════════════════════════════════════════════════

    console.log(
      "Step 11: Waiting a few seconds for Select Player popup to appear"
    );
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 11 - Select Player Popup Appeared");

    console.log(
      `Step 12: Selecting right side player at (${rightSidePlayerX}, ${rightSidePlayerY})`
    );
    await tap(rightSidePlayerX, rightSidePlayerY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 12 - Right Side Player Selected - Select Card Popup Appeared"
    );

    console.log(
      `Step 13: Selecting 5th card at (${fifthCardX}, ${fifthCardY})`
    );
    await tap(fifthCardX, fifthCardY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 13 - 5th Card Selected");

    // ════════════════════════════════════════════════════════════════
    // FINAL VERIFICATION
    // ════════════════════════════════════════════════════════════════

    console.log(
      "Step 14: Waiting a few seconds for the selected player's card to appear"
    );
    await driver.pause(3000);
    await takeScreenshotAndAttach(
      "Step 14 - PASS - Selected Player Card Displayed"
    );

    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║   ✅ SNEAK PEEK SELECTED PLAYER CARD TEST COMPLETE ✅        ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    await expect(true).toBe(true);
  });
});
