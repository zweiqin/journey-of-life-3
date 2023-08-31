<template>
	<view class="ExpressServiceContainer">
		<NavHeader :BindClick="goBack"></NavHeader>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="NavHeader"></view>  
		<view class="main">
			<IndexView ref="IndexView" :isFixed="isFixed" :ECList="ECList"></IndexView>
		</view>
		<SubsetTabbar :currIndex="currIndex" :BindClick="CheckTabbar"></SubsetTabbar>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="SubsetTabbar"></view>
	</view>
</template>

<script>
	import IndexView from "./components/IndexView.vue";
	import DeliveryExpress from "./components/DeliveryExpress.vue"
	import MyExpress from "./components/MyExpress.vue";
	import SubsetTabbar from "./components/SubsetTabbar.vue";
	import NavHeader from "./components/header.vue";
	import { ECList } from "./ExpressData.js"
	import {
		getUserId
	} from '@/utils';
	// import {
	// 	// getBianminRecordKuaidiApi,  // 查询我个人寄快递的记录
	// 	// getKuaidi100ComApi,  // 获取可使用快递公司编码
	// 	getKuaidi100PriceApi, // C端寄件下单-价格查询
	// 	addKuaidi100CorderApi,  // C端寄件下单
	// 	orderCancelApi // C端寄件下单-取消
	// } from '@/api/convenient-services';
	export default {
		name: 'KuaiDi',
		components: {
			IndexView,
			DeliveryExpress,
			MyExpress,
			NavHeader,
			SubsetTabbar
		},
		props: {
			
		},
		data() {
			return {
				currIndex: 0,
				seletyuanH: uni.upx2px(540), // 用于判定初始位置的值
				isFixed: false,
				ECList // 可用快递公司列表
			}
		},
		created() {
			// getKuaidi100PriceApi({
			//     "kuaidicom": "shunfeng",
			//     "recManPrintAddr": "广东省深圳市",
			//     "sendManPrintAddr": "广东省深圳市",
			//     "serviceType": "顺丰标快",
			//     "weight": "1"
			// }).then(res => {
			// 	console.log(res)
			// })
		},
		onPullDownRefresh () {  // 下拉刷新
			// console.log('refresh');
			// setTimeout(function () {
			// 	uni.stopPullDownRefresh();
			// }, 1000);
		},
		onReachBottom() {   
			this.$refs.IndexView.myExpressData?this.$refs.IndexView.getMyExpressList():''
		}, 
		methods: {
			goBack() {
				uni.navigateBack()
			},
			CheckTabbar(ev, index) {
				this.currIndex = index
				// console.log(this.currIndex)
			}
		},
		onPageScroll(e) {
			// 判断位置 完成吸顶效果
			if (this.seletyuanH > e.scrollTop) {
				// console.log(false)
				this.isFixed = false
			} else {
				// console.log(true)
				this.isFixed = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.ExpressServiceContainer {
		position: relative;
		// width: 100%;
		min-height: 100vh;
		box-sizing: border-box;
		background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
	}
	.NavHeader {
		height: 88rpx;
	}
	.SubsetTabbar {
		height: 113rpx;
	}
</style>