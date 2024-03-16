const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["Text", "Link", "Media"],
    default: "Text",
  },
  timeStamp: { type: Date, default: Date.now, required: true },
  upVotes: { type: Number, default: 1 },
  downVotes: { type: Number, default: 0 },
});

// Virtual for Posts's URL
PostSchema.virtual("url").get(function() {
  // We don't use an arrow function as we'll need the 'this' object
  return `/post/${this._id}`;
});

PostSchema.virtual("date").get(function() {
  // We don't use an arrow function as we'll need the 'this' object
  return DateTime.fromJSDate(this.timeStamp).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("Post", PostSchema);
