const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    sparse: true   // 🔥 THIS IS IMPORTANT
  },

  phoneNumber: {
    type: String,
    unique: true,
    sparse: true
  },

  password: String,

  avatar: String,

  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  }
});

module.exports = mongoose.model("User", userSchema);
