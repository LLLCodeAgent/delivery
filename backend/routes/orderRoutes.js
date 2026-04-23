const express = require('express');
const { createOrder, updateOrder, deleteOrder, getOrderById } = require('../controllers/orderController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createOrder);
router.put('/:id', authenticate, updateOrder);
router.delete('/:id', authenticate, authorizeRoles('admin', 'manager'), deleteOrder);
router.get('/:id', authenticate, getOrderById);

module.exports = router;
