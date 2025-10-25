Backend for EJG CoinTender Integrated demo.

Start:
  cd backend
  npm install
  node index.js

Endpoints:
  POST /api/merchants {name,email}
  POST /api/merchants/:mid/invoices {amount_usd, crypto_currency, exchange}
  POST /api/simulate_deposit {invoice_id}
  GET /api/invoices/:invoice_id

Notes: exchange clients return sandbox mock responses when API keys are not set.
