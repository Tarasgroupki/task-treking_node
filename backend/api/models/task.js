const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: Number,
  sprint_assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'Sprint' },
  user_created: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deadline: String,
  created_at: String,
});

module.exports = mongoose.model('Task', taskSchema);
