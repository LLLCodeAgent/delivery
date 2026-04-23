const db = require('../config/db');

const createTrackingLog = async (orderId, status) => {
  await db.execute(
    'INSERT INTO tracking_logs (order_id, status, timestamp) VALUES (?, ?, NOW())',
    [orderId, status]
  );
};

const getTrackingTimeline = async (orderId) => {
  const [rows] = await db.execute(
    'SELECT id, order_id, status, timestamp FROM tracking_logs WHERE order_id = ? ORDER BY timestamp ASC',
    [orderId]
  );
  return rows;
};

module.exports = { createTrackingLog, getTrackingTimeline };
