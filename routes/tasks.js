const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const taskController = require("../controllers/taskController");


// 🔐 USER-SPECIFIC TASK ROUTES
router.get("/", auth, taskController.getAllTasks);
router.post("/", auth, taskController.createTask);
router.put("/:id", auth, taskController.updateTask);
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
