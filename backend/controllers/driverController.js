const driverModel = require('../models/driverModel');
const orderModel = require('../models/orderModel');
const trackingModel = require('../models/trackingModel');
const { ORDER_STATUSES } = require('../utils/constants');
const { validateDriverPayload } = require('../utils/validators');

const addDriver = async (req, res, next) => {
  try {
    const validationError = validateDriverPayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

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

    const order = await orderModel.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const driver = await driverModel.getDriverById(driverId);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    await orderModel.assignDriver(orderId, driverId);
    await driverModel.updateDriverStatus(driverId, 'assigned');
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

    if (!ORDER_STATUSES.includes(status)) {
      return res.status(400).json({ message: `status must be one of: ${ORDER_STATUSES.join(', ')}` });
    }

    const order = await orderModel.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await orderModel.updateOrder(orderId, { status });
    await trackingModel.createTrackingLog(orderId, status);

    if (status === 'Delivered' && order.driver_id) {
      await driverModel.updateDriverStatus(order.driver_id, 'available');
    }

    return res.status(200).json({ message: 'Delivery status updated' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addDriver, assignDriverToOrder, updateDeliveryStatus };
