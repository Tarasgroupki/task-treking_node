const Task = require('../models/task');
const { taskValidator } = require('../validators/taskValidator');

const TasksService = {};

TasksService.getTasks = async () => await Task.find();

TasksService.getTask = async (id) => await Task.findById(id);

TasksService.getTasksBySprint = async (id) => await Task.find({ sprint_assigned: id });

TasksService.createTask = async (task) => await taskValidator(task).save();

TasksService.updateTasks = async (sprintId) => await Task.updateMany({ sprint_assigned: sprintId }, { $set: { status: 2 } });

TasksService.updateTask = async (id, task) => await Task.update({ _id: id }, { $set: task });

TasksService.deleteTask = async (id) => await Task.remove({ _id: id });

module.exports = TasksService;
