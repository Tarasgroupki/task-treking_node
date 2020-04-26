const express = require('express');

const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const SprintsController = require('../controllers/sprints');

const checkSprintCreate = checkAuth.scope('create-sprints');
const checkSprintEdit = checkAuth.scope('edit-sprints');
const checkSprintDelete = checkAuth.scope('delete-sprints');
const checkSprintCreateAndEdit = checkAuth.scopes('create-sprints,edit-sprints');

router.get('/', checkSprintCreateAndEdit, SprintsController.sprints_get_all);

router.post('/', checkSprintCreate, SprintsController.sprints_create_sprint);

router.get('/get_points/:sprintId', SprintsController.sprints_get_points);

router.get('/:sprintId', checkSprintCreate, SprintsController.sprints_get_one);

router.patch('/:sprintId', checkSprintEdit, SprintsController.sprints_edit_sprint);

router.delete('/:sprintId', checkSprintDelete, SprintsController.sprints_delete_sprint);

module.exports = router;
