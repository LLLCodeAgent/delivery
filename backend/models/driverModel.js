const db = require('../config/db');

const addDriver = async ({ name, phone, status }) => {
  const [result] = await db.execute(
    'INSERT INTO drivers (name, phone, status) VALUES (?, ?, ?)',
    [name, phone, status]
  );
  return result.insertId;
};

const getDriverById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM drivers WHERE id = ?', [id]);
  return rows[0];
};

const updateDriverStatus = async (id, status) => {
  await db.execute('UPDATE drivers SET status = ? WHERE id = ?', [status, id]);
};

module.exports = { addDriver, getDriverById, updateDriverStatus };
