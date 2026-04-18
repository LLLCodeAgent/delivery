const orderModel = require('../models/orderModel');
const trackingModel = require('../models/trackingModel');

const FAQ = {
  pricing: 'Pricing depends on distance, parcel weight, and delivery speed.',
  support: 'Support is available 24/7 at support@logisticsapp.com.',
  sla: 'Standard delivery is 2-4 business days and express delivery is 24-48 hours.',
};

const askOpenAI = async (message) => {
  if (!process.env.OPENAI_API_KEY) return null;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a logistics support assistant. Keep answers concise and practical.' },
        { role: 'user', content: message },
      ],
      temperature: 0.2,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
};

const getOrderStatusReply = async (message) => {
  const trackingMatch = message.match(/(TRK-[A-Z0-9-]+)/i);
  const orderIdMatch = message.match(/\b(\d{1,10})\b/);

  if (trackingMatch) {
    const trackingId = trackingMatch[1].toUpperCase();
    const order = await orderModel.getOrderByTrackingId(trackingId);

    if (!order) {
      return { reply: `No order found for tracking ID ${trackingId}.` };
    }

    const timeline = await trackingModel.getTrackingTimeline(order.id);
    const latest = timeline[timeline.length - 1]?.status || order.status;
    return { reply: `Order ${trackingId} is currently: ${latest}.`, timeline };
  }

  if (orderIdMatch) {
    const order = await orderModel.getOrderById(orderIdMatch[1]);
    if (!order) return { reply: `No order found for order ID ${orderIdMatch[1]}.` };

    const timeline = await trackingModel.getTrackingTimeline(order.id);
    const latest = timeline[timeline.length - 1]?.status || order.status;
    return { reply: `Order ID ${order.id} (${order.tracking_id}) is currently: ${latest}.`, timeline };
  }

  return { reply: 'Please share your tracking ID (TRK-...) or order ID.' };
};

const processChat = async (message) => {
  const text = (message || '').toLowerCase();

  if (text.includes('track') || text.includes('where is my parcel')) {
    return getOrderStatusReply(message);
  }

  if (text.includes('create shipment') || text.includes('create order')) {
    return {
      reply:
        'To create a shipment: 1) Enter sender & receiver details, 2) Add address, 3) Submit and save tracking ID.',
    };
  }

  if (text.includes('price') || text.includes('cost')) {
    return { reply: FAQ.pricing };
  }

  if (text.includes('support')) {
    return { reply: FAQ.support };
  }

  if (text.includes('delivery time') || text.includes('eta')) {
    return { reply: FAQ.sla };
  }

  const aiReply = await askOpenAI(message);
  if (aiReply) {
    return { reply: aiReply, source: 'openai' };
  }

  return {
    reply:
      'I can help with tracking orders, shipment creation steps, pricing FAQs, and support questions. Try: "Track my order 123".',
    source: 'rules',
  };
};

module.exports = { processChat };
