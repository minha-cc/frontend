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

// import { db } from '@/plugins/firebase'

// export async function get(accountId, referencePeriod) {
//   const account = createEmptyAccount()
//   const cart = await getCartDocument(accountId, referencePeriod)
//   if (cart) {
//     account.cart = cart
//     account.transactions = await getTransactionsDocuments(
//       accountId,
//       referencePeriod
//     )
//   } else {
//     await db
//       .collection('accounts')
//       .doc(accountId)
//       .collection('cart')
//       .doc(referencePeriod)
//       .set(account)
//   }
//   return account.overview
// }

// // export const listeningCartChange = (accountId, referencePeriod) => {
// //   return new Promise((resolve, reject) => {
// //     db.collection('accounts')
// //       .doc(accountId)
// //       .collection('cart')
// //       .doc(referencePeriod)
// //       .onSnapshot((doc) => {
// //         console.log('aaaaa')
// //         return resolve(doc.data())
// //       })
// //   })
// // }

// // export async function listeningCartChange(accountId, referencePeriod) {
// //   await db
// //     .collection('accounts')
// //     .doc(accountId)
// //     .collection('cart')
// //     .doc(referencePeriod)
// //     .onSnapshot((doc) => {
// //       return doc.data()
// //     })
// // }

// export function listeningCartChange(accountId, referencePeriod) {
//   db.collection('accounts')
//     .doc(accountId)
//     .collection('cart')
//     .doc(referencePeriod)
//     .onSnapshot((doc) => {
//       return doc.data()
//     })
// }

// function createEmptyAccount() {
//   return {
//     overview: {
//       income: 0.0,
//       outcome: 0.0,
//       essential: 0.0,
//       whises: 0.0,
//       savings: 0.0
//     }
//   }
// }

// async function getCartDocument(accountId, referencePeriod) {
//   const cartDocument = await db
//     .collection('accounts')
//     .doc(accountId)
//     .collection('cart')
//     .doc(referencePeriod)
//     .get()

//   if (cartDocument.exists) {
//     return cartDocument.data()
//   }
//   return null
// }

// async function getTransactionsDocuments(accountId, referencePeriod) {
//   const transactions = []
//   const actions = { disableFields: true }
//   const transactionsDocuments = await db
//     .collection('accounts')
//     .doc(accountId)
//     .collection('transactions')
//     .doc(referencePeriod)
//     .collection('transactions')
//     .orderBy('date', 'desc')
//     .get()

//   transactionsDocuments.forEach((doc) => {
//     const id = doc.id
//     const data = doc.data()
//     transactions.push({ id, ...data, ...actions })
//   })
//   return transactions
// }
