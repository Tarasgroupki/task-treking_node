const express = require('express');

const router = express.Router();

const clientRed = require('../redis-connection');

const checkAuth = require('../middleware/check-auth');

const clientsService = require('../services/clients');

const checkClientCreate = checkAuth.scope('create-clients');
const checkClientEdit = checkAuth.scope('edit-clients');
const checkClientDelete = checkAuth.scope('delete-clients');
const checkClientCreateAndEdit = checkAuth.scopes('create-clients,edit-clients');

router.get('/', checkClientCreateAndEdit, (req, res) => {
  clientRed.get('allclients', async (reply) => {
    if (reply) {
      return res.send(reply);
    }
    try {
      const clients = await clientsService.getClients();

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
  const result = await clientsService.createClient(req);
  clientRed.del('allclients');
  return res.status(201).json({
    message: 'Handling POST requests to /clients',
    createdClient: result,
  });
});

router.get('/:clientId', checkClientCreate, async (req, res) => {
  const id = req.params.clientId;
  try {
    const client = await clientsService.getClient(id);
    return res.status(200).json(client);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.patch('/:clientId', checkClientEdit, async (req, res) => {
  const id = req.params.clientId;
  try {
    const result = await clientsService.updateClient(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.delete('/:clientId', checkClientDelete, async (req, res) => {
  const id = req.params.clientId;
  try {
    const client = await clientsService.deleteClient(id);
    clientRed.del('allclients');
    return res.status(200).json(client);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
