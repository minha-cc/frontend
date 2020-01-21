import { firebaseAuth } from '@/plugins/firebase'

export const state = () => ({
  currentUser: {}
})

export const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = { ...payload }
  }
}

export const getters = {
  getCurrentUser(state) {
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
      context.commit('setCurrentUser', {})
      throw exception
    }
  },
  logout(context) {
    context.commit('setCurrentUser', {})
    localStorage.removeItem('firebaseUid')
  },
  setCurrentUser(context, payload) {
    context.commit('setCurrentUser', payload)
  }
}
