const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ClientsController = require('../controllers/clients');

const checkClientCreate = checkAuth.scope('create-clients');
const checkClientEdit = checkAuth.scope('edit-clients');
const checkClientDelete = checkAuth.scope('delete-clients');
const checkClientCreateAndEdit = checkAuth.scopes('create-clients,edit-clients');

router.get('/', checkClientCreateAndEdit, ClientsController.clients_get_all);

router.post('/', checkClientCreate, ClientsController.clients_create_client);

router.get('/:clientId', checkClientCreate, ClientsController.clients_get_one);

router.patch('/:clientId', checkClientEdit, ClientsController.clients_edit_client);

router.delete('/:clientId', checkClientDelete, ClientsController.clients_delete_client);

module.exports = router;
