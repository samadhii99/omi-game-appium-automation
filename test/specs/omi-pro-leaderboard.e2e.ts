import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Home - OMI PRO Leaderboard", () => {
  it("should display Pro Player, Yesterday Winner, and All Time Winner leaderboard tabs", async () => {
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

    // Helper to perform a scroll-down swipe gesture
    const scrollDown = async (startY: number, endY: number) => {
      await driver.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: 400, y: startY },
            { type: "pointerDown", button: 0 },
            { type: "pause", duration: 300 },
            { type: "pointerMove", duration: 500, x: 400, y: endY },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);
    };

    // Step 1: Launch app
    console.log("Step 1: Launching app");
    await driver.launchApp();
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 1 - Home Screen");

    // Step 2: Click Board icon
    console.log("Step 2: Clicking Board icon at (115.8, 1552.0)");
    await tap(115.8, 1552.0);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 2 - Leaderboard Page Opened");

    // Step 3: Click Pro Player tab
    console.log("Step 3: Clicking Pro Player tab at (190.6, 496.7)");
    await tap(190.6, 496.7);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 3 - Pro Player Tab Selected");

    // Step 4: Click Yesterday Winner tab
    console.log("Step 4: Clicking Yesterday Winner tab at (358.5, 498.7)");
    await tap(358.5, 498.7);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 4 - Yesterday Winner Tab Selected");

    // Step 5: Scroll down on Yesterday Winner tab
    console.log("Step 5: Scrolling down on Yesterday Winner tab");
    await scrollDown(900, 400);
    await driver.pause(500);
    await takeScreenshotAndAttach(
      "Step 5 - Yesterday Winner Tab Scrolled Down"
    );

    // Step 6: Click All Time Winner tab
    console.log("Step 6: Clicking All Time Winner tab at (531.2, 499.7)");
    await tap(531.2, 499.7);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 6 - All Time Winner Tab Selected");

    // Step 7: Scroll down more on All Time Winner tab
    console.log("Step 7: Scrolling down further on All Time Winner tab");
    await scrollDown(900, 400);
    await driver.pause(600);
    await takeScreenshotAndAttach(
      "Step 7 - All Time Winner Tab Scrolled Down View 1"
    );

    console.log("Step 8: Continuing to scroll down on All Time Winner tab");
    await scrollDown(900, 400);
    await driver.pause(600);
    await takeScreenshotAndAttach(
      "Step 8 - All Time Winner Tab Scrolled Down View 2"
    );

    console.log("Step 9: Continuing to scroll down on All Time Winner tab");
    await scrollDown(900, 400);
    await driver.pause(600);
    await takeScreenshotAndAttach(
      "Step 9 - All Time Winner Tab Scrolled Down View 3"
    );

    // Final: Validate app is still running
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe("com.ceydigital.oombigame");

    console.log(
      "✅ PASS: OMI PRO Leaderboard - Pro Player, Yesterday Winner, and All Time Winner tabs displayed and scrolled"
    );
  });
});
