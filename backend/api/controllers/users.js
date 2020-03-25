const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const redis = require('redis');
const User = require('../models/user');
const UserHasRole = require('../models/user_has_role');
const Role = require('../models/role');
const RoleHasPermission = require('../models/role_has_permission');
const Permission = require('../models/permission');
const checkAuth = require('../middleware/check-auth');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.users_get_all = (req, res) => {
  if (checkAuth.scopes('create-users,edit-users')) {
    clientRed.get('allusers', (reply) => {
      if (reply) {
      //  console.log('redis');
        let replyJson = JSON.parse(reply);
        /* for (key in reply) {
          reply[key].password = null;
        } */
        for (const value of Object.values(replyJson)) {
          value.password = null;
        }
        replyJson = JSON.stringify(reply);
        res.send(replyJson);
      } else {
        User.find()
          .exec()
          .then((docs) => {
            clientRed.set('allusers', JSON.stringify(docs));
            /* for (key in docs) {
              docs[key].password = null;
            } */
            for (const value of Object.values(docs)) {
              value.password = null;
            }
            //     console.log(docs);
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

exports.users_create_user = (req, res) => {
  User.find({ email: req.body[0].email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists',
        });
      }
      bcrypt.hash(req.body[0].password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err,
          });
        }
        const userObj = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body[0].email,
          password: hash,
          name: req.body[0].name,
          address: req.body[0].address,
          work_number: req.body[0].work_number,
          personal_number: req.body[0].personal_number,
          image_path: req.body[0].image_path,
        });
        return userObj
          .save()
          .then(() => {
            clientRed.del('allusers');
            res.status(201).json({
              message: 'User created',
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      });
    });
};

exports.users_get_one = (req, res) => {
  if (checkAuth.scope('edit-users')) {
    const id = req.params.userId;
    User.findById(id)
      .exec()
      .then((doc) => {
        doc.password = null;
        // console.log('From database', doc);
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

exports.users_edit_user = (req, res) => {
  const id = req.params.userId;
  if (checkAuth.scope('edit-users')) {
    const updateOps = {};
    for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    }
    if (req.body[0].password !== null) {
      req.body[0].password = bcrypt.hashSync(req.body[0].password, 12);
    } else {
      delete req.body[0].password;
    }
    User.update({ _id: id }, { $set: req.body[0] })
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

exports.users_profile_user = (req, res) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  if (req.body[0].password !== null) {
    req.body[0].password = bcrypt.hashSync(req.body[0].password, 12);
  } else {
    delete req.body[0].password;
  }
  if (req.body[0].image_path === null) delete req.body[0].image_path;
  User.update({ _id: id }, { $set: req.body[0] })
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

exports.users_file_upload = (req, res) => {
  try {
    const data = req.file;

    res.send({ fileName: data.filename, originalName: data.originalname });
  } catch (err) {
    res.sendStatus(400);
  }
};

exports.users_login = (req, res) => {
  User.find({ email: req.body[0].email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed',
        });
      }
      bcrypt.compare(req.body[0].password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed',
          });
        }
        if (result) {
          let count = -1;
          const permissions = [];
          const changedRoles = [];
          const roles = [];
          return UserHasRole.find({ user: user[0]._id }).exec().then((resultUserHasRole) => {
            // for (let k = 0; k < resultUserHasRole.length; k++) {
            resultUserHasRole.forEach((item, key) => RoleHasPermission.find({ role: item.role }).exec().then((resultRoleHasPermission) => {
              changedRoles[key] = resultRoleHasPermission[key].role;
              // for (let j = 0; j < resultRoleHasPermission.length; j++) {
              resultRoleHasPermission.forEach((item1, key1) => {
                count = resultRoleHasPermission.length - 1;
                Permission.find({ _id: item1.permission }).exec().then((resultPermission) => {
                  //    console.log(k); console.log(j);
                  permissions.push(resultPermission[0].name.replace(' ', '-'));
                  Role.find({ _id: changedRoles[key] }).exec().then((resultRole) => {
                    //     console.log(result[k].name);
                    if (count === key1) {
                      roles.push(resultRole[key].name);
                      const token = jwt.sign(
                        {
                          email: user[0].email,
                          userId: user[0]._id,
                          scopes: permissions.toString(),
                        },
                        'twa1kkEyjkhbybkju',
                        {
                          expiresIn: '10h',
                        },
                      );
                      res.status(200).json({
                        message: 'Auth successful',
                        token,
                        user,
                        roles,
                        permissions,
                      });
                    }
                  });
                });
              });
            }));
          });
        }
        res.status(401).json({
          message: 'Auth failed',
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_user_has_role = (req, res) => {
  UserHasRole.find()
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

exports.users_user_has_role_one = (req, res) => {
  const id = req.params.userId;
  const roles = {};
  UserHasRole.find({ user: id })
    .exec()
    .then((docs) => {
      for (let i = 0; i < docs.length; i++) {
        roles[docs[i].role] = docs[i];
      }
      res.status(200).json(roles);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.users_create_user_has_role = (req, res) => {
  const { userId } = req.params;
  for (let i = 0; i < req.body[0].length; i++) {
    const userHasRole = new UserHasRole({
      user: userId,
      role: req.body[0][i],
    });
    userHasRole
      .save()
      .then((result) => result)
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
  for (let i = 0; i < req.body[1].length; i++) {
    UserHasRole.remove({ role: req.body[1][i], user: userId })
      .exec()
      .then((result) => result)
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports.users_delete_user = (req, res) => {
  const id = req.params.userId;
  if (checkAuth.scope('delete-users')) {
    User.remove({ _id: id })
      .exec()
      .then((result) => {
        clientRed.del('allusers');
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
