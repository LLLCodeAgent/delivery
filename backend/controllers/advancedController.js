const liveLocation = async (req, res) => {
  const { orderId } = req.params;
  return res.status(200).json({
    orderId,
    location: { lat: 28.6139, lng: 77.209 },
    provider: 'Google Maps placeholder',
    note: 'Integrate Google Maps Distance Matrix + Geolocation SDK for production.',
  });
};

const sendOtp = async (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return res.status(200).json({
    phone,
    otp,
    note: 'Demo response only. Integrate Twilio/MSG91 and do not expose OTP in production.',
  });
};

const createPaymentIntent = async (req, res) => {
  const { amount, currency = 'USD' } = req.body;
  return res.status(200).json({
    amount,
    currency,
    status: 'requires_payment_method',
    provider: 'Stripe/Razorpay placeholder',
  });
};

const bulkUploadOrders = async (req, res) => {
  const { rows = [] } = req.body;
  return res.status(200).json({
    imported: rows.length,
    failed: 0,
    note: 'For production: parse CSV file stream, validate schema, and push to queue worker.',
  });
};

module.exports = { liveLocation, sendOtp, createPaymentIntent, bulkUploadOrders };
