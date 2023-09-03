const BasePage = require('./BasePage');
const SelectorType = require('../drivers/SelectorType');
const Button = require('../drivers/components/Button');

class DashboardPage extends BasePage {
  constructor(browser) {
    super(browser);
    this.url = ''
  }

  /**
   * Returns a Button element representing the user profile button.
   * @returns {Button} - A Button element linked to the user profile.
   */
  getUserProfile() {
    return new Button(this.browser, SelectorType.CSS, '[aria-label="Go to your settings"]')
  }

  /**
   * Clicks on the user profile button.
   * @returns {Promise<void>}
   */
  async navigateToUserProfileSettings() {
    await this.getUserProfile().click()
  }
}

module.exports = DashboardPage;
