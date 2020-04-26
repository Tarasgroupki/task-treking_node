const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const SettingsController = require('../controllers/settings');

router.get('/permissions', SettingsController.permissions_get_all);

// router.post('/permissions', SettingsController.permissions_create_permission);

router.get('/roles', checkAuth.main(), SettingsController.roles_get_all);

router.get('/roles/:roleId', checkAuth.main(), SettingsController.roles_get_one_by_id);


router.get('/role/:roleName', SettingsController.roles_get_one_by_name);

router.post('/roles', checkAuth.main(), SettingsController.roles_create_roles);

router.patch('/roles/:roleId', checkAuth.main(), SettingsController.roles_edit_role);

router.delete('/roles/:roleId', checkAuth.main(), SettingsController.roles_delete_role);

router.get('/role_has_permission', SettingsController.get_all_roles_has_permission);

router.get('/role_has_permission/:roleId', SettingsController.get_one_roles_has_permission);

router.post('/role_has_permission', SettingsController.roles_create_roles_has_permission);

module.exports = router;
