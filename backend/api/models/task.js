const mongoose = require('mongoose');

let sprintSchema = require('./sprint');
let userSchema = require("./user");

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    status: Number,
    sprint_assigned: {type: mongoose.Schema.Types.ObjectId, ref:'Sprint'},
    user_created: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    deadline: String,
    created_at: String
});

//mongoose.model('Lead', leadSchema);
//mongoose.model('User', userSchema);

module.exports = mongoose.model('Task', taskSchema);