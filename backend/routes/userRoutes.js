const express = require('express');
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")
const {registerUser, authUser, allUser} = require('../controllers/userController');

// ["67926ec9c3f5e34ec2c83f6b", "67926f7cc3f5e34ec2c83f6e"," 679381052e55e4779dc9924b"]
router.route("/register").post(registerUser).get(protect,allUser);
router.post('/login', authUser);

module.exports = router;