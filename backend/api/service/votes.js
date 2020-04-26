const Votes = require('../models/vote');
const { voteValidator } = require('../validators/voteValidator');

const VotesService = {};

VotesService.getVotes = async () => await Votes.find();

VotesService.getVoteByTask = async (id) => await Votes.find({ task_assigned: id });

VotesService.getVoteByTaskAndUser = async (taskId, userId) => await Votes.find({ user_added: userId, task_assigned: taskId });

VotesService.createVote = async (vote) => await voteValidator(vote).save();

VotesService.updateVote = async (id, vote) => await Votes.update({ _id: id }, { $set: vote });

module.exports = VotesService;
