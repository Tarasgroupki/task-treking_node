const Validator = require('validatorjs');
const mongoose = require('mongoose');
const Vote = require('../models/vote');

const rules = {
  user_added: 'string',
  task_assigned: 'string',
  mark: 'numeric',
};

const VotesService = {};

VotesService.getVotes = async () => await Vote.find();

VotesService.getVoteByTask = async (id) => await Vote.find({ task_assigned: id });

VotesService.getVoteByTaskAndUser = async (taskId, userId) => await Vote.find({ user_added: userId, task_assigned: taskId });

VotesService.createVote = async (vote) => {
  await new Vote({
    _id: new mongoose.Types.ObjectId(),
    user_added: vote.body[0].user_added,
    task_assigned: vote.body[0].task_assigned,
    mark: vote.body[0].mark,
  });
};

VotesService.updateVote = async (id, vote) => {
  const validator = new Validator(vote, rules);

  if (!validator.fails()) {
    await Vote.update({ _id: id }, { $set: vote });
  } else {
    validator.errors.first('user_added');
    validator.errors.first('task_assigned');
    validator.errors.first('mark');
  }
};

module.exports = VotesService;
