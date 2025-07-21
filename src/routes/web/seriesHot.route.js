const express = require("express");
const seriesHotController = require("../../controllers/web/seriesHot.controller");
const router = express.Router();

router.get("/", seriesHotController.index);

module.exports = router;
