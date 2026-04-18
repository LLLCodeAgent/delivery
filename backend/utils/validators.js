const { ORDER_STATUSES, DRIVER_STATUSES, WAREHOUSE_STATUSES } = require('./constants');

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const validateStatus = (status, allowed) => !status || allowed.includes(status);

const validateOrderPayload = (payload, partial = false) => {
  const required = ['sender', 'receiver', 'address'];

  if (!partial) {
    for (const field of required) {
      if (!isNonEmptyString(payload[field])) {
        return `${field} is required`;
      }
    }
  }

  if (payload.status && !ORDER_STATUSES.includes(payload.status)) {
    return `status must be one of: ${ORDER_STATUSES.join(', ')}`;
  }

  return null;
};

const validateDriverPayload = (payload, partial = false) => {
  if (!partial) {
    if (!isNonEmptyString(payload.name)) return 'name is required';
    if (!isNonEmptyString(payload.phone)) return 'phone is required';
  }

  if (!validateStatus(payload.status, DRIVER_STATUSES)) {
    return `status must be one of: ${DRIVER_STATUSES.join(', ')}`;
  }

  return null;
};

const validateWarehousePayload = (payload, partial = false) => {
  if (!partial) {
    if (!isNonEmptyString(payload.parcelId)) return 'parcelId is required';
    if (!isNonEmptyString(payload.location)) return 'location is required';
  }

  if (!validateStatus(payload.status, WAREHOUSE_STATUSES)) {
    return `status must be one of: ${WAREHOUSE_STATUSES.join(', ')}`;
  }

  return null;
};

module.exports = {
  validateOrderPayload,
  validateDriverPayload,
  validateWarehousePayload,
};
