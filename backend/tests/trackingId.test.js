const test = require('node:test');
const assert = require('node:assert/strict');
const generateTrackingId = require('../utils/generateTrackingId');

test('generateTrackingId returns a formatted tracking number', () => {
  const id = generateTrackingId();
  assert.match(id, /^TRK-\d{13}-[A-Z0-9]{6}$/);
});
