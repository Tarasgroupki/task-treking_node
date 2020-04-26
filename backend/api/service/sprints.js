const Sprint = require('../models/sprint');
const { sprintValidator } = require('../validators/sprintValidator');

const SprintsService = {};

SprintsService.getSprints = async () => await Sprint.find();

SprintsService.getSprint = async (id) => await Sprint.findById(id);

SprintsService.createSprint = async (sprint) => await sprintValidator(sprint).save();

SprintsService.updateSprint = async (id, sprint) => await Sprint.update({ _id: id }, { $set: sprint });

SprintsService.deleteSprint = async (id) => await Sprint.remove({ _id: id });

module.exports = SprintsService;
