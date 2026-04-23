const notFound = (req, res) => {
  return res.status(404).json({ message: 'Route not found', requestId: req.requestId });
};

const errorHandler = (err, req, res, _next) => {
  console.error(`[${req.requestId}]`, err);
  const status = err.statusCode || 500;
  return res.status(status).json({ message: err.message || 'Internal server error', requestId: req.requestId });
};

module.exports = { notFound, errorHandler };
