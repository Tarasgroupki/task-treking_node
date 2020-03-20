const mongoose = require('mongoose');

const userHasRoleSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
});

module.exports = mongoose.model('User_has_role', userHasRoleSchema);
