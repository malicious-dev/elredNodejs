const Mongoose = require("mongoose")

const userSchema = new Mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
}, { timestamps: true })

module.exports = Mongoose.model("Otp", userSchema)