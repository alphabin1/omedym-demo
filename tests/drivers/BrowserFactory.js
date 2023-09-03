require("chromedriver");
require("dotenv").config();
const Browser = require("./Browser");
const ConfigFactory = require("./ConfigFactory");
const ProcessUtil = require("../utils/ProcessUtils");
const Chrome = require("selenium-webdriver/chrome");
const { Builder, Capabilities } = require("selenium-webdriver");
const { Capability } = require("selenium-webdriver/lib/capabilities");

class BrowserFactory {
  
  /**
   * Creates a browser instance for web automation.
   * @param {Object} mochaContext - The Mocha test context.
   * @returns {Promise<Browser>} - A Promise that resolves to a Browser instance.
   */
  static async createBrowser(mochaContext) {
    try {
      this.config = await ConfigFactory.getConfig();
      const driver = await this.createDriverFromBrowserType(
        this.config.browser,
        this.config.isHeadless,
        this.config.browserStackEnabled
      );
      const browser = await new Browser(mochaContext, driver);
      return await browser;
    } catch (error) {
      await ProcessUtil.errorToRejectedPromise(error);
      throw error;
    }
  }

  /**
   * Creates a WebDriver instance based on the specified browser type and settings.
   * @param {string} browserType - The type of browser (e.g., "chrome", "firefox").
   * @param {boolean} isHeadless - Indicates if the browser should run in headless mode.
   * @param {boolean} browserStackEnabled - Indicates if BrowserStack is enabled.
   * @returns {Promise<Object>} - A Promise that resolves to a WebDriver instance.
   */
  static async createDriverFromBrowserType(
    browserType,
    isHeadless,
    browserStackEnabled
  ) {
    console.info(
      `Creating the Driver from given browser: ${browserType} with Headless mode: ${isHeadless} ${
        browserStackEnabled ? "on BrowserStack" : ""
      }`
    );
    if (browserStackEnabled) {
      return await this.createBrowserStackDriver(browserType);
    } else {
      switch (browserType) {
        case "chrome":
          return await this.createChromeDriver(isHeadless);
        case "safari":
          return await this.createSafariDriver();
        default:
          const message =
            "User has not selected any browser to run automation tests upon!";
          console.log(message);
          await ProcessUtil.createRejectedPromise(message);
          throw new Error(message);
      }
    }
  }

  /**
   * Creates a WebDriver instance for Google Chrome.
   * @param {boolean} isHeadless - Indicates if Chrome should run in headless mode.
   * @returns {Promise<Object>} - A Promise that resolves to a Chrome WebDriver instance.
   */
  static async createChromeDriver(isHeadless) {
    console.log("Creating chrome driver...");

    // const proxy = "20.186.110.157:3128"
    const options = new Chrome.Options();
    if (isHeadless) {
      options.addArguments("--incognito");
      options.addArguments("--headless");
      options.addArguments("--disable-gpu");
      options.addArguments("--window-size=1920,1080");
    }

    const capabilities = Capabilities.chrome();
    capabilities.set(Capability.ACCEPT_INSECURE_TLS_CERTS, true);

    const driver = await new Builder()
      .forBrowser("chrome")
      .withCapabilities(capabilities)
      .setChromeOptions(options)
      .build();

    await driver.manage().window().maximize();
    return driver;
  }

  /**
   * Creates a WebDriver instance for Apple Safari.
   * @returns {Promise<Object>} - A Promise that resolves to a Safari WebDriver instance.
   */
  static async createSafariDriver() {
    console.log("Creating safari driver...");

    const driver = await new Builder().forBrowser("safari").build();

    // Maximize the window
    await driver.manage().window().maximize();

    return driver;
  }
}

module.exports = BrowserFactory;
