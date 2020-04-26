const User = require('../models/user');
const UserHasRole = require('../models/user_has_role');
const { userValidator } = require('../validators/userValidator');
const { userHasRoleValidator } = require('../validators/userValidator');

const UsersService = {};

UsersService.getUsers = async () => await User.find();

UsersService.getUserById = async (id) => await User.findById(id);

UsersService.getUserHasRoles = async () => await UserHasRole.find();

UsersService.getUserHasRolesById = async (id) => await UserHasRole.find({ user: id });

UsersService.getUserByEmail = async (email) => await User.find({ email });

UsersService.createUserHasRoles = async (userHasRole) => await UserHasRole.insertMany(userHasRole);

UsersService.createUserHasRole = async (userId, body) => await userHasRoleValidator(userId, body).save();

UsersService.createUser = async (user, hash) => await userValidator(user, hash).save();

UsersService.updateUser = async (id, user) => await User.update({ _id: id }, { $set: user });

UsersService.deleteUserHasRoles = async (userId, roles) => await UserHasRole.remove({ user: userId, role: { $in: roles } });

UsersService.deleteUserHasRole = async (roleId, userId) => await UserHasRole.remove({ role: roleId, user: userId });

UsersService.deleteUser = async (id) => await User.remove({ _id: id });

module.exports = UsersService;
