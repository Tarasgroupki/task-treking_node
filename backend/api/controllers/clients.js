const redis = require('redis');
const clientsService = require('../service/clients');
const checkAuth = require('../middleware/check-auth');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.clients_get_all = (req, res) => {
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
};

exports.clients_create_client = async (req, res) => {
  const result = await clientsService.createClient(req);
  clientRed.del('allclients');
  return res.status(201).json({
    message: 'Handling POST requests to /clients',
    createdClient: result,
  });
};

exports.clients_get_one = async (req, res) => {
  const id = req.params.clientId;
  try {
    const client = await clientsService.getClient(id);
    return res.status(200).json(client);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.clients_edit_client = async (req, res) => {
  const id = req.params.clientId;
  try {
    const result = await clientsService.updateClient(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.clients_delete_client = async (req, res) => {
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
};
