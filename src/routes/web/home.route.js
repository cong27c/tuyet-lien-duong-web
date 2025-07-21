const express = require("express");
const router = express.Router();
const homeController = require("../../controllers/web/home.controller.js");

router.get("/", homeController.index);

module.exports = router;
