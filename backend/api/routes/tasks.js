const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const tasksService = require('../service/tasks');
const votesService = require('../service/votes');
const clientRed = require('../redis-connection');

const checkTasksCreate = checkAuth.scope('create-tasks');
const checkTasksEdit = checkAuth.scope('edit-tasks');
const checkTaskDelete = checkAuth.scope('delete-tasks');
const checkTaskCreateAndEdit = checkAuth.scopes('create-tasks,edit-tasks');

router.get('/', checkTaskCreateAndEdit, (req, res) => {
  clientRed.get('alltasks', async (reply) => {
    if (reply) {
      return res.send(reply);
    }
    try {
      const tasks = await tasksService.getTasks();
      clientRed.set('alltasks', JSON.stringify(tasks));
      return res.status(200).json(tasks);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
});

router.post('/', checkTasksCreate, async (req, res) => {
  try {
    const result = await tasksService.createTask(req);
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
    const task = await tasksService.getTask(id);
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.patch('/:taskId', checkTasksEdit, async (req, res) => {
  const id = req.params.taskId;
  try {
    const result = await tasksService.updateTask(id, req.body[0]);
    return res.status(200).json(result);
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
    const vote = await votesService.getVoteByTask(id);
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
    const vote = await votesService.getVoteByTaskAndUser(strArr[1], strArr[0]);
    return res.status(200).json(vote);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post('/vote_create', async (req, res) => {
  try {
    const result = await votesService.createVote(req);
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
    const result = await votesService.updateVote(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.delete('/:taskId', checkTaskDelete, async (req, res) => {
  const id = req.params.taskId;
  try {
    const task = await tasksService.deleteTask(id);
    clientRed.del('alltasks');
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
