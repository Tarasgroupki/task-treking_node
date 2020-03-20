const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_added: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  task_assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  mark: Number,
});

module.exports = mongoose.model('Vote', voteSchema);
