const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Lead = require("../models/lead");
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth.main, (req, res, next) => {
    Lead.find()
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
    const lead = new Lead({
        _id: new mongoose.Types.ObjectId(),
        title: req.body[0].title,
        description: req.body[0].description,
        status: req.body[0].status,
        user_assigned: req.body[0].user_assigned,
        client: req.body[0].client,
        user_created: req.body[0].user_created,
        contact_date: req.body[0].contact_date
    });
    lead
        .save()
        .then(result => {
            console.log(req.body[0]);
            res.status(201).json({
                message: "Handling POST requests to /leads",
                createdLead: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:leadId", checkAuth.main, (req, res, next) => {
    const id = req.params.leadId;
    Lead.findById(id)
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

router.patch("/:leadId", checkAuth.main, (req, res, next) => {
    const id = req.params.leadId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Lead.update({ _id: id }, { $set: req.body[0] })
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

router.delete("/:leadId", checkAuth.main, (req, res, next) => {
    const id = req.params.leadId;
    Lead.remove({ _id: id })
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
