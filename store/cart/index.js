export const state = () => ({
  cart: {
    income: 0.0,
    outcome: 0.0,
    essential_expenses: 0.0,
    personal_whises: 0.0,
    savings: 0.0
  }
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
