const orderModel = require('../models/orderModel');
const trackingModel = require('../models/trackingModel');

const FAQ = {
  pricing: 'Pricing depends on distance, parcel weight, and delivery speed.',
  support: 'Support is available 24/7 at support@logisticsapp.com.',
};

const processChat = async (message) => {
  const text = message.toLowerCase();

  if (text.includes('track')) {
    const trackingMatch = message.match(/(TRK-[A-Z0-9-]+)/i);
    if (!trackingMatch) {
      return { reply: 'Please share your tracking ID in format TRK-XXXXXXXX.' };
    }

    const trackingId = trackingMatch[1].toUpperCase();
    const order = await orderModel.getOrderByTrackingId(trackingId);
    if (!order) {
      return { reply: `No order found for tracking ID ${trackingId}.` };
    }

    const timeline = await trackingModel.getTrackingTimeline(order.id);
    const latest = timeline[timeline.length - 1]?.status || order.status;
    return { reply: `Order ${trackingId} is currently: ${latest}.`, timeline };
  }

  if (text.includes('create shipment') || text.includes('create order')) {
    return {
      reply:
        'To create a shipment: 1) Enter sender & receiver info, 2) Add address, 3) Choose delivery type, 4) Submit order.',
    };
  }

  if (text.includes('where is my parcel')) {
    return { reply: 'Please provide your tracking ID and I will check the latest status.' };
  }

  if (text.includes('price') || text.includes('cost')) {
    return { reply: FAQ.pricing };
  }

  return {
    reply:
      'I can help with tracking orders, creating shipments, and common FAQs. Try: "Track TRK-..."',
  };
};

module.exports = { processChat };
