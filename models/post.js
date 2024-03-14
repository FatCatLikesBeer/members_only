const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Text", "Link", "Media"],
    default: "Text",
  },
  timeStamp: { type: Date, default: Date.new },
  upVotes: { type: Integer, default: 1 },
  downVotes: { type: Integer, default: 0 },
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
