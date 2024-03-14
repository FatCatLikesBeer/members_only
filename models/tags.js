const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String, required: true },
});

// Virtual for Comment's URL
TagSchema.virtual("url").get(function() {
  // We don't use an arrow function as we'll need the 'this' object
  return `/tag/${this._id}`;
});

module.exports = mongoose.model("Tag", TagSchema);
