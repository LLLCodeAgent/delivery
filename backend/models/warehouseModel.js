const db = require('../config/db');

const addParcel = async ({ parcelId, location, status }) => {
  const [result] = await db.execute(
    'INSERT INTO warehouse (parcel_id, location, status) VALUES (?, ?, ?)',
    [parcelId, location, status]
  );
  return result.insertId;
};

const updateParcel = async (id, payload) => {
  const fields = [];
  const values = [];

  if (payload.location !== undefined) {
    fields.push('location = ?');
    values.push(payload.location);
  }

  if (payload.status !== undefined) {
    fields.push('status = ?');
    values.push(payload.status);
  }

  if (fields.length === 0) return;

  values.push(id);
  await db.execute(`UPDATE warehouse SET ${fields.join(', ')} WHERE id = ?`, values);
};

module.exports = { addParcel, updateParcel };
