const express = require("express");
const { registerUser, loginUser, getProfile, updateProfile } = require("../controller/authcontroller");
const protect = require("../middleware/authmiddleware")

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

module.exports = router;