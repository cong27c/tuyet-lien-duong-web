const storiesService = require("../../services/stories.service");
const chaptersService = require("../../services/chapters.service");
const splitContentIntoNChapters = require("../../utils/splitChapters");

exports.index = async (req, res) => {
  const stories = await storiesService.getAll();

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
  const story = await storiesService.getById(req.params.id);

  res.render("admin/stories/show", {
    story,
  });
};

exports.store = async (req, res) => {
  const { genre, number_of_chapters, content, ...data } = req.body;

  console.log(content);
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  data.image = image;
  data.genre = Array.isArray(genre) ? genre.join(",") : genre;
  data.number_of_chapters = parseInt(number_of_chapters) || 1;

  try {
    // 1. Lưu truyện
    const { id: storyId } = await storiesService.create(data);

    // 2. Chia nội dung thành các chương
    const chapterContents = splitContentIntoNChapters(
      content,
      data.number_of_chapters
    );

    // 3. Lưu từng chương bằng service
    for (let i = 0; i < chapterContents.length; i++) {
      const chapterData = {
        story_id: storyId,
        chapter_number: i + 1,
        title: `Chương ${i + 1}`,
        content: chapterContents[i],
      };

      await chaptersService.create(chapterData);
    }

    res.redirect("/admin/stories");
  } catch (error) {
    console.error("Lỗi khi tạo truyện/chương:", error);
    res.status(404).render("Lỗi khi tạo truyện");
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
