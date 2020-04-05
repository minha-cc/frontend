import { db } from '@/plugins/firebase'

export const transactionReference = (accountId, referencePeriod) => {
  return db
    .collection('accounts')
    .doc(accountId)
    .collection('transactions')
    .doc(referencePeriod)
    .collection('transactions')
}
