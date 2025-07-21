const express = require("express");
const storiesController = require("../../controllers/web/stories.controller");
const chaptersController = require("../../controllers/web/chapters.controller");
const router = express.Router();

router.get("/the-loai/:genre", storiesController.showByGenre);
router.get("/tim-kiem", storiesController.search);
router.get("/goi-y", storiesController.suggestTitles);

router.get("/:id/chapters", chaptersController.showChapters);
router.get("/:id", storiesController.show);
router.get("/", storiesController.index);

module.exports = router;
