const mongoose = require('mongoose');

let leadSchema = require('./lead');
let userSchema = require("./user");

const sprintSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    status: Number,
    lead_assigned: {type: mongoose.Schema.Types.ObjectId, ref:'Lead'},
    user_created: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    deadline: String,
    created_at: String
});

//mongoose.model('Lead', leadSchema);
//mongoose.model('User', userSchema);

module.exports = mongoose.model('Sprint', sprintSchema);