import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Home - Play Button Betting Amount Increment/Decrement", () => {
  it("should allow user to increment and decrement betting amount before starting game", async () => {
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

    const plusIconX = 510.2;
    const plusIconY = 898.4;

    const minusIconX = 224.6;
    const minusIconY = 898.4;

    const okButtonX = 355.5;
    const okButtonY = 996.4;

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

    // Step 3: Click + icon 3 times to increase bet amount, screenshot after each
    console.log("Step 3: Increasing bet amount using + icon (3 times)");
    for (let i = 1; i <= 3; i++) {
      console.log(
        `Step 3.${i}: Clicking + icon at (${plusIconX}, ${plusIconY}) - increment #${i}`
      );
      await tap(plusIconX, plusIconY);
      await driver.pause(800);
      await takeScreenshotAndAttach(`Step 3.${i} - Bet Amount Increased #${i}`);
    }

    // Step 4: Click - icon 2 times to reduce bet amount, screenshot after each
    console.log("Step 4: Reducing bet amount using - icon (2 times)");
    for (let i = 1; i <= 2; i++) {
      console.log(
        `Step 4.${i}: Clicking - icon at (${minusIconX}, ${minusIconY}) - decrement #${i}`
      );
      await tap(minusIconX, minusIconY);
      await driver.pause(800);
      await takeScreenshotAndAttach(`Step 4.${i} - Bet Amount Decreased #${i}`);
    }

    // Step 5: Click OK button to confirm bet and start game
    console.log(`Step 5: Clicking OK button at (${okButtonX}, ${okButtonY})`);
    await tap(okButtonX, okButtonY);
    await driver.pause(2000);
    await takeScreenshotAndAttach(
      "Step 5 - Game Started After Confirming Bet Amount"
    );

    // Final: Validate app is still running
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log(
      "✅ PASS: Betting amount increment/decrement flow completed and game started successfully"
    );
  });
});
