const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const UserService = require("./user");
const { createAppError } = require("../errors/app_error");
const {
  CreateToken,
  CreateRefreshToken,
  VerifyRefreshToken,
} = require("../auth/jwt");
const validateUsername = require("../utils/is_valid_username");
const validatePassword = require("../utils/is_valid_password");

async function Login(username, password) {
  try {
    username = username.toLowerCase().trim();
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
    const refreshToken = CreateRefreshToken(user._id);

    return {
      token: token,
      refreshToken: refreshToken,
    };
  } catch (e) {
    console.error("Error logging in:", e);
    throw e;
  }
}

async function LoginWithRefreshToken(userRefreshToken) {
  try {
    const decodedUser = VerifyRefreshToken(userRefreshToken);

    const user = await UserModel.findById(decodedUser.userId);

    if (!user) {
      createAppError(404, "user not found");
    }

    const token = CreateToken(user._id);
    const refreshToken = CreateToken(user._id);

    return {
      token: token,
      refreshToken: refreshToken,
    };
  } catch (e) {
    console.error("Error logging in with refresh token:", e);
    throw e;
  }
}

async function RegisterUser(callerID, username, password, role) {
  try {
    const admin = await UserService.isAdmin(callerID);
    if (!admin) {
      createAppError(400, "user doesn't have permissions to register a user");
    }

    username = username.toLowerCase().trim();

    validateUsername(username);
    validatePassword(password);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username: username,
      password: hashedPassword,
      role: role,
    });

    const generetedUser = await user.save();

    const token = CreateToken(generetedUser._id);
    const refreshToken = CreateRefreshToken(generetedUser._id);

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

module.exports = { Login, LoginWithRefreshToken, RegisterUser };
