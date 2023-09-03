const {Key} = require('selenium-webdriver');
const WebComponent = require('./WebComponent');

class TextInput extends WebComponent {
  constructor(browser, selectorType, locator) {
    super(browser, selectorType, locator);
  }

  /**
   * Types text into an input field with a slow typing effect.
   * @param {string} text - The text to type into the input field.
   * @param {boolean} pressEnter - Whether to press the Enter key after typing (default: false).
   */
  async slowType(text, pressEnter = false) {
    try {
      await this.browser.randomDelay(500);
      await this.browser.slowType(this.selectorType, this.locator, text, pressEnter);
      await this.browser.randomDelay(1000);
    } catch (error) {
      await this.browser.issueError(error);
    }
  }

  /**
   * Types text into an input field with a fast typing effect.
   * @param {string} text - The text to type into the input field.
   */
  async fastType(text) {
    try {
      await this.browser.randomDelay(200);
      await this.browser.sendKeys(this.selectorType, this.locator, text);
      await this.browser.randomDelay(100);
    } catch (error) {
      await this.browser.issueError(error);
    }
  }

  /**
   * Presses the Enter key on the input field.
   */
  async pressEnter() {
    const element = await this.findElementOrFailStep();
    try {
      element.sendKeys(Key.ENTER);
    } catch (error) {
      await this.browser.issueError(error);
    }
  }

  /**
   * Clears the text from the input field using JavaScript and keyboard shortcuts.
   */
  async clearText() {
    await this.browser.clearTextJS(this.selectorType, this.locator);
    await this.browser.clearTextWithKeyboardShortcut(this.selectorType, this.locator);
  }
}

module.exports = TextInput;
