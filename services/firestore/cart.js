import { db } from '@/plugins/firebase'

export const cartReference = (accountId, referencePeriod) => {
  return db
    .collection('accounts')
    .doc(accountId)
    .collection('cart')
    .doc(referencePeriod)
}

export async function get(accountId, referencePeriod) {
  const cart = await cartDocument(accountId, referencePeriod)
  if (cart) {
    return cart
  }

  const emptyCart = createEmptyCart()
  await cartReference(accountId, referencePeriod).set(emptyCart)
  return emptyCart
}

export function createEmptyCart() {
  return {
    income: 0.0,
    outcome: 0.0,
    essential: 0.0,
    whises: 0.0,
    savings: 0.0
  }
}

async function cartDocument(accountId, referencePeriod) {
  const cartDocument = await cartReference(accountId, referencePeriod).get()

  if (cartDocument.exists) {
    return cartDocument.data()
  }
  return null
}
