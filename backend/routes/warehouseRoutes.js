const express = require('express');
const { addParcel, updateParcel } = require('../controllers/warehouseController');
const { authenticate, authorizeRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticate, authorizeRoles('admin', 'manager', 'warehouse'), addParcel);
router.put('/:id', authenticate, authorizeRoles('admin', 'manager', 'warehouse'), updateParcel);

module.exports = router;
