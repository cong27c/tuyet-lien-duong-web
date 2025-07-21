const express = require("express");
const router = express.Router();
const categoriesController = require("../../controllers/web/categories.controller");

router.get("/:genre", categoriesController.getByGenre);

module.exports = router;
