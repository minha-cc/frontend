import { firebaseAuth } from '@/plugins/firebase'
import { functions } from '@/plugins/firebase.js'

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
      const data = {
        email: userInfo.email,
        password: userInfo.password,
        displayName: userInfo.username
      }
      const createUser = functions.httpsCallable('createUser')
      const result = await createUser(data)
      await firebaseAuth.signInWithEmailAndPassword(
        userInfo.email,
        userInfo.password
      )
      context.commit('setCurrentUser', {
        email: result.data.email,
        name: result.data.displayName,
        uid: result.data.uid
      })
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
