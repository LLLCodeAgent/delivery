const warehouseModel = require('../models/warehouseModel');
const { validateWarehousePayload } = require('../utils/validators');

const addParcel = async (req, res, next) => {
  try {
    const validationError = validateWarehousePayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const id = await warehouseModel.addParcel({ ...req.body, status: req.body.status || 'Stored' });
    return res.status(201).json({ message: 'Parcel added to warehouse', id });
  } catch (error) {
    return next(error);
  }
};

const updateParcel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validationError = validateWarehousePayload(req.body, true);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    await warehouseModel.updateParcel(id, req.body);
    return res.status(200).json({ message: 'Parcel updated' });
  } catch (error) {
    return next(error);
  }
};

module.exports = { addParcel, updateParcel };
