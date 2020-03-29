import { db } from '@/plugins/firebase'

export const transactionReference = (accountId, referencePeriod) => {
  return db
    .collection('accounts')
    .doc(accountId)
    .collection('transactions')
    .doc(referencePeriod)
    .collection('transactions')
}

export function empty(accountId, referencePeriod) {
  const emptyTransaction = createTransaction()
  return transactionReference(accountId, referencePeriod).add({
    ...emptyTransaction
  })
}

export async function save(accountId, referencePeriod, transaction) {
  const doc = await transactionReference(accountId, referencePeriod).doc(
    transaction.id
  )
  doc.update(transaction)
}

export async function remove(accountId, referencePeriod, transaction) {
  await transactionReference(accountId, referencePeriod)
    .doc(transaction.id)
    .delete()
}

function createTransaction() {
  return {
    date: '',
    description: '',
    value: 0.0,
    transactionType: '',
    newTransaction: true,
    disableFields: false
  }
}
