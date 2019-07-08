const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Permission = require("../models/permission");
const Role_has_permission = require("../models/role_has_permission");
const Role = require("../models/role");
const checkAuth = require('../middleware/check-auth');

router.get("/permissions", (req, res, next) => {
    Permission.find()
        .exec()
        .then(docs => {
            console.log(docs);
            //   if (docs.length >= 0) {
            res.status(200).json(docs);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/permissions", (req, res, next) => {
    const permission = new Permission({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name
    });
    permission
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /sprints",
                createdPermission: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/roles", (req, res, next) => {
    Role.find()
        .exec()
        .then(docs => {
            console.log(docs);
            //   if (docs.length >= 0) {
            res.status(200).json(docs);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/roles/:roleId", (req, res, next) => {
    const id = req.params.roleId;
    Role.find({'_id': id})
        .exec()
        .then(docs => {
            console.log(docs);
            //   if (docs.length >= 0) {
            res.status(200).json(docs);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.get("/role/:roleName", (req, res, next) => {
    const name = req.params.roleName;
    Role.find({name})
        .exec()
        .then(docs => {
            console.log(docs);
            //   if (docs.length >= 0) {
            res.status(200).json(docs);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/roles", (req, res, next) => {
    const role = new Role({
        _id: new mongoose.Types.ObjectId(),
        name: req.body[0].name
    });
    role
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /sprints",
                createdRole: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch("/roles/:roleId", (req, res, next) => {
    const id = req.params.roleId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    console.log(req.body[2]);
      Role.update({ _id: id }, { $set: req.body[2] })
         .exec()
         .then(result => {
             console.log(result);
             res.status(200).json(result);
         })
         .catch(err => {
             console.log(err);
             res.status(500).json({
                 error: err
             });
      });
     for(let i = 0; i < req.body[0].length; i++) {
         let role_has_permission = new Role_has_permission({
             permission: req.body[0][i],
             role: id
         });
         role_has_permission
             .save()
             .then(result => result)
             .catch(err => {
                 console.log(err);
                 res.status(500).json({
                     error: err
                 });
             });
     }
    for(let i = 0; i < req.body[1].length; i++) {
         Role_has_permission.remove({ permission: req.body[1][i] })
             .exec()
             .then(result => result)
             .catch(err => {
                 console.log(err);
                 res.status(500).json({
                     error: err
                 });
             });
     }
});

router.delete("/roles/:roleId", (req, res, next) => {
    const id = req.params.roleId;
    Role.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/role_has_permission", (req, res, next) => {
    Role_has_permission.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/role_has_permission/:roleId", (req, res, next) => {
    const id = req.params.roleId;
    let permissions = {};
    Role_has_permission.find({role: id})
        .exec()
        .then(docs => {
            /*for(let i = 0; i < docs.length; i++) {console.log(docs[i]['permission']);
               Permission.find({'_id': docs[i]['permission']}).exec().then(result => {
                   permissions[i] = result;
                   console.log(i);
               console.log(result);
               console.log(docs.length);
                  // console.log(permissions);
                   if(permissions.length === docs.length){
                   res.status(200).json(permissions);
                   permissions.length = 0;
                  // docs.length = 0;
               }}).catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
            }*/
            for(let i = 0; i < docs.length; i++) {
                permissions[docs[i]['permission']] = docs[i];
                //delete docs[i];
            }console.log(permissions);
           // for(let j = 0; j < docs.length; j++){

           // }
           // console.log(docs);
            res.status(200).json(permissions);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post("/role_has_permission", (req, res, next) => {
    for(let i = 0; i < req.body.length; i++){
    let role_has_permission = new Role_has_permission({
        permission: req.body[i][1],
        role: req.body[i][0]
    });
    role_has_permission
        .save()
        .then(result => result)
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }
});

module.exports = router;