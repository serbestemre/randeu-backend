class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

module.exports = CustomError;
