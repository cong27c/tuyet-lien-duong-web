const storiesService = require("../../services/stories.service");

exports.index = async (req, res) => {
  const stories = await storiesService.getAll();

  res.render("home.ejs", {
    stories,
  });
};
