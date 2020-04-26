const redis = require('redis');
const leadsService = require('../service/leads');

const clientRed = redis.createClient(6379, '127.0.0.1');

exports.leads_get_all = (req, res) => {
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
};

exports.leads_create_lead = async (req, res) => {
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
};

exports.leads_get_one = async (req, res) => {
  const id = req.params.leadId;
  try {
    const lead = await leadsService.getLead(id);
    return res.status(200).json(lead);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.leads_edit_lead = async (req, res) => {
  const id = req.params.leadId;
  try {
    const result = await leadsService.updateLead(id, req.body[0]);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
};

exports.leads_delete_lead = async (req, res) => {
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
};
