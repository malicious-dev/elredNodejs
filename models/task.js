const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  //   validate: [function(input, err) {
  //     /* return true only if the input is a valid date, AND is 
  //     greater than or equal to the current date/time */
  //     return new Date(input).toISOString().split('T')[0] >= new Date().toISOString().split('T')[0];
  // }, 'Date must be current or Above'],  
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

const taskSequenceSchema = new mongoose.Schema({

  sequence: {
    type: Number,
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }

});

const Task = mongoose.model('Task', taskSchema);

const TaskSequence = mongoose.model('TaskSequence', taskSequenceSchema);


module.exports = {
  Task,
  TaskSequence
};