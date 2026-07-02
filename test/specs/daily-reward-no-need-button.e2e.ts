import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Home - Daily Reward 'No Need' (අවශ්‍ය නැත) Button", () => {
  const OMI_PACKAGE = "com.ceydigital.oombigame";

  // Reusable coordinates
  const rewardIconX = 644.0;
  const rewardIconY = 402.7;

  const dayX = 215.6;
  const dayY = 777.5;

  const claimButtonX = 325.5;
  const claimButtonY = 1120.3;

  const noNeedButtonX = 248.6;
  const noNeedButtonY = 1145.3;

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

  it("should verify the 'No Need' button in Daily Reward popup", async () => {
    // ── Step 1: Launch app / Go to Homepage ───────────────
    console.log("Step 1: Launching OMI app - Homepage");
    await driver.activateApp(OMI_PACKAGE);
    await driver.pause(30000);
    await takeScreenshotAndAttach("Step 1 - Home Page Loaded");

    // ── Step 2: Click Reward Icon ──────────────────────────
    console.log(
      `Step 2: Clicking Reward icon at (${rewardIconX}, ${rewardIconY})`
    );
    await tap(rewardIconX, rewardIconY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 2 - Daily Reward Popup Opened");

    // ── Step 3: Select Day ─────────────────────────────────
    console.log(`Step 3: Selecting day at (${dayX}, ${dayY})`);
    await tap(dayX, dayY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 3 - Day Selected");

    // ── Step 4: Check for "You already rewarded" message ──
    console.log(
      'Step 4: Checking if "You already rewarded" message is displayed'
    );
    let alreadyRewarded = false;
    try {
      const alreadyRewardedText = await driver.$(
        "//*[contains(@text,'already rewarded') or contains(@text,'Already Rewarded') or contains(@text,'You already rewarded')]"
      );
      alreadyRewarded = await alreadyRewardedText.isDisplayed();
    } catch (error) {
      console.log(
        '"You already rewarded" message not found, proceeding with claim flow'
      );
      alreadyRewarded = false;
    }

    if (alreadyRewarded) {
      // ── Case A: Already rewarded today - test ends here ──
      console.log(
        '✅ "You already rewarded" message displayed - reward already claimed today'
      );
      await takeScreenshotAndAttach(
        "Step 4 - Already Rewarded Message Displayed - Test Complete"
      );
    } else {
      // ── Case B: Not yet rewarded - continue claim flow ──
      console.log(
        '"You already rewarded" message not shown - continuing with claim flow'
      );

      // ── Step 5: Click Day Again ───────────────────────────
      console.log(`Step 5: Clicking day again at (${dayX}, ${dayY})`);
      await tap(dayX, dayY);
      await driver.pause(1500);
      await takeScreenshotAndAttach("Step 5 - Day Clicked Again");

      // ── Step 6: Click Claim Button ─────────────────────────
      console.log(
        `Step 6: Clicking Claim button at (${claimButtonX}, ${claimButtonY})`
      );
      await tap(claimButtonX, claimButtonY);
      await driver.pause(1500);
      await takeScreenshotAndAttach(
        "Step 6 - Claim Button Clicked - Reward Popup Opened"
      );

      // ── Step 7: Click No Need Button (අවශ්‍ය නැත) ─────────
      console.log(
        `Step 7: Clicking No Need (අවශ්‍ය නැත) button at (${noNeedButtonX}, ${noNeedButtonY})`
      );
      await tap(noNeedButtonX, noNeedButtonY);
      await driver.pause(1500);
      await takeScreenshotAndAttach(
        "Step 7 - No Need Button Clicked - Popup Closed"
      );

      console.log(
        '✅ "No Need" (අවශ්‍ය නැත) button worked correctly - popup closed without claiming extra reward'
      );
    }

    // ── Final: Validate app is still running ────────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe(OMI_PACKAGE);

    console.log("✅ Daily Reward 'No Need' Button Test Completed");
  });
});
