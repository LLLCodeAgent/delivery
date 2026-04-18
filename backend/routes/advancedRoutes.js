const express = require('express');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');
const {
  liveLocation,
  sendOtp,
  createPaymentIntent,
  bulkUploadOrders,
} = require('../controllers/advancedController');

const router = express.Router();

router.get('/live-location/:orderId', authenticate, liveLocation);
router.post('/otp/send', authenticate, authorizeRoles('admin', 'manager', 'dispatcher'), sendOtp);
router.post('/payments/intent', authenticate, createPaymentIntent);
router.post('/orders/bulk-upload', authenticate, authorizeRoles('admin', 'manager'), bulkUploadOrders);

module.exports = router;
