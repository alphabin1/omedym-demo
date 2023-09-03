require("dotenv").config();
const os = require("os");
const SelectorType = require("./SelectorType");
const ProcessUtil = require("../utils/ProcessUtils");
const ConfigFactory = require("./ConfigFactory");
const { Key, By, until } = require("selenium-webdriver");

class Browser {
  static mainWindowHandler = "";

  constructor(mochaContext, driver) {
    this.testConfig = ConfigFactory.getConfig();
    this.mochaContext = mochaContext;
    this.driver = driver;
  }

  /**
   * Get the URL of the demo site from the test configuration.
   * @returns {string} - The demo site URL.
   */
  getDemoSiteUrl() {
    return this.testConfig.demoSiteUrl;
  }

  /**
   * Get the current URL of the web page.
   * @returns {Promise<string>} - A promise that resolves to the current URL.
   */
  async getCurrentUrl() {
    await this.delay(1000);
    return await this.driver.getCurrentUrl();
  }

  /**
   * Navigate to a specified URL.
   * @param {string} url - The URL to navigate to.
   */
  async navigate(url) {
    console.log("Navigating to : " + url);
    await this.driver.navigate().to(url);
    this.clearMainWindowHandler();
  }

  /**
   * Clear the main window handler.
   */
  clearMainWindowHandler() {
    this.mainWindowHandler = "";
  }

  /**
   * Close the WebDriver session.
   */
  async close() {
    await this.driver.quit();
  }

  /**
   * Get login credentials from environment variables.
   * @returns {string[]} - An array containing the email and password.
   */
  getLoginCredentials() {
    return [process.env.EMAIL, process.env.PASSWORD];
  }

  /**
   * Find elements on the page by selector type (CSS or XPath).
   * @param {SelectorType} selectorType - The type of selector (CSS or XPath).
   * @param {string} locator - The selector value.
   * @param {number} timeout - (Optional) Timeout for element location.
   * @param {boolean} multipleElements - (Optional) Set to true to find multiple elements.
   * @returns {WebElement|WebElement[]} - The located element(s).
   */
  async findBySelectorType(selectorType, locator, timeout) {
    if (selectorType == SelectorType.CSS) {
      if (timeout) return await this.findByCss(locator, timeout);
      else return await this.findByCss(locator);
    } else {
      if (timeout) return await this.findByXpath(locator, timeout);
      else return await this.findByXpath(locator);
    }
  }

  /**
   * Find elements on the page by CSS selector.
   * @param {string} cssPath - The CSS selector.
   * @param {number} timeout - (Optional) Timeout for element location.
   * @param {boolean} multipleElements - (Optional) Set to true to find multiple elements.
   * @returns {WebElement|WebElement[]} - The located element(s).
   */
  async findByCss(cssPath, timeout, multipleElements = false) {
    console.info("waitForCssPath" + cssPath);
    const optTimeout = timeout || this.testConfig.defaultElementTimeout;
    console.info("Timeout for css selector" + optTimeout);

    const condition = until.elementLocated(By.css(cssPath));
    await this.driver.wait(
      async (driver) => condition.fn(driver),
      optTimeout,
      `could not load the element with given css selector : ${cssPath}`
    );
    let element;
    if (multipleElements) {
      element = await this.driver.findElements(By.css(cssPath));
    } else {
      element = await this.driver.findElement(By.css(cssPath));
    }
    return element;
  }

  /**
   * Find elements on the page by XPath selector.
   * @param {string} xPath - The XPath selector.
   * @param {number} timeout - (Optional) Timeout for element location.
   * @param {boolean} multipleElements - (Optional) Set to true to find multiple elements.
   * @returns {WebElement|WebElement[]} - The located element(s).
   */
  async findByXpath(xPath, timeout, multipleElements = false) {
    console.info("waitForXpath : " + xPath);
    const optTimeout = timeout || this.testConfig.defaultElementTimeout;
    console.info("Timeout for Xpath selector" + optTimeout);

    const condition = until.elementLocated(By.xpath(xPath));
    await this.driver.wait(
      async (driver) => condition.fn(driver),
      optTimeout,
      `Could not load the element with given xpath selector : ${xPath}`
    );
    let element;
    if (multipleElements) {
      element = await this.driver.findElements(By.xpath(xPath));
    } else {
      element = await this.driver.findElement(By.xpath(xPath));
    }
    return element;
  }

  /**
   * Pause execution for a specified time (in milliseconds).
   * @param {number} timeInMillis - The time to wait in milliseconds.
   * @returns {Promise<void>}
   */
  async delay(timeInMillis) {
    console.log("Delay: " + timeInMillis + "in milliseconds");
    return new Promise((resolve) => {
      setTimeout(resolve, timeInMillis);
    });
  }

  /**
   * Introduce a random delay of up to the specified maximum time (in milliseconds).
   * @param {number} maximumTimeInMillis - The maximum time for the random delay.
   * @returns {Promise<void>}
   */
  async randomDelay(maximumTimeInMillis) {
    const randmomDelay = Math.random() * maximumTimeInMillis;
    await this.delay(randmomDelay);
  }

  /**
   * Waits until an element identified by the given selector becomes enabled.
   * @param {SelectorType} selectorType - The type of selector to use (e.g., CSS, XPath).
   * @param {string} locator - The locator for the element.
   */
  async waitUntilEnabled(selectorType, locator) {
    const element = await this.findBySelectorType(selectorType, locator);
    await this.waitUntilElementEnabled(element);
  }

  /**
   * Scrolls an element identified by selector into view on the page.
   * @param {SelectorType} selectorType - The type of selector to use (e.g., CSS, XPath).
   * @param {string} locator - The locator for the element.
   */
  async scrollIntoView(selectorType, locator) {
    console.info("scrollIntoView");
    const element = await this.findBySelectorType(selectorType, locator);
    const javaScript = "arguments[0].scrollIntoView(true)";
    await this.executeJavaScript(javaScript, element);
    await this.delay(700);
  }

  /**
   * Clears the text in an input field using the keyboard shortcut Ctrl+A and Backspace.
   * @param {SelectorType} selectorType - The type of selector to use (e.g., CSS, XPath).
   * @param {string} locator - The locator for the input field.
   */
  async clearTextWithKeyboardShortcut(selectorType, locator) {
    const element = await this.findBySelectorType(selectorType, locator);
    await this.waitUntilElementEnabled(element);

    await console.info(
      "Clearing the input with Keyboard shortcut: Ctrl+A and Backspace"
    );
    const controlKey = os.platform() === "darwin" ? Key.COMMAND : Key.CONTROL;
    await element.sendKeys(Key.chord(controlKey, "a", Key.BACK_SPACE));
    await console.info("clearWithKeyboardShortcut() happened");
  }

  /**
   * Clears the input element, sends keys (text) to it, and logs the typed text.
   * @param {SelectorType} selectorType - The type of selector (e.g., CSS, XPath).
   * @param {string} locator - The locator for the target element.
   * @param {string} text - The text to type into the input element.
   * @param {boolean} clear - Whether to clear the input element before typing (default is true).
   * @returns {WebElement} - The input element.
   */
  async sendKeys(selectorType, locator, text, clear = true) {
    const element = await this.findBySelectorType(selectorType, locator);
    await this.delay(500);
    await element.sendKeys(text);
    console.info(
      "Sendkeys performed successfully. Typed text is: " +
        (await element.getAttribute("value"))
    );
    return element;
  }

  /**
   * Retrieves the value of an input element.
   * @param {SelectorType} selectorType - The type of selector (e.g., CSS, XPath).
   * @param {string} locator - The locator for the target element.
   * @returns {string} - The value of the input element.
   */
  async getValue(selectorType, locator) {
    const element = await this.findBySelectorType(selectorType, locator);
    const value = element.getAttribute("value");
    return value;
  }

  /**
   * Clears an input element using JavaScript, sets a new value, and logs the typed text.
   * @param {SelectorType} selectorType - The type of selector (e.g., CSS, XPath).
   * @param {string} locator - The locator for the target element.
   * @param {string} text - The text to set as the input value.
   * @returns {WebElement} - The input element.
   */
  async sendKeysJS(selectorType, locator, text) {
    const element = await this.findBySelectorType(selectorType, locator);
    await this.waitUntilElementEnabled();
    await this.delay();
    await element.clear();
    const javaScript = `arguments[0].setAttribute('value', ${text});`;
    await this.executeJavaScript(javaScript, element);
    console.info(
      "sendKeyJS performed successfully. Typed text is: " +
        (await element.getAttribute("value"))
    );
    return element;
  }

  /**
   * Types text into an input element slowly, with optional Enter key press.
   * @param {SelectorType} selectorType - The type of selector (e.g., CSS, XPath).
   * @param {string} locator - The locator for the target element.
   * @param {string} text - The text to type into the input element.
   * @param {boolean} pressEnter - Whether to press Enter key after typing (optional).
   * @returns {WebElement} - The input element.
   */
  async slowType(selectorType, locator, text, pressEnter) {
    const element = await this.findBySelectorType(selectorType, locator);
    await element.clear();
    for (let i = 0; i < text.length; i++) {
      console.info("Sendkeys: " + text[i]);
      await element.sendKeys(text[i]);
      await this.delay(text.length - i > 4 ? 50 : 150);
      await this.randomDelay(150);
    }
    console.info("slowType text is: " + (await element.getAttribute("value")));
    if (pressEnter) await element.sendKeys(Key.ENTER);
    return element;
  }

  /**
   * Retrieves the text content of an element.
   * @param {SelectorType} selectorType - The type of selector (e.g., CSS, XPath).
   * @param {string} locator - The locator for the target element.
   * @returns {string} - The text content of the element.
   */
  async getText(selectorType, locator) {
    const element = await this.findBySelectorType(selectorType, locator);
    const result = await element.getText();
    console.info(`GetText is : ${result}`);
    return result;
  }

  /**
   * Uploads a file to an input element with a file upload form.
   * @param {string} file - The path to the file to be uploaded.
   */
  async uploadFile(file) {
    const fileInput = await this.driver.findElement(
      By.css('input[type="file"]')
    );
    await fileInput.sendKeys(file);
  }

  /**
   * Clicks an element based on its selector.
   * @param {string} selectorType - The selector type to locate the element.
   * @param {string} locator - The locator for the element.
   */
  async click(selectorType, locator) {
    const element = await this.findBySelectorType(selectorType, locator);
    await this.waitUntilElementEnabled(element);
    console.info("clicking");
    await element.click();
    console.info("Button() clicked...");
  }

  /**
   * Clicks an element using JavaScript based on its selector.
   * @param {string} selectorType - The selector type to locate the element.
   * @param {string} locator - The locator for the element.
   */
  async clickJS(selectorType, locator) {
    const element = await this.findBySelectorType(selectorType, locator);
    await this.waitUntilElementEnabled(element);
    console.info("clicking using javascript");
    await this.executeJavaScript("arguments[0].click();", element);
    console.info("clickJS() clicked the button...!");
  }

  /**
   * Clears the text of an element using JavaScript based on its selector.
   * @param {string} selectorType - The selector type to locate the element.
   * @param {string} locator - The locator for the element.
   */
  async clearTextJS(selectorType, locator) {
    const element = await this.findBySelectorType(selectorType, locator);
    await this.waitUntilElementEnabled(element);

    await console.info("Replace text of element via JS");
    await this.executeJavaScript("arguments[0].value='';", element);
    await console.info("replaceTextJS() happened");
  }

  /**
   * Waits until an element is both visible and enabled.
   * @param {WebElement} element - The element to wait for.
   */
  async waitUntilElementEnabled(element) {
    console.info("WaitUntilElementEnabled");
    const condition1 = until.elementIsVisible(element);
    await this.driver.wait(
      async (driver) => condition1.fn(driver),
      this.testConfig.defaultElementTimeout,
      "Element is not visible!"
    );

    const condition2 = until.elementIsEnabled(element);
    await this.driver.wait(
      async (driver) => condition2.fn(driver),
      this.testConfig.defaultElementTimeout,
      "Element is not enabled!"
    );

    await this.driver.wait(
      until.elementIsVisible(element),
      this.testConfig.defaultElementTimeout
    );
    console.info(`Element: '${await element.getText()}' is enabled!`);
  }

  /**
   * Captures a screenshot of the current page.
   * @returns {Promise<string>} - The base64-encoded screenshot data.
   */
  async captureScreenshot() {
    try {
      console.log("Capturing Screenshot");
      const screenshot = await this.driver.takeScreenshot();
      return `data:image/png;base64,${screenshot}`;
    } catch (error) {
      console.error("Error capturing screenshot: ", error);
    }
  }

  /**
   * Clears the main window handler.
   */
  clearMainWindowHandler() {
    this.mainWindowHandler = "";
  }

  /**
   * Executes JavaScript code on the current page.
   * @param {string} javaScript - The JavaScript code to execute.
   * @param {any[]} args - Arguments to pass to the JavaScript code.
   * @returns {Promise<any>} - The result of the JavaScript execution.
   */
  async executeJavaScript(javaScript, args) {
    const jsOutput = await this.driver.executeScript(javaScript, args);
    await this.delay(300);
    return jsOutput;
  }

  /**
   * Issues an error by converting it into a rejected promise.
   * @param {Error} error - The error to issue.
   */
  async issueError(error) {
    await ProcessUtil.errorToRejectedPromise(error);
  }
}

module.exports = Browser;
