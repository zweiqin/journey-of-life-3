import Vue from 'vue'
import store from '../../store'
import { SET_SHOW_LOADING } from '../../store/modules/type'
export function showLoading(info = '') {
  store.commit(`app/${SET_SHOW_LOADING}`, { flag: true, info })
}

export function hideLoading() {
  store.commit(`app/${SET_SHOW_LOADING}`, { flag: false, info: '' })
}

export function showLoadingAuto(info = '', time = 2000) {
  store.commit(`app/${SET_SHOW_LOADING}`, { flag: true, info })
  setTimeout(() => {
    store.commit(`app/${SET_SHOW_LOADING}`, { flag: false, info: '' })
  }, time)
}

Vue.prototype.$showLoading = showLoading
Vue.prototype.$hideLoading = hideLoading
Vue.prototype.$showLoadingAuto = showLoadingAuto
