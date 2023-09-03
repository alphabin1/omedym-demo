const FileUtil = require("../utils/FileUtils");
const TestConfig = require("./TestConfig");

class ConfigFactory {
  static config;

  /**
   * Retrieves the application configuration settings from a JSON file.
   * If the configuration has already been loaded, it returns the cached instance.
   * If the configuration file is not found, it returns a default TestConfig instance.
   * @returns {TestConfig} - The application configuration settings.
   */
  static getConfig() {
    if (this.config) {
      return this.config;
    }

    const filePath = FileUtil.combinePaths(
      FileUtil.getCurrentDirectory(),
      "testconfig.json"
    );

    if (FileUtil.doesFileExist(filePath)) {
      console.log(`Config file found at ${filePath}`);
      this.config = FileUtil.readJSONFromFile(filePath);
    } else {
      this.config = new TestConfig();
    }
    return this.config;
  }
}

module.exports = ConfigFactory;
