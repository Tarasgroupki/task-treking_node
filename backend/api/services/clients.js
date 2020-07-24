const Validator = require('validatorjs');
const mongoose = require('mongoose');
const Client = require('../models/client');

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

const ClientsService = {};

ClientsService.getClients = async () => await Client.find();

ClientsService.getClient = async (id) => await Client.findById(id);

ClientsService.createClient = async (client) => {
  await new Client({
    _id: new mongoose.Types.ObjectId(),
    name: client.body[0].name,
    email: client.body[0].email,
    primary_number: client.body[0].primary_number,
    secondary_number: client.body[0].secondary_number,
    address: client.body[0].address,
    zipcode: client.body[0].zipcode,
    city: client.body[0].city,
    company_name: client.body[0].company_name,
    vat: client.body[0].vat,
    company_type: client.body[0].company_type,
    user: client.body[0].user,
    industry_id: 1,
  }).save();
};

ClientsService.updateClient = async (id, client) => {
  const validator = new Validator(client, rules);

  if (!validator.fails()) {
    await Client.update({ _id: id }, { $set: client });
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
};

ClientsService.deleteClient = async (id) => await Client.remove({ _id: id });

module.exports = ClientsService;
