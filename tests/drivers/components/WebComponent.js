class WebComponent {
  constructor(browser, selectorType, locator) {
    this.browser = browser;
    this.selectorType = selectorType;
    this.locator = locator;
  }

  /**
   * Clicks on the web component.
   */
  async click() {
    try {
      await this.browser.delay(1000);
      await this.browser.randomDelay(500);
      await this.browser.scrollIntoView(this.selectorType, this.locator);
      await this.browser.randomDelay(500);
      await this.browser.click(this.selectorType, this.locator);
      await this.browser.randomDelay(100);
    } catch (error) {
      await console.log(error);
      await this.browser.delay(4000);
      await this.browser.clickJS(this.selectorType, this.locator);
      await console.log('Successfully clicked via JS executor');
    }
  }

  /**
   * Finds and returns the web component element or throws an error if not found.
   * @returns {Promise<Element>} - The web component element.
   * @throws {Error} - If the element is not found within the specified timeout.
   */
  async findElementOrFailStep() {
    let element;
    try {
      element = await this.browser.findBySelectorType(this.selectorType, this.locator, 3000);
      return element;
    } catch (error) {
      await this.browser.issueError(error);
      throw error;
    }
  }

  /**
   * Checks if the web component is available and displayed within a specified time.
   * @param {number} withinSeconds - The timeout in seconds.
   * @returns {Promise<boolean>} - True if the element is displayed; otherwise, false.
   */
  async isAvailableAndDisplayed(withinSeconds) {
    try {
      const el = await this.browser.findBySelectorType(this.selectorType, this.locator, withinSeconds * 1000);
      const isElementDisplayed = await el.isDisplayed();
      console.info(`Element '${this.selectorType}': '${this.locator}' is '${isElementDisplayed}'!`);
      await this.browser.randomDelay(1000);
      return isElementDisplayed;
    } catch (e) {
      console.log(`Element '${this.selectorType}': '${this.locator}' is not found within: ${withinSeconds}. Timeout error occurred! \n${e} `);
      return false;
    }
  }

  /**
   * Wait until an element is enabled.
   */
  async waitUntilEnabled() {
    try {
      await this.browser.waitUntilEnabled(this.selectorType, this.locator);
    } catch (error) {
      await this.browser.issueError(error, `To wait until element: ${this.selectorType}': '${this.locator}' is enabled.`, error.message);
    }
    console.info(`Waited until element: ${this.selectorType}': '${this.locator}' was enabled.`);
  }
}

module.exports = WebComponent;
