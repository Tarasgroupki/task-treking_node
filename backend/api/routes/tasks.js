const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const TasksController = require('../controllers/tasks');

router.get("/", checkAuth.main, TasksController.tasks_get_all);

router.post("/", checkAuth.main, TasksController.tasks_create_task);

router.get("/:taskId", checkAuth.main, TasksController.tasks_get_one);

router.patch("/:sprintId", checkAuth.main, TasksController.tasks_edit_task);

router.delete("/:sprintId", checkAuth.main, TasksController.tasks_delete_task);

module.exports = router;
