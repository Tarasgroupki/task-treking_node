const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const LeadsController = require('../controllers/leads');

router.get('/', checkAuth.main, LeadsController.leads_get_all);

router.post('/', checkAuth.main, LeadsController.leads_create_lead);

router.get('/:leadId', checkAuth.main, LeadsController.leads_get_one);

router.put('/:leadId', checkAuth.main, LeadsController.leads_edit_lead);

router.delete('/:leadId', checkAuth.main, LeadsController.leads_delete_lead);

module.exports = router;
