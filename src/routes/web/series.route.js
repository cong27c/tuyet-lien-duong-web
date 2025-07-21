const express = require("express");
const seriesController = require("../../controllers/web/series.controller");
const router = express.Router();

router.get("/", seriesController.getSeries);

module.exports = router;
