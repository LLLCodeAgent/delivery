const orderModel = require('../models/orderModel');
const trackingModel = require('../models/trackingModel');
const generateTrackingId = require('../utils/generateTrackingId');

const createOrder = async (req, res, next) => {
  try {
    const trackingId = generateTrackingId();
    const payload = {
      ...req.body,
      status: req.body.status || 'Pending',
      trackingId,
      createdBy: req.user.id,
    };

    const orderId = await orderModel.createOrder(payload);
    await trackingModel.createTrackingLog(orderId, payload.status);

    return res.status(201).json({ message: 'Order created', orderId, trackingId });
  } catch (error) {
    return next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await orderModel.updateOrder(id, req.body);
    if (req.body.status) {
      await trackingModel.createTrackingLog(id, req.body.status);
    }
    return res.status(200).json({ message: 'Order updated' });
  } catch (error) {
    return next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    await orderModel.deleteOrder(id);
    return res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderModel.getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
};

module.exports = { createOrder, updateOrder, deleteOrder, getOrderById };
