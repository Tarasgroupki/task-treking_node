const mongoose = require("mongoose");

const Lead = require("../models/lead");
const checkAuth = require('../middleware/check-auth');
let redis = require('redis');
let client_red = redis.createClient(6379, '127.0.0.1');

exports.leads_get_all = (req, res, next) => {
    if(checkAuth.scopes("create-leads,edit-leads")) {
        client_red.get('allleads', function (err, reply) {
            if (reply) {
                console.log('redis');
                res.send(reply)
            } else {
                console.log('db');
                Lead.find()
                    .exec()
                    .then(docs => {
                        console.log(docs);
                        client_red.set('allleads', JSON.stringify(docs));
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
            }});
    } };

exports.leads_create_lead = (req, res, next) => {
    const lead = new Lead({
        _id: new mongoose.Types.ObjectId(),
        title: req.body[0].title,
        description: req.body[0].description,
        status: req.body[0].status,
        user_assigned: req.body[0].user_assigned,
        client: req.body[0].client,
        user_created: req.body[0].user_created,
        contact_date: req.body[0].contact_date,
        created_at: new Date(Date.now()).toISOString()
    });
    if(checkAuth.scope("create-leads")) {
        lead
            .save()
            .then(result => {
                client_red.del('allleads');
                console.log(result);
                res.status(201).json({
                    message: "Handling POST requests to /leads",
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

exports.leads_get_one = (req, res, next) => {
    const id = req.params.leadId;
    if(checkAuth.scope("edit-leads")) {
        Lead.findById(id)
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

exports.leads_edit_lead = (req, res, next) => {
    const id = req.params.leadId;
    if(checkAuth.scope("edit-leads")) {
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        Lead.update({_id: id}, {$set: req.body[0]})
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

exports.leads_delete_lead = (req, res, next) => {
    const id = req.params.leadId;
    if(checkAuth.scope("delete-leads")) {
        Lead.remove({_id: id})
            .exec()
            .then(result => {
                client_red.del('allleads');
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