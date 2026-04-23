const { processChat } = require('../services/chatbotService');

const chat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const response = await processChat(message || '');
    return res.status(200).json(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = { chat };
