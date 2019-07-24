const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/task");
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth.main, (req, res, next) => {
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
    }
});

router.post("/", checkAuth.main, (req, res, next) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body[0].title,
        description: req.body[0].description,
        status: req.body[0].status,
        sprint_assigned: req.body[0].sprint_assigned,
        user_created: req.body[0].user_created,
        deadline: req.body[0].deadline
    });
    if(checkAuth.scope("create-tasks")) {
        task
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: "Handling POST requests to /tasks",
                    createdSprint: result
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

router.get("/:taskId", checkAuth.main, (req, res, next) => {
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
});

router.patch("/:sprintId", checkAuth.main, (req, res, next) => {
    const id = req.params.sprintId;
    if(checkAuth.scope("edit-tasks")) {
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
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
});

router.delete("/:sprintId", checkAuth.main, (req, res, next) => {
    const id = req.params.sprintId;
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
});

module.exports = router;
