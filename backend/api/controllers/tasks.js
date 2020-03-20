const mongoose = require('mongoose');

const redis = require('redis');
const Task = require('../models/task');
const Vote = require('../models/vote');
const checkAuth = require('../middleware/check-auth');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.tasks_get_all = (req, res) => {
  if (checkAuth.scopes('create-tasks,edit-tasks')) {
    clientRed.get('alltasks', (reply) => {
      if (reply) {
        // console.log('redis');
        res.send(reply);
      } else {
        Task.find()
          .exec()
          .then((docs) => {
            clientRed.set('alltasks', JSON.stringify(docs));
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

exports.tasks_create_task = (req, res) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    title: req.body[0].title,
    description: req.body[0].description,
    status: req.body[0].status,
    sprint_assigned: req.body[0].sprint_assigned,
    user_created: req.body[0].user_created,
    deadline: req.body[0].deadline,
    created_at: new Date(Date.now()).toISOString(),
  });
  if (checkAuth.scope('create-tasks')) {
    task
      .save()
      .then((result) => {
        clientRed.del('alltasks');
        res.status(201).json({
          message: 'Handling POST requests to /tasks',
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

exports.tasks_get_one = (req, res) => {
  const id = req.params.taskId;
  if (checkAuth.scope('edit-tasks')) {
    Task.findById(id)
      .exec()
      .then((doc) => {
      //  console.log('From database', doc);
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

exports.tasks_edit_task = (req, res) => {
  const id = req.params.taskId;
  if (checkAuth.scope('edit-tasks')) {
    const updateOps = {};
    /* for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    } */
    req.body.forEach((item) => {
      updateOps[item.propName] = item.value;
    });
    Task.update({ _id: id }, { $set: req.body[0] })
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

exports.tasks_votes_count = (req, res) => {
  const id = req.params.taskId;
  const votes = [];
  Vote.find({ task_assigned: id })
    .exec()
    .then((docs) => {
      for (let i = 0; i < docs.length; i++) {
        votes[i] = docs[i].user_added;
      }
      res.status(200).json(votes);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.tasks_check_voter = (req, res) => {
  const id = req.params.voteId;
  const strArr = id.split('_');
  Vote.find({ user_added: strArr[0], task_assigned: strArr[1] })
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.tasks_create_votes = (req, res) => {
  const vote = new Vote({
    _id: new mongoose.Types.ObjectId(),
    user_added: req.body[0].user_added,
    task_assigned: req.body[0].task_assigned,
    mark: req.body[0].mark,
  });
  vote
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Handling POST requests to /votes',
        createdClient: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.tasks_update_votes = (req, res) => {
  const id = req.params.taskId;
  const updateOps = {};
  /* for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  } */
  req.body.forEach((item) => {
    updateOps[item.propName] = item.value;
  });
  Vote.update({ _id: id }, { $set: req.body[0] })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.tasks_delete_task = (req, res) => {
  const id = req.params.taskId;
  if (checkAuth.scope('delete-tasks')) {
    Task.remove({ _id: id })
      .exec()
      .then((result) => {
        clientRed.del('alltasks');
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
