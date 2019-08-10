const mongoose = require("mongoose");

const Task = require("../models/task");
const Vote = require("../models/vote");
const Sprint = require("../models/sprint");
const checkAuth = require('../middleware/check-auth');
let redis = require('redis');
let client_red = redis.createClient(6379, '127.0.0.1');

exports.sprints_get_all = (req, res, next) => {
    if(checkAuth.scopes("create-sprints,edit-sprints")) {
        client_red.get('allsprints', function (err, reply) {
            if (reply) {
                console.log('redis');
                res.send(reply)
            } else {
                console.log('db');
                Sprint.find()
                    .exec()
                    .then(docs => {
                        console.log(docs);
                        //   if (docs.length >= 0) {
                        client_red.set('allsprints', JSON.stringify(docs));
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
            }});
    } };

exports.sprints_create_sprint = (req, res, next) => {
    const sprint = new Sprint({
        _id: new mongoose.Types.ObjectId(),
        title: req.body[0].title,
        description: req.body[0].description,
        status: req.body[0].status,
        lead_assigned: req.body[0].lead_assigned,
        user_created: req.body[0].user_created,
        deadline: req.body[0].deadline,
        created_at: new Date(Date.now()).toISOString()
    });
    if(checkAuth.scope("create-sprints")) {
        sprint
            .save()
            .then(result => {
                client_red.del('allsprints');
                console.log(result);
                res.status(201).json({
                    message: "Handling POST requests to /sprints",
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

exports.sprints_get_one = (req, res, next) => {
    const id = req.params.sprintId;
    if(checkAuth.scope("edit-sprints")) {
        Sprint.findById(id)
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

exports.sprints_edit_sprint = (req, res, next) => {
    const id = req.params.sprintId;
    if(checkAuth.scope("edit-sprints")) {
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        // req.body[0]['created_at'] = new Date(Date.now()).toISOString();
        Sprint.update({_id: id}, {$set: req.body[0]})
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

exports.sprints_get_points = (req, res, next) => {
    const id = req.params.sprintId;
    let date_reason = 0;
    let count_days = 0;
    const marks = [];
    const mark = [];
    const dates = [];
    const days = [];
    const cent_mark = [];
    const votes = [];
    let k = 0;
    let higher_counter = 0;
    let ideal_line = [];
    let reasons = 0;
    let mark_res = [];
    let last_day = 0;

    Sprint.findById(id)
        .exec()
        .then(doc => {
            Task.find({'sprint_assigned': doc['_id']}).exec()
                .then(result => {
                    if(doc['status'] === 2) {
                        console.log(result[0]['_id']);
                        for(let i = 0; i < result.length; i++) {
                            result[i]['status'] = 2;
                             Task.update({_id: result[i]['_id']}, {$set: result[i]})
                                 .exec()
                                 .then(result => {
                                     //console.log(result);
                                    // res.status(200).json(result);
                                 })
                                 .catch(err => {
                                     console.log(err);
                                     res.status(500).json({
                                         error: err
                                     });
                                 });
                        }
                    }
                   marks[0] = [];
                   marks[0][0] = 250;
                   for(let i = 0; i < result.length; i++) {
                       if(result[i]['status'] === 2) {
                          date_reason = new Date(doc['deadline']) - new Date(doc['created_at']);
                          dates[i] = Math.round(((new Date(result[i]['deadline']) - new Date(result[i]['created_at']))/86400)/(60 * 24));
                           console.log(new Date(result[i]['deadline']));
                           console.log(new Date(result[i]['created_at']));
                       }console.log(dates);
                       cent_mark[i] = 0;
                       Vote.find({'task_assigned': result[i]['_id']}).exec().then(result => {
                           if(result[0] !== undefined) {
                              votes[i] = result;
                              console.log(votes[i]);
                              for(let j = 0; j < votes[i].length; j++) {
                                   cent_mark[i] += result[j]['mark'];
                                   console.log(typeof result[j]['mark']);
                               }
                               if(cent_mark[i] !== undefined && cent_mark[i] !== 0) {
                                   k += 1;
                                   cent_mark[i] = cent_mark[i]/votes[i].length;
                                   marks[0][k] = marks[0][k - 1] - cent_mark[k - 1];
                               }
                               console.log(dates);
                               for(let i = 0; i < dates.length; i++) {
                                   if(dates[i] > 1) {
                                       console.log(marks[0]);
                                       mark[i] = [];
                                       for(let r = 0; r < dates[i]; r++) {
                                           mark[i][r] = Math.round(marks[0][i]);
                                       }
                                   }}console.log(mark);
                               if(mark.length === 1){
                                   mark_res = mark[0];
                               }
                               else {
                                   mark_res = mark[0].concat(mark[1]);
                                   if(mark.length > 2) {
                                       for(let n = 0; n < mark.length; n++) {
                                           mark_res = mark_res.concat(mark[n]);
                                       }
                                   }
                               }
                               console.log((date_reason / 86400)/(60 * 24));
                                   count_days = Math.round((date_reason / 86400)/(60 * 24));
                               for(let i = 0; i < count_days; i++) {
                                   days[i] = i + 1;
                                   days[i] = 'Day'+days[i];
                               }
                               if(doc['status'] === 2) {
                                   mark_res[days.length] = 0;
                                   last_day = days.length + 1;
                                   days[days.length] = "Day"+last_day;
                               }
                               marks[0] = mark_res;
                               marks[1] = days;
                               ideal_line[0] = 250;
                               reasons = 250 / days.length;
                               for(let i = 0; i < days.length; i++) {
                                   higher_counter += Math.round(reasons);
                                   ideal_line[i + 1] = 250 - higher_counter;
                                   if(ideal_line[i + 1] <= 0) {
                                     ideal_line[i + 1] = 0;
                                     break;
                                   }
                               }
                               marks[2] = ideal_line;
                               res.status(200).json(marks);
                           }
                       }).catch(err => {
                           console.log(err);
                           res.status(500).json({error: err});
                       });
                   }
                })
                .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
            console.log("From database", doc);
        })
        .catch(err => {
            console.log(err);
            //res.status(500).json({error: err});
        });
};

exports.sprints_delete_sprint = (req, res, next) => {
    const id = req.params.sprintId;
    if(checkAuth.scope("delete-sprints")) {
        Sprint.remove({_id: id})
            .exec()
            .then(result => {
                client_red.del('allsprints');
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