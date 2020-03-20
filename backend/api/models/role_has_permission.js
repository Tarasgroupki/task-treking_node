const mongoose = require('mongoose');

const roleHasPermissionSchema = mongoose.Schema({
  permission: { type: mongoose.Schema.Types.ObjectId, ref: 'Permission' },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
});

module.exports = mongoose.model('Role_has_permission', roleHasPermissionSchema);
