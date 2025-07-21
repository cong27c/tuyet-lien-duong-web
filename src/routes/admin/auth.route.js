const express = require("express");
const authController = require("../../controllers/admin/auth.controller");
const router = express.Router();

router.get(
  "/login-3f17eac0-9325-41f2-a9da-cf8b08755a27",
  authController.showLoginForm
);
router.post(
  "/login-3f17eac0-9325-41f2-a9da-cf8b08755a27",
  authController.login
);
router.get("/logout", authController.logout);

module.exports = router;
