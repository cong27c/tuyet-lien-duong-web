const express = require("express");
const storiesController = require("../../controllers/web/stories.controller");
const router = express.Router();

router.get("/", storiesController.index);

module.exports = router;
