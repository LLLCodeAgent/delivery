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
  const { sender, receiver, address, status } = payload;
  await db.execute(
    'UPDATE orders SET sender = ?, receiver = ?, address = ?, status = ? WHERE id = ?',
    [sender, receiver, address, status, id]
  );
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
  await db.execute('UPDATE orders SET driver_id = ? WHERE id = ?', [driverId, orderId]);
};

module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrderByTrackingId,
  assignDriver,
};
