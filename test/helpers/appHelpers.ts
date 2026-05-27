// both test files can reuse the same utility functions without repeating code
import * as allure from "allure-js-commons";

export async function takeScreenshotAndAttach(name: string) {
  const screenshot = await browser.takeScreenshot();
  const buffer = Buffer.from(screenshot, "base64");
  allure.attachment(name, buffer, "image/png");
}

export async function waitForHomeScreen(timeoutMs = 45000): Promise<boolean> {
  const pollInterval = 2000;
  const maxAttempts = timeoutMs / pollInterval;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await driver.pause(pollInterval);
    const pkg = await driver.getCurrentPackage();
    console.log(`Attempt ${attempt + 1}: package = ${pkg}`);

    if (pkg === "com.ceydigital.oombigame") {
      if (attempt >= 10) {
        console.log(`Home screen ready after ${(attempt + 1) * 2}s`);
        return true;
      }
    } else {
      return false;
    }
  }
  return false;
}

export async function disableInternet() {
  await driver.execute("mobile: shell", {
    command: "svc",
    args: ["wifi", "disable"],
  });
  await driver.execute("mobile: shell", {
    command: "svc",
    args: ["data", "disable"],
  });
  console.log("Internet disabled");
  await driver.pause(2000);
}

export async function enableInternet() {
  await driver.execute("mobile: shell", {
    command: "svc",
    args: ["wifi", "enable"],
  });
  await driver.execute("mobile: shell", {
    command: "svc",
    args: ["data", "enable"],
  });
  console.log("Internet re-enabled");
  await driver.pause(2000);
}

export async function forceStopApp() {
  await driver.execute("mobile: shell", {
    command: "am",
    args: ["force-stop", "com.ceydigital.oombigame"],
  });
  console.log("App force stopped");
  await driver.pause(2000);
}

export async function relaunchApp() {
  await driver.execute("mobile: shell", {
    command: "am",
    args: [
      "start",
      "-n",
      "com.ceydigital.oombigame/com.google.firebase.MessagingUnityPlayerActivity",
    ],
  });
  console.log("App relaunched");
}
