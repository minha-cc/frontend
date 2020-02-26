import { uuid } from '@/plugins/uuid'
import { firebaseAuth, db } from '@/plugins/firebase'

const accounts = db.collection('accounts')

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
      const signedInUser = await firebaseAuth.currentUser
      const accountIdRef = await accounts.doc(signedInUser.uid).get()
      const accountId = accountIdRef.data()
      const signedIn = {
        uid: signedInUser.uid,
        username: signedInUser.displayName,
        email: signedInUser.email,
        accountId: accountId.accountId
      }
      context.commit('setCurrentUser', signedIn)
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
      await user.updateProfile({ displayName: userInfo.username })
      await db
        .collection('accounts')
        .doc(user.uid)
        .set({ accountId })

      const signedInUser = {
        uid: user.uid,
        username: user.displayName,
        email: user.email,
        accountId
      }
      context.commit('setCurrentUser', signedInUser)
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
