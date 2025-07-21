const express = require("express");
const categoriesController = require("../../controllers/api/categories.controller");
const router = express.Router();

router.get("/", categoriesController.index);

module.exports = router;
