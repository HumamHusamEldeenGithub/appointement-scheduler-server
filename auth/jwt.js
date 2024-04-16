const jwt = require("jsonwebtoken");
const { createAppError } = require("../errors/app_error");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET_KEY;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET_KEY;

function VerifyToken(req, token) {
  const decoded = jwt.verify(token, secretKey);

  const isExpired = Date.now() >= decoded.exp * 1000;
  if (isExpired) {
    createAppError("Token has expired", 401);
  }

  req.user = decoded;
}

function VerifyRefreshToken(token) {
  const decoded = jwt.verify(token, refreshSecretKey);

  const isExpired = Date.now() >= decoded.exp * 1000;
  if (isExpired) {
    createAppError("Token has expired", 401);
  }

  return decoded;
}

function CreateToken(userId) {
  const token = jwt.sign({ userId: userId }, secretKey, {
    expiresIn: "3h",
  });
  return token;
}

function CreateRefreshToken(userId) {
  const token = jwt.sign({ userId: userId }, refreshSecretKey, {
    expiresIn: "30d",
  });
  return token;
}

module.exports = {
  VerifyToken,
  CreateToken,
  CreateRefreshToken,
  VerifyRefreshToken,
};
