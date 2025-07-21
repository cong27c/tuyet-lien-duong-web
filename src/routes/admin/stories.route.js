const express = require("express");
const router = express.Router();
const storiesController = require("../../controllers/admin/stories.controller");
const storiesValidator = require("../../validators/admin/stories.validator");
const setLayout = require("../../middlewares/setLayout");
const storiesService = require("../../services/stories.service");
const upload = require("../../middlewares/upload.middleware");

router.use(setLayout("layouts/admin"));

router.use(async (req, res, next) => {
  try {
    const stories = await storiesService.getAll();
    res.locals.stories = stories;
  } catch (error) {
    res.locals.stories = [];
  }
  next();
});

router.get("/", storiesController.index);
router.get("/create", storiesController.create);
router.post(
  "/",
  upload.single("image"),
  storiesValidator.createStory,
  storiesController.store
);
router.get("/:id/edit", storiesController.edit);
router.get("/:id", storiesController.show);
router.patch(
  "/:id",
  storiesController.loadStory,
  storiesValidator.editStory,
  storiesController.update
);
router.delete("/:id", storiesController.softDelete);

module.exports = router;
