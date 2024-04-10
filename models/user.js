const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  role:{
    required: true,
    type: String,
    enum: ["admin", "moderator"],
  }
});

module.exports = mongoose.model("users", UserSchema);
