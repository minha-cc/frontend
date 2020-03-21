import { db } from '@/plugins/firebase'

export async function get(accountId, referencePeriod) {
  const account = createEmptyAccount()
  const cart = await getCartDocument(accountId, referencePeriod)
  if (cart) {
    account.cart = cart
    account.transactions = await getTransactionsDocuments(
      accountId,
      referencePeriod
    )
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

export async function save(accountId, referencePeriod, transaction) {
  await db
    .collection('accounts')
    .doc(accountId)
    .collection('transactions')
    .doc(referencePeriod)
    .collection('transactions')
    .add({ ...transaction })
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

async function getCartDocument(accountId, referencePeriod) {
  const cartDocument = await db
    .collection('accounts')
    .doc(accountId)
    .collection('transactions')
    .doc(referencePeriod)
    .get()

  if (cartDocument.exists) {
    return cartDocument.data()
  }
  return null
}

async function getTransactionsDocuments(accountId, referencePeriod) {
  const transactions = []
  const actions = { disableFields: true }
  const transactionsDocuments = await db
    .collection('accounts')
    .doc(accountId)
    .collection('transactions')
    .doc(referencePeriod)
    .collection('transactions')
    .orderBy('date', 'desc')
    .get()

  transactionsDocuments.forEach((doc) => {
    const id = doc.id
    const data = doc.data()
    transactions.push({ id, ...data, ...actions })
  })
  return transactions
}
