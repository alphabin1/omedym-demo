class ProcessUtil {
  /**
   * Creates and returns a rejected Promise with the provided error message.
   * @param {string} errorMessage - The error message to be associated with the rejected Promise.
   * @returns {Promise<Error>} - A Promise rejected with an Error containing the error message.
   */
  static async createRejectedPromise(errorMessage) {
    console.log(errorMessage);

    return new Promise((reject, resolve) => {
      reject(new Error(errorMessage));
    });
  }

  /**
   * Converts an existing error into a rejected Promise with the error message.
   * @param {Error} error - The error object to be converted into a rejected Promise.
   * @returns {Promise<Error>} - A Promise rejected with the provided error.
   */
  static async errorToRejectedPromise(error) {
    console.log(error.toString());

    return new Promise((resolve, reject) => {
      reject(error);
    });
  }
}

module.exports = ProcessUtil;
