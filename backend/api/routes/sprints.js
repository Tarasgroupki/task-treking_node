const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Sprint = require("../models/sprint");
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth.main, checkAuth.scopes("create-clients,edit-clients"), (req, res, next) => {
    Sprint.find()
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
});

router.post("/", checkAuth.main, (req, res, next) => {
    const sprint = new Sprint({
        _id: new mongoose.Types.ObjectId(),
        title: req.body[0].title,
        description: req.body[0].description,
        status: req.body[0].status,
        lead_assigned: req.body[0].lead_assigned,
        user_created: req.body[0].user_created,
        deadline: req.body[0].deadline
    });
    sprint
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /sprints",
                createdSprint: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:sprintId", checkAuth.main, (req, res, next) => {
    const id = req.params.sprintId;
    Sprint.findById(id)
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.patch("/:sprintId", checkAuth.main, (req, res, next) => {
    const id = req.params.sprintId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Sprint.update({ _id: id }, { $set: req.body[0] })
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
});

router.delete("/:sprintId", checkAuth.main, (req, res, next) => {
    const id = req.params.sprintId;
    Sprint.remove({ _id: id })
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
});

module.exports = router;
