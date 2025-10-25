async function payoutMerchant(merchantId, amountUsd) {
  return { success: true, paidAmount: amountUsd, txId: 'PAYOUT-' + Date.now() };
}
module.exports = { payoutMerchant };
