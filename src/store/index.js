import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scale: "1",
    userInfo: {},
  },
  getters:{//存储登录信息
    userinfo(state){
      return state.userInfo
    },
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    namespaced: true, // 为了解决不同模块命名冲突的问题

  }
})
