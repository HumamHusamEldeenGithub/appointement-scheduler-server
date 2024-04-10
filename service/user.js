const { createAppError } = require("../errors/app_error");
const UserModel = require("../models/user");

async function isAdmin(id) {
  try {
    const user = await UserModel.findOne(id);
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

async function deleteUser(adminId, id) {
  const isAdmin = await isAdmin(adminId);
  if (!isAdmin) {
    createAppError(403, "not authorized");
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
  deleteUser,
};
