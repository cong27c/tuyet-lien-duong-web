const storiesService = require("../../services/stories.service");

exports.getSeries = async (req, res) => {
  try {
    const stories = await storiesService.getSeries();
    res.render("series/index", { stories });
  } catch (error) {
    console.error(error);
    response.error(res, 500, "Lỗi khi lấy truyện dài");
  }
};
