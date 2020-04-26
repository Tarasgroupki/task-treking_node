const mongoose = require('mongoose');
const Task = require('../models/task');

exports.taskValidator = (req) => new Task({
  _id: new mongoose.Types.ObjectId(),
  title: req.body[0].title,
  description: req.body[0].description,
  status: req.body[0].status,
  sprint_assigned: req.body[0].sprint_assigned,
  user_created: req.body[0].user_created,
  deadline: req.body[0].deadline,
  created_at: new Date(Date.now()).toISOString(),
});
