const { createAppError } = require("../errors/app_error");

function validateUsername(username) {
  if (username.length < 4 || username.length > 20) {
    return createAppError(400,"Username must be between 4 and 20 characters");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return createAppError(400,"Username can only contain letters, numbers, and underscores");
  }
  return null;
}

module.exports = validateUsername;
