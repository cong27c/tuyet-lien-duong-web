const express = require("express");
const router = express.Router();
const homeRouter = require("./home.route");
const storiesRouter = require("./stories.route");
const chaptersRouter = require("./chapters.route");
const categoriesRouter = require("./categories.route");
const seriesHotRouter = require("./seriesHot.route");
const seriesRouter = require("./series.route");

router.use("/", homeRouter);
router.use("/", chaptersRouter);
router.use("/truyen", storiesRouter);
router.use("/theloai", categoriesRouter);
router.use("/tong-hop-cac-series-cuc-hot", seriesHotRouter);
router.use("/truyen-dai", seriesRouter);
module.exports = router;
