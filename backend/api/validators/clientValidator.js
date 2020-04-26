const mongoose = require('mongoose');
const Client = require('../models/client');

exports.clientValidator = (req) => new Client({
  _id: new mongoose.Types.ObjectId(),
  name: req.body[0].name,
  email: req.body[0].email,
  primary_number: req.body[0].primary_number,
  secondary_number: req.body[0].secondary_number,
  address: req.body[0].address,
  zipcode: req.body[0].zipcode,
  city: req.body[0].city,
  company_name: req.body[0].company_name,
  vat: req.body[0].vat,
  company_type: req.body[0].company_type,
  user: req.body[0].user,
  industry_id: 1,
});
