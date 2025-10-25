const axios = require('axios');
const crypto = require('crypto');
const API = process.env.BINANCE_API || 'https://testnet.binance.vision';
const KEY = process.env.BINANCE_KEY || '';
const SECRET = process.env.BINANCE_SECRET || '';

function signQuery(query) { return crypto.createHmac('sha256', SECRET).update(query).digest('hex'); }

async function placeMarketSell(symbol, quantity) {
  if (!KEY || !SECRET) return { sandbox: true, symbol, quantity, soldForUsd: quantity * 60000 };
  const path = '/api/v3/order';
  const params = `symbol=${symbol}&side=SELL&type=MARKET&quantity=${quantity}&timestamp=${Date.now()}`;
  const signature = signQuery(params);
  const url = `${API}${path}?${params}&signature=${signature}`;
  const resp = await axios.post(url, null, { headers: { 'X-MBX-APIKEY': KEY } });
  return resp.data;
}

module.exports = { placeMarketSell };
