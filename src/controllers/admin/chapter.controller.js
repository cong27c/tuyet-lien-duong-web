const chapterService = require("../../services/chapters.service");
const storyService = require("../../services/stories.service");

exports.showCreateForm = async (req, res) => {
  try {
    const storyId = req.query.story_id;
    const story = await storyService.getById(storyId);
    if (!story) {
      return res.status(404).send("Không tìm thấy truyện.");
    }

    res.render("admin/chapters/create", { story });
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi hiển thị form chương.");
  }
};

exports.create = async (req, res) => {
  try {
    const { story_id, title, content } = req.body;
    await chapterService.create({ story_id, title, content });
    res.redirect(`/admin/stories/${story_id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi tạo chương.");
  }
};

exports.showEditForm = async (req, res) => {
  const chapterId = req.params.id;
  const chapter = await chapterService.findById(chapterId);
  if (!chapter) return res.status(404).send("Không tìm thấy chương.");

  res.render("admin/chapters/edit", { chapter });
};

exports.update = async (req, res) => {
  const chapterId = req.params.id;
  const { title, content } = req.body;

  await chapterService.update(chapterId, { title, content });
  res.redirect(`/admin/stories/${req.body.story_id}`);
};

exports.delete = async (req, res) => {
  const chapterId = req.params.id;

  try {
    const chapter = await chapterService.findById(chapterId);
    if (!chapter) {
      return res.status(404).send("Chương không tồn tại.");
    }

    const storyId = chapter.story_id;

    await chapterService.delete(chapterId);

    res.redirect(`/admin/stories/${storyId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi khi xoá chương.");
  }
};
