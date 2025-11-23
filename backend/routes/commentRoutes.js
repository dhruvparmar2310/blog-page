const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/comments", commentController.getAllComments);

module.exports = router;