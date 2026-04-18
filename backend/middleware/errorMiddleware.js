const notFound = (_req, res) => {
  return res.status(404).json({ message: 'Route not found' });
};

const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const status = err.statusCode || 500;
  return res.status(status).json({ message: err.message || 'Internal server error' });
};

module.exports = { notFound, errorHandler };
