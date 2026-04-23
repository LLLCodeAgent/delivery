const orderModel = require('../models/orderModel');
const trackingModel = require('../models/trackingModel');

const trackByTrackingId = async (req, res, next) => {
  try {
    const { trackingId } = req.params;
    const order = await orderModel.getOrderByTrackingId(trackingId);
    if (!order) {
      return res.status(404).json({ message: 'Tracking ID not found' });
    }

    const timeline = await trackingModel.getTrackingTimeline(order.id);
    return res.status(200).json({ order, timeline });
  } catch (error) {
    return next(error);
  }
};

module.exports = { trackByTrackingId };
