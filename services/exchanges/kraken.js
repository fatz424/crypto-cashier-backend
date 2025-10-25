const axios = require('axios');
const crypto = require('crypto');
const API = process.env.KRAKEN_API || 'https://api.kraken.com';
const KEY = process.env.KRAKEN_KEY || '';
const SECRET = process.env.KRAKEN_SECRET || '';

async function placeMarketSell(pair, volume) {
  if (!KEY || !SECRET) return { sandbox: true, pair, volume, soldForUsd: volume * 60000 };
  const path = '/0/private/AddOrder';
  const url = API + path;
  const nonce = Date.now() * 1000;
  const body = { nonce, pair, type: 'sell', ordertype: 'market', volume: String(volume) };
  const resp = await axios.post(url, new URLSearchParams(body).toString(), { headers: { 'API-Key': KEY, 'API-Sign': 'SIGNATURE' } });
  return resp.data;
}

module.exports = { placeMarketSell };
