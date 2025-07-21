const express = require("express");
const router = express.Router();
const storiesRouter = require("./stories.route");
const authRouter = require("./auth.route");
const overlayLinksRouter = require("./overlayLinks.route");

router.use("/stories", storiesRouter);
router.use("/", authRouter);
router.use("/overlay-links", overlayLinksRouter);

module.exports = router;
