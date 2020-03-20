const mongoose = require('mongoose');

const User = require('./user');

const clientSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  primary_number: String,
  secondary_number: String,
  address: String,
  zipcode: String,
  city: String,
  company_name: String,
  vat: String,
  company_type: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: User },
  industry_id: Number,
});

module.exports = mongoose.model('Client', clientSchema);
