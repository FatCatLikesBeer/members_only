const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  creationDate: { type: Date, required: true, default: Date.now },
  class: {
    type: String,
    required: true,
    enum: ["Guest", "Member", "Moderator", "Administrator"],
    default: "Guest",
  },
});

// Export model
module.exports = mongoose.model("User", UserSchema);
