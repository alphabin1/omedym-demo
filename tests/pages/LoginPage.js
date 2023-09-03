const BasePage = require('./BasePage');
const SelectorType = require('../drivers/SelectorType');
const TextInput = require('../drivers/components/TextInput');
const Button = require('../drivers/components/Button');

class LoginPage extends BasePage {
  constructor(browser) {
    super(browser);
    this.url = this.browser.getDemoSiteUrl();
  }

  /**
   * Navigates to the specified website URL.
   * @returns {Promise<void>}
   */
  async navigateToOmedymLogin() {
    await super.goTo(this.url);
  }

  /**
   * Returns the email input element on the page.
   * @returns {TextInput} - The email input element.
   */
  getEmailInput() {
    return new TextInput(this.browser, SelectorType.CSS, '#loginId');
  }

  /**
   * Returns the "Next" button element on the page.
   * @returns {Button} - The "Next" button element.
   */
  getNextButton() {
    return new Button(this.browser, SelectorType.CSS, '.omedym-btn.button');
  }

  /**
   * Returns the password input element on the page.
   * @returns {TextInput} - The password input element.
   */
  getPasswordInput() {
    return new TextInput(this.browser, SelectorType.CSS, '#password');
  }

  /**
   * Returns the submit button element on the page.
   * @returns {Button} - The submit button element.
   */
  getSubmitButton() {
    return new Button(this.browser, SelectorType.CSS, '.omedym-btn.button');
  }

  /**
   * Fills the login form with the provided email and password.
   * @param {string} email - The email to enter in the email input field.
   * @param {string} password - The password to enter in the password input field.
   * @returns {Promise<void>}
   */
  async fillLoginForm(email, password) {
    await this.getEmailInput().fastType(email);
    await this.getNextButton().click();
    await this.getPasswordInput().fastType(password);
    await this.getSubmitButton().click();
  }
}

module.exports = LoginPage;
