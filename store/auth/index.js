import { uuid } from '@/plugins/uuid'
import { firebaseAuth, db } from '@/plugins/firebase'

export const state = () => ({
  currentUser: {},
  accountId: {}
})

export const mutations = {
  setCurrentUser(state, payload) {
    state.currentUser = { ...payload }
  },
  setAccountId(state, payload) {
    state.accountId = { ...payload }
  }
}

export const getters = {
  getCurrentUser(state) {
    return state.currentUser
  },
  getAccount(state) {
    return state.account
  }
}

export const actions = {
  async signinAsync(context, user) {
    try {
      await firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
    } catch (exception) {
      context.commit('setCurrentUser', {})
      throw exception
    }
  },
  async signupAsync(context, userInfo) {
    try {
      const accountId = uuid()
      await firebaseAuth.createUserWithEmailAndPassword(
        userInfo.email,
        userInfo.password
      )
      const user = await firebaseAuth.currentUser
      await user.updateProfile({ displayName: user.username })
      await db
        .collection('accounts')
        .doc(user.uid)
        .set({ accountId })
      context.commit('setAccountId', { accountId })
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
