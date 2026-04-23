require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const driverRoutes = require('./routes/driverRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const advancedRoutes = require('./routes/advancedRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const { rateLimit } = require('./middleware/rateLimitMiddleware');
const { securityHeaders } = require('./middleware/securityHeaders');
const { requestContext } = require('./middleware/requestContext');
const { pingDatabase } = require('./config/db');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map((v) => v.trim()).filter(Boolean);
app.set('trust proxy', 1);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origin not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(requestContext);
app.use(securityHeaders);
app.use(rateLimit);

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'logistics-backend', date: new Date().toISOString() });
});

app.get('/api/ready', async (req, res) => {
  try {
    await pingDatabase();
    return res.status(200).json({ status: 'ready', requestId: req.requestId });
  } catch (error) {
    return res.status(503).json({ status: 'degraded', message: 'Database unavailable', requestId: req.requestId });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/advanced', advancedRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
