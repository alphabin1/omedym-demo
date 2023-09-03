const WebComponent = require('./WebComponent');

class TextView extends WebComponent {
  constructor(browser, selectorType, locator) {
    super(browser, selectorType, locator);
  }

  /**
   * Retrieves the text content of an element based on the specified selector.
   * @returns {Promise<string>} - A promise that resolves to the text content of the element.
   */
  async getText() {
    try {
      return await this.browser.getText(this.selectorType, this.locator);
    } catch (error) {
      return await this.browser.issueError(error);
    }
  }
}

module.exports = TextView;
