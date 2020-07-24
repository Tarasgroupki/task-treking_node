const Validator = require('validatorjs');
const mongoose = require('mongoose');
const User = require('../models/user');
const UserHasRole = require('../models/user_has_role');

const rules = {
  name: 'string',
  email: 'email',
  password: 'string',
  address: 'string',
  work_number: 'string',
  personal_number: 'string',
  image_path: 'string',
};

const UsersService = {};

UsersService.getUsers = async () => await User.find();

UsersService.getUserById = async (id) => await User.findById(id);

UsersService.getUserHasRoles = async () => await UserHasRole.find();

UsersService.getUserHasRolesById = async (id) => await UserHasRole.find({ user: id });

UsersService.getUserByEmail = async (email) => await User.find({ email });

UsersService.createUserHasRoles = async (userHasRole) => await UserHasRole.insertMany(userHasRole);

UsersService.createUserHasRole = async (userId, body) => {
  await new UserHasRole({
    user: userId,
    role: body,
  }).save();
};

UsersService.createUser = async (user, hash) => {
  await new User({
    _id: new mongoose.Types.ObjectId(),
    email: user.body[0].email,
    password: hash,
    name: user.body[0].name,
    address: user.body[0].address,
    work_number: user.body[0].work_number,
    personal_number: user.body[0].personal_number,
    image_path: user.body[0].image_path,
  }).save();
};

UsersService.updateUser = async (id, user) => {
  const validator = new Validator(user, rules);

  if (!validator.fails()) {
    await User.update({ _id: id }, { $set: user });
  } else {
    validator.errors.first('name');
    validator.errors.first('email');
    validator.errors.first('password');
    validator.errors.first('address');
    validator.errors.first('work_number');
    validator.errors.first('personal_number');
    validator.errors.first('image_path');
  }
};

UsersService.deleteUserHasRoles = async (userId, roles) => await UserHasRole.remove({ user: userId, role: { $in: roles } });

UsersService.deleteUserHasRole = async (roleId, userId) => await UserHasRole.remove({ role: roleId, user: userId });

UsersService.deleteUser = async (id) => await User.remove({ _id: id });

module.exports = UsersService;
