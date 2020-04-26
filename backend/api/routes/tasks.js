const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const TasksController = require('../controllers/tasks');

const checkTasksCreate = checkAuth.scope('create-tasks');
const checkTasksEdit = checkAuth.scope('edit-tasks');
const checkTaskDelete = checkAuth.scope('delete-tasks');
const checkTaskCreateAndEdit = checkAuth.scopes('create-tasks,edit-tasks');

router.get('/', checkTaskCreateAndEdit, TasksController.tasks_get_all);

router.post('/', checkTasksCreate, TasksController.tasks_create_task);

router.get('/:taskId', checkTasksCreate, TasksController.tasks_get_one);

router.patch('/:taskId', checkTasksEdit, TasksController.tasks_edit_task);

router.get('/vote_count/:taskId', TasksController.tasks_votes_count);

router.get('/voter_count/:voteId', TasksController.tasks_check_voter);

router.post('/vote_create', TasksController.tasks_create_votes);

router.put('/vote_update/:taskId', TasksController.tasks_update_votes);

router.delete('/:taskId', checkTaskDelete, TasksController.tasks_delete_task);

module.exports = router;
