const LoginPage = require('./LoginPage');
const DashboardPage = require('./DashboardPage');
const EditProfilePage = require('./EditProfilePage');

class AllPages {
  /**
   * Constructor for the AllPages class.
   * @param {Object} browser - The browser object used for web automation.
   */
  constructor(browser) {
    this.loginpage = new LoginPage(browser);
    this.dashboardPage = new DashboardPage(browser);
    this.editProfilePage = new EditProfilePage(browser)
  }
}

module.exports = AllPages;
