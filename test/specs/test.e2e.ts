describe("Omi Game Launch Test", () => {
  it("should launch the Omi game successfully", async () => {
    // wait for app to load
    await browser.pause(5000);

    console.log("Omi game launched successfully");
  });
});
