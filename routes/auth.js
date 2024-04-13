const express = require("express");
const checker = require("../utils/is_valid_checker");
const auth = require("../service/auth");
const user = require("../service/user");
const authenticate = require("../middlewares/authentication");
const { createAppError } = require("../errors/app_error");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  try {
    const username = req.body.username;
    checker.isValidString("username", username);
    const password = req.body.password;
    checker.isValidString("password", password);

    const response = await auth.Login(username, password);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

router.post("/register", authenticate, async (req, res, next) => {
  try {
    const username = req.body.username;
    checker.isValidString("username", username);
    const password = req.body.password;
    checker.isValidString("password", password);
    const role = req.body.role;
    checker.isValidString("role", role);

    const response = await auth.RegisterUser(
      req.user.userId,
      username,
      password,
      role
    );
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
