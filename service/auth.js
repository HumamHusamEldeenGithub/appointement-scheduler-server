const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const UserService = require("./user");
const { createAppError } = require("../errors/app_error");
const { CreateToken } = require("../auth/jwt");

async function Login(username, password) {
  try {
    const user = await UserModel.findOne({
      username: { $eq: username },
    });

    if (!user) {
      createAppError(404, "user not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      createAppError(400, "incorrect password");
    }

    const token = CreateToken(user._id);
    const refreshToken = CreateToken(user._id);

    return {
      token: token,
      refreshToken: refreshToken,
    };
  } catch (e) {
    console.error("Error getting user:", e);
    throw e;
  }
}

async function RegisterUser(username, password, role) {
  try {
    const isAdmin = await UserService.isAdmin(req.user.userId);
    if (!isAdmin) {
      createAppError(400, "user doesn't have permissions to register a user");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username: username,
      password: hashedPassword,
      role: role,
    });

    const generetedUser = await user.save();

    const token = CreateToken(generetedUser._id);
    const refreshToken = CreateToken(generetedUser._id);

    return {
      token: token,
      refreshToken: refreshToken,
    };
  } catch (e) {
    if (e.code === 11000) {
      createAppError(400, "username is taken");
    } else {
      console.error("Error registering user:", e);
      throw e;
    }
  }
}

module.exports = { Login, RegisterUser };
