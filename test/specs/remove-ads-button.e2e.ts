import { takeScreenshotAndAttach } from "../helpers/appHelpers";

describe("Home - Ads Free / Remove Ads Button", () => {
  const OMI_PACKAGE = "com.ceydigital.oombigame";

  // Reusable coordinates
  const adsFreeIconX = 645.0;
  const adsFreeIconY = 516.7;

  const removeAdsButtonX = 348.5;
  const removeAdsButtonY = 1057.3;

  const rs99ButtonX = 330.5;
  const rs99ButtonY = 1046.3;

  const subscribeButtonX = 275.6;
  const subscribeButtonY = 1438.0;

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

  it("should verify REMOVE ADS button works from the Ads Free popup", async () => {
    // ── Step 1: Launch app / Go to Homepage ───────────────
    console.log("Step 1: Launching OMI app - Homepage");
    await driver.activateApp(OMI_PACKAGE);
    await driver.pause(3000);
    await takeScreenshotAndAttach("Step 1 - Home Page Loaded");

    // ── Step 2: Click Ads Free Icon ────────────────────────
    console.log(
      `Step 2: Clicking Ads Free icon at (${adsFreeIconX}, ${adsFreeIconY})`
    );
    await tap(adsFreeIconX, adsFreeIconY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 2 - Ads Free Popup Opened");

    // ── Step 3: Click Remove Ads Button ────────────────────
    console.log(
      `Step 3: Clicking Remove Ads button at (${removeAdsButtonX}, ${removeAdsButtonY})`
    );
    await tap(removeAdsButtonX, removeAdsButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 3 - Remove Ads Button Clicked");

    // ── Step 4: Click Rs.99 Button ────────────────────
    console.log(
      `Step 4: Clicking Rs.99 button at (${rs99ButtonX}, ${rs99ButtonY})`
    );
    await tap(rs99ButtonX, rs99ButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 4 - Rs.99 Button Clicked");

    // ── Step 5: Click Subscribe Button ────────────────────
    console.log(
      `Step 5: Clicking Rs.99 button at (${subscribeButtonX}, ${subscribeButtonY})`
    );
    await driver.pause(2500);
    await tap(subscribeButtonX, subscribeButtonY);
    await driver.pause(1500);
    await takeScreenshotAndAttach("Step 5: Click Subscribe Button");

    // ── Final: Validate app is back in the foreground ──────
    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);
    await expect(currentPackage).toBe(OMI_PACKAGE);

    console.log("✅ REMOVE ADS Button Test Completed");
  });
});
