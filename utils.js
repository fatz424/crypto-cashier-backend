const { v4: uuidv4 } = require('uuid');
function genApiKey() { return uuidv4(); }
function genInvoiceId() { return 'INV-' + Math.random().toString(36).slice(2,10).toUpperCase(); }
module.exports = { genApiKey, genInvoiceId };
