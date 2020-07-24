const express = require('express');

const router = express.Router();

const clientRed = require('../redis-connection');

const checkAuth = require('../middleware/check-auth');

const leadsService = require('../services/leads');

const checkLeadCreate = checkAuth.scope('create-leads');
const checkLeadEdit = checkAuth.scope('edit-leads');
const checkClientDelete = checkAuth.scope('delete-leads');
const checkClientCreateAndEdit = checkAuth.scopes('create-leads,edit-leads');

router.get('/', checkClientCreateAndEdit, (req, res) => {
  clientRed.get('allleads', async (reply) => {
    if (reply) {
      return res.send(reply);
    }
    try {
      const leads = await leadsService.getLeads();
      clientRed.set('allleads', JSON.stringify(leads));
      return res.status(200).json(leads);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  });
});

router.post('/', checkLeadCreate, async (req, res) => {
  try {
    const result = await leadsService.createLead(req);
    clientRed.del('allleads');
    return res.status(201).json({
      message: 'Handling POST requests to /leads',
      createdClient: result,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.get('/:leadId', checkLeadCreate, async (req, res) => {
  const id = req.params.leadId;
  try {
    const lead = await leadsService.getLead(id);
    return res.status(200).json(lead);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

router.put('/:leadId', checkLeadEdit, async (req, res) => {
  const id = req.params.leadId;
  try {
    const result = await leadsService.updateLead(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

router.delete('/:leadId', checkClientDelete, async (req, res) => {
  const id = req.params.leadId;
  try {
    const lead = await leadsService.deleteLead(id);
    clientRed.del('allleads');
    return res.status(200).json(lead);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
