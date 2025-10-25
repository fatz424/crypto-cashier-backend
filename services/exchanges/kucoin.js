const axios = require('axios');
const crypto = require('crypto');
const API = process.env.KUCOIN_API || 'https://api.kucoin.com';
const KEY = process.env.KUCOIN_KEY || '';
const SECRET = process.env.KUCOIN_SECRET || '';
const PASSPHRASE = process.env.KUCOIN_PASSPHRASE || '';

function getSignature(timestamp, method, requestPath, body='') {
  const strForSign = timestamp + method.toUpperCase() + requestPath + body;
  return crypto.createHmac('sha256', SECRET).update(strForSign).digest('base64');
}

async function placeMarketSell(symbol, size) {
  if (!KEY || !SECRET) return { sandbox: true, symbol, size, soldForUsd: size * 60000 };
  const path = '/api/v1/orders';
  const body = JSON.stringify({ symbol, side: 'sell', type: 'market', size: String(size) });
  const ts = Date.now().toString();
  const sig = getSignature(ts, 'POST', path, body);
  const headers = { 'KC-API-KEY': KEY, 'KC-API-SIGN': sig, 'KC-API-TIMESTAMP': ts, 'KC-API-PASSPHRASE': PASSPHRASE, 'Content-Type': 'application/json' };
  const resp = await axios.post(API + path, body, { headers });
  return resp.data;
}

module.exports = { placeMarketSell };
