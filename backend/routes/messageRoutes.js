const express = require("express");
const router =  express.Router();
const {protect} = require("../middleware/authMiddleware");
const {sendMessages, allMessages} = require("../controllers/messageController");

router.route("/").post(protect, sendMessages);
router.route("/:chatId").get(protect, allMessages);
module.exports = router;