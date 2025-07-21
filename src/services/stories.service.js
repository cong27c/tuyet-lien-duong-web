const storiesModel = require("../model/stories.modal");

class storiesService {
  async getAll() {
    const stories = await storiesModel.findAll();
    return stories;
  }

  async getById(id) {
    const story = await storiesModel.findById(id);
    return story;
  }

  async create(data) {
    const story = await storiesModel.create(data);
    return story;
  }

  async update(id, data) {
    const story = await storiesModel.update(id, data);
    return story;
  }

  async remove(id) {
    const story = await storiesModel.remove(id);
    return story;
  }
  async getFeatured(limit = 10) {
    return await storiesModel.getFeaturedStories(limit);
  }

  async getRecent(limit = 10) {
    return await storiesModel.getRecentlyUpdatedStories(limit);
  }
  async getStoriesByGenre(genre) {
    return await storiesModel.findByGenre(genre);
  }
  async getAllStories(page = 1, limit = 10) {
    const stories = await storiesModel.getAllStories(page, limit);
    return stories;
  }
  async getSeries() {
    const stories = await storiesModel.getSeries();
    return stories;
  }
  async search(keyword) {
    return await storiesModel.searchStoriesByTitle(keyword);
  }
  async getStoriesByGenre(genre) {
    return await storiesModel.findByGenre(genre);
  }
}

module.exports = new storiesService();
