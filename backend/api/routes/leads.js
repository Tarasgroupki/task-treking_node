const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const LeadsController = require('../controllers/leads');

const checkLeadCreate = checkAuth.scope('create-leads');
const checkLeadEdit = checkAuth.scope('edit-leads');
const checkClientDelete = checkAuth.scope('delete-leads');
const checkClientCreateAndEdit = checkAuth.scopes('create-leads,edit-leads');

router.get('/', checkClientCreateAndEdit, LeadsController.leads_get_all);

router.post('/', checkLeadCreate, LeadsController.leads_create_lead);

router.get('/:leadId', checkLeadCreate, LeadsController.leads_get_one);

router.put('/:leadId', checkLeadEdit, LeadsController.leads_edit_lead);

router.delete('/:leadId', checkClientDelete, LeadsController.leads_delete_lead);

module.exports = router;
