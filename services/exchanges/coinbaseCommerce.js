const axios = require('axios');
const API = process.env.COINBASE_COMMERCE_API || 'https://api.commerce.coinbase.com/charges';
const KEY = process.env.COINBASE_COMMERCE_KEY || '';

async function createCharge(name, description, amountUSD) {
  if (!KEY) return { sandbox: true, hosted_url: 'https://sandbox.charge', amountUSD };
  const body = { name, description, local_price: { amount: String(amountUSD), currency: 'USD' }, pricing_type: 'fixed_price' };
  const resp = await axios.post(API, body, { headers: { 'X-CC-Api-Key': KEY, 'X-CC-Version': '2018-03-22', 'Content-Type': 'application/json' } });
  return resp.data.data;
}

module.exports = { createCharge };
