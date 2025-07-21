const chaptersModel = require("../model/chapter.model");

class ChaptersService {
  async getAll() {
    return await chaptersModel.findAll();
  }

  async getById(id) {
    return await chaptersModel.findById(id);
  }

  async getByStoryIdAndNumber(storyId, chapterNumber) {
    const chapter = await chaptersModel.findByStoryIdAndNumber(
      storyId,
      chapterNumber
    );
    return chapter;
  }

  async getByStoryId(storyId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const chapters = await chaptersModel.findByStoryIdWithPagination(
      storyId,
      limit,
      offset
    );
    const totalChapters = (await chaptersModel.findByStoryId(storyId)).length;
    const totalPages = Math.ceil(totalChapters / limit);

    return {
      chapters,
      pagination: {
        page,
        limit,
        totalChapters,
        totalPages,
      },
    };
  }

  async create(data) {
    return await chaptersModel.create(data);
  }

  async update(id, data) {
    return await chaptersModel.update(id, data);
  }

  async remove(id) {
    return await chaptersModel.remove(id);
  }

  async deleteByStoryId(storyId) {
    return await chaptersModel.deleteByStoryId(storyId);
  }
}

module.exports = new ChaptersService();
