const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    sTitle: { type: String, required: true },
    sContent: { type: String, required: true },
    sImage: { type: String, required: false },
    dCreatedDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema, "blogs");
