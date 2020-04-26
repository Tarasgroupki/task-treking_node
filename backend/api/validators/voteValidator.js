const mongoose = require('mongoose');
const Vote = require('../models/vote');

exports.voteValidator = (req) => new Vote({
  _id: new mongoose.Types.ObjectId(),
  user_added: req.body[0].user_added,
  task_assigned: req.body[0].task_assigned,
  mark: req.body[0].mark,
});
