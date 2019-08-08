const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const SprintsController = require('../controllers/sprints');

router.get("/", checkAuth.main, SprintsController.sprints_get_all);

router.post("/", checkAuth.main, SprintsController.sprints_create_sprint);

router.get("/get_points/:sprintId", SprintsController.sprints_get_points);

router.get("/:sprintId", checkAuth.main, SprintsController.sprints_get_one);

router.patch("/:sprintId", checkAuth.main, SprintsController.sprints_edit_sprint);

router.delete("/:sprintId", checkAuth.main, SprintsController.sprints_delete_sprint);

module.exports = router;
