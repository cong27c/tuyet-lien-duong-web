const db = require("../configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("../utils/queryBuilder");

exports.findAll = async () => {
  const [chapters] = await db.query("select * from chapters");
  return chapters;
};

exports.findById = async (id) => {
  const [chapter] = await db.query(`select * from chapters where id = ?`, [id]);
  return chapter.length ? chapter[0] : null;
};

exports.create = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);

  const query = `INSERT INTO chapters (${columns}) VALUES (${placeholders});`;

  const [{ insertId }] = await db.query(query, values);

  return {
    id: insertId,
    ...data,
  };
};

exports.findByStoryIdAndNumber = async (storyId, chapterNumber) => {
  const [result] = await db.query(
    "SELECT * FROM chapters WHERE story_id = ? AND chapter_number = ?",
    [storyId, chapterNumber]
  );

  return result.length ? result[0] : null;
};

exports.update = async (id, data) => {
  const { setClause, values } = buildUpdateQuery(data);

  values.push(id);

  const query = `UPDATE chapters SET ${setClause} WHERE id = ?;`;
  await db.query(query, values);

  return {
    id,
    ...data,
  };
};

exports.remove = async (id) => {
  const [{ affectedRows }] = await db.query(
    `delete from chapters where id = ?`,
    [id]
  );
  return affectedRows > 0;
};

exports.findByStoryId = async (storyId) => {
  const [chapters] = await db.query(
    `SELECT * FROM chapters WHERE story_id = ? ORDER BY chapter_number ASC`,
    [storyId]
  );
  return chapters;
};

exports.findByStoryIdWithPagination = async (storyId, limit, offset) => {
  const [chapters] = await db.query(
    `SELECT * FROM chapters WHERE story_id = ? ORDER BY chapter_number ASC LIMIT ? OFFSET ?`,
    [storyId, limit, offset]
  );
  return chapters;
};

exports.deleteByStoryId = async (storyId) => {
  const [{ affectedRows }] = await db.query(
    `DELETE FROM chapters WHERE story_id = ?`,
    [storyId]
  );
  return affectedRows > 0;
};
