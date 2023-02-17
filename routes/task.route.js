const express = require('express')
const router = express.Router();
const { 
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
  allTask,
  updateSequence,
} = require("../middleware/task");

const {auth} = require("../auth/auth");

router.get("/allTask",auth, allTask);
router.post("/create", auth, createTask);
router.get("/allTaskById", auth, getAllTasks);
router.get("/:id", auth, getSingleTask);
router.patch("/update/:id", auth, updateTask);
router.delete("/delete/:id", auth, deleteTask);
router.post("/updateSequence", auth, updateSequence);


module.exports = router
