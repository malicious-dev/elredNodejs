const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    validate: [function(input, err) {
      /* return true only if the input is a valid date, AND is 
      greater than or equal to the current date/time */
      return new Date(input).toISOString().split('T')[0] >= new Date().toISOString().split('T')[0];
  }, 'Date must be current or Above'],  
  },
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Incomplete", "Complete"],
    required: true,
  },
}, { timestamps: true })


const Task = mongoose.model('Task', taskSchema);


module.exports = {
  Task,
};