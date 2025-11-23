const Comment = require("../models/Comment");
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find().sort({ dCreatedDate: -1 });
    return res.status(200).json({ success: true, data: comments, message: 'Comments List Success' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};