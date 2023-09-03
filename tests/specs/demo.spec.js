require("dotenv").config();
const BrowserFactory = require("../drivers/BrowserFactory");
const addContext = require("mochawesome/addContext");

describe("Edit profile settings scenario", function () {
  let allPages;

  before("Open Browser", async function () {
    this.browser = await BrowserFactory.createBrowser(this);
    allPages = await new AllPages(this.browser);
  });

  afterEach(async function () {
    if (this.currentTest.state == "failed") {
      const screenshot = await this.browser.captureScreenshot();
      addContext(this, {
        title: this.currentTest.title,
        value: screenshot,
        type: "image/png",
      });
    }
  });

  after(async function () {
    if (this.test.state != "passed") {
      const screenshot = await this.browser.captureScreenshot();
      addContext(this, {
        title: "Screenshot",
        value: screenshot,
        type: "image/png",
      });
    }
    await this.browser.close();
  });
});
