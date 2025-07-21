const chaptersService = require("../../services/chapters.service");
const storiesService = require("../../services/stories.service");

exports.showChapters = async (req, res) => {
  const storyId = req.params.storyId;
  const page = parseInt(req.query.page) || 1;
  const limit = 10;

  const { chapters, pagination } = await chaptersService.getByStoryId(
    storyId,
    page,
    limit
  );

  res.render("chapter/index", {
    chapters,
    pagination,
    storyId,
  });
};

exports.show = async (req, res) => {
  const { storyId, chapterNumber } = req.params;

  try {
    const chapter = await chaptersService.getByStoryIdAndNumber(
      storyId,
      chapterNumber
    );
    const { chapters } = await chaptersService.getByStoryId(storyId);
    const story = await storiesService.getById(storyId);
    if (!chapter) {
      return res
        .status(404)
        .render("errors/404", { message: "Chương không tồn tại" });
    }

    res.render("chapter/index", {
      story,
      chapter,
      storyId,
      chapterNumber,
      chapters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).render("errors/500", { message: "Lỗi server" });
  }
};
