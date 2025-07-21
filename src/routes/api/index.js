const express = require("express");
const router = express.Router();
const categoriesRouter = require("./categories.route");
const storiesRouter = require("./stories.route");
const overlayRouter = require("./overlay.route");

router.use("/", overlayRouter);
router.use("/theloai", categoriesRouter);
router.use("/truyen", storiesRouter);
module.exports = router;
