const express = require("express");
const router = express.Router();
const Subscription = require("../models/Subscription");
const verifyToken = require("../middleware/authMiddleware");

// Get all subscribed courses for the logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const courses = await Subscription.find({ userId: req.user.id }).populate("courseId");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
