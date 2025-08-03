const chaptersModel = require("../model/chapter.model");
const Story = require("../model/stories.modal");

class ChaptersService {
  async getAll() {
    return await chaptersModel.findAll();
  }

  async findById(id) {
    return chaptersModel.findById(id);
  }

  async findByStoryId(storyId) {
    return await chaptersModel.findByStoryId(storyId);
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

    const [chapters, total] = await Promise.all([
      chaptersModel.findByStoryId(storyId, offset, limit),
      chaptersModel.countByStoryId(storyId),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      chapters,
      pagination: {
        currentPage: page,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }

  async create({ story_id, title, content }) {
    const currentMax = await chaptersModel.findMaxIndex(story_id);
    const index_order = currentMax + 1;

    // 1. Tạo chương mới
    await chaptersModel.create({
      story_id,
      title,
      content,
      index_order,
    });

    await Story.updateNumberOfChapters(story_id, index_order);
  }

  async update(id, { title, content }) {
    return chaptersModel.updateById(id, { title, content });
  }

  async remove(id) {
    return await chaptersModel.remove(id);
  }

  async deleteByStoryId(storyId) {
    return await chaptersModel.deleteByStoryId(storyId);
  }
  async delete(id) {
    const chapter = await chaptersModel.findById(id);
    if (!chapter) throw new Error("Chương không tồn tại");

    // Xoá chương
    await chaptersModel.deleteById(id);

    // Cập nhật lại số chương
    const allChapters = await chaptersModel.findByStoryId(chapter.story_id);
    await Story.updateNumberOfChapters(chapter.story_id, allChapters.length);
  }
}

module.exports = new ChaptersService();
