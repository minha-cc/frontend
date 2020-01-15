import { firebaseAuth } from '@/plugins/firebase'

export const state = () => ({
  currentUser: {}
})

export const mutations = {
  setUser(payload) {
    state.currentUser = { ...payload }
  }
}

export const actions = {
  async signInAsync(context, account) {
    mutations.setUser({})
    await firebaseAuth.signInWithEmailAndPassword(
      account.email,
      account.password
    )

    await firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        mutations.setUser(user)
      }
    })
  }
}
