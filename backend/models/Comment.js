const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    sName: { type: String, required: true },
    sContent: { type: String, required: true },
    nRating: { type: String, required: true },
    dCreatedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema, "comments");