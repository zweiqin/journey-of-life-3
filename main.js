import Vue from 'vue';
import App from './App';
import 'animate.css'

Vue.config.productionTip = false;
//echar引入
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.filter('replacestar', function (value) {
	if (!value) return '';
	let str = value;
	str = str.replace(new RegExp("[^0-9]+", "g"), "")
	if (str.length == 11) {
		str = str.toString().replace(/(\d{3})\d*(\d{4})/, '$1****$2')
	} else {
		str = str.toString().replace(/(\d{3})\d*(\d{4})/, '$1****$2')
	}
	return str;
})
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
				})
			});
		},
		$showToast(text, icon) {
			uni.showToast({
				title: text,
				duration: 2000,
				icon: icon || "none",
			});
		},
		go(url){
			if(!url) return
			uni.navigateTo({
				 url
			});
		}
	}
});

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
