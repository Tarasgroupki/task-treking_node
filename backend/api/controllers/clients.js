const mongoose = require('mongoose');

const redis = require('redis');
const Client = require('../models/client');
const checkAuth = require('../middleware/check-auth');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.clients_get_all = (req, res) => {
  if (checkAuth.scopes('create-clients,edit-clients')) {
    clientRed.get('allclients', (reply) => {
      if (reply) {
        // console.log('redis');
        res.send(reply);
      } else {
        //   console.log('db');

        Client.find()
          .exec()
          .then((docs) => {
            clientRed.set('allclients', JSON.stringify(docs));
            res.status(200).json(docs);
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    });
  }
};

exports.clients_create_client = (req, res) => {
  const client = new Client({
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
  if (checkAuth.scope('create-clients')) {
    client
      .save()
      .then((result) => {
        clientRed.del('allclients');
        // console.log(result);
        res.status(201).json({
          message: 'Handling POST requests to /clients',
          createdClient: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports.clients_get_one = (req, res) => {
  const id = req.params.clientId;
  if (checkAuth.scope('edit-clients')) {
    Client.findById(id)
      .exec()
      .then((doc) => {
      //  console.log('From database', doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: 'No valid entry found for provided ID' });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
};

exports.clients_edit_client = (req, res) => {
  const id = req.params.clientId;
  if (checkAuth.scope('edit-clients')) {
    const updateOps = {};
    /* for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    } */
    req.body.forEach((item) => {
      updateOps[item.propName] = item.value;
    });
    Client.update({ _id: id }, { $set: req.body[0] })
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

exports.clients_delete_client = (req, res) => {
  const id = req.params.clientId;
  if (checkAuth.scope('delete-clients')) {
    Client.remove({ _id: id })
      .exec()
      .then((result) => {
        clientRed.del('allclients');
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
