const express = require("express");
const router = express.Router();
const chapterController = require("../../controllers/admin/chapter.controller");

router.get("/create", chapterController.showCreateForm); // form tạo chương
router.post("/create", chapterController.create);
router.get("/:id/edit", chapterController.showEditForm);
router.post("/:id/edit", chapterController.update);
router.post("/:id/delete", chapterController.delete);

module.exports = router;
