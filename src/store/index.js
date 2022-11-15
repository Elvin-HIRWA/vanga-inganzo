import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    token: null,
    permissionName: null
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token') && localStorage.getItem('permissionName')) {
        state.token = localStorage.getItem('token')
        state.permissionName = localStorage.getItem('permissionName')
        state.isAuthenticated = true
      } else {
        state.token = null
        state.permissionName = null
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    setPermissionName(state, permissionName) {
      state.permissionName = permissionName
      state.isAuthenticated = true
    },
    removeToken(state) {
      localStorage.removeItem('token')
      state.token = ''
      state.isAuthenticated = false
    },
    removePermissionName(state) {
      localStorage.removeItem('permissionName')
      state.permissionName = ''
      state.isAuthenticated = false
    },
  },
  actions: {
  },
  modules: {
  }
})
