import { firebaseAuth } from '@/plugins/firebase'

const state = () => ({
  currentUser: {}
})

export const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = { ...payload }
  }
}

export const getters = {
  getCurrentUser() {
    return state.currentUser
  }
}

export const actions = {
  async signInAsync(context, account) {
    try {
      await firebaseAuth.signInWithEmailAndPassword(
        account.email,
        account.password
      )
    } catch (exception) {
      mutations.setCurrentUser({})
      throw exception
    }

    await firebaseAuth.onAuthStateChanged((user) =>
      context.commit('setCurrentUser', user)
    )
  }
}
