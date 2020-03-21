import { db } from '@/plugins/firebase'

export async function save(accountId, referencePeriod, transaction) {
  await db
    .collection('accounts')
    .doc(accountId)
    .collection('transactions')
    .doc(referencePeriod)
    .collection('transactions')
    .add({ ...transaction })
}
