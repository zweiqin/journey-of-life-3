<template>
	<view class="DeliveryExpress">
		<NavHeader></NavHeader>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="NavHeader"></view>
		<DeliveryExpress :SenderData="SenderData" :collecterData="collecterData" :options="options"></DeliveryExpress>
		<SubsetTabbar :currIndex="1"></SubsetTabbar>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="SubsetTabbar"></view>
	</view>
</template>

<script>
	import SubsetTabbar from "./components/SubsetTabbar.vue";
	import DeliveryExpress from "./components/DeliveryExpress.vue"
	import NavHeader from "./components/header.vue";
	// import {
	// 	// getBianminRecordKuaidiApi,  // 查询我个人寄快递的记录
	// 	getKuaidi100ComApi,  // 获取可使用快递公司编码
	// 	getKuaidi100PriceApi, // C端寄件下单-价格查询
	// 	addKuaidi100CorderApi,  // C端寄件下单
	// 	orderCancelApi // C端寄件下单-取消
	// } from '@/api/convenient-services';
	export default {
		components: {
			SubsetTabbar,
			NavHeader,
			DeliveryExpress
		},
		data() {
			return {
				options: {},
				SenderData: {
					area: "请完善地区信息",
					detailedArea: "",
					name: "请完善个人信息",
					mobile: "",
				},
				collecterData: {
					area: "请完善地区信息",
					detailedArea: "",
					name: "请完善收件人信息",
					mobile: "",
				},
			};
		},
		methods: {
			
		},
		onLoad(options) {
			// 测试接口是否正常可用
			// getKuaidi100PriceApi({
			// 	"kuaidicom": "shunfeng",
			// 	"recManPrintAddr": "广东省深圳市",
			// 	"sendManPrintAddr": "广东省深圳市",
			// 	"serviceType": "顺丰标快",
			// 	"weight": "1"
			// }).then(res => {
			// 	console.log(res)
			// })
		},
		// 每次页面重新出现时加载用户地址数据
		onShow() {
			let that = this
			uni.getStorage({
				key: 'UserExpressInfoSend',
				success: function (res) {
					that.SenderData = res.data
					// console.log(this.SenderData);
				}
			});
			uni.getStorage({
				key: 'UserExpressInfoCollect',
				success: function (res) {
					that.collecterData = res.data
					// console.log(res.data);
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
.DeliveryExpress {
	min-height: 100vh;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
	.NavHeader {
		height: 88rpx;
	}
	.SubsetTabbar {
		height: 113rpx;
	}
}
</style>