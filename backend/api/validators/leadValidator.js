const mongoose = require('mongoose');
const Lead = require('../models/lead');

exports.leadValidator = (req) => new Lead({
  _id: new mongoose.Types.ObjectId(),
  title: req.body[0].title,
  description: req.body[0].description,
  status: req.body[0].status,
  user_assigned: req.body[0].user_assigned,
  client: req.body[0].client,
  user_created: req.body[0].user_created,
  contact_date: req.body[0].contact_date,
  created_at: new Date(Date.now()).toISOString(),
});
