const test = require('node:test');
const assert = require('node:assert/strict');

const {
  validateOrderPayload,
  validateDriverPayload,
  validateWarehousePayload,
} = require('../utils/validators');

test('validateOrderPayload rejects missing fields', () => {
  assert.equal(validateOrderPayload({ sender: '', receiver: 'A', address: 'X' }), 'sender is required');
});

test('validateOrderPayload accepts valid status', () => {
  assert.equal(
    validateOrderPayload({ sender: 'A', receiver: 'B', address: 'X', status: 'Pending' }),
    null
  );
});

test('validateDriverPayload validates phone', () => {
  assert.equal(validateDriverPayload({ name: 'Tom' }), 'phone is required');
});

test('validateWarehousePayload validates status domain', () => {
  assert.match(validateWarehousePayload({ parcelId: 'P1', location: 'R1', status: 'Unknown' }), /status must be one of/);
});
