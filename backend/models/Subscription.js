
const mongoose = require("mongoose");
module.exports = mongoose.model("Subscription", new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  courseId: mongoose.Schema.Types.ObjectId,
  title:String,
  image:String,
  pricePaid: Number,
  subscribedAt: Date
}));
