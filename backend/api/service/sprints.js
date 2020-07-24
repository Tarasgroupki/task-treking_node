const Validator = require('validatorjs');
const mongoose = require('mongoose');
const Sprint = require('../models/sprint');

const rules = {
  title: 'string',
  description: 'string',
  status: 'numeric',
  lead_assigned: 'string',
  user_created: 'string',
  deadline: 'string',
  created_at: 'string',
};

const SprintsService = {};

SprintsService.getSprints = async () => await Sprint.find();

SprintsService.getSprint = async (id) => await Sprint.findById(id);

SprintsService.createSprint = async (sprint) => {
  await new Sprint({
    _id: new mongoose.Types.ObjectId(),
    title: sprint.body[0].title,
    description: sprint.body[0].description,
    status: sprint.body[0].status,
    lead_assigned: sprint.body[0].lead_assigned,
    user_created: sprint.body[0].user_created,
    deadline: sprint.body[0].deadline,
    created_at: new Date(Date.now()).toISOString(),
  }).save();
};

SprintsService.updateSprint = async (id, sprint) => {
  const validator = new Validator(sprint, rules);

  if (!validator.fails()) {
    await Sprint.update({ _id: id }, { $set: sprint });
  } else {
    validator.errors.first('title');
    validator.errors.first('description');
    validator.errors.first('status');
    validator.errors.first('lead_assigned');
    validator.errors.first('user_created');
    validator.errors.first('deadline');
    validator.errors.first('created_at');
  }
};

SprintsService.deleteSprint = async (id) => await Sprint.remove({ _id: id });

module.exports = SprintsService;
