const express = require('express')
const router = express.Router();
const { 
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask,
} = require("../middleware/task");
const {auth} = require("../auth/auth");

router.post("/create", auth, createTask);
router.get("/all", auth, getAllTasks);
router.get("/:id", auth, getSingleTask);
router.put("/update/:id", auth, updateTask);
router.delete("/delete/:id", auth, deleteTask);

module.exports = router
