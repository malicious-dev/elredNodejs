const Task = require("../models/task");

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
    const tasks = await Task.find({userId}).sort(sort);
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
const allTask = async (req, res) => {
  try {
    const tasks = await Task.find();
    // if not data found
    if (tasks.length <= 0) {
      return res.status(404).json({ status: 404, message: "No Task Found"})
    }
    res.status(200).json({status: 200, data: tasks});
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
};