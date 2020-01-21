import { firebaseAuth } from '@/plugins/firebase'

export default async (context) => {
  await firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      const loggedInUser = {
        uid: user.uid,
        name: user.name,
        email: user.email
      }
      context.store.dispatch('auth/setCurrentUser', loggedInUser)
      localStorage.setItem('firebaseUid', loggedInUser.uid)
    } else {
      context.store.dispatch('auth/setCurrentUser', {})
      localStorage.removeItem('firebaseUid')
    }
  })
}
