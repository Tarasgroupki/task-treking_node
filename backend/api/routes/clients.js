const express = require('express');

const mongoose = require('mongoose');

const router = express.Router();

const Validator = require('validatorjs');

const clientRed = require('../redis-connection');

const checkAuth = require('../middleware/check-auth');

const Client = require('../models/client');

const checkClientCreate = checkAuth.scope('create-clients');
const checkClientEdit = checkAuth.scope('edit-clients');
const checkClientDelete = checkAuth.scope('delete-clients');
const checkClientCreateAndEdit = checkAuth.scopes('create-clients,edit-clients');

const rules = {
  _id: 'string',
  name: 'string',
  email: 'email',
  primary_number: 'string',
  secondary_number: 'string',
  address: 'string',
  zipcode: 'string',
  city: 'string',
  company_name: 'string',
  vat: 'numeric',
  company_type: 'string',
  user: 'string',
  industry_id: 'numeric',
};

router.get('/', checkClientCreateAndEdit, (req, res) => {
  clientRed.get('allclients', async (reply) => {
    if (reply) {
      return res.send(reply);
    }
    try {
      const clients = await Client.find(); // Поправить async/await здесь

      clientRed.set('allclients', JSON.stringify(clients));
      return res.status(200).json(clients);
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
    }
  });
});

router.post('/', checkClientCreate, async (req, res) => {
  const result = await new Client({
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
  }).save();
  clientRed.del('allclients');
  return res.status(201).json({
    message: 'Handling POST requests to /clients',
    createdClient: result,
  });
});

router.get('/:clientId', checkClientCreate, async (req, res) => {
  const id = req.params.clientId;
  try {
    const client = await Client.findById(id);
    return res.status(200).json(client);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.patch('/:clientId', checkClientEdit, async (req, res) => {
  const id = req.params.clientId;
  try {
    // const result = await clientsService.updateClient(id, req.body[0]);
    const validator = new Validator(req.body[0], rules);

    if (!validator.fails()) {
      await Client.update({ _id: id }, { $set: req.body[0] });
    } else {
      validator.errors.first('name');
      validator.errors.first('email');
      validator.errors.first('primary_number');
      validator.errors.first('secondary_number');
      validator.errors.first('address');
      validator.errors.first('zipcode');
      validator.errors.first('city');
      validator.errors.first('company_name');
      validator.errors.first('vat');
      validator.errors.first('company_type');
      validator.errors.first('user');
    }
    return res.status(200).json(validator);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.delete('/:clientId', checkClientDelete, async (req, res) => {
  const id = req.params.clientId;
  try {
    const client = await Client.remove({ _id: id });
    clientRed.del('allclients');
    return res.status(200).json(client);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
