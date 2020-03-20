import { db } from '@/plugins/firebase'

export async function get(accountId, referencePeriod) {
  const account = createEmptyAccount()
  const cart = await getCartDocument(accountId, referencePeriod)
  if (cart.exists) {
    account.cart = cart.data()
  } else {
    await db
      .collection('accounts')
      .doc(accountId)
      .collection('transactions')
      .doc(referencePeriod)
      .set(account)
  }
  return account
}

function createEmptyAccount() {
  return {
    cart: {
      income: 11.0,
      outcome: 0.0,
      essential: 0.0,
      whises: 0.0,
      savings: 0.0
    }
  }
}

function getCartDocument(accountId, referencePeriod) {
  return db
    .collection('accounts')
    .doc(accountId)
    .collection('transactions')
    .doc(referencePeriod)
    .get()
}
