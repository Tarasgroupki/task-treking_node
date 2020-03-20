const mongoose = require('mongoose');

const leadSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  status: Number,
  user_assigned: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  user_created: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contact_date: String,
  created_at: String,
});

module.exports = mongoose.model('Lead', leadSchema);
