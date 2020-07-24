const Validator = require('validatorjs');
const mongoose = require('mongoose');
const Lead = require('../models/lead');

const rules = {
  title: 'string',
  description: 'string',
  status: 'numeric',
  user_assigned: 'string',
  client: 'string',
  user_created: 'string',
  contact_date: 'string',
  created_at: 'string',
};

const LeadsService = {};

LeadsService.getLeads = async () => await Lead.find();

LeadsService.getLead = async (id) => await Lead.findById(id);

LeadsService.createLead = async (lead) => {
  await new Lead({
    _id: new mongoose.Types.ObjectId(),
    title: lead.body[0].title,
    description: lead.body[0].description,
    status: lead.body[0].status,
    user_assigned: lead.body[0].user_assigned,
    client: lead.body[0].client,
    user_created: lead.body[0].user_created,
    contact_date: lead.body[0].contact_date,
    created_at: new Date(Date.now()).toISOString(),
  }).save();
};

LeadsService.updateLead = async (id, lead) => {
  const validator = new Validator(lead, rules);

  if (!validator.fails()) {
    await Lead.update({ _id: id }, { $set: lead });
  } else {
    validator.errors.first('title');
    validator.errors.first('description');
    validator.errors.first('status');
    validator.errors.first('user_assigned');
    validator.errors.first('client');
    validator.errors.first('user_created');
    validator.errors.first('contact_date');
    validator.errors.first('created_at');
  }
};

LeadsService.deleteLead = async (id) => await Lead.remove({ _id: id });

module.exports = LeadsService;
