require("dotenv").config();
const BrowserFactory = require("../drivers/BrowserFactory");
const addContext = require("mochawesome/addContext");
const AllPages = require('../pages/AllPages');
const FileUtil = require("../utils/FileUtils");

describe("Edit profile settings scenario", function () {
  let allPages;

  before("Open Browser", async function () {
    this.browser = await BrowserFactory.createBrowser(this);
    allPages = await new AllPages(this.browser);
  });

  describe("Verify login to the Omedym site", function () {

    it("Verify user should be able to login successfully", async function () {
      // Login Page
      await allPages.loginpage.navigateToOmedymLogin();
      const [email, password] = this.browser.getLoginCredentials();

      await allPages.loginpage.fillLoginForm(email, password);
    });
  });

  describe("Verify user should be able to edit the profile settings succesfully", function () {
    const cwd = FileUtil.getCurrentDirectory()
    const title = 'QA Automation Engineer'
    const fname = "Sagar"
    const lname = 'K'
    const linkedInUrl = 'in.linkedin.com/company/alphabin'

    it("verify user should be able to navigate to the profile settings", async function () {
      await allPages.dashboardPage.navigateToUserProfileSettings();
    });

    it('Verify user should be able to edit Profile picture, LinkedIn Url and Title', async function () {
      await allPages.editProfilePage.clickOnEditUserPencilButton()
      await allPages.editProfilePage.updateProfileSettings(`${cwd}/file/profile.png`, fname, lname, title, linkedInUrl)
      await this.browser.delay(5000)
    });
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
