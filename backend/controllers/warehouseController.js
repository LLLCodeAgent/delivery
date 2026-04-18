const warehouseModel = require('../models/warehouseModel');

const addParcel = async (req, res, next) => {
  try {
    const id = await warehouseModel.addParcel({ ...req.body, status: req.body.status || 'Stored' });
    return res.status(201).json({ message: 'Parcel added to warehouse', id });
  } catch (error) {
    return next(error);
  }
};

const updateParcel = async (req, res, next) => {
  try {
    const { id } = req.params;
    await warehouseModel.updateParcel(id, req.body);
    return res.status(200).json({ message: 'Parcel updated' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addParcel, updateParcel };
