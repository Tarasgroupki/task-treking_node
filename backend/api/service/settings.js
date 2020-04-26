const Permission = require('../models/permission');
const RoleHasPermission = require('../models/role_has_permission');
const Role = require('../models/role');
const { roleValidator } = require('../validators/roleValidator');
const { roleHasPermissionValidator } = require('../validators/roleValidator');

const SettingsService = {};

SettingsService.getRoles = async () => await Role.find();

SettingsService.getPermissions = async () => await Permission.find();

SettingsService.getAllRoleHasPermissions = async () => await RoleHasPermission.find();

SettingsService.getOneRoleHasPermissions = async (id) => await RoleHasPermission.find({ role: id });

SettingsService.getPermsOfRole = async (permissions) => await Permission.find({ _id: { $in: permissions } });

SettingsService.getRoleById = async (id) => await Role.findById(id);

SettingsService.getRoleByName = async (name) => await Role.find({ name });

SettingsService.createRole = async (role) => await roleValidator(role).save();

SettingsService.updateRole = async (id, role) => await Role.update({ _id: id }, { $set: role });

SettingsService.createRoleHasPermissions = async (roleHasPermission) => await RoleHasPermission.insertMany(roleHasPermission);

SettingsService.createRoleHasPermission = async (id, roleHasPermission) => await roleHasPermissionValidator(id, roleHasPermission).save();

SettingsService.deleteRoleHasPermissions = async (roleId, permissions) => await RoleHasPermission.remove({ role: roleId, permission: { $in: permissions } });

SettingsService.deleteRoleHasPermission = async (id) => await RoleHasPermission.remove({ permission: id });

SettingsService.deleteRole = async (id) => await Role.remove({ _id: id });

module.exports = SettingsService;
