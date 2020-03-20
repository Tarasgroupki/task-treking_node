const mongoose = require('mongoose');

const Permission = require('../models/permission');
const RoleHasPermission = require('../models/role_has_permission');
const Role = require('../models/role');

exports.permissions_get_all = (req, res) => {
  Permission.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.permissions_create_permission = (req, res) => {
  const permission = new Permission({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  permission
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Handling POST requests to /sprints',
        createdPermission: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.roles_get_all = (req, res) => {
  Role.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.roles_get_one_by_id = (req, res) => {
  const id = req.params.roleId;
  Role.find({ _id: id })
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.roles_get_one_by_name = (req, res) => {
  const name = req.params.roleName;
  Role.find({ name })
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.roles_create_roles = (req, res) => {
  const role = new Role({
    _id: new mongoose.Types.ObjectId(),
    name: req.body[0].name,
  });
  role
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Handling POST requests to /sprints',
        createdRole: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.roles_edit_role = (req, res) => {
  const id = req.params.roleId;
  const updateOps = {};
  /* for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  } */
  req.body.forEach((item) => {
    updateOps[item.propName] = item.value;
  });
  // console.log(req.body[2]);
  Role.update({ _id: id }, { $set: req.body[2] })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
  for (let i = 0; i < req.body[0].length; i++) {
    const roleHasPermission = new RoleHasPermission({
      permission: req.body[0][i],
      role: id,
    });
    roleHasPermission
      .save()
      .then((result) => result)
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
  for (let i = 0; i < req.body[1].length; i++) {
    RoleHasPermission.remove({ permission: req.body[1][i] })
      .exec()
      .then((result) => result)
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports.roles_delete_role = (req, res) => {
  const id = req.params.roleId;
  Role.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_all_roles_has_permission = (req, res) => {
  RoleHasPermission.find()
    .exec()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.get_one_roles_has_permission = (req, res) => {
  const id = req.params.roleId;
  const permissions = {};
  RoleHasPermission.find({ role: id })
    .exec()
    .then((docs) => {
      for (let i = 0; i < docs.length; i++) {
        permissions[docs[i].permission] = docs[i];
      } // console.log(permissions);
      res.status(200).json(permissions);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.roles_create_roles_has_permission = (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    const roleHasPermission = new RoleHasPermission({
      permission: req.body[i][1],
      role: req.body[i][0],
    });
    roleHasPermission
      .save()
      .then((result) => result)
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
