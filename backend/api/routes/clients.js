const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ClientsController = require('../controllers/clients');

router.get('/', checkAuth.main, ClientsController.clients_get_all);

router.post('/', checkAuth.main, ClientsController.clients_create_client);

router.get('/:clientId', checkAuth.main, ClientsController.clients_get_one);

router.patch('/:clientId', checkAuth.main, ClientsController.clients_edit_client);

router.delete('/:clientId', checkAuth.main, ClientsController.clients_delete_client);

module.exports = router;
