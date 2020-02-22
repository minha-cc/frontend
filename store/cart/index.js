export const state = () => ({
  cart: {}
})

export const mutations = {
  setCart(state, payload) {
    state.cart = { ...payload }
  }
}

export const getters = {
  getCart(state) {
    return state.cart
  }
}

export const actions = {
  updateCart(context, cart) {
    context.commit('setCart', cart)
  }
}
