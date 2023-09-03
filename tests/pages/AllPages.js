const LoginPage = require('./LoginPage');

class AllPages {
  /**
   * Constructor for the AllPages class.
   * @param {Object} browser - The browser object used for web automation.
   */
  constructor(browser) {
    this.loginpage = new LoginPage(browser);
  }
}

module.exports = AllPages;
