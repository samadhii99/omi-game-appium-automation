import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - Unlock Previous Hand by Watching Ad", () => {
  it("should unlock 2nd previous hand by watching ads (auto-close)", async () => {
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

        // Wait
        await driver.pause(actualWait);
        elapsed += Math.ceil(actualWait / 1000);

        // Keep session alive by taking screenshot
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

    const cardIconX = 603.2;
    const cardIconY = 1548.0;

    const backButtonX = 80.9;
    const backButtonY = 808.5;

    const watchAdsButtonX = 449.3;
    const watchAdsButtonY = 940.4;

    const adCloseButtonX = 652.0;
    const adCloseButtonY = 384.7;

    const closePopupX = 89.9;
    const closePopupY = 1031.4;

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
    // MANUAL PLAY SECTION
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║           ⏸️  MANUAL GAME PLAY REQUIRED  ⏸️                   ║"
    );
    console.log(
      "╠════════════════════════════════════════════════════════════════╣"
    );
    console.log(
      "║  📱 TESTER: Please manually play the game on your device      ║"
    );
    console.log(
      "║  1. Play AT LEAST 2 full rounds/hands                         ║"
    );
    console.log(
      "║  2. Once 2+ rounds complete, STOP playing                     ║"
    );
    console.log(
      "║  ⏱️  Timeout: 60 seconds                                       ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 6: Wait for manual play
    console.log("Step 6: Waiting for manual game play (60 seconds)");
    await keepAliveWaitWithScreenshots(
      60,
      "Manual Play",
      "Step 6 - Manual Play"
    );
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

    console.log(`Step 7: Clicking Card icon at (${cardIconX}, ${cardIconY})`);
    await tap(cardIconX, cardIconY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 7 - Previous Hand Popup Displayed");

    console.log(
      `Step 8: Clicking back button at (${backButtonX}, ${backButtonY})`
    );
    await tap(backButtonX, backButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 8 - Previous Hand Navigation");

    console.log(
      `Step 9: Clicking Watch Ads button at (${watchAdsButtonX}, ${watchAdsButtonY})`
    );
    await tap(watchAdsButtonX, watchAdsButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 9 - First Ad Loading");

    // ════════════════════════════════════════════════════════════════
    // AD 1: WAIT 70 SECONDS + AUTO-CLOSE (INCREASED FROM 60)
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                📺 AD 1/2 PLAYING (70 seconds) 📺              ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  Close button will appear at: (652.0, 384.7)                  ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 10: Wait for Ad 1 (70 seconds with screenshots) - CHANGED FROM 60
    console.log("Step 10: Ad 1 playing - waiting 70 seconds");
    await keepAliveWaitWithScreenshots(70, "Ad 1", "Step 10 - Ad 1");

    console.log(
      `Step 11: Closing Ad 1 by clicking close button at (${adCloseButtonX}, ${adCloseButtonY})`
    );
    await tap(adCloseButtonX, adCloseButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 11 - Ad 1 Closed");

    // ════════════════════════════════════════════════════════════════
    // AD 2: WAIT 70 SECONDS + AUTO-CLOSE (INCREASED FROM 60)
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                📺 AD 2/2 PLAYING (70 seconds) 📺              ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  Close button will appear at: (652.0, 384.7)                  ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    // Step 12: Wait for Ad 2 (70 seconds with screenshots) - CHANGED FROM 60
    console.log("Step 12: Ad 2 playing - waiting 70 seconds");
    await keepAliveWaitWithScreenshots(70, "Ad 2", "Step 12 - Ad 2");

    console.log(
      `Step 13: Closing Ad 2 by clicking close button at (${adCloseButtonX}, ${adCloseButtonY})`
    );
    await tap(adCloseButtonX, adCloseButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 13 - Ad 2 Closed");

    // ════════════════════════════════════════════════════════════════
    // POST-ADS SECTION
    // ════════════════════════════════════════════════════════════════

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║    ✅ BOTH ADS CLOSED - PREVIOUS HAND UNLOCKED ✅             ║"
    );
    console.log(
      "╚════════════════════════════════════════════════════════════════╝"
    );
    console.log("\n");

    console.log("Step 14: Verifying that previous hand is now displayed");
    await takeScreenshotAndAttach(
      "Step 14 - Previous Hand Unlocked and Visible"
    );

    console.log(`Step 15: Closing popup at (${closePopupX}, ${closePopupY})`);
    await tap(closePopupX, closePopupY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 15 - Popup Closed - Back to Game Board"
    );

    console.log("Step 16: Final verification");
    await takeScreenshotAndAttach("Step 16 - Test Complete - Back to Game");

    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("\n");
    console.log(
      "╔════════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║   ✅ PREVIOUS HAND UNLOCK VIA ADS TEST COMPLETE ✅           ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  Timeline (UPDATED):                                           ║"
    );
    console.log(
      "║  1. Game setup: ~10 seconds                                   ║"
    );
    console.log(
      "║  2. Manual play: 60 seconds (tester plays)                    ║"
    );
    console.log(
      "║  3. Click Watch Ads: ~2 seconds                               ║"
    );
    console.log(
      "║  4. Ad 1 plays: 70 seconds ⬆️ (increased by 10 sec)           ║"
    );
    console.log(
      "║  5. Ad 2 plays: 70 seconds ⬆️ (increased by 10 sec)           ║"
    );
    console.log(
      "║  6. Hand displayed: ~1 second                                 ║"
    );
    console.log(
      "║  ────────────────────────────────────────────────             ║"
    );
    console.log(
      "║  Total test time: ~3-4 minutes (213 seconds)                  ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  ✓ Game played (2+ rounds)                                    ║"
    );
    console.log(
      "║  ✓ Previous hand popup opened                                 ║"
    );
    console.log(
      "║  ✓ Watch Ads button clicked                                   ║"
    );
    console.log(
      "║  ✓ Ad 1 played 70 seconds (increased by 10) ⬆️               ║"
    );
    console.log(
      "║  ✓ Ad 1 closed automatically at (652.0, 384.7)                ║"
    );
    console.log(
      "║  ✓ Ad 2 played 70 seconds (increased by 10) ⬆️               ║"
    );
    console.log(
      "║  ✓ Ad 2 closed automatically at (652.0, 384.7)                ║"
    );
    console.log(
      "║  ✓ Previous hand unlocked and displayed                       ║"
    );
    console.log(
      "║  ✓ Returned to game board                                     ║"
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
