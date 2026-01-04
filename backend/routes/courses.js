
const router = require("express").Router();
const Course = require("../models/Course");

router.get("/", async (req, res) => {
  res.json(await Course.find());
});

router.get("/:id", async (req, res) => {
  res.json(await Course.findById(req.params.id));
});

module.exports = router;
