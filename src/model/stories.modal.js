const db = require("../configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("../utils/queryBuilder");

exports.findAll = async () => {
  const [stories] = await db.query("select * from stories");
  return stories;
};

exports.findById = async (id) => {
  const [story] = await db.query(`select * from stories where id = ?`, [id]);
  return story.length ? story[0] : null;
};

exports.create = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);

  const query = `INSERT INTO stories (${columns}) VALUES (${placeholders});`;

  const [{ insertId }] = await db.query(query, values);

  return {
    id: insertId,
    ...data,
  };
};

exports.update = async (id, data) => {
  const { setClause, values } = buildUpdateQuery(data);

  values.push(id);

  const query = `UPDATE stories SET ${setClause} WHERE id = ?;`;
  await db.query(query, values);

  return {
    id,
    ...data,
  };
};

exports.remove = async (id) => {
  const [{ affectedRows }] = await db.query(
    `delete from stories where id = ?`,
    [id]
  );
  return affectedRows > 0;
};

exports.getFeaturedStories = async (limit = 10) => {
  const [rows] = await db.query(
    `SELECT * FROM stories WHERE is_featured = 1 ORDER BY updated_at DESC LIMIT ?`,
    [limit]
  );
  return rows;
};

exports.getRecentlyUpdatedStories = async (limit = 10) => {
  const [rows] = await db.query(
    `SELECT * FROM stories ORDER BY updated_at DESC LIMIT ?`,
    [limit]
  );
  return rows;
};

exports.findByGenre = async (genre) => {
  const sql = `SELECT * FROM stories WHERE genre = ?`;
  const [rows] = await db.query(sql, [genre]);
  return rows;
};

exports.getSeries = async () => {
  const sql =
    "SELECT * FROM stories WHERE number_of_chapters > 10 ORDER BY number_of_chapters DESC";
  const [rows] = await db.execute(sql);
  return rows;
};

exports.getAllStories = async (page = 1, limit = 12) => {
  const offset = (page - 1) * limit;

  const dataSql = `
    SELECT * FROM stories
    ORDER BY updated_at DESC
    LIMIT ? OFFSET ?
  `;

  const countSql = `
    SELECT COUNT(*) AS total FROM stories
  `;

  const [rows] = await db.execute(dataSql, [limit, offset]);
  const [[{ total }]] = await db.execute(countSql);

  return {
    stories: rows,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

exports.searchStoriesByTitle = async (keyword) => {
  const sql = `
    SELECT * FROM stories
    WHERE title LIKE ?
    ORDER BY updated_at DESC
  `;
  const [rows] = await db.execute(sql, [`%${keyword}%`]);
  return rows;
};

exports.findByGenre = async (genre) => {
  const query = `
    SELECT * FROM stories
    WHERE genre LIKE ?
  `;

  const likePattern = `%${genre}%`;

  const [rows] = await db.query(query, [likePattern]);
  return rows;
};

exports.updateNumberOfChapters = async (story_id, count) => {
  const sql = `UPDATE stories SET number_of_chapters = ? WHERE id = ?`;
  await db.query(sql, [count, story_id]);
};
