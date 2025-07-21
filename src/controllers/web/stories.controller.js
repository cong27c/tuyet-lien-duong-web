const db = require("../../configs/db");
const chaptersService = require("../../services/chapters.service");
const storiesService = require("../../services/stories.service");

exports.index = async (req, res) => {
  const stories = await storiesService.getAll();

  res.render("home.ejs", {
    stories,
  });
};

exports.show = async (req, res) => {
  const storyId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const story = await storiesService.getById(storyId);
  const { chapters, pagination } = await chaptersService.getByStoryId(
    storyId,
    page,
    limit
  );

  res.render(`stories/show.ejs`, {
    pagination,
    storyId,
    story,
    chapters,
  });
};

exports.search = async (req, res) => {
  try {
    const keyword = req.query.q || "";
    const results = await storiesService.search(keyword);
    res.render("truyen/tim-kiem", { results, keyword });
  } catch (error) {
    res.status(500).send("Đã xảy ra lỗi khi tìm kiếm");
  }
};

exports.suggestTitles = async (req, res) => {
  const keyword = req.query.q || "";
  if (!keyword) return res.json([]);

  const sql = `SELECT id, title FROM stories WHERE title LIKE ? LIMIT 10`;
  const [rows] = await db.execute(sql, [`%${keyword}%`]);

  res.json(rows);
};

exports.showByGenre = async (req, res) => {
  const genre = req.params.genre;

  try {
    const stories = await storiesService.getStoriesByGenre(genre);
    if (!stories.length) {
      return res.status(404).render("not-found", {
        layout: "layouts/notFound",
      });
    }

    res.render("categories/index", {
      genre,
      stories,
      title: `Thể loại: ${genre}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi máy chủ");
  }
};
