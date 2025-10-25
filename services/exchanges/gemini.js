const axios = require('axios');
const crypto = require('crypto');
const API = process.env.GEMINI_API || 'https://api.sandbox.gemini.com';
const KEY = process.env.GEMINI_KEY || '';
const SECRET = process.env.GEMINI_SECRET || '';

async function placeMarketSell(symbol, amount) {
  if (!KEY || !SECRET) return { sandbox: true, symbol, amount, soldForUsd: amount * 60000 };
  const endpoint = '/v1/order/new';
  const payload = { request: endpoint, nonce: Date.now().toString(), symbol, amount: String(amount), side: 'sell', type: 'market' };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = crypto.createHmac('sha384', SECRET).update(encoded).digest('hex');
  const headers = { 'X-GEMINI-APIKEY': KEY, 'X-GEMINI-PAYLOAD': encoded, 'X-GEMINI-SIGNATURE': signature };
  const resp = await axios.post(API + endpoint, payload, { headers });
  return resp.data;
}

module.exports = { placeMarketSell };
