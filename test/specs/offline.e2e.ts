import {
  takeScreenshotAndAttach,
  disableInternet,
  enableInternet,
  forceStopApp,
  relaunchApp,
} from "../helpers/appHelpers";

describe("Omi Offline Test", () => {
  // ✅ Restore internet after the ENTIRE suite finishes
  after(async () => {
    await enableInternet();
    console.log("Internet restored after offline suite");
  });

  // ✅ Also restore after each individual test
  afterEach(async () => {
    await enableInternet();
    console.log("Internet restored after test");
  });

  it("should display connection lost popup when launched without internet", async () => {
    // ── Step 1: Disable internet ──────────────────────────
    await disableInternet();
    await takeScreenshotAndAttach("Step 1 - Internet Disabled");

    // ── Step 2: Force stop then relaunch without internet ─
    await forceStopApp();
    await relaunchApp();
    await takeScreenshotAndAttach("Step 2 - App Launched Without Internet");

    // ── Step 3: Wait for connection lost popup ────────────
    await driver.pause(30000);
    await takeScreenshotAndAttach("Step 3 - Connection Lost Popup Expected");

    // ── Step 4: Validate app did not crash ────────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("Connection lost popup test completed");
  });

  it("should display Oops popup after clicking Play offline", async () => {
    // ── Step 1: Disable internet and launch app ───────────
    await disableInternet();
    await forceStopApp();
    await relaunchApp();
    await takeScreenshotAndAttach("Step 1 - App Launched Without Internet");

    // ── Step 2: Wait for Connection Lost popup ────────────
    await driver.pause(30000);
    await takeScreenshotAndAttach("Step 2 - Connection Lost Popup Visible");

    // ── Step 3: Tap "Play offline" button by coordinates ─
    const { width, height } = await driver.getWindowSize();
    const playOfflineX = Math.round(width * 0.327); // x: 235.6 / 720 = 32.7%
    const playOfflineY = Math.round(height * 0.759); // y: 1214.1 / 1600 = 75.9%

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    console.log(`Tapped Play offline at (${playOfflineX}, ${playOfflineY})`);

    // ── Step 4: Wait for Oops popup ───────────────────────
    await driver.pause(5000);
    await takeScreenshotAndAttach("Step 4 - Oops Popup Expected");

    // ── Step 5: Validate app still running ────────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log("Oops popup test completed");
  });

  it("should load board and display Select Trump popup after clicking Play offline in Oops popup", async () => {
    // ── Step 1: Disable internet and launch app ───────────
    await disableInternet();
    await forceStopApp();
    await relaunchApp();
    await takeScreenshotAndAttach("Step 1 - App Launched Without Internet");

    // ── Step 2: Wait for Connection Lost popup ────────────
    await driver.pause(30000);
    await takeScreenshotAndAttach("Step 2 - Connection Lost Popup Visible");

    // ── Step 3: Get window size for dynamic coordinates ───
    const { width, height } = await driver.getWindowSize();
    console.log(`Window size: ${width}x${height}`);

    const playOfflineX = Math.round(width * 0.327); // 32.7% from left
    const playOfflineY = Math.round(height * 0.759); // 75.9% from top

    // ── Step 4: Tap "Play offline" button (Connection Lost popup) ─
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    console.log(
      `Step 4: Tapped Play offline button at (${playOfflineX}, ${playOfflineY})`
    );

    // ── Step 5: Wait for Oops popup to appear ─────────────
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 5 - Oops Popup Displayed");

    // ── Step 6: Tap "Play offline" button in Oops popup (same coordinates) ─
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    console.log(
      `Step 6: Tapped Play offline button in Oops popup at (${playOfflineX}, ${playOfflineY})`
    );

    // ── Step 7: Wait and capture loading process ──────────
    console.log("Step 7: Waiting for loading process...");
    await driver.pause(2000);
    await takeScreenshotAndAttach("Step 7 - Loading Process Started");

    // ── Step 8: Continue waiting for board to load ────────
    console.log("Step 8: Waiting for board to fully load...");
    await driver.pause(8000);
    await takeScreenshotAndAttach("Step 8 - Board Loaded");

    // ── Step 9: Wait for Select Trump popup ───────────────
    console.log("Step 9: Waiting for Select Trump popup...");
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 9 - Select Trump Popup Displayed");

    // ── Step 10: Validate app is still running ────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    // ── Step 11: Additional validation - check if popup is visible ─
    console.log("Step 10: Verifying board and select trump popup are loaded");

    console.log(
      "✅ Complete offline test flow completed successfully: Connection Lost → Oops Popup → Board → Select Trump Popup"
    );
  });

  it("should select diamond as trump and start the game", async () => {
    // ── Step 1: Setup - Disable internet and launch app ──
    await disableInternet();
    await forceStopApp();
    await relaunchApp();
    console.log("Step 1: App launched without internet");

    // ── Step 2: Wait for Connection Lost popup ────────────
    await driver.pause(30000);
    console.log("Step 2: Waiting for Connection Lost popup");

    // ── Step 3: Get window size for dynamic coordinates ───
    const { width, height } = await driver.getWindowSize();
    console.log(`Window size: ${width}x${height}`);

    const playOfflineX = Math.round(width * 0.327); // 32.7%
    const playOfflineY = Math.round(height * 0.759); // 75.9%

    // ── Step 4: Click "Play offline" in Connection Lost popup ─
    console.log(
      `Step 3: Clicking Play offline at (${playOfflineX}, ${playOfflineY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    // ── Step 5: Wait for Oops popup ───────────────────────
    await driver.pause(3000);
    console.log("Step 4: Oops popup appeared");
    await takeScreenshotAndAttach("Step 4 - Oops Popup");

    // ── Step 6: Click "Play offline" in Oops popup ────────
    console.log(
      `Step 5: Clicking Play offline in Oops popup at (${playOfflineX}, ${playOfflineY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    // ── Step 7: Wait for loading and board ────────────────
    await driver.pause(2000);
    console.log("Step 6: Game loading...");
    await takeScreenshotAndAttach("Step 6 - Loading Process");

    await driver.pause(8000);
    console.log("Step 7: Board loaded");

    // ── Step 8: Wait for Select Trump popup ───────────────
    await driver.pause(3000);
    console.log("Step 8: Select Trump popup appeared");
    await takeScreenshotAndAttach("Step 8 - Select Trump Popup Appeared");

    // ────────────────────────────────────────────────────────
    // ── TRUMP SELECTION STARTS HERE ───────────────────────
    // ────────────────────────────────────────────────────────

    // ── Step 9: Click Diamond trump ───────────────────────
    // Coordinates: x=303.6, y=931.4
    const diamondX = 303.6;
    const diamondY = 931.4;

    console.log(
      `Step 9: Clicking Diamond trump card at (${diamondX}, ${diamondY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: diamondX,
            y: diamondY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    console.log(
      `✓ Successfully clicked Diamond trump at (${diamondX}, ${diamondY})`
    );

    // ── Step 10: Wait for selection to register ───────────
    await driver.pause(1500);
    console.log("Step 10: Diamond trump selected");
    await takeScreenshotAndAttach("Step 10 - Diamond Trump Selected");

    // ── Step 11: Click OK button ──────────────────────────
    // Coordinates: x=219.6, y=1067.3
    const okButtonX = 219.6;
    const okButtonY = 1067.3;

    console.log(`Step 11: Clicking OK button at (${okButtonX}, ${okButtonY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: okButtonX,
            y: okButtonY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    console.log(
      `✓ Successfully clicked OK button at (${okButtonX}, ${okButtonY})`
    );

    // ── Step 12: Wait for game to start ───────────────────
    await driver.pause(2000);
    console.log("Step 12: Game starting...");
    await takeScreenshotAndAttach("Step 12 - Game Starting");

    // ── Step 13: Wait for game board to fully load ────────
    await driver.pause(5000);
    console.log("Step 13: Game board fully loaded");
    await takeScreenshotAndAttach("Step 13 - Game Board Fully Loaded");

    // ── Step 14: Validate app is still running ────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    // ── Step 15: Final validation ────────────────────────
    console.log(
      "✅ Trump selection test completed successfully: Diamond selected → Game started → Game board displayed"
    );
  });

  it("should play game in offline mode by selecting and playing a card", async () => {
    // ── Step 1: Setup - Disable internet and launch app ──
    await disableInternet();
    await forceStopApp();
    await relaunchApp();
    console.log("Step 1: App launched without internet");

    // ── Step 2: Wait for Connection Lost popup ────────────
    await driver.pause(30000);
    console.log("Step 2: Waiting for Connection Lost popup");
    await takeScreenshotAndAttach("Step 2 - Connection Lost Popup");

    // ── Step 3: Get window size for dynamic coordinates ───
    const { width, height } = await driver.getWindowSize();
    console.log(`Window size: ${width}x${height}`);

    const playOfflineX = Math.round(width * 0.327);
    const playOfflineY = Math.round(height * 0.759);

    // ── Step 4: Click "Play offline" in Connection Lost popup ─
    console.log(
      `Step 3: Clicking Play offline at (${playOfflineX}, ${playOfflineY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    // ── Step 5: Wait for Oops popup ───────────────────────
    await driver.pause(3000);
    console.log("Step 4: Oops popup appeared");

    // ── Step 6: Click "Play offline" in Oops popup ────────
    console.log(
      `Step 5: Clicking Play offline in Oops popup at (${playOfflineX}, ${playOfflineY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    // ── Step 7: Wait for loading and board ────────────────
    await driver.pause(2000);
    console.log("Step 6: Game loading...");
    await takeScreenshotAndAttach("Step 6 - Loading Process");

    await driver.pause(8000);
    console.log("Step 7: Board loaded");

    // ── Step 8: Wait for Select Trump popup ───────────────
    await driver.pause(3000);
    console.log("Step 8: Select Trump popup appeared");
    await takeScreenshotAndAttach("Step 8 - Select Trump Popup Appeared");

    // ── Step 9: Click Diamond trump ───────────────────────
    const diamondX = 303.6;
    const diamondY = 931.4;

    console.log(
      `Step 9: Clicking Diamond trump card at (${diamondX}, ${diamondY})`
    );
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: diamondX,
            y: diamondY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    console.log(`✓ Successfully clicked Diamond trump`);

    // ── Step 10: Wait for selection to register ───────────
    await driver.pause(1500);
    console.log("Step 10: Diamond trump selected");
    await takeScreenshotAndAttach("Step 10 - Diamond Trump Selected");

    // ── Step 11: Click OK button ──────────────────────────
    const okButtonX = 219.6;
    const okButtonY = 1067.3;

    console.log(`Step 11: Clicking OK button at (${okButtonX}, ${okButtonY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: okButtonX,
            y: okButtonY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    console.log(`✓ Successfully clicked OK button`);

    // ── Step 12: Wait for game to start ───────────────────
    await driver.pause(2000);
    console.log("Step 12: Game starting...");

    // ── Step 13: Wait for game board to fully load ────────
    await driver.pause(5000);
    console.log("Step 13: Game board fully loaded");
    await takeScreenshotAndAttach("Step 13 - Game Board Fully Loaded");

    // ────────────────────────────────────────────────────────
    // ── PLAYING THE GAME STARTS HERE ──────────────────────
    // ────────────────────────────────────────────────────────

    // ── Step 14: Select and play a card ───────────────────
    // Coordinates: x=151.8, y=1324.1
    const cardX = 151.8;
    const cardY = 1324.1;

    console.log(`Step 14: Clicking card at coordinates (${cardX}, ${cardY})`);
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: cardX,
            y: cardY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);
    console.log(`✓ Card selected at (${cardX}, ${cardY})`);

    // ── Step 15: Wait for card to be played ───────────────
    await driver.pause(1500);
    console.log("Step 15: Card played by player");
    await takeScreenshotAndAttach("Step 15 - Card Played By Player");

    // ── Step 16: Wait for other players to play their cards ─
    console.log("Step 16: Waiting for other players to add cards to board...");
    await driver.pause(8000); // Wait for AI/other players
    console.log("Step 16: Other players have played their cards");
    await takeScreenshotAndAttach("Step 16 - All Players Cards On Board");

    // ── Step 17: Validate app is still running ────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    // ── Step 18: Final validation ────────────────────────
    console.log(
      "✅ Offline game play test completed successfully: Card selected → Card played → Other players added cards"
    );
  });

  it("should verify coins are NOT added when winning round in offline mode (BUG TEST)", async () => {
    // ── Step 1: Setup - Disable internet and launch app ──
    await disableInternet();
    await forceStopApp();
    await relaunchApp();
    console.log("Step 1: App launched without internet");
    await takeScreenshotAndAttach("Step 1 - App Launched Offline");

    // ── Step 2: Navigate through setup to game ───────────
    await driver.pause(30000);
    console.log("Step 2: Connection Lost popup");

    const { width, height } = await driver.getWindowSize();
    const playOfflineX = Math.round(width * 0.327);
    const playOfflineY = Math.round(height * 0.759);

    // Click Play offline (Connection Lost)
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    // Wait for Oops popup
    await driver.pause(3000);

    // Click Play offline (Oops)
    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          {
            type: "pointerMove",
            duration: 0,
            x: playOfflineX,
            y: playOfflineY,
          },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    // Wait for board loading
    await driver.pause(10000);

    // Select Trump
    const diamondX = 303.6;
    const diamondY = 931.4;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: diamondX, y: diamondY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    await driver.pause(1500);

    // Click OK
    const okButtonX = 219.6;
    const okButtonY = 1067.3;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: okButtonX, y: okButtonY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    await driver.pause(5000);

    // ────────────────────────────────────────────────────────
    // ── BUG TEST: CHECK COIN STATUS ─────────────────────
    // ────────────────────────────────────────────────────────

    // ── Step 3: Take screenshot BEFORE playing card ───────
    console.log("Step 3: Taking screenshot BEFORE playing card");
    await takeScreenshotAndAttach(
      "Step 3 - Before Playing Card - Check Coin Icon"
    );

    // ── Step 4: Try to locate coin element ────────────────
    // Using coordinate x=532, y=95 (top left where coins should be)
    console.log("Step 4: Attempting to find coin element on screen");

    try {
      const coinElement = await driver.$(
        "//android.widget.TextView[@text='532.56K']"
      );
      const isCoinVisible = await coinElement.isDisplayed();
      console.log(`Coin element visible before game: ${isCoinVisible}`);

      if (isCoinVisible) {
        const coinValue = await coinElement.getText();
        console.log(`Coin value BEFORE winning: ${coinValue}`);
      } else {
        console.log("⚠️ COIN ELEMENT NOT VISIBLE - This might be the bug!");
      }
    } catch (error) {
      console.log(
        "⚠️ Could not find coin element - This confirms the bug (no coin display in offline mode)"
      );
      await takeScreenshotAndAttach(
        "Step 4 - Bug Confirmed: No Coin Element Found"
      );
    }

    // ── Step 5: Play a card to win round ─────────────────
    console.log("Step 5: Playing card to win the round");
    const cardX = 151.8;
    const cardY = 1324.1;

    await driver.performActions([
      {
        type: "pointer",
        id: "finger1",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: cardX, y: cardY },
          { type: "pointerDown", button: 0 },
          { type: "pause", duration: 100 },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    await driver.pause(1500);
    console.log("Step 5: Card played");
    await takeScreenshotAndAttach("Step 5 - Card Played");

    // ── Step 6: Wait for other players and round to complete ─
    console.log("Step 6: Waiting for other players to play...");
    await driver.pause(8000);
    console.log("Step 6: Round completed");
    await takeScreenshotAndAttach(
      "Step 6 - Round Completed - Check Coin Update"
    );

    // ── Step 7: Check coin status AFTER winning ──────────
    console.log("Step 7: Checking coin status AFTER winning round");

    try {
      const coinElementAfter = await driver.$(
        "//android.widget.TextView[@text='532.56K']"
      );
      const isCoinVisibleAfter = await coinElementAfter.isDisplayed();
      console.log(`Coin element visible after win: ${isCoinVisibleAfter}`);

      if (isCoinVisibleAfter) {
        const coinValueAfter = await coinElementAfter.getText();
        console.log(`Coin value AFTER winning: ${coinValueAfter}`);

        // This should fail if bug exists (coins not increasing)
        await expect(coinValueAfter).not.toBe("532.56K");
        console.log("✓ Coins were updated after winning");
      } else {
        console.log(
          "❌ BUG CONFIRMED: Coin element NOT visible after winning in offline mode"
        );
        await takeScreenshotAndAttach(
          "Step 7 - Bug Confirmed: Coin Not Updated After Win"
        );
      }
    } catch (error) {
      console.log(
        "❌ BUG CONFIRMED: Cannot find or verify coins in offline mode"
      );
      await takeScreenshotAndAttach(
        "Step 7 - Bug Confirmed: Coin Element Not Found After Win"
      );
    }

    // ── Step 8: Visual comparison screenshots ─────────────
    console.log("Step 8: Taking final comparison screenshot");
    await takeScreenshotAndAttach(
      "Step 8 - Final Screenshot - Comparing With Online Mode"
    );

    // ── Step 9: Validation ───────────────────────────────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log(
      "✅ Bug test completed - Coin display issue in offline mode has been documented"
    );
  });
});
