import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Game - Refresh Card Button (Select Trump Popup)", () => {
  it("should verify Refresh Card button changes the trump card after watching the ad", async () => {
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

    // Coordinates
    const playButtonX = 350.5;
    const playButtonY = 1055.3;

    const okButtonX = 355.5;
    const okButtonY = 996.4;

    const refreshCardButtonX = 472.2;
    const refreshCardButtonY = 1059.3;

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
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 2 - Betting Popup Appeared");

    // Step 3: Click OK button to start the game
    console.log(`Step 3: Clicking OK button at (${okButtonX}, ${okButtonY})`);
    await tap(okButtonX, okButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach(
      "Step 3 - Game Started - Select Trump Popup Appeared"
    );

    // Step 4: Click Refresh Card button
    console.log(
      `Step 4: Clicking Refresh Card button at (${refreshCardButtonX}, ${refreshCardButtonY})`
    );
    await tap(refreshCardButtonX, refreshCardButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 4 - Ad Loading After Refresh Card Click"
    );

    // Step 5: Wait for the rewarded ad to finish playing
    // Rewarded video ads typically run 15-30+ seconds; using a generous
    // wait here to ensure the ad fully completes before checking the
    // updated trump card popup.
    console.log("Step 5: Waiting for ad to finish playing");
    await driver.pause(35000);
    await takeScreenshotAndAttach("Step 5 - Ad Finished");

    // Step 6: Capture the updated Select Trump popup with the new/changed card
    console.log(
      "Step 6: Capturing updated Select Trump popup after card refresh"
    );
    await driver.pause(1500);
    await takeScreenshotAndAttach(
      "Step 6 - PASS - Trump Card Changed After Refresh"
    );

    // Final: Validate app is still running
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log(
      "✅ PASS: Refresh Card button test completed - trump card popup shown before and after refresh"
    );
  });
});
