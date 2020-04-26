const mongoose = require('mongoose');
const RoleHasPermission = require('../models/role_has_permission');
const Role = require('../models/role');

exports.roleValidator = (req) => new Role({
  _id: new mongoose.Types.ObjectId(),
  name: req.body[0].name,
});

exports.roleHasPermissionValidator = (id, req) => new RoleHasPermission({
  permission: req,
  role: id,
});
