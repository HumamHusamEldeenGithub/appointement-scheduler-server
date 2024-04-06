const appError = require("../errors/app_error");

function isValidString(parameter, value) {
  if (value === undefined || value === null || value === "")
    appError.invalidParameter(parameter);
  return true;
}

function isValidDate(parameter, dateString) {
  const date = new Date(dateString);
  if (isNaN(date) || date.toISOString() === "Invalid Date")
    appError.invalidParameter(parameter);
  return true;
}

module.exports = {
  isValidString,
  isValidDate,
};
