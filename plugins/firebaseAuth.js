import { firebaseAuth, db } from '@/plugins/firebase'

export default (context) => {
  const accounts = db.collection('accounts')

  return new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        return resolve()
      }
      accounts
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const accountId = doc.data()
            const loggedInUser = {
              uid: user.uid,
              username: user.displayName,
              email: user.email,
              accountId
            }
            return resolve(
              context.store.dispatch('auth/setCurrentUser', loggedInUser)
            )
          } else {
            return resolve()
          }
        })
    })
  })
}
