const redis = require('redis');

const tasksService = require('../service/tasks');
// const sprintsService = require('../service/sprints');
const votesService = require('../service/votes');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.tasks_get_all = (req, res) => {
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
};

exports.tasks_create_task = async (req, res) => {
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
};

exports.tasks_get_one = async (req, res) => {
  const id = req.params.taskId;
  try {
    const task = await tasksService.getTask(id);
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.tasks_edit_task = async (req, res) => {
  const id = req.params.taskId;
  try {
    const result = await tasksService.updateTask(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.tasks_votes_count = async (req, res) => {
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
};

exports.tasks_check_voter = async (req, res) => {
  const id = req.params.voteId;
  const strArr = id.split('_');

  try {
    const vote = await votesService.getVoteByTaskAndUser(strArr[1], strArr[0]);
    return res.status(200).json(vote);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.tasks_create_votes = async (req, res) => {
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
};

exports.tasks_update_votes = async (req, res) => {
  const id = req.params.taskId;

  try {
    const result = await votesService.updateVote(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.tasks_delete_task = async (req, res) => {
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
};
