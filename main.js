import Vue from 'vue';
import App from './App';
import store from './store';
import globalMixin from './mixin/global';

// #ifdef H5
import './forLogistics';
// #endif

Vue.config.productionTip = false;
//echar引入
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.prototype.$baseImgUrl = 'https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/';
Vue.filter('replacestar', function (value) {
  if (!value) return '';
  let str = value;
  str = str.replace(new RegExp('[^0-9]+', 'g'), '');
  if (str.length == 11) {
    str = str.toString().replace(/(\d{3})\d*(\d{4})/, '$1****$2');
  } else {
    str = str.toString().replace(/(\d{3})\d*(\d{4})/, '$1****$2');
  }
  return str;
});

Vue.mixin({
  methods: {
    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }
          data = data[key2];
        });
      });
    },
    $showToast(text, icon) {
      uni.showToast({
        title: text,
        duration: 2000,
        icon: icon || 'none'
      });
    },
    go(url) {
      if (!url) return;
      uni.navigateTo({
        url
      });
    },
    getSize(selecter) {
      const _this = this;
      return new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(_this);
        query
          .select(selecter)
          .boundingClientRect((data) => {
            resolve(data);
          })
          .exec();
      });
    },

    empty() {
      uni.showToast({
        title: '功能升级中...',
        icon: 'none'
      });
    },

    isLogin() {
      return !!this.$store.getters.userId;
    }
  }
});

Vue.use(globalMixin);

Vue.config.ignoredElements.push('wx-open-launch-weapp');

App.mpType = 'app';

const app = new Vue({
  ...App,
  store
});
app.$mount();

import filters from './utils/filter'; //导入过滤器文件
Object.keys(filters).forEach((key) => {
  //通过Object.key方法取出过滤器中导出的每个方法并挂在vue.filter上
  Vue.filter(key, filters[key]);
});
