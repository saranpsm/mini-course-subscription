
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, "SECRET_KEY");
  res.json({ token });
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Signup failed" });
  }
});


module.exports = router;
