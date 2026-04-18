const orderModel = require('../models/orderModel');
const trackingModel = require('../models/trackingModel');
const generateTrackingId = require('../utils/generateTrackingId');
const { validateOrderPayload } = require('../utils/validators');

const createOrder = async (req, res, next) => {
  try {
    const validationError = validateOrderPayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

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
    const existing = await orderModel.getOrderById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const validationError = validateOrderPayload(req.body, true);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    await orderModel.updateOrder(id, req.body);

    if (req.body.status && req.body.status !== existing.status) {
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
    const existing = await orderModel.getOrderById(id);
    if (!existing) {
      return res.status(404).json({ message: 'Order not found' });
    }

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

    const timeline = await trackingModel.getTrackingTimeline(order.id);
    return res.status(200).json({ ...order, timeline });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createOrder, updateOrder, deleteOrder, getOrderById };
