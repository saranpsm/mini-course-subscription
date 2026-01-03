const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const subscribeRoutes = require("./routes/subscribe");
const myCoursesRoutes = require("./routes/myCourses"); // ✅ Added

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Route middleware
app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/subscribe", subscribeRoutes);
app.use("/my-courses", myCoursesRoutes); // ✅ Added


  const path = require("path");
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"))
  );


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
