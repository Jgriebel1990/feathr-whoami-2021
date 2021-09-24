const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username cannot be blank"],
  },
  hashedPassword: {
    type: String,
    require: [true, "Password cannot be blank"],
  },
});

module.export = mongoose.model("User", userSchema);
