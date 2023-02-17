const {Task} = require("../models/task");

//create task
const createTask = async (req, res) => {
  try {
    const { task, date, status } = req.body;
    const userId = req.user.id;
    console.log(userId)
    if (!task || !date || !status) {
      return res.status(401).json({ status:401, message: 'Please fill all fields' });
    }
    const newTask = await Task.create({
      task,
      date,
      userId,
      status,
    });
    res.status(200).json({ status: 200, message: "Task Created Successfully", data: newTask });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
}

//get all tasks
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const sort = { task: 1 };
    // const tasks = await Task.find({userId}).sort(sort);
    const tasks = await Task.find({userId})
    // if not data found 
    if (tasks.length <= 0) {
      return res.status(404).json({ status: 404, message: "No Task Found"})
    }
   const formattedTasks = tasks.map(task => {
    return {
      id: task._id,
      task: task.task,
      date: task.date.toISOString().split('T')[0],
      status: task.status
    };
  });
  res.status(200).json({status: 200, data: formattedTasks});
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
}

//get single task
const getSingleTask = async (req, res) => {
  try{
    const {id} = req.params;
    //check if task id is provided
    if(!id) return res.status(401).json({status: 401, message: "Please provide a task id"})
    const task = await Task.findById(id);
    if(!task) return res.status(401).json({status: 401, message: "Task not found"})
    const formattedTasks = {
      id: task._id,
      task: task.task,
      date: task.date.toISOString().split('T')[0],
      status: task.status
    }
    res.status(200).json({status: 200, data: formattedTasks});
  }
  catch(err){
    res.status(400).json({status: 400, message: err.message})
  }
}

//update task
const updateTask = async (req, res) => {
  try{
    const {id} = req.params;
    const {task, date, status} = req.body;
    //check if task id is provided
    if(!id) return res.status(401).json({status: 401, message: "Please provide a task id"})
    //check if task is found
    const taskFound = await Task.findById(id);
    if(!taskFound) return res.status(401).json({status: 401, message: "Task not found"})

    //check if task, date, status is found
    if(!task || !date || !status) return res.status(401).json({status: 401, message: "Please fill all fields"})
    const taskUpdate = await Task.findByIdAndUpdate(id, {
      task,
      date,
      status,
    }, {new: true})
    //below date is to format the date to a readable format
    const formattedTasks = {
      id: taskUpdate._id,
      task: taskUpdate.task,
      date: taskUpdate.date.toISOString().split('T')[0],
      status: taskUpdate.status
    }
    res.status(200).json({status: 200, message: "Task Updated Successfully", data: formattedTasks})
  }
  catch(err){
    res.status(400).json({status: 400, message: err.message})
  }
}

//delete task
const deleteTask = async (req, res) => {
  try{
    const {id} = req.params;
    if(!id) return res.status(404).json({status: 404, message: "User not Found"})
    const task = await Task.findByIdAndDelete(id);
    if(!task) return res.status(401).json({status: 401, message: "Task not found"})
    res.status(200).json({status: 200, message: "Task Deleted Successfully", data: task})
  }
  catch(err){
    res.status(400).json({status: 400, message: err.message})
  }
}

//get all tasks
// const allTask = async (req, res) => {
//   try {
//     const tasks = await Task.find()
//     // if not data found
//     if (tasks.length <= 0) {
//       return res.status(404).json({ status: 404, message: "No Task Found"})
//     }
//     res.status(200).json({status: 200, data: tasks});
//   } catch (err) {
//     res.status(400).json({ status: 400, message: err.message });
//   }
// }

//Create an API where the user can sort the posted tasks & post it in this new API with the sorted sequence of tasks
const updateSequence = async (req, res) => {
  try {
    const sortedTaskIds = req.body.taskIds;
    const tasks = await Task.find({ _id: { $in: sortedTaskIds } });

    // Check that all task IDs in the request were found
    if (tasks.length !== sortedTaskIds.length) {
      return res.status(400).json({ message: 'One or more task IDs not found' });
    }

    // Sort the tasks based on the order of their IDs in the request
    const sortedTasks = [];
    for (const taskId of sortedTaskIds) {
      const task = tasks.find(t => t._id.equals(taskId));
      sortedTasks.push(task);
    }

    // Update the order of the tasks in the database
    Task.deleteMany({}).then(response => console.log(response))
    Task.insertMany(sortedTasks).then(response => console.log(response))

    // for (let i = 0; i < sortedTaskIds.length; i++) {
    //   const taskId = sortedTaskIds[i];
    //   console.log(taskId);
    //   await Task.updateOne({ _id: taskId }, { $set: { order: i } })
    //   .then(response => console.log(response))
    // }
    res.json({ message: 'Tasks sorted successfully', data: sortedTasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sorting tasks' });
  }
  }


// pagination on all task
const allTask = async (req, res) => {
  try {
    const tasks = await Task.find()
    // if not data found
    if (tasks.length <= 0) {
      return res.status(404).json({ status: 404, message: "No Task Found"})
    }
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const results = {};
    if (endIndex < tasks.length) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }
    results.results = tasks.slice(startIndex, endIndex);
    res.status(200).json({status: 200, data: results});
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
}

      


module.exports = {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  allTask,
  updateSequence,
};