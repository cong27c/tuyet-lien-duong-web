const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../../data/overlayLinks.json");

router.get("/", (req, res) => {
  const links = JSON.parse(fs.readFileSync(filePath, "utf8"));
  res.render("admin/overlay-links", { links, layout: "layouts/admin/index" });
});

router.post("/", (req, res) => {
  const { tiktok, shopee } = req.body;
  fs.writeFileSync(filePath, JSON.stringify({ tiktok, shopee }, null, 2));
  res.redirect("/admin/stories");
});

module.exports = router;
