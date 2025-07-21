const fs = require("fs").promises;
const express = require("express");
const router = express.Router();
const path = require("path");

const dataPath = path.join(__dirname, "../../data/overlayLinks.json");

router.get("/overlay-links", async (req, res) => {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    const json = JSON.parse(data);
    res.json(json);
  } catch (err) {
    console.error("Lỗi đọc overlayLinks.json:", err);
    res.status(500).json({ error: "Lỗi khi đọc dữ liệu overlay links" });
  }
});

module.exports = router;
