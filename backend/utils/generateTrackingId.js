const generateTrackingId = () => {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `TRK-${Date.now()}-${random}`;
};

module.exports = generateTrackingId;
