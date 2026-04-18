const express = require('express');
const { trackByTrackingId } = require('../controllers/trackingController');

const router = express.Router();

router.get('/:trackingId', trackByTrackingId);

module.exports = router;
