const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  user: { Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timeStamp: { type: Date, default: Date.new },
  upVotes: { type: Integer, default: 1 },
  downVotes: { type: Integer, default: 0 },
});

// Export model
module.exports = mongoose.model("Blog", BlogSchema);
