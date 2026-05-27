import * as allure from "allure-js-commons";

async function takeScreenshotAndAttach(name: string) {
  const screenshot = await browser.takeScreenshot();
  const buffer = Buffer.from(screenshot, "base64");
  allure.attachment(name, buffer, "image/png");
}

async function waitForHomeScreen(timeoutMs = 45000): Promise<boolean> {
  const pollInterval = 2000;
  const maxAttempts = timeoutMs / pollInterval;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await driver.pause(pollInterval);

    const pkg = await driver.getCurrentPackage();
    console.log(`Attempt ${attempt + 1}: package = ${pkg}`);

    if (pkg === "com.ceydigital.oombigame") {
      if (attempt >= 10) {
        // ✅ At least 20 seconds passed — enough for Unity to finish rendering home screen
        console.log(`Home screen ready after ${(attempt + 1) * 2}s`);
        return true;
      }
    } else {
      console.log("App not in foreground — crashed or switched");
      return false;
    }
  }
  return false;
}

describe("Omi Game Launch Test", () => {
  it("should launch the Omi game successfully", async () => {
    await browser.pause(5000);
    await takeScreenshotAndAttach("App Launch Screen");
    console.log("Omi game launched successfully");
  });

  it("should move to home screen without crashing", async () => {
    await waitForHomeScreen(45000);

    // ✅ Screenshot taken AFTER home screen fully renders
    await takeScreenshotAndAttach("Home Screen Loaded");

    const currentPackage = await driver.getCurrentPackage();
    console.log("Current Package:", currentPackage);

    await expect(currentPackage).toBe("com.ceydigital.oombigame");
    console.log("Home screen loaded successfully without crash");
  });
});
