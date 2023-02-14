const Mongoose = require("mongoose")

const userSchema = new Mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true })

module.exports = Mongoose.model("User", userSchema)