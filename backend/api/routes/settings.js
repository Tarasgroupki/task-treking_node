const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const settingsService = require('../services/settings');

router.get('/permissions', async (req, res) => {
  try {
    const permissions = await settingsService.getPermissions();
    return res.status(200).json(permissions);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/roles', checkAuth.main(), async (req, res) => {
  try {
    const roles = await settingsService.getRoles();
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/roles/:roleId', checkAuth.main(), async (req, res) => {
  const id = req.params.roleId;
  try {
    const role = await settingsService.getRoleById(id);
    return res.status(200).json(role);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/role/:roleName', async (req, res) => {
  const name = req.params.roleName;
  try {
    const role = await settingsService.getRoleByName(name);
    return res.status(200).json(role);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post('/roles', checkAuth.main(), async (req, res) => {
  try {
    const result = await settingsService.createRole(req);
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
    const result = await settingsService.updateRole(id, req.body[2]);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
  req.body[0].forEach((item) => {
    roleHasPermission.push({ role: id, permission: item });
  });
  try {
    await settingsService.createRoleHasPermissions(roleHasPermission);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
  try {
    await settingsService.deleteRoleHasPermissions(id, req.body[1]);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.delete('/roles/:roleId', checkAuth.main(), async (req, res) => {
  const id = req.params.roleId;
  try {
    const role = await settingsService.deleteRole(id);
    return res.status(200).json(role);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/role_has_permission', async (req, res) => {
  try {
    const rolesHasPermissions = await settingsService.getAllRoleHasPermissions();
    return res.status(200).json(rolesHasPermissions);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.get('/role_has_permission/:roleId', async (req, res) => {
  const id = req.params.roleId;
  const permissions = {};
  const roleHasPermission = await settingsService.getOneRoleHasPermissions(id);
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
    await settingsService.createRoleHasPermissions(roleHasPermission);
    res.status(200);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
