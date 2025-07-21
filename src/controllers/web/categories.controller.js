const storiesService = require("../../services/stories.service");

exports.getByGenre = async (req, res) => {
  const genre = req.params.genre;

  try {
    const stories = await storiesService.getStoriesByGenre(genre);
    res.render("stories/byGenre", { genre, stories });
  } catch (error) {
    console.error("Lỗi lấy truyện theo thể loại:", error);
    res.status(500).send("Lỗi máy chủ");
  }
};
