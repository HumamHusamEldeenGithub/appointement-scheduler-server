const { createAppError } = require("../errors/app_error");

function validatePassword(password) {
  if (password.length < 8) {
    return createAppError(400, "Password must be at least 8 characters");
  }
}

module.exports = validatePassword;