const fs = require('fs');
const path = require('path');

class FileUtil {
  /**
   * Checks if a file exists at the specified path.
   * @param {string} filePath - The path to the file.
   * @returns {boolean} - `true` if the file exists; otherwise, `false`.
   */
  static doesFileExist(filePath) {
    return fs.existsSync(filePath);
  }

  /**
   * Retrieves the current working directory.
   * @returns {string} - The current working directory.
   */
  static getCurrentDirectory() {
    return process.cwd();
  }

  /**
   * Combines multiple path segments into a single path.
   * @param {...string} paths - The path segments to combine.
   * @returns {string} - The combined path.
   */
  static combinePaths(...paths) {
    return path.join(...paths);
  }

  /**
   * Reads and parses JSON content from a file.
   * @param {string} filepath - The path to the JSON file.
   * @returns {Object} - The parsed JSON object.
   */
  static readJSONFromFile(filepath) {
    const buffer = fs.readFileSync(filepath);
    return JSON.parse(buffer.toString());
  }
}

module.exports = FileUtil;
