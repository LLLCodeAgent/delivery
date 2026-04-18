const db = require('../config/db');

const addParcel = async ({ parcelId, location, status }) => {
  const [result] = await db.execute(
    'INSERT INTO warehouse (parcel_id, location, status) VALUES (?, ?, ?)',
    [parcelId, location, status]
  );
  return result.insertId;
};

const updateParcel = async (id, { location, status }) => {
  await db.execute('UPDATE warehouse SET location = ?, status = ? WHERE id = ?', [location, status, id]);
};

module.exports = { addParcel, updateParcel };
