const mongoose = require('mongoose');

let roleSchema = require('./role');
let permissionSchema = require("./permission");

const role_has_permissionSchema = mongoose.Schema({
    permission:{type: mongoose.Schema.Types.ObjectId, ref:'Permission'},
    role:{type: mongoose.Schema.Types.ObjectId, ref:'Role'}
});

module.exports = mongoose.model('Role_has_permission', role_has_permissionSchema);