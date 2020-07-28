const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Validator = require('validatorjs');

const checkAuth = require('../middleware/check-auth');

const Task = require('../models/task');
const Vote = require('../models/vote');
const clientRed = require('../redis-connection');

const checkTasksCreate = checkAuth.scope('create-tasks');
const checkTasksEdit = checkAuth.scope('edit-tasks');
const checkTaskDelete = checkAuth.scope('delete-tasks');
const checkTaskCreateAndEdit = checkAuth.scopes('create-tasks,edit-tasks');

const rules = {
  title: 'string',
  description: 'string',
  status: 'numeric',
  sprint_assigned: 'string',
  user_created: 'string',
  deadline: 'string',
  created_at: 'string',
};

router.get('/', checkTaskCreateAndEdit, (req, res) => {
  clientRed.get('alltasks', async (reply) => {
    if (reply) {
      return res.send(reply);
    }
    try {
      const tasks = await Task.find();
      clientRed.set('alltasks', JSON.stringify(tasks));
      return res.status(200).json(tasks);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
});

router.post('/', checkTasksCreate, async (req, res) => {
  try {
    const result = await new Task({
      _id: new mongoose.Types.ObjectId(),
      title: req.body[0].title,
      description: req.body[0].description,
      status: req.body[0].status,
      sprint_assigned: req.body[0].sprint_assigned,
      user_created: req.body[0].user_created,
      deadline: req.body[0].deadline,
      created_at: new Date(Date.now()).toISOString(),
    }).save();
    clientRed.del('alltasks');
    return res.status(201).json({
      message: 'Handling POST requests to /tasks',
      createdClient: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/:taskId', checkTasksCreate, async (req, res) => {
  const id = req.params.taskId;
  try {
    const task = await Task.findById(id);
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.patch('/:taskId', checkTasksEdit, async (req, res) => {
  const id = req.params.taskId;
  try {
    const validator = new Validator(req.body[0], rules);

    if (!validator.fails()) {
      await Task.update({ _id: id }, { $set: req.body[0] });
    } else {
      validator.errors.first('title');
      validator.errors.first('description');
      validator.errors.first('status');
      validator.errors.first('sprint_assigned');
      validator.errors.first('user_created');
      validator.errors.first('deadline');
      validator.errors.first('created_at');
    }

    return res.status(200).json(validator);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/vote_count/:taskId', async (req, res) => {
  const id = req.params.taskId;
  const votes = [];

  try {
    const vote = await Vote.find({ task_assigned: id });
    for (let i = 0; i < vote.length; i++) {
      votes.push(vote[i].user_added);
    }
    return res.status(200).json(votes);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/voter_count/:voteId', async (req, res) => {
  const id = req.params.voteId;
  const strArr = id.split('_');

  try {
    const vote = await Vote.find({ user_added: strArr[1], task_assigned: strArr[0] });
    return res.status(200).json(vote);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post('/vote_create', async (req, res) => {
  try {
    const result = await new Vote({
      _id: new mongoose.Types.ObjectId(),
      user_added: req.body[0].user_added,
      task_assigned: req.body[0].task_assigned,
      mark: req.body[0].mark,
    });
    res.status(201).json({
      message: 'Handling POST requests to /votes',
      createdClient: result,
    });
    result.length = 0;
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.put('/vote_update/:taskId', async (req, res) => {
  const id = req.params.taskId;

  try {
    const validator = new Validator(req.body[0], rules);

    if (!validator.fails()) {
      await Vote.update({ _id: id }, { $set: req.body[0] });
    } else {
      validator.errors.first('user_added');
      validator.errors.first('task_assigned');
      validator.errors.first('mark');
    }
    return res.status(200).json(validator);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.delete('/:taskId', checkTaskDelete, async (req, res) => {
  const id = req.params.taskId;
  try {
    const task = await Task.remove({ _id: id });
    clientRed.del('alltasks');
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
