const mongoose = require('mongoose');

let userSchema = require('./user');
let roleSchema = require("./role");

const user_has_roleSchema = mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
    role:{type: mongoose.Schema.Types.ObjectId, ref:'Role'}
});

module.exports = mongoose.model('User_has_role', user_has_roleSchema);