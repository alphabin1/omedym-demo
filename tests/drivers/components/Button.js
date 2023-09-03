const WebComponent = require("./WebComponent");

class Button extends WebComponent {
  constructor(browser, selectorType, locator) {
    super(browser, selectorType, locator);
  }

  /**
   * Clicks the button element.
   * Delays before and after clicking.
   * @returns {Promise<void>}
   */
  async click() {
    await this.browser.delay(2000);
    await this.browser.click(this.selectorType, this.locator);
    await this.browser.randomDelay(100);
  }

  /**
   * Clicks the button element using JavaScript.
   * Delays before and after clicking.
   * @returns {Promise<void>}
   */
  async clickJS() {
    await this.browser.randomDelay(100);
    await this.browser.clickJS(this.selectorType, this.locator);
    await this.browser.randomDelay(100);
  }
}

module.exports = Button;
