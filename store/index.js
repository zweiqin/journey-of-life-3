import Vue from 'vue'
import VueX from 'vuex'
import getters from './getters'
import auth from './modules/auth'

Vue.use(VueX)

export default new VueX.Store({
  state: () => { },
  getters,
  modules: {
    auth
  }
})