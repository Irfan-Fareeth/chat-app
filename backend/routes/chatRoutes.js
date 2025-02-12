const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const {accessChats, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup} = require("../controllers/chatController")

// api/chat/
router.route('/').post(protect, accessChats);
router.route('/fetchChats').get(protect, fetchChats);
router.route('/group').post(protect, createGroupChat);
router.route('/renameGroup').put(protect,renameGroupChat);
router.route('/addToGroup').put(protect, addToGroup);
router.route('/removeFromGroup').put(protect, removeFromGroup);
module.exports = router;