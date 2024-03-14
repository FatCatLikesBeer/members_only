const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  user: { Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timeStamp: { type: Date, default: Date.new },
  upVotes: { type: Integer, default: 1 },
  downVotes: { type: Integer, default: 0 },
  tag: { Schema.Types.ObjectId, ref: "Tag", required: true },
});

// Virtual for Comment's URL
BlogSchema.virtual("url").get(function() {
  // We don't use an arrow function as we'll need the 'this' object
  return `/blog/${this._id}`;
});

// Export model
module.exports = mongoose.model("Blog", BlogSchema);
