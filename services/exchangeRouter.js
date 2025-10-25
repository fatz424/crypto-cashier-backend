const coinbase = require('./exchanges/coinbasePro');
const coinbaseCommerce = require('./exchanges/coinbaseCommerce');
const binance = require('./exchanges/binance');
const kraken = require('./exchanges/kraken');
const gemini = require('./exchanges/gemini');
const bitstamp = require('./exchanges/bitstamp');
const bitfinex = require('./exchanges/bitfinex');
const kucoin = require('./exchanges/kucoin');

async function placeSell({ exchange, symbol, size, amountUsd }) {
  switch((exchange||'').toLowerCase()) {
    case 'coinbase': return coinbase.placeMarketSell(symbol, size);
    case 'coinbase-commerce': return coinbaseCommerce.createCharge('Sale', 'Sale conversion', amountUsd);
    case 'binance': return binance.placeMarketSell(symbol, size);
    case 'kraken': return kraken.placeMarketSell(symbol, size);
    case 'gemini': return gemini.placeMarketSell(symbol, size);
    case 'bitstamp': return bitstamp.placeMarketSell(symbol, size);
    case 'bitfinex': return bitfinex.placeMarketSell(symbol, size);
    case 'kucoin': return kucoin.placeMarketSell(symbol, size);
    default: throw new Error('Unsupported exchange: ' + exchange);
  }
}

module.exports = { placeSell };
