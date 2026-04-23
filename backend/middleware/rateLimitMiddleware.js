const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 120;

const buckets = new Map();

const rateLimit = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const item = buckets.get(ip) || { count: 0, ts: now };

  if (now - item.ts > WINDOW_MS) {
    item.count = 0;
    item.ts = now;
  }

  item.count += 1;
  buckets.set(ip, item);

  if (item.count > MAX_REQUESTS) {
    return res.status(429).json({ message: 'Too many requests. Please retry shortly.' });
  }

  return next();
};

module.exports = { rateLimit };
