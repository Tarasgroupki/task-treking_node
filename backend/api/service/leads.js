const Leads = require('../models/lead');
const { leadValidator } = require('../validators/leadValidator');

const LeadsService = {};

LeadsService.getLeads = async () => await Leads.find();

LeadsService.getLead = async (id) => await Leads.findById(id);

LeadsService.createLead = async (lead) => await leadValidator(lead).save();

LeadsService.updateLead = async (id, lead) => await Leads.update({ _id: id }, { $set: lead });

LeadsService.deleteLead = async (id) => await Leads.remove({ _id: id });

module.exports = LeadsService;
