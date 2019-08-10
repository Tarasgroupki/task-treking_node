const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const User_has_role = require("../models/user_has_role");
const Role = require("../models/role");
const Role_has_permission = require("../models/role_has_permission");
const Permission = require("../models/permission");
const checkAuth = require('../middleware/check-auth');
let redis = require('redis');
let client_red = redis.createClient(6379, '127.0.0.1');

exports.users_get_all = (req, res, next) => {
    if(checkAuth.scopes("create-users,edit-users")) {
        client_red.get('allusers', function (err, reply) {
            if (reply) {
                console.log('redis');
                reply = JSON.parse(reply);
                for (key in reply) {
                    console.log(key);
                    reply[key].password = null;
                }
                reply = JSON.stringify(reply);
                res.send(reply);
            } else {
                console.log('db');
                User.find()
                    .exec()
                    .then(docs => {
                        client_red.set('allusers', JSON.stringify(docs));
                        for (key in docs) {
                            docs[key].password = null;
                        }
                        console.log(docs);
                        res.status(200).json(docs);

                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }});
    }
};

exports.users_create_user = (req, res, next) => {
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
                                client_red.del('allusers');
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
};

exports.users_get_one = (req, res, next) => {
    if(checkAuth.scope("edit-users")) {
        const id = req.params.userId;
        User.findById(id)
            .exec()
            .then(doc => {
                doc.password = null;
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

exports.users_edit_user = (req, res, next) => {
    const id = req.params.userId;
    if(checkAuth.scope("edit-users")) {
        const updateOps = {};
        for (const ops of req.body) {
            updateOps[ops.propName] = ops.value;
        }
        (req.body[0].password !== null) ? req.body[0].password = bcrypt.hashSync(req.body[0].password, 12) : delete req.body[0].password;
        User.update({_id: id}, {$set: req.body[0]})
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

exports.users_profile_user = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    (req.body[0].password !== null) ? req.body[0].password = bcrypt.hashSync(req.body[0].password, 12) : delete req.body[0].password;
    (req.body[0].image_path === null) ? delete req.body[0].image_path : null;
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
};

exports.users_file_upload = (req, res, next) => {console.log(res);
    try {
        const data = req.file;

        res.send({fileName: data.filename, originalName: data.originalname });
    } catch (err) {
        res.sendStatus(400);
    }
};

exports.users_login = (req, res, next) => {
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
                    let count = -1;
                    let permissions = [];
                    let changed_roles =[];
                    let roles = [];
                    return User_has_role.find({'user': user[0]._id}).exec().then(result => {console.log(result);
                        for(let k = 0; k < result.length; k++) {
                            Role_has_permission.find({"role": result[k]['role']}).exec().then(result => {console.log(result);
                                changed_roles[k] = result[k]['role'];
                                for (let j = 0; j < result.length; j++) {count = result.length - 1;
                                    Permission.find({"_id": result[j]['permission']}).exec().then(result => {console.log(k);console.log(j);
                                        permissions.push(result[0]['name'].replace(" ","-"));
                                        Role.find({"_id": changed_roles[k]}).exec().then(result => {console.log(result[k].name);
                                            if(count === j) {
                                                roles.push(result[k].name);
                                                let token = jwt.sign(
                                                    {
                                                        email: user[0].email,
                                                        userId: user[0]._id,
                                                        scopes: permissions.toString()
                                                    },
                                                    "twa1kkEyjkhbybkju",
                                                    {
                                                        expiresIn: "10h"
                                                    }
                                                );
                                                res.status(200).json({
                                                    message: "Auth successful",
                                                    token: token,
                                                    user: user,
                                                    roles: roles,
                                                    permissions: permissions
                                                });
                                            }
                                        });

                                    });
                                }
                            });
                        }
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
};

exports.users_user_has_role = (req, res, next) => {
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
};

exports.users_user_has_role_one = (req, res, next) => {
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
};

exports.users_create_user_has_role = (req, res, next) => {
    const user_id = req.params.userId;
    for(let i = 0; i < req.body[0].length; i++){
        let user_has_role = new User_has_role({
            user: user_id,
            role: req.body[0][i]
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
    for(let i = 0; i < req.body[1].length; i++) {
        User_has_role.remove({ role: req.body[1][i], user: user_id })
            .exec()
            .then(result => result)
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
};

exports.users_delete_user = (req, res, next) => {
    const id = req.params.userId;
    if(checkAuth.scope("delete-users")) {
        User.remove({_id: id})
            .exec()
            .then(result => {
                client_red.del('allusers');
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