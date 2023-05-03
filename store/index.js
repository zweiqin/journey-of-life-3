import Vue from 'vue'
import VueX from 'vuex'
import getters from './getters'
import auth from './modules/auth'
import shopCar from './modules/shopCar'
import customerService from './modules/customerService'
import location from './modules/location'
import user from './modules/user'
import community from './modules/community'

Vue.use(VueX)

export default new VueX.Store({
  state: () => { },
  getters,
  modules: {
    auth,
    shopCar,
		customerService,
    location,
    user,
    community
  }
})