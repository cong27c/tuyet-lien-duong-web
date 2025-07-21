const db = require("../configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("../utils/queryBuilder");

exports.findById = async (sid) => {
  const [row] = await db.query(`SELECT * FROM sessions WHERE sid = ?`, [sid]);
  return row.length ? row[0] : null;
};

exports.create = async (data) => {
  const { columns, placeholders, values } = buildInsertQuery(data);
  const query = `INSERT INTO sessions (${columns}) VALUES (${placeholders});`;
  await db.query(query, values);
  return data;
};

exports.update = async (sid, data) => {
  const { setClause, values } = buildUpdateQuery(data);
  values.push(sid);
  const query = `UPDATE sessions SET ${setClause} WHERE sid = ?;`;
  await db.query(query, values);
  return { sid, ...data };
};

exports.remove = async (sid) => {
  const [{ affectedRows }] = await db.query(
    `DELETE FROM sessions WHERE sid = ?`,
    [sid]
  );
  return affectedRows > 0;
};
