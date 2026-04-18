const db = require('../config/db');

const addDriver = async ({ name, phone, status }) => {
  const [result] = await db.execute(
    'INSERT INTO drivers (name, phone, status) VALUES (?, ?, ?)',
    [name, phone, status]
  );
  return result.insertId;
};

const updateDriverStatus = async (id, status) => {
  await db.execute('UPDATE drivers SET status = ? WHERE id = ?', [status, id]);
};

module.exports = { addDriver, updateDriverStatus };
