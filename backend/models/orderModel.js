const db = require('../config/db');

const createOrder = async (payload) => {
  const { sender, receiver, address, status, trackingId, createdBy } = payload;
  const [result] = await db.execute(
    'INSERT INTO orders (sender, receiver, address, status, tracking_id, created_by) VALUES (?, ?, ?, ?, ?, ?)',
    [sender, receiver, address, status, trackingId, createdBy]
  );
  return result.insertId;
};

const updateOrder = async (id, payload) => {
  const fields = [];
  const values = [];

  ['sender', 'receiver', 'address', 'status'].forEach((field) => {
    if (payload[field] !== undefined) {
      fields.push(`${field} = ?`);
      values.push(payload[field]);
    }
  });

  if (fields.length === 0) return;

  values.push(id);
  await db.execute(`UPDATE orders SET ${fields.join(', ')} WHERE id = ?`, values);
};

const deleteOrder = async (id) => {
  await db.execute('DELETE FROM orders WHERE id = ?', [id]);
};

const getOrderById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM orders WHERE id = ?', [id]);
  return rows[0];
};

const getOrderByTrackingId = async (trackingId) => {
  const [rows] = await db.execute('SELECT * FROM orders WHERE tracking_id = ?', [trackingId]);
  return rows[0];
};

const assignDriver = async (orderId, driverId) => {
  await db.execute('UPDATE orders SET driver_id = ?, status = ? WHERE id = ?', [driverId, 'Out for delivery', orderId]);
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderByTrackingId,
  assignDriver,
};
