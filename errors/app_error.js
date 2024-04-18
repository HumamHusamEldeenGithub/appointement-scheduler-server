class AppError {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}


function createAppError(statusCode, message) {
  throw new AppError(message, statusCode);
}

function invalidParameter(parameter) {
  createAppError(400, `Invalid parameter '${parameter}'`);
}


function invalidDates() {
  createAppError(400, `Invalid start and end dates`);
}

module.exports = {
    AppError,
    createAppError,
    invalidParameter,
    invalidDates,
};