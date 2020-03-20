const mongoose = require('mongoose');

const redis = require('redis');
const Lead = require('../models/lead');
const checkAuth = require('../middleware/check-auth');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.leads_get_all = (req, res) => {
  if (checkAuth.scopes('create-leads,edit-leads')) {
    clientRed.get('allleads', (reply) => {
      if (reply) {
      //  console.log('redis');
        res.send(reply);
      } else {
      //  console.log('db');
        Lead.find()
          .exec()
          .then((docs) => {
            clientRed.set('allleads', JSON.stringify(docs));
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

exports.leads_create_lead = (req, res) => {
  const lead = new Lead({
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
  if (checkAuth.scope('create-leads')) {
    lead
      .save()
      .then((result) => {
        clientRed.del('allleads');
        res.status(201).json({
          message: 'Handling POST requests to /leads',
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

exports.leads_get_one = (req, res) => {
  const id = req.params.leadId;
  if (checkAuth.scope('edit-leads')) {
    Lead.findById(id)
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

exports.leads_edit_lead = (req, res) => {
  const id = req.params.leadId;
  if (checkAuth.scope('edit-leads')) {
    const updateOps = {};
    /* for (const ops of req.body) {
      updateOps[ops.propName] = ops.value;
    } */
    req.body.forEach((item) => {
      updateOps[item.propName] = item.value;
    });
    Lead.update({ _id: id }, { $set: req.body[0] })
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

exports.leads_delete_lead = (req, res) => {
  const id = req.params.leadId;
  if (checkAuth.scope('delete-leads')) {
    Lead.remove({ _id: id })
      .exec()
      .then((result) => {
        clientRed.del('allleads');
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};
