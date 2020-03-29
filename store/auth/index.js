import { generateUUID } from '@/plugins/uuid'
import { firebaseAuth, db } from '@/plugins/firebase'

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
      const accountId = generateUUID()
      await firebaseAuth.createUserWithEmailAndPassword(
        userInfo.email,
        userInfo.password
      )
      const user = await firebaseAuth.currentUser
      await user.updateProfile({ displayName: userInfo.username })
      await db
        .collection('accounts')
        .doc(user.uid)
        .set({ accountId })
    } catch (exception) {
      context.commit('setCurrentUser', {})
      throw exception
    }
  },
  logout(context) {
    context.commit('setCurrentUser', {})
  },
  setCurrentUser(context, payload) {
    context.commit('setCurrentUser', payload)
  }
}
