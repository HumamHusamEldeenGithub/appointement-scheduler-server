class AppError {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}

// Create a function to throw AppError instances
function createAppError(statusCode, message) {
  throw new AppError(message, statusCode);
}

// Create a function to throw an AppError for an invalid parameter
function invalidParameter(parameter) {
  createAppError(400, `Invalid parameter '${parameter}'`);
}


module.exports = {
    AppError,
    createAppError,
    invalidParameter,
};