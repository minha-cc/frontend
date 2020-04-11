import { db } from '@/plugins/firebase'

export async function get(userId) {
  const transactionTypes = []
  const transactionTypesRef = db
    .collection('accounts')
    .doc(userId)
    .collection('transactionTypes')
  const transactionTypesSnapshot = await transactionTypesRef.get()
  transactionTypesSnapshot.forEach((doc) =>
    transactionTypes.push({ id: doc.id, ...doc.data() })
  )

  return transactionTypes
}
