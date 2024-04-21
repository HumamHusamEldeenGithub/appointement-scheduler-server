const { createAppError } = require("../errors/app_error");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const validatePassword = require("../utils/is_valid_password");

async function isAdmin(id) {
  try {
    const user = await UserModel.findById(id);
    if (user.role === "admin") {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

async function getUser(id) {
  return UserModel.findById(id)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      console.error("Error getting user:", error);
      throw error;
    });
}

async function getUsers() {
  return UserModel.find({}, "-password")
    .then((users) => {
      return users;
    })
    .catch((error) => {
      console.error("Error getting users:", error);
      throw error;
    });
}

async function updateUser(callerId, id, updatedObject) {
  if (callerId !== id) {
    const admin = await isAdmin(callerId);
    const userToUpdateIsAdmin = await isAdmin(id);
    if (!admin || userToUpdateIsAdmin) {
      createAppError(403, "user doesn't have permissions to update this user");
    }
  }

  if (updatedObject.password) {
    validatePassword(updatedObject.password);
    updatedObject.password = await bcrypt.hash(updatedObject.password, 10);
  }

  return UserModel.findByIdAndUpdate(id, updatedObject)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      console.error("Error updating user:", error);
      throw error;
    });
}

async function deleteUser(callerId, id) {
  const admin = await isAdmin(callerId);
  if (!admin) {
    createAppError(403, "user doesn't have permissions to delete a user");
  }

  const user = await getUser(id);
  if (user.username === "admin") {
    createAppError(403, "admin account can't be deleted");
  }

  return UserModel.findByIdAndDelete(id).catch((error) => {
    console.error("Error deleting user:", error);
    throw error;
  });
}

module.exports = {
  isAdmin,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
