import Vue from 'vue'
import VueX from 'vuex'
import getters from './getters'
import auth from './modules/auth'
import shopCar from './modules/shopCar'
import customerService from './modules/customerService'
import location from './modules/location'

Vue.use(VueX)

export default new VueX.Store({
  state: () => { },
  getters,
  modules: {
    auth,
    shopCar,
		customerService,
    location
  }
})