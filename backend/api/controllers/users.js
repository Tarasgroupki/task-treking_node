const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const redis = require('redis');
const checkAuth = require('../middleware/check-auth');

const usersService = require('../service/users');
const settingsService = require('../service/settings');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.users_get_all = (req, res) => {
  if (checkAuth.scopes('create-users,edit-users')) {
    clientRed.get('allusers', async (reply) => {
      if (reply) {
        let replyJson = JSON.parse(reply);
        // for (const value of Object.values(replyJson)) {
        replyJson.forEach((value) => {
          value.password = null;
        });
        // }
        replyJson = JSON.stringify(reply);
        res.send(replyJson);
      } else {
        try {
          const users = await usersService.getUsers();
          // for (const value of Object.values(users)) {
          users.forEach((value) => {
            value.password = null;
          });
          //  }
          res.status(200).json(users);
        } catch (err) {
          res.status(500).json({
            error: err,
          });
        }
      }
    });
  }
};

exports.users_create_user = async (req, res) => {
  const user = await usersService.getUserByEmail(req.body[0].email);
  if (user.length >= 1) {
    return res.status(409).json({
      message: 'Mail exists',
    });
  }
  return bcrypt.hash(req.body[0].password, 10, async (error, hash) => {
    if (error) {
      return res.status(500).json({
        error,
      });
    }
    try {
      const result = await usersService.createUser(req, hash);
      clientRed.del('allusers');
      return res.status(201).json({
        message: 'Handling POST requests to /users',
        createdClient: result,
      });
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  });
};

exports.users_get_one = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await usersService.getUserById(id);
    user.password = null;
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'No valid entry found for provided ID' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.users_edit_user = async (req, res) => {
  const id = req.params.userId;
  if (req.body[0].password !== null) {
    req.body[0].password = bcrypt.hashSync(req.body[0].password, 12);
  } else {
    delete req.body[0].password;
  }
  try {
    const result = await usersService.updateUser(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.users_profile_user = async (req, res) => {
  const id = req.params.userId;

  if (req.body[0].password !== null) {
    req.body[0].password = bcrypt.hashSync(req.body[0].password, 12);
  } else {
    delete req.body[0].password;
  }
  if (req.body[0].image_path === null) delete req.body[0].image_path;
  try {
    const result = await usersService.updateUser(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.users_file_upload = (req, res) => {
  try {
    const data = req.file;

    return res.send({ fileName: data.filename, originalName: data.originalname });
  } catch (err) {
    return res.sendStatus(400);
  }
};

exports.users_login = async (req, res) => {
  const user = await usersService.getUserByEmail(req.body[0].email);
  if (user[0]) {
    const userHasRole = await usersService.getUserHasRolesById(user[0]._id);
    const roleHasPermissions = await settingsService.getOneRoleHasPermissions(userHasRole[0].role);
    const roles = await settingsService.getRoleById(userHasRole[0].role);
    const perms = [];
    roleHasPermissions.forEach((item) => {
      perms.push(item.permission);
    });
    const permissions = await settingsService.getPermsOfRole(perms);
    const rolesArr = [];
    // const permissionNames = [];
    const permissionSlugs = [];
    if (roles.length > 0) {
      roles.forEach((item) => {
        rolesArr.push(item.name);
      });
    } else {
      rolesArr.push(roles.name);
    }
    permissions.forEach((item) => {
      //  permissionNames.push(item.name);
      permissionSlugs.push(item.name.replace(' ', '-'));
    });
    const token = jwt.sign(
        {
          email: user[0].email,
          userId: user[0]._id,
          scopes: permissionSlugs.toString(),
        },
        'twa1kkEyjkhbybkju',
        {
          expiresIn: '10h',
        },
    );
    return res.status(200).json({
      message: 'Auth successful',
      token,
      user,
      roles: rolesArr,
      permissions: permissionSlugs,
    });
  }
  return res.status(403).json({ message: 'Unauthorized' });
};

exports.users_user_has_role = async (req, res) => {
  try {
    const userHasRole = await usersService.getUserHasRoles();
    res.status(200).json(userHasRole);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.users_user_has_role_one = async (req, res) => {
  const id = req.params.userId;
  const roles = {};
  try {
    const userHasRole = await usersService.getUserHasRolesById(id);
    for (let i = 0; i < userHasRole.length; i++) {
      roles[userHasRole[i].role] = userHasRole[i];
    }
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.users_create_user_has_role = async (req, res) => {
  const { userId } = req.params;
  const userHasRole = [];

  req.body[0].forEach((item) => {
    userHasRole.push({ role: item, user: userId });
  });
  try {
    await usersService.createUserHasRoles(userHasRole);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
  try {
    await usersService.deleteUserHasRoles(userId, req.body[1]);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.users_delete_user = async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await usersService.deleteUser(id);
    clientRed.del('allusers');
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};
