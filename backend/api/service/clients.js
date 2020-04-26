const Clients = require('../models/client');
const { clientValidator } = require('../validators/clientValidator');

const ClientsService = {};

ClientsService.getClients = async () => await Clients.find();

ClientsService.getClient = async (id) => await Clients.findById(id);

ClientsService.createClient = async (client) => await clientValidator(client).save();

ClientsService.updateClient = async (id, client) => await Clients.update({ _id: id }, { $set: client });

ClientsService.deleteClient = async (id) => await Clients.remove({ _id: id });

module.exports = ClientsService;
