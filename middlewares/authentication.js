const { AppError } = require("../errors/app_error");
const { VerifyToken } = require("../auth/jwt");

const authenticate = (req, res, next) => {
  var token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .send(new AppError("Access Denied. No token provided.", 401));
  }
  token = token.split(" ")[1];

  try {
    VerifyToken(req, token, false);
    next();
  } catch (error) {
    return res.status(401).send(new AppError("invalid token.", 401));
  }
};

module.exports = authenticate;
