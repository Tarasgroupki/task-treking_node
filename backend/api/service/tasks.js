const Validator = require('validatorjs');
const mongoose = require('mongoose');
const Task = require('../models/task');

const rules = {
  title: 'string',
  description: 'string',
  status: 'numeric',
  sprint_assigned: 'string',
  user_created: 'string',
  deadline: 'string',
  created_at: 'string',
};

const TasksService = {};

TasksService.getTasks = async () => await Task.find();

TasksService.getTask = async (id) => await Task.findById(id);

TasksService.getTasksBySprint = async (id) => await Task.find({ sprint_assigned: id });

TasksService.createTask = async (task) => {
  await new Task({
    _id: new mongoose.Types.ObjectId(),
    title: task.body[0].title,
    description: task.body[0].description,
    status: task.body[0].status,
    sprint_assigned: task.body[0].sprint_assigned,
    user_created: task.body[0].user_created,
    deadline: task.body[0].deadline,
    created_at: new Date(Date.now()).toISOString(),
  }).save();
};

TasksService.updateTasks = async (sprintId) => await Task.updateMany({ sprint_assigned: sprintId }, { $set: { status: 2 } });

TasksService.updateTask = async (id, task) => {
  const validator = new Validator(task, rules);

  if (!validator.fails()) {
    await Task.update({ _id: id }, { $set: task });
  } else {
    validator.errors.first('title');
    validator.errors.first('description');
    validator.errors.first('status');
    validator.errors.first('sprint_assigned');
    validator.errors.first('user_created');
    validator.errors.first('deadline');
    validator.errors.first('created_at');
  }
};

TasksService.deleteTask = async (id) => await Task.remove({ _id: id });

module.exports = TasksService;
