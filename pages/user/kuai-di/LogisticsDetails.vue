<template>
	<view class="logisticsView">
		<NavHeader :BindClick="goBack">
			<template v-slot:body>
				<view class="defaultBody">
					物流详情
				</view>
			</template>
		</NavHeader>
		<view class="LogisticsDetails_flow" v-if="Exstatus">
			<view class="flowItem" v-for="(item,index) in Exstatus" :key="index">
				<view class="statusNode" :class="{img_Success:index == 0}">
					<image v-if="index == 0" src="./image/successful.png" mode=""></image>
				</view>
				<p>{{item.context}}</p>
				<p>{{item.ftime}}</p>
			</view>
		</view>
		<view class="noData" v-else style="text-align: center;font-size: 38rpx;line-height: 160rpx;">
			🤐暂时没有关于该订单的物流情况🤐
		</view>
		<view class="footer">
			<tui-button width="153rpx" height="64rpx" class="ExpressInfoBtn" plain>物流服务</tui-button>
			<tui-button width="153rpx" height="64rpx" class="ExpressInfoBtn" plain>延长收货</tui-button>
			<tui-button width="153rpx" height="64rpx" class="ExpressInfoBtn" type="primary">确认收货</tui-button>
		</view>
	</view>
</template>

<script>
	import NavHeader from "./components/header.vue";
	import tuiButton from "@/components/thorui/tui-button/tui-button.vue"
	import { getKuaiDiRecordMsg } from '@/api/convenient-services';
	export default {
		components: {
			NavHeader,
			tuiButton
		},
		data() {
			return {
				myExpressData: [],
				queryList: {
					page: 1,
					size: 10,
					type: 1001,
					recordId: "",
				},
				Exstatus: null
			};
		},
		onLoad(options) {
			this.queryList.recordId = options.id
		},
		created() {
			this.getDataList()
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			getDataList() {
				getKuaiDiRecordMsg(this.queryList).then(res => {
					this.myExpressData = JSON.parse(JSON.stringify(res))
					res.records.forEach((item,index) => {
						let ResIndex = index
						this.myExpressData.records[index] = { ...item, req:JSON.parse(item.req), resp:JSON.parse(item.resp) }
					})
					this.Exstatus = this.myExpressData.records[0]?.req.lastResult.data
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.errorInfo {
	width: 100vw;
	font-size: 40rpx;
	font-weight: 600;
	text-align: center;
	box-sizing: border-box;
	padding: 30rpx;
}
.logisticsView {
	box-sizing: border-box;
	width: 100vw;
	height: auto;
	padding-top: 88rpx;
	padding-bottom: 102rpx;
}
.defaultBody {
		position: absolute;
		left: 50%;
		transform:translateX(-50%);
		font-size: 34rpx;
		color: white;
		font-weight: 550;
	}
	
.LogisticsDetails_flow {
	width: 100vw;
	height: auto;
	box-sizing: border-box;
	padding: 30rpx 32rpx;
	.flowItem {
		position: relative;
		border-left: 1px solid #9e9e9e;
		box-sizing: border-box;
		padding-left: 45rpx;
		padding-bottom: 45rpx;
		font-size: 35rpx;
		color: #9e9e9e;
		> p:nth-of-type(2) {
			margin-top: 10rpx;
			font-size: 25rpx;
		}
		.statusNode {
			position: absolute;
			top: 0;
			left: -12rpx;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			background-color: #9e9e9e;
		}
		.img_Success {
			top: 0;
			left: -20rpx;
			width: 40rpx;
			height: 40rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			> image {
				width: 35rpx;
				height: 35rpx;
			}
		}
	}
}

.footer {
	box-sizing: border-box;
	padding: 0rpx 24rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 102rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-top: 1rpx solid #9e9e9ea7;
	.ExpressInfoBtn {
		margin-left: 20rpx !important;
	}
}
</style>
