const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const config = require('../config.json');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const User = require("../models/user");
const User_has_role = require("../models/user_has_role");
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get("/", checkAuth.main, (req, res, next) => {
    User.find()
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
    User.find({ email: req.body[0].email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                bcrypt.hash(req.body[0].password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body[0].email,
                            password: hash,
                            name: req.body[0].name,
                            address: req.body[0].address,
                            work_number: req.body[0].work_number,
                            personal_number: req.body[0].personal_number,
                            image_path:  req.body[0].image_path
                        });
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
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
            }
        });
});

router.get("/:userId", checkAuth.main, (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
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

router.patch("/profile/:userId", upload.single('productImage'), checkAuth.main, (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: req.body[0] })
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

router.patch("/:userId", checkAuth.main, (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    User.update({ _id: id }, { $set: req.body[0] })
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

router.post("/login", (req, res, next) => {
    User.find({ email: req.body[0].email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body[0].password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id,
                            scopes: "create-clients,edit-clients,create-tasks,edit-tasks"
                        },
                        "twa1kkEyjkhbybkju",
                        {
                            expiresIn: "10h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token,
                        user: user,
                        permissions:["create-clients","edit-clients","create-tasks","edit-tasks","create-sprints","edit-sprints","create-leads","edit-leads","create-roles","edit-roles","create-users","edit-users"]
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:userId", checkAuth.main, (req, res, next) => {
    const id = req.params.userId;
    User.remove({ _id: id })
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

router.get("/user_has_role", (req, res, next) => {
    User_has_role.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/user_has_role/:userId", (req, res, next) => {
    const id = req.params.userId;
    let roles = {};
    User_has_role.find({user: id})
        .exec()
        .then(docs => {
            for(let i = 0; i < docs.length; i++) {
                roles[docs[i]['role']] = docs[i];
        }console.log(roles);
            res.status(200).json(roles);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/user_has_role", (req, res, next) => {
    for(let i = 0; i < req.body.length; i++){
        let user_has_role = new User_has_role({
            user: req.body[i][0],
            role: req.body[i][1]
        });
        user_has_role
            .save()
            .then(result => result)
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

module.exports = router;