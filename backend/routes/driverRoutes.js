const express = require('express');
const { addDriver, assignDriverToOrder, updateDeliveryStatus } = require('../controllers/driverController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorizeRoles('admin', 'manager'), addDriver);
router.put('/assign/:orderId', authenticate, authorizeRoles('admin', 'manager', 'dispatcher'), assignDriverToOrder);
router.put('/status/:orderId', authenticate, authorizeRoles('admin', 'manager', 'driver'), updateDeliveryStatus);

module.exports = router;
