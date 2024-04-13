const express = require("express");
const userService = require("../service/user");
const checker = require("../utils/is_valid_checker");
const authenticate = require("../middlewares/authentication");

const router = express.Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", authenticate, async (req, res, next) => {
  try {
    const id = req.params.id;

    var paramsToUpdate = {};

    const password = req.body.password;
    if (password !== undefined && checker.isValidString("password", password))
      paramsToUpdate.password = password;

    // const role = req.body.role;
    // if (role !== undefined && checker.isValidString("role", role))
    //   paramsToUpdate.role = role;

    const user = await userService.updateUser(
      req.user.userId,
      id,
      paramsToUpdate
    );
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  try {
    const id = req.params.id;
    const response = await userService.deleteUser(req.user.userId, id);
    res.send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
