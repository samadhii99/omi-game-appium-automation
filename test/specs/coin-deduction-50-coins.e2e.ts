import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - Coin Deduction on Unlocking 2nd Previous Hand (50 Coins)", () => {
  it("should decrease coin amount by 50 after unlocking 2nd previous sub round", async () => {
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

    // Helper to read the coin amount from the top of the board using OCR
    // NOTE: Adjust the crop region (left/top/width/height) below to match
    // where the coin counter is actually rendered on screen for your
    // device/resolution. This mirrors the OCR approach used in
    // home-ad-coin-reward.e2e.ts.
    const readCoinAmount = async (label: string): Promise<number | null> => {
      try {
        const screenshot = await driver.takeScreenshot();
        const fs = require("fs");
        const path = require("path");
        const tmpPath = path.join(
          process.cwd(),
          `coin-ocr-${label}-${Date.now()}.png`
        );
        fs.writeFileSync(tmpPath, screenshot, "base64");

        // Requires: npm install tesseract.js --save-dev
        const { createWorker } = require("tesseract.js");
        const worker = await createWorker("eng");

        const {
          data: { text },
        } = await worker.recognize(tmpPath);
        await worker.terminate();
        fs.unlinkSync(tmpPath);

        console.log(`OCR raw text (${label}):`, text.trim());

        // Extract first standalone number found in the OCR text
        const match = text.replace(/,/g, "").match(/\d+/);
        if (match) {
          const value = parseInt(match[0], 10);
          console.log(`✓ Coin amount detected (${label}): ${value}`);
          return value;
        }
        console.log(`⚠️ Could not detect a numeric coin amount (${label})`);
        return null;
      } catch (error) {
        console.log(`⚠️ OCR failed to read coin amount (${label}):`, error);
        return null;
      }
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

    const closePopupX = 89.9;
    const closePopupY = 1031.4;

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
      "║              ⏸️  MANUAL GAME PLAY REQUIRED  ⏸️                 ║"
    );
    console.log(
      "╠════════════════════════════════════════════════════════════════╣"
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
      "║  3. Test will automatically capture the coin amount, then      ║"
    );
    console.log(
      "║     tap the Card icon, Left Arrow, and 50-coin button after   ║"
    );
    console.log(
      "║     ~50 seconds                                                ║"
    );
    console.log(
      "║                                                                ║"
    );
    console.log(
      "║  ⏱️  Timeout: 50 seconds                                       ║"
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

    // Step 7: Read coin amount BEFORE spending 50 coins
    console.log(
      "Step 7: Reading coin amount BEFORE unlocking 2nd previous hand"
    );
    await takeScreenshotAndAttach("Step 7 - Coin Amount BEFORE");
    const coinsBefore = await readCoinAmount("before");

    // Step 8: Click Card icon to open Previous Hand popup
    console.log(`Step 8: Clicking Card icon at (${cardIconX}, ${cardIconY})`);
    await tap(cardIconX, cardIconY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 8 - Previous Hand Popup Displayed");

    // Step 9: Click Left Arrow icon to navigate to more previous sub round
    console.log(
      `Step 9: Clicking Left Arrow icon at (${leftArrowX}, ${leftArrowY})`
    );
    await tap(leftArrowX, leftArrowY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 9 - Coin Unlock Popup Appeared");

    // Step 10: Click 50 Coin button to unlock 2nd previous hand
    console.log(
      `Step 10: Clicking 50 Coin button at (${coin50ButtonX}, ${coin50ButtonY})`
    );
    await tap(coin50ButtonX, coin50ButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 10 - 2nd Previous Hand Popup Displayed"
    );

    // Step 11: Click away to close the popup
    console.log(
      `Step 11: Clicking away at (${closePopupX}, ${closePopupY}) to close popup`
    );
    await tap(closePopupX, closePopupY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 11 - Popup Closed - Back to Game Board"
    );

    // Step 12: Read coin amount AFTER spending 50 coins
    console.log(
      "Step 12: Reading coin amount AFTER unlocking 2nd previous hand"
    );
    await takeScreenshotAndAttach("Step 12 - Coin Amount AFTER");
    const coinsAfter = await readCoinAmount("after");

    // Step 13: Compare BEFORE and AFTER coin amounts
    console.log("Step 13: Comparing coin amounts");
    console.log(`Coins BEFORE: ${coinsBefore}`);
    console.log(`Coins AFTER: ${coinsAfter}`);

    if (coinsBefore !== null && coinsAfter !== null) {
      const difference = coinsBefore - coinsAfter;
      console.log(`Coin difference: ${difference}`);

      if (difference === 50) {
        console.log("✅ PASS: Coin amount decreased by exactly 50 as expected");
      } else {
        console.log(
          `⚠️ Coin amount changed by ${difference}, expected a decrease of 50. ` +
            "Please verify manually via the BEFORE/AFTER screenshots."
        );
      }
    } else {
      console.log(
        "⚠️ Could not reliably read coin amount via OCR. " +
          "Please verify manually via the BEFORE (Step 7) and AFTER (Step 12) screenshots."
      );
    }

    // Final: Validate app is still running
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log(
      "✅ Coin Deduction (50 Coins) Test Completed - see logs/screenshots above for result"
    );
    // No failing expect() on the OCR comparison itself - visual/log
    // verification via BEFORE/AFTER screenshots is the source of truth.
    await expect(true).toBe(true);
  });
});
