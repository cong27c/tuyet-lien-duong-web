const storiesService = require("../../services/stories.service");
const chaptersService = require("../../services/chapters.service");
const splitContentIntoNChapters = require("../../utils/splitChapters");

exports.index = async (req, res) => {
  const stories = await storiesService.getAll();
  console.log(stories);
  res.render("admin/stories/index", {
    stories,
  });
};

exports.create = async (req, res) => {
  res.render("admin/stories/create", {
    old: {},
    errors: {},
  });
};

exports.edit = async (req, res) => {
  const story = await storiesService.getById(req.params.id);

  res.render("admin/stories/edit", {
    story,
    old: {},
    errors: {},
  });
};

exports.show = async (req, res) => {
  const storyId = req.params.id;
  const story = await storiesService.getById(req.params.id);
  if (!story) return res.status(404).send("Không tìm thấy truyện.");

  const chapters = await chaptersService.findByStoryId(storyId);

  res.render("admin/stories/show", {
    story,
    chapters,
  });
};
exports.store = async (req, res) => {
  const { genre, chapter_title, chapter_content, ...data } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  data.image = image;
  data.genre = Array.isArray(genre) ? genre.join(",") : genre;

  try {
    // 1. Tạo truyện
    const { id: storyId } = await storiesService.create(data);

    // 2. Nếu có chương đầu tiên
    if (chapter_title && chapter_content) {
      await chaptersService.create({
        story_id: storyId,
        title: `Chương 1 - ${chapter_title.trim()}`,
        content: chapter_content.trim(),
        index_order: 1,
      });
    }

    res.redirect("/admin/stories");
  } catch (error) {
    console.error("Lỗi tạo truyện/chương:", error);
    res.status(500).render("error", { message: "Không thể tạo truyện" });
  }
};

exports.loadStory = async (req, res, next) => {
  const story = await storiesService.getById(req.params.id);

  if (!story) return res.status(404).send("Not Found");
  req.story = story;
  next();
};

exports.update = async (req, res) => {
  const { genre, ...data } = req.body;
  data.genre = Array.isArray(genre) ? genre.join(",") : genre;

  await storiesService.update(req.params.id, data);

  res.redirect(`/admin/stories/${req.params.id}/edit`);
};

exports.softDelete = async (req, res) => {
  try {
    const deleted = await storiesService.remove(req.params.id);

    if (!deleted) {
      req.flash("error", "Không tìm thấy truyện cần xóa.");
    } else {
      req.flash("success", "Xóa truyện thành công.");
    }

    return res.redirect("/admin/stories");
  } catch (error) {
    req.flash("error", "Lỗi server khi xóa truyện.");
    return res.redirect("/admin/stories");
  }
};
