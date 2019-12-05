// https://vuex.vuejs.org/en/mutations.html

export default {
  saveToken (state, token) {
    state.token = token
  },
  saveRole (state, role) {
    state.role = role
  }
}
