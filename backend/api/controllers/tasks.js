const mongoose = require("mongoose");

const Task = require("../models/task");
const Vote = require("../models/vote");
const checkAuth = require('../middleware/check-auth');

exports.tasks_get_all = (req, res, next) => {
    if(checkAuth.scopes("create-tasks,edit-tasks")) {
        Task.find()
            .exec()
            .then(docs => {
                console.log(docs);
                //   if (docs.length >= 0) {
                res.status(200).json(docs);
                //   } else {
                //       res.status(404).json({
                //           message: 'No entries found'
                //       });
                //   }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    } };

exports.tasks_create_task = (req, res, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body[0].title,
        description: req.body[0].description,
        status: req.body[0].status,
        sprint_assigned: req.body[0].sprint_assigned,
        user_created: req.body[0].user_created,
        deadline: req.body[0].deadline,
        created_at: new Date(Date.now()).toISOString()
    });
    if(checkAuth.scope("create-tasks")) {
        task
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Handling POST requests to /tasks",
                    createdClient: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
};

exports.tasks_get_one = (req, res, next) => {
    const id = req.params.taskId;
    if(checkAuth.scope("edit-tasks")) {
        Task.findById(id)
            .exec()
            .then(doc => {
                console.log("From database", doc);
                if (doc) {
                    res.status(200).json(doc);
                } else {
                    res
                        .status(404)
                        .json({message: "No valid entry found for provided ID"});
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
    }
};

exports.tasks_edit_task = (req, res, next) => {
    const id = req.params.taskId;
    if(checkAuth.scope("edit-tasks")) {
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
       // req.body[0]['created_at'] = new Date(Date.now()).toISOString();
        Task.update({_id: id}, {$set: req.body[0]})
            .exec()
            .then(result => {
                console.log(result);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
};

exports.tasks_votes_count = (req, res, next) => {
    const id = req.params.taskId;
    let votes = [];
    Vote.find({'task_assigned': id})
        .exec()
        .then(docs => {
            console.log(docs);
            for(let i = 0; i < docs.length; i++) {
                votes[i] = docs[i]['user_added'];
            }
            //   if (docs.length >= 0) {
            res.status(200).json(votes);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.tasks_check_voter = (req, res, next) => {
     const id = req.params.voteId;
     let str_arr = id.split('_');
    Vote.find({'user_added': str_arr[0], 'task_assigned': str_arr[1]})
        .exec()
        .then(docs => {
            console.log(docs);
            //   if (docs.length >= 0) {
            res.status(200).json(docs);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.tasks_create_votes = (req, res, next) => {
    const vote = new Vote({
        _id: new mongoose.Types.ObjectId(),
        user_added: req.body[0].user_added,
        task_assigned: req.body[0].task_assigned,
        mark: req.body[0].mark
    });
        vote
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Handling POST requests to /votes",
                    createdClient: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
};

exports.tasks_update_votes = (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Vote.update({_id: id}, {$set: req.body[0]})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.tasks_delete_task = (req, res, next) => {
    const id = req.params.taskId;
    if(checkAuth.scope("delete-tasks")) {
        Task.remove({_id: id})
            .exec()
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
};