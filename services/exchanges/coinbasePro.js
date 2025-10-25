const axios = require('axios');
const crypto = require('crypto');
const API_URL = process.env.COINBASE_PRO_API || 'https://api-public.sandbox.pro.coinbase.com';
const KEY = process.env.COINBASE_PRO_KEY || '';
const SECRET = process.env.COINBASE_PRO_SECRET || '';
const PASSPHRASE = process.env.COINBASE_PRO_PASSPHRASE || '';

function sign(timestamp, method, requestPath, body='') {
  const what = timestamp + method.toUpperCase() + requestPath + body;
  const key = Buffer.from(SECRET, 'base64');
  return crypto.createHmac('sha256', key).update(what).digest('base64');
}

async function placeMarketSell(product_id, size) {
  if (!KEY || !SECRET) {
    return { sandbox: true, product_id, size, soldForUsd: size * 60000 };
  }
  const path = '/orders';
  const bodyObj = { product_id, side: 'sell', size: String(size), type: 'market' };
  const body = JSON.stringify(bodyObj);
  const ts = String(Math.floor(Date.now() / 1000));
  const sig = sign(ts, 'POST', path, body);
  const headers = {
    'CB-ACCESS-KEY': KEY,
    'CB-ACCESS-SIGN': sig,
    'CB-ACCESS-TIMESTAMP': ts,
    'CB-ACCESS-PASSPHRASE': PASSPHRASE,
    'Content-Type': 'application/json'
  };
  const resp = await axios.post(API_URL + path, bodyObj, { headers });
  return resp.data;
}

module.exports = { placeMarketSell };
