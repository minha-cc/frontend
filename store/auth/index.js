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
  async signinAsync(context, account) {
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
  async signupAsync(context, account) {
    try {
      await firebaseAuth.createUserWithEmailAndPassword(
        account.email,
        account.password
      )
      const user = firebaseAuth.currentUser
      await user.updateProfile({ displayName: account.name })
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
