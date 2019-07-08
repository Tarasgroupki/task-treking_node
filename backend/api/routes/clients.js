const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Client = require("../models/client");
const checkAuth = require('../middleware/check-auth');

router.get("/", checkAuth.main, (req, res, next) => {
    Client.find()
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
    const client = new Client({
        _id: new mongoose.Types.ObjectId(),
        name: req.body[0].name,
        email: req.body[0].email,
        primary_number: req.body[0].primary_number,
        secondary_number: req.body[0].secondary_number,
        address: req.body[0].address,
        zipcode: req.body[0].zipcode,
        city: req.body[0].city,
        company_name: req.body[0].company_name,
        vat: req.body[0].vat,
        company_type: req.body[0].company_type,
        user: req.body[0].user,
        industry_id: 1
    });
    console.log(client);
    client
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /clients",
                createdClient: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:clientId", checkAuth.main, (req, res, next) => {
    const id = req.params.clientId;
    Client.findById(id)
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

router.patch("/:clientId", checkAuth.main, (req, res, next) => {
    const id = req.params.clientId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Client.update({ _id: id }, { $set: req.body[0] })
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

router.delete("/:clientId", checkAuth.main, (req, res, next) => {
    const id = req.params.clientId;
    Client.remove({ _id: id })
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
