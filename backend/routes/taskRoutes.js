const express = require("express");
const Task = require("../models/users");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Get Tasks

router.get("/", authMiddleware, async (req, res) => {
  try {

    const tasks = await Task.find({
      userId: req.user.id,
    });

    res.json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Add Task

router.post("/", authMiddleware, async (req, res) => {
  const task = await Task.create({
    text: req.body.text,
    date: req.body.date,
    completed: false,

    userId: req.user.id,
  });

  res.json(task);
});


// Update Task

router.put("/:id", authMiddleware, async (req, res) => {
  try {

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// Delete Task

router.delete("/:id", authMiddleware, async (req, res) => {
  try {

    await Task.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Task Deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


module.exports = router;