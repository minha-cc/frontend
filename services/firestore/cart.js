import { db } from '@/plugins/firebase'

export const cartReference = (accountId, referencePeriod) => {
  return db
    .collection('accounts')
    .doc(accountId)
    .collection('cart')
    .doc(referencePeriod)
}
