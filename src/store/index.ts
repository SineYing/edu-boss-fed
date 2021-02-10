import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  },
  mutations: {
    // 修改容器数据必须使用mutation函数
    setUser(state, payload) {
      state.user = JSON.parse(payload)
      localStorage.setItem('user', payload)
    },
  },
  actions: {
  },
  modules: {
  },
})
