const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { Schema.Types.ObjectId, ref: "User", required: true },
  post: { Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  timeStamp: { type: Date, default: Date.new },
  upVotes: { type: Integer, default: 1 },
  downVotes: { type: Integer, default: 0 },
});

// Virtual for Comment's URL
CommentSchema.virtual("url").get(function() {
  // We don't use an arrow function as we'll need the 'this' object
  return `/comment/${this._id}`;
});

// Export model
module.exports = mongoose.model("Comment", CommentSchema);
