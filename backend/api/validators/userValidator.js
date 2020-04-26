const mongoose = require('mongoose');
const User = require('../models/user');
const UserHasRole = require('../models/user_has_role');

exports.userValidator = (req, hash) => new User({
  _id: new mongoose.Types.ObjectId(),
  email: req.body[0].email,
  password: hash,
  name: req.body[0].name,
  address: req.body[0].address,
  work_number: req.body[0].work_number,
  personal_number: req.body[0].personal_number,
  image_path: req.body[0].image_path,
});

exports.userHasRoleValidator = (userId, req) => new UserHasRole({
  user: userId,
  role: req,
});
