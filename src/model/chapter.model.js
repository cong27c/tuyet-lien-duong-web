const db = require("../configs/db");

const Chapter = {
  async create({ story_id, title, content, index_order }) {
    const sql = `
      INSERT INTO chapters (story_id, title, content, index_order, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    const values = [story_id, title, content, index_order];
    await db.query(sql, values);
  },

  async findByStoryId(story_id) {
    const sql = `SELECT * FROM chapters WHERE story_id = ? ORDER BY index_order ASC`;
    const [rows] = await db.query(sql, [story_id]);
    return rows;
  },
  async findByStoryIdAndNumber(storyId, chapterNumber) {
    const [rows] = await db.query(
      `SELECT * FROM chapters WHERE story_id = ? AND index_order = ? LIMIT 1`,
      [storyId, chapterNumber]
    );
    return rows[0] || null;
  },

  async findMaxIndex(story_id) {
    const sql = `SELECT MAX(index_order) AS max_index FROM chapters WHERE story_id = ?`;
    const [rows] = await db.query(sql, [story_id]);
    return rows[0]?.max_index || 0;
  },
  async findById(id) {
    const [rows] = await db.query(`SELECT * FROM chapters WHERE id = ?`, [id]);
    return rows[0] || null;
  },

  async updateById(id, { title, content }) {
    const sql = `
      UPDATE chapters
      SET title = ?, content = ?
      WHERE id = ?
    `;
    await db.query(sql, [title, content, id]);
  },

  async deleteById(id) {
    const sql = `DELETE FROM chapters WHERE id = ?`;
    await db.query(sql, [id]);
  },
  async findByStoryId(storyId, offset = 0, limit = 10) {
    const [rows] = await db.query(
      `SELECT * FROM chapters WHERE story_id = ? ORDER BY index_order ASC LIMIT ? OFFSET ?`,
      [storyId, limit, offset]
    );
    return rows;
  },

  async countByStoryId(storyId) {
    const [[{ count }]] = await db.query(
      `SELECT COUNT(*) as count FROM chapters WHERE story_id = ?`,
      [storyId]
    );
    return count;
  },
};

module.exports = Chapter;
