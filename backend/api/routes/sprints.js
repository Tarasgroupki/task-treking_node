const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const sprintsService = require('../service/sprints');
const tasksService = require('../service/tasks');
const votesService = require('../service/votes');

const clientRed = require('../redis-connection');

const checkSprintCreate = checkAuth.scope('create-sprints');
const checkSprintEdit = checkAuth.scope('edit-sprints');
const checkSprintDelete = checkAuth.scope('delete-sprints');
const checkSprintCreateAndEdit = checkAuth.scopes('create-sprints,edit-sprints');

router.get('/', checkSprintCreateAndEdit, (req, res) => {
  clientRed.get('allsprints', async (reply) => {
    if (reply) {
      return res.send(reply);
    }
    try {
      const sprints = await sprintsService.getSprints();
      clientRed.set('allsprints', JSON.stringify(sprints));
      return res.status(200).json(sprints);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
});

router.post('/', checkSprintCreate, async (req, res) => {
  try {
    const result = await sprintsService.createSprint(req);
    clientRed.del('allsprints');
    return res.status(201).json({
      message: 'Handling POST requests to /sprints',
      createdClient: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/get_points/:sprintId', async (req, res) => {
  const id = req.params.sprintId;
  let dateReason = 0;
  let countDays = 0;
  const marks = [];
  const mark = [];
  const dates = [];
  const days = [];
  const centMark = [];
  const votes = [];
  let k = 0;
  let higherCounter = 0;
  const idealLine = [];
  let reasons = 0;
  let markRes = [];
  let lastDay = 0;

  try {
    const sprint = await sprintsService.getSprint(id);
    const tasks = await tasksService.getTasksBySprint(sprint._id);
    marks[0] = [];
    marks[0][0] = 250;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === 2) {
        dateReason = new Date(sprint.deadline) - new Date(sprint.created_at);
        dates.push(Math.round(((new Date(tasks[i].deadline) - new Date(tasks[i].created_at)) / 86400) / (60 * 24)));
      }
      centMark[i] = 0;
      votes[i] = await votesService.getVoteByTask(tasks[i]._id);
      for (let j = 0; j < votes[i].length; j++) {
        centMark[i] += votes[i][j].mark;
      }
      if (centMark[i] !== undefined && centMark[i] !== 0) {
        k += 1;
        centMark[i] /= votes[i].length;
        marks[0][k] = marks[0][k - 1] - centMark[k - 1];
      }
    }
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] > 1) {
        mark[i] = [];
        for (let r = 0; r < dates[i]; r++) {
          mark[i][r] = Math.round(marks[0][i]);
        }
      }
    }
    if (mark.length === 1) {
      [markRes] = [...mark[0]];
    } else if (mark > 1) {
      markRes = mark[0].concat(mark[1]);
    } else {
      for (let n = 0; n < mark.length; n++) {
        markRes = markRes.concat(mark[n]);
      }
    }
    countDays = Math.round((dateReason / 86400) / (60 * 24));
    for (let i = 0; i < countDays; i++) {
      days[i] = i + 1;
      days[i] = `Day${days[i]}`;
    }
    if (sprint.status === 2) {
      markRes[days.length] = 0;
      lastDay = days.length + 1;
      days[days.length] = `Day${lastDay}`;
    }
    marks[0] = markRes;
    marks[1] = days;
    idealLine[0] = 250;
    reasons = 250 / days.length;
    for (let i = 0; i < days.length; i++) {
      higherCounter += Math.round(reasons);
      idealLine[i + 1] = 250 - higherCounter;
      if (idealLine[i + 1] <= 0) {
        idealLine[i + 1] = 0;
        break;
      }
    }
    marks[2] = idealLine;
    return res.status(200).json(marks);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/:sprintId', checkSprintCreate, async (req, res) => {
  const id = req.params.sprintId;
  try {
    const sprint = await sprintsService.getSprint(id);
    return res.status(200).json(sprint);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.patch('/:sprintId', checkSprintEdit, async (req, res) => {
  const id = req.params.sprintId;
  try {
    const result = await sprintsService.updateSprint(id, req.body[0]);
    if (req.body[0].status === 2) {
      await tasksService.updateTasks(id);
    }
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.delete('/:sprintId', checkSprintDelete, async (req, res) => {
  const id = req.params.sprintId;
  try {
    const sprint = await sprintsService.deleteSprint(id);
    clientRed.del('allsprints');
    return res.status(200).json(sprint);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
