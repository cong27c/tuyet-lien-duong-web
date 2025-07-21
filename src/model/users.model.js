const db = require("../configs/db");
const { buildInsertQuery, buildUpdateQuery } = require("../utils/queryBuilder");

exports.findAll = async () => {
  const [users] = await db.query(
    "SELECT * FROM users ORDER BY created_at DESC;"
  );
  return users;
};

exports.findById = async (id) => {
  const [user] = await db.query(`select * from users where id = ?`, [id]);
  return user.length ? user[0] : null;
};

exports.update = async (id, data) => {
  const { setClause, values } = buildUpdateQuery(data);

  values.push(id);

  const query = `UPDATE users SET ${setClause} WHERE id = ?;`;
  await db.query(query, values);

  return {
    id,
    ...data,
  };
};

exports.remove = async (id) => {
  const [{ affectedRows }] = await db.query(`delete from users where id = ?`, [
    id,
  ]);
  return affectedRows > 0;
};

exports.findByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0] || null;
};
