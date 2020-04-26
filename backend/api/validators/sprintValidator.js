const mongoose = require('mongoose');
const Sprint = require('../models/sprint');

exports.sprintValidator = (req) => new Sprint({
  _id: new mongoose.Types.ObjectId(),
  title: req.body[0].title,
  description: req.body[0].description,
  status: req.body[0].status,
  lead_assigned: req.body[0].lead_assigned,
  user_created: req.body[0].user_created,
  deadline: req.body[0].deadline,
  created_at: new Date(Date.now()).toISOString(),
});
