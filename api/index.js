const { validateEnv } = require('../backend/config/env');
const app = require('../backend/app');

validateEnv();

module.exports = app;
