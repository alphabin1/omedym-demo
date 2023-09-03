class TestConfig {
  // constructor
  constructor() {
    this.browser = 'browser',
    this.defaultElementTimeout = '30000',
    this.defaultPageLoadTimeout = '60000',
    this.defaultTestTimeout = '300000',
    this.demoSiteUrl = 'https://omedym-assess-qa.omedym.com/login'
  }

  // properties
  browser;
  defaultElementTimeout;
  defaultPageLoadTimeout;
  defaultTestTimeout;
  demoSiteUrl;
}

module.exports = TestConfig;
