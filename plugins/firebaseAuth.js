import { firebaseAuth } from '@/plugins/firebase'

export default (context) => {
  return new Promise((resolve, reject) => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (!user) {
        return resolve()
      }

      const loggedInUser = {
        uid: user.uid,
        username: user.displayName,
        email: user.email
      }

      return resolve(
        context.store.dispatch('auth/setCurrentUser', loggedInUser)
      )
    })
  })
}
