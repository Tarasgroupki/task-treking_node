const express = require('express');
const mongoose = require('mongoose');
const Validator = require('validatorjs');

const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const checkAuth = require('../middleware/check-auth');

const User = require('../models/user');
const Role = require('../models/role');
const Permission = require('../models/permission');
const UserHasRole = require('../models/user_has_role');
const RoleHasPermission = require('../models/role_has_permission');

const clientRed = require('../redis-connection');

const checkUserCreate = checkAuth.scope('create-users');
const checkUserEdit = checkAuth.scope('edit-users');
const checkUserDelete = checkAuth.scope('delete-users');
const checkUserCreateAndEdit = checkAuth.scopes('create-users,edit-users');

const rules = {
  name: 'string',
  email: 'email',
  password: 'string',
  address: 'string',
  work_number: 'string',
  personal_number: 'string',
  image_path: 'string',
};

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter,
});

router.get('/', checkUserCreateAndEdit, (req, res) => {
  clientRed.get('allusers', async (reply) => {
    if (reply) {
      let replyJson = JSON.parse(reply);
      replyJson.forEach((value) => {
        value.password = null;
      });
      replyJson = JSON.stringify(reply);
      res.send(replyJson);
    } else {
      try {
        const users = await User.find();
        users.forEach((value) => {
          value.password = null;
        });
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json({
          error: err,
        });
      }
    }
  });
});

router.post('/', checkUserCreate, async (req, res) => {
  const user = await User.find({ email: req.body[0].email });
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
      const result = await new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body[0].email,
        password: hash,
        name: req.body[0].name,
        address: req.body[0].address,
        work_number: req.body[0].work_number,
        personal_number: req.body[0].personal_number,
        image_path: req.body[0].image_path,
      }).save();
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
});

router.get('/:userId', checkUserCreate, async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    user.password = null;
    if (user) {
      return res.status(200).json(user);
    }
    return res.status(404).json({ message: 'No valid entry found for provided ID' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.post('/file/fileUpload', upload.single('image_path'), (req, res) => {
  try {
    const data = req.file;

    return res.send({ fileName: data.filename, originalName: data.originalname });
  } catch (err) {
    return res.sendStatus(400);
  }
});

router.patch('/profile/:userId', checkUserEdit, upload.single('image_path'), async (req, res) => {
  const id = req.params.userId;

  if (req.body[0].password !== null) {
    req.body[0].password = bcrypt.hashSync(req.body[0].password, 12);
  } else {
    delete req.body[0].password;
  }
  if (req.body[0].image_path === null) delete req.body[0].image_path;
  try {
    const validator = new Validator(req.body[0], rules);

    if (!validator.fails()) {
      await User.update({ _id: id }, { $set: req.body[0] });
    } else {
      validator.errors.first('name');
      validator.errors.first('email');
      validator.errors.first('password');
      validator.errors.first('address');
      validator.errors.first('work_number');
      validator.errors.first('personal_number');
      validator.errors.first('image_path');
    }

    return res.status(200).json(validator);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.put('/:userId', checkUserEdit, async (req, res) => {
  const id = req.params.userId;
  if (req.body[0].password !== null) {
    req.body[0].password = bcrypt.hashSync(req.body[0].password, 12);
  } else {
    delete req.body[0].password;
  }
  try {
    const validator = new Validator(req.body[0], rules);
    if (!validator.fails()) {
      await User.update({ _id: id }, { $set: req.body[0] });
    } else {
      validator.errors.first('name');
      validator.errors.first('email');
      validator.errors.first('password');
      validator.errors.first('address');
      validator.errors.first('work_number');
      validator.errors.first('personal_number');
      validator.errors.first('image_path');
    }
    return res.status(200).json(validator);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.post('/login', async (req, res) => {
  const user = await User.find({ email: req.body[0].email });
  if (user[0]) {
    const userHasRole = await UserHasRole.find({ user: user[0]._id });
    const roleHasPermissions = await RoleHasPermission.find({ role: userHasRole[0].role });
    const roles = await Role.find(userHasRole[0].role);
    const perms = [];
    roleHasPermissions.forEach((item) => {
      perms.push(item.permission);
    });
    const permissions = await Permission.find({ _id: { $in: perms } });
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
    // if (user) {
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
    //  }
  }

  return res.status(403).json({ message: 'Unauthorized' });
});

router.delete('/:userId', checkUserDelete, async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.remove({ _id: id });
    clientRed.del('allusers');
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/user/user_has_role', async (req, res) => {
  try {
    const userHasRole = await UserHasRole.find();
    res.status(200).json(userHasRole);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.get('/user/user_has_role/:userId', async (req, res) => {
  const id = req.params.userId;
  const roles = {};
  try {
    const userHasRole = await UserHasRole.find({ user: id });
    for (let i = 0; i < userHasRole.length; i++) {
      roles[userHasRole[i].role] = userHasRole[i];
    }
    return res.status(200).json(roles);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.post('/user/user_has_role/:userId', async (req, res) => {
  const { userId } = req.params;
  const userHasRole = [];

  req.body[0].forEach((item) => {
    userHasRole.push({ role: item, user: userId });
  });
  try {
    await UserHasRole.insertMany(userHasRole);
    await UserHasRole.remove({ user: userId, role: { $in: req.body[1] } });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
