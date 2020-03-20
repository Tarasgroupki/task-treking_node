const mongoose = require('mongoose');

const redis = require('redis');
const Task = require('../models/task');
const Vote = require('../models/vote');
const Sprint = require('../models/sprint');
const checkAuth = require('../middleware/check-auth');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.sprints_get_all = (req, res) => {
  if (checkAuth.scopes('create-sprints,edit-sprints')) {
    clientRed.get('allsprints', (reply) => {
      if (reply) {
        //     console.log('redis');
        res.send(reply);
      } else {
        //     console.log('db');
        Sprint.find()
          .exec()
          .then((docs) => {
            //   console.log(docs);
            clientRed.set('allsprints', JSON.stringify(docs));
            res.status(200).json(docs);
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    });
  }
};

exports.sprints_create_sprint = (req, res) => {
  const sprint = new Sprint({
    _id: new mongoose.Types.ObjectId(),
    title: req.body[0].title,
    description: req.body[0].description,
    status: req.body[0].status,
    lead_assigned: req.body[0].lead_assigned,
    user_created: req.body[0].user_created,
    deadline: req.body[0].deadline,
    created_at: new Date(Date.now()).toISOString(),
  });
  if (checkAuth.scope('create-sprints')) {
    sprint
      .save()
      .then((result) => {
        clientRed.del('allsprints');
        res.status(201).json({
          message: 'Handling POST requests to /sprints',
          createdClient: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports.sprints_get_one = (req, res) => {
  const id = req.params.sprintId;
  if (checkAuth.scope('edit-sprints')) {
    Sprint.findById(id)
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: 'No valid entry found for provided ID' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
};

exports.sprints_edit_sprint = (req, res) => {
  const id = req.params.sprintId;
  if (checkAuth.scope('edit-sprints')) {
    const updateOps = {};
    /* for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    } */
    req.body.forEach((item) => {
      updateOps[item.propName] = item.value;
    });
    Sprint.update({ _id: id }, { $set: req.body[0] })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports.sprints_get_points = (req, res) => {
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

  Sprint.findById(id)
    .exec()
    .then((doc) => {
      Task.find({ sprint_assigned: doc._id }).exec()
        .then((resultTask) => {
          if (doc.status === 2) {
            for (let i = 0; i < resultTask.length; i++) {
              resultTask[i].status = 2;
              Task.update({ _id: resultTask[i]._id }, { $set: resultTask[i] })
                .exec()
                .then(() => {
                  // res.status(200).json(result);
                })
                .catch((err) => {
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          }
          marks[0] = [];
          marks[0][0] = 250;
          for (let i = 0; i < resultTask.length; i++) {
            if (resultTask[i].status === 2) {
              dateReason = new Date(doc.deadline) - new Date(doc.created_at);
              dates[i] = Math.round(((new Date(resultTask[i].deadline) - new Date(resultTask[i].created_at)) / 86400) / (60 * 24));
            }// console.log(dates);
            centMark[i] = 0;
            Vote.find({ task_assigned: resultTask[i]._id }).exec().then((resultVotes) => {
              if (resultVotes[0] !== undefined) {
                votes[i] = resultVotes;
                for (let j = 0; j < votes[i].length; j++) {
                  centMark[i] += resultVotes[j].mark;
                  //   console.log(typeof result[j].mark);
                }
                if (centMark[i] !== undefined && centMark[i] !== 0) {
                  k += 1;
                  centMark[i] = centMark[i] / votes[i].length;
                  marks[0][k] = marks[0][k - 1] - centMark[k - 1];
                }
                // console.log(dates);
                for (i = 0; i < dates.length; i++) {
                  if (dates[i] > 1) {
                  //  console.log(marks[0]);
                    mark[i] = [];
                    for (let r = 0; r < dates[i]; r++) {
                      mark[i][r] = Math.round(marks[0][i]);
                    }
                  }
                }
                if (mark.length === 1) {
                  markRes = mark[0];
                } else {
                  markRes = mark[0].concat(mark[1]);
                  if (mark.length > 2) {
                    for (let n = 0; n < mark.length; n++) {
                      markRes = markRes.concat(mark[n]);
                    }
                  }
                }
                countDays = Math.round((dateReason / 86400) / (60 * 24));
                for (i = 0; i < countDays; i++) {
                  days[i] = i + 1;
                  days[i] = `Day${days[i]}`;
                }
                if (doc.status === 2) {
                  markRes[days.length] = 0;
                  lastDay = days.length + 1;
                  days[days.length] = `Day${lastDay}`;
                }
                marks[0] = markRes;
                marks[1] = days;
                idealLine[0] = 250;
                reasons = 250 / days.length;
                for (i = 0; i < days.length; i++) {
                  higherCounter += Math.round(reasons);
                  idealLine[i + 1] = 250 - higherCounter;
                  if (idealLine[i + 1] <= 0) {
                    idealLine[i + 1] = 0;
                    break;
                  }
                }
                marks[2] = idealLine;
                res.status(200).json(marks);
              }
            }).catch((err) => {
              res.status(500).json({ error: err });
            });
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.sprints_delete_sprint = (req, res) => {
  const id = req.params.sprintId;
  if (checkAuth.scope('delete-sprints')) {
    Sprint.remove({ _id: id })
      .exec()
      .then((result) => {
        clientRed.del('allsprints');
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
