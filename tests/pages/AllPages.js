const LoginPage = require('./LoginPage');
const DashboardPage = require('./DashboardPage');

class AllPages {
  /**
   * Constructor for the AllPages class.
   * @param {Object} browser - The browser object used for web automation.
   */
  constructor(browser) {
    this.loginpage = new LoginPage(browser);
    this.dashboardPage = new DashboardPage(browser);
  }
}

module.exports = AllPages;
