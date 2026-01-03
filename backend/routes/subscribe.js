
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const Course = require("../models/Course");
const Subscription = require("../models/Subscription");

router.post("/subscribe", auth, async (req, res) => {
  const course = await Course.findById(req.body.courseId);
  let pricePaid = 0;

  if (course.price > 0) {
    if (req.body.promoCode !== "BFSALE25")
      return res.status(400).json({ message: "Invalid promo" });
    pricePaid = course.price / 2;
  }

  await Subscription.create({
    userId: req.user.id,
    courseId: course._id,
    title:course.title,
    image:course.image,
    pricePaid,
    subscribedAt: new Date()
  });

  res.json({ message: "Subscribed successfully" });
});

router.get("/my-courses", auth, async (req, res) => {
  const subs = await Subscription.find({ userId: req.user.id }).populate("courseId");
  res.json(subs);
});

module.exports = router;
