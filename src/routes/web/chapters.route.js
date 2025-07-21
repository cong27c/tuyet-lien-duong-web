const express = require("express");
const router = express.Router();
const chaptersController = require("../../controllers/web/chapters.controller");

router.get("/truyen/:storyId/chuong/:chapterNumber", chaptersController.show);

module.exports = router;
