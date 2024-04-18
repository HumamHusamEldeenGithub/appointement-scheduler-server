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

function isValidDateRange(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (
    isNaN(start) ||
    isNaN(end) ||
    start.toISOString() === "Invalid Date" ||
    end.toISOString() === "Invalid Date" ||
    start.getTime() >= end.getTime()
  )
    appError.invalidDates();
  return true;
}

module.exports = {
  isValidString,
  isValidDate,
  isValidDateRange,
};
