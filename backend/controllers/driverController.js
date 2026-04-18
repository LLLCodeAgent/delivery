const driverModel = require('../models/driverModel');
const orderModel = require('../models/orderModel');
const trackingModel = require('../models/trackingModel');

const addDriver = async (req, res, next) => {
  try {
    const id = await driverModel.addDriver({ ...req.body, status: req.body.status || 'available' });
    return res.status(201).json({ message: 'Driver added', driverId: id });
  } catch (error) {
    return next(error);
  }
};

const assignDriverToOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { driverId } = req.body;
    await orderModel.assignDriver(orderId, driverId);
    await trackingModel.createTrackingLog(orderId, 'Out for delivery');
    return res.status(200).json({ message: 'Driver assigned' });
  } catch (error) {
    return next(error);
  }
};

const updateDeliveryStatus = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    await trackingModel.createTrackingLog(orderId, status);
    await orderModel.updateOrder(orderId, req.body);
    return res.status(200).json({ message: 'Delivery status updated' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addDriver, assignDriverToOrder, updateDeliveryStatus };
