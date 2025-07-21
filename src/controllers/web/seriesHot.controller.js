const storiesService = require("../../services/stories.service");

exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    const { stories, pagination } = await storiesService.getAllStories(
      page,
      limit
    );

    res.render("seriesHot/index", {
      stories,
      pagination,
    });
  } catch (error) {
    console.error(error);
    response.error(res, 500, "Đã xảy ra lỗi khi lấy truyện dài");
  }
};
