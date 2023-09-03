const BasePage = require('./BasePage');
const SelectorType = require('../drivers/SelectorType');
const TextInput = require('../drivers/components/TextInput');
const Button = require('../drivers/components/Button');
const TextView = require('../drivers/components/TextView');
const { expect } = require('chai');

class EditProfilePage extends BasePage {
  constructor(browser) {
    super(browser);
    this.url = ''
  }

  /**
   * Retrieves the edit user pencil button element on the page.
   * @returns {Button} - The edit user pencil button element.
   */
  getEditUserPencilButton() {
    return new Button(this.browser, SelectorType.CSS, '#EditUser')
  }

  /**
   * Clicks on the edit user pencil button to initiate user profile editing.
   * @returns {Promise<void>}
   */
  async clickOnEditUserPencilButton() {
    await this.getEditUserPencilButton().click()
  }

  /**
   * Uploads the user's profile picture.
   * @param {string} file - The file path of the profile picture to upload.
   * @returns {Promise<void>}
   */
  async uploadUserProfilePicture(file) {
    await this.browser.uploadFile(file)
  }

  /**
   * Retrieves the button element for cropping the profile picture.
   * @returns {Button} - The crop image button element.
   */
  getCropImageButton() {
    return new Button(this.browser, SelectorType.XPATH, '//button/span[text()="Crop Image"]')
  }

  /**
   * Clicks on the "Crop Image" button to initiate the image cropping process.
   * @returns {Promise<void>}
   */
  async clickOnCropImageButton() {
    await this.getCropImageButton().click()
  }

  /**
   * Retrieves the input element for the user's first name.
   * @returns {TextInput} - The first name input element.
   */
  getFirstNameInput() {
    return new TextInput(this.browser, SelectorType.CSS, '[name="firstName"]')
  }

  /**
   * Retrieves the input element for the user's last name.
   * @returns {TextInput} - The last name input element.
   */
  getLastNameInput() {
    return new TextInput(this.browser, SelectorType.CSS, '[name="lastName"]')
  }

  /**
   * Retrieves the input element for the user's job title.
   * @returns {TextInput} - The job title input element.
   */
  getTitleInput() {
    return new TextInput(this.browser, SelectorType.CSS, '[name="title"]')
  }

  /**
   * Retrieves the input element for the user's LinkedIn profile URL.
   * @returns {TextInput} - The LinkedIn profile input element.
   */
  getLinkedInProfileInput() {
    return new TextInput(this.browser, SelectorType.CSS, '[name="userLinkedin"]')
  }

  /**
   * Retrieves the button element for saving profile settings.
   * @returns {Button} - The save button element.
   */
  getSaveButton() {
    return new Button(this.browser, SelectorType.CSS, '[type="submit"]')
  }

  /**
   * Updates the user's profile settings.
   * @param {string} file - The file path of the profile picture to upload.
   * @param {string} fname - The user's first name.
   * @param {string} lname - The user's last name.
   * @param {string} title - The user's job title.
   * @param {string} linkedInUrl - The user's LinkedIn profile URL.
   * @returns {Promise<void>}
   */
  async updateProfileSettings(file, fname, lname, title, linkedInUrl) {
    await this.uploadUserProfilePicture(file)
    await this.getCropImageButton().click()

    await this.getFirstNameInput().clearText()
    await this.getFirstNameInput().fastType(fname)

    await this.getLastNameInput().clearText()
    await this.getLastNameInput().fastType(lname)

    await this.getTitleInput().clearText()
    await this.getTitleInput().fastType(title)

    await this.getLinkedInProfileInput().clearText()
    await this.getLinkedInProfileInput().fastType(linkedInUrl)
    await this.getSaveButton().click()
  }
}

module.exports = EditProfilePage;
