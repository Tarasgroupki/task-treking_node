const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Validator = require('validatorjs');

const clientRed = require('../redis-connection');

const checkAuth = require('../middleware/check-auth');

const Lead = require('../models/lead');

const checkLeadCreate = checkAuth.scope('create-leads');
const checkLeadEdit = checkAuth.scope('edit-leads');
const checkClientDelete = checkAuth.scope('delete-leads');
const checkClientCreateAndEdit = checkAuth.scopes('create-leads,edit-leads');

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

router.get('/', checkClientCreateAndEdit, (req, res) => {
  clientRed.get('allleads', async (reply) => {
    if (reply) {
      return res.send(reply);
    }
    try {
      const leads = await Lead.find();
      clientRed.set('allleads', JSON.stringify(leads));
      return res.status(200).json(leads);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
});

router.post('/', checkLeadCreate, async (req, res) => {
  try {
    const result = await new Lead({
      _id: new mongoose.Types.ObjectId(),
      title: req.body[0].title,
      description: req.body[0].description,
      status: req.body[0].status,
      user_assigned: req.body[0].user_assigned,
      client: req.body[0].client,
      user_created: req.body[0].user_created,
      contact_date: req.body[0].contact_date,
      created_at: new Date(Date.now()).toISOString(),
    }).save();
    clientRed.del('allleads');
    return res.status(201).json({
      message: 'Handling POST requests to /leads',
      createdClient: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/:leadId', checkLeadCreate, async (req, res) => {
  const id = req.params.leadId;
  try {
    const lead = await Lead.findById(id);
    return res.status(200).json(lead);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.put('/:leadId', checkLeadEdit, async (req, res) => {
  const id = req.params.leadId;
  try {
    const validator = new Validator(req.body[0], rules);

    if (!validator.fails()) {
      await Lead.update({ _id: id }, { $set: req.body[0] });
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
    return res.status(200).json(validator);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.delete('/:leadId', checkClientDelete, async (req, res) => {
  const id = req.params.leadId;
  try {
    const lead = await Lead.remove({ _id: id });
    clientRed.del('allleads');
    return res.status(200).json(lead);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
