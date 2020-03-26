import { db } from '@/plugins/firebase'

export const transactionReference = (accountId, referencePeriod) => {
  return db
    .collection('accounts')
    .doc(accountId)
    .collection('transactions')
    .doc(referencePeriod)
    .collection('transactions')
}

export async function createEmpty(accountId, referencePeriod) {
  const emptyTransaction = createTransaction()
  await transactionReference(accountId, referencePeriod).add({
    ...emptyTransaction
  })
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
