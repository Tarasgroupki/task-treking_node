const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Validator = require('validatorjs');

const checkAuth = require('../middleware/check-auth');

const Permission = require('../models/permission');
const RoleHasPermission = require('../models/role_has_permission');
const Role = require('../models/role');

const rules = {
  name: 'string',
};

router.get('/permissions', async (req, res) => {
  try {
    const permissions = await Permission.find();
    return res.status(200).json(permissions);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/roles', checkAuth.main(), async (req, res) => {
  try {
    const roles = await Role.find();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/roles/:roleId', checkAuth.main(), async (req, res) => {
  const id = req.params.roleId;
  try {
    const role = await Role.findById(id);
    return res.status(200).json(role);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/role/:roleName', async (req, res) => {
  const name = req.params.roleName;
  try {
    const role = await Role.find({ name });
    return res.status(200).json(role);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post('/roles', checkAuth.main(), async (req, res) => {
  try {
    const result = await new Role({
      _id: new mongoose.Types.ObjectId(),
      name: req.body[0].name,
    }).save();
    return res.status(201).json({
      message: 'Handling POST requests to /roles',
      createdClient: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.patch('/roles/:roleId', checkAuth.main(), async (req, res) => {
  const id = req.params.roleId;
  const roleHasPermission = [];

  try {
    const validator = new Validator(req.body[2], rules);

    if (!validator.fails()) {
      await Role.update({ _id: id }, { $set: { name: req.body[2][0] } });
    } else {
      validator.errors.first('name');
    }

    res.status(200).json(validator);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
  req.body[0].forEach((item) => {
    roleHasPermission.push({ role: id, permission: item });
  });
  try {
    await RoleHasPermission.insertMany(roleHasPermission);
    await RoleHasPermission.remove({ role: id, permission: { $in: req.body[1] } });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.delete('/roles/:roleId', checkAuth.main(), async (req, res) => {
  const id = req.params.roleId;
  try {
    const role = await Role.remove({ _id: id });
    return res.status(200).json(role);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/role_has_permission', async (req, res) => {
  try {
    const rolesHasPermissions = await RoleHasPermission.find();
    return res.status(200).json(rolesHasPermissions);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/role_has_permission/:roleId', async (req, res) => {
  const id = req.params.roleId;
  const permissions = {};
  const roleHasPermission = await RoleHasPermission.find({ role: id });
  for (let i = 0; i < roleHasPermission.length; i++) {
    permissions[roleHasPermission[i].permission] = roleHasPermission[i];
  }
  return res.status(200).json(permissions);
});

router.post('/role_has_permission', async (req, res) => {
  const roleHasPermission = [];
  req.body.forEach((item) => {
    roleHasPermission.push({ role: item[0], permission: item[1] });
  });

  try {
    await RoleHasPermission.insertMany(roleHasPermission);
    res.status(200);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
