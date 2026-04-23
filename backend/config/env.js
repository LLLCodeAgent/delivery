const requiredInProduction = ['JWT_SECRET', 'DB_HOST', 'DB_USER', 'DB_NAME'];

const validateEnv = () => {
  const env = process.env.NODE_ENV || 'development';

  if (env !== 'production') return;

  const missing = requiredInProduction.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

module.exports = { validateEnv };
