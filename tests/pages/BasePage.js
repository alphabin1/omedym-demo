const ProcessUtil = require("../utils/ProcessUtils");

class BasePage {
  constructor(browser) {
    if (this.constructor == BasePage) {
      throw new Error("Abstract class can not be instantiated!");
    }
    this.url = "";
    this.browser = browser;
  }

  /**
   * Gets the name of the page based on the class name.
   * @returns {string} - The name of the page.
   */
  getPageName() {
    return this.constructor.name;
  }

  /**
   * Navigates to the specified URL using the browser.
   * @param {string|null} url - The URL to navigate to. If null, the default page URL is used.
   * @returns {Promise<void>}
   */
  async goTo(url = null) {
    try {
      if (!url) {
        url = this.url;
      }
      await this.browser.navigate(url);
    } catch (error) {
      await ProcessUtil.errorToRejectedPromise(
        `Page: '${this.getPageName()}' tried to go to url: ${this.url}`
      );
    }
  }
}

module.exports = BasePage;
