import { db } from '@/plugins/firebase'

export async function get() {
  const transactionTypes = []
  const transactionTypesRef = db.collection('transactionTypes')
  const transactionTypesSnapshot = await transactionTypesRef.get()
  transactionTypesSnapshot.forEach((doc) => transactionTypes.push(doc.data()))

  return transactionTypes
}
