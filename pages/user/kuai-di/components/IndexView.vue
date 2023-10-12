<template>
	<view class="IndexView">
		<view class="selectExpress">
			<view class="selectInput">
				<image class="selectIcon" src="../image/sousuo.png" mode=""></image>
				<input class="seltInput" v-model="expressId" type="text" placeholder="请输入订单编号">
				<image class="seltImgIcon" src="../image/saoma.png" mode=""></image>
			</view>
			<view class="ExpressOptions">
				<view class="optItem" @click="runToExpress('/pages/user/kuai-di/DeliveryExpress')">
					<image src="../image/delTask_slt.png" mode=""></image>
					<p>寄快递</p>
				</view>
				<view class="optItem" @click="runToExpress()">
					<image src="../image/piliangjijian.png" mode=""></image>
					<p>寄大件</p>
				</view>
				<view class="optItem" @click="runToExpress()">
					<image src="../image/qingdanxiang.png" mode=""></image>
					<p>批量寄件</p>
				</view>
			</view>
		</view>
		<view class="ExpressView">
			<view class="viewHeader">
				<span>合作快递公司</span> <span></span>
			</view>
			<view>
				<scroll-view class="ExpressSelection" scroll-x="true">
					<view v-for="(item, index) in ECList" class="SelectionItem">
						<view class="icfonts">
							<image :src="item.imgUrl" mode=""></image> <span>{{ item.name }}</span>
						</view>
						<!-- <view class="NewMoney">
							<span>5.5</span>元起
							</view>
							<view class="OldMoney">
							市场价:<span>10</span> 元
							</view>
							<button class="goSend">去寄件</button> -->
					</view>
				</scroll-view>
			</view>
			<view class="ExpressRecord">
				<view class="viewHeader" :class="{ 'sticky-fixed': isFixed }">
					<span>我的快递</span> <span></span>
				</view>
				<scroll-view v-if="myExpressData.records.length > 0" class="RecordList" scroll-y>
					<view v-for="(item, index) in myExpressData.records" :key="item.sn" class="RecordItem">
						<image :src="item.imgUrl" mode=""></image>
						<span>订单编号:{{ item.sn }}</span>
						<button v-if="item.status == 4" type="primary" class="ExpressDetails" @click="ViewDetails(item)">查看详情</button>
						<button v-else-if="item.status == 3" type="primary" class="ExpressDetails gray">已取消</button>
						<button v-else-if="item.status == 2" type="primary" class="ExpressDetails gray">受理失败</button>
						<!-- <button type="warn" class="ExpressDetails" @click="CancelOrder(item)" v-else-if="item.status == 1 || item.status == 0">取消订单</button> -->
						<button
							v-else-if="(item.status == 1 || item.status == 0) && item.resp" type="warn" class="ExpressDetails"
							@click="CancelOrder(item)"
						>
							取消订单
						</button>
						<button v-else type="warn" class="ExpressDetails">订单异常</button>
					</view>
				</scroll-view>
				<view v-else class="noRecordData">
					<image src="../image/kongkongruye.png" mode=""></image>
					<p>没有您最近的查件记录哦</p>
					<p>仅保留最近两个星期的历史记录！！</p>
				</view>
			</view>
		</view>
		<TuiModal :show="modal" custom @click="handleClick" @cancel="hideModal">
			<text
				style="font-size: 36rpx; font-weight: 600;width: 100%;display: inline-block; text-align: center;"
			>
				取消退款原因
			</text>
			<TuiInput v-model="cancelMsg" placeholder="请输入退款原因"></TuiInput>
			<view class="cacelBtn">
				<TuiButton width="200rpx" height="70rpx" type="danger" @click="hideModal">取消</TuiButton>
				<TuiButton width="200rpx" height="70rpx" type="primary" @click="handleClick">确认</TuiButton>
			</view>
		</TuiModal>
	</view>
</template>

<script>
import tuiButton from '@/components/thorui/tui-button/tui-button.vue'
import tuiInput from '@/components/thorui/tui-input/tui-input.vue'
import tuiModal from '@/components/thorui/tui-modal/tui-modal.vue'
import {
	getBianminRecordKuaidiApi, // 查询我个人寄快递的记录
	// getKuaiDiRecordMsg, // 快递状态详情
	getKuaidi100ComApi, // 获取可使用快递公司编码
	// getKuaidi100PriceApi, // C端寄件下单-价格查询
	// addKuaidi100CorderApi,  // C端寄件下单
	orderCancelApi // C端寄件下单-取消
} from '@/api/convenient-services'
export default {
	components: {
		TuiModal: tuiModal,
		TuiInput: tuiInput,
		TuiButton: tuiButton
	},
	props: {
		ECList: {
			type: [Object, Array],
			default: null
		},
		isFixed: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			modal: false,
			cancelMsg: '',
			expressId: '',
			myExpressData: {
				records: []
			},
			queryList: {
				page: 1,
				size: 10,
				type: 1
			},
			dataLength: 0,
			CancelOrderParams: {}
		}
	},
	created() {
		this.getMyExpressList()
		// getKuaidi100ComApi().then(res => {  // 该方法用来获取可以邮寄的公司，但是由于数据较少，且没有相对应的图片传输过来，因此暂时写死，业务拓展时再做更改
		// 	console.log(res.data)
		// 	const Array = [];
		// 	for(let key in res.data) {
		// 		Array.push({name: res.data[key], key: key})
		// 	}
		// })
		// console.log(this.ECList)
	},
	methods: {
		runToExpress(path) {
			path ? uni.navigateTo({
				url: path
			}) : uni.showToast({
				title: '暂时未开通服务!',
				icon: 'none'
			})
		},
		async getMyExpressList() {
			const OldDatalength = this.dataLength
			// getBianminRecordKuaidiApi  getKuaiDiRecordMsg  // 用于对比数据是否能对应上
			getBianminRecordKuaidiApi(this.queryList).then((res) => {
				// 转化JSON字符串的数据格式 方便后面使用
				this.myExpressData = JSON.parse(JSON.stringify(res))
				this.dataLength = res.records.length
				res.records.forEach((item, index) => {
					const ResIndex = index
					this.myExpressData.records[index] = { ...item, req: JSON.parse(item.req), resp: JSON.parse(item.resp) }
					this.ECList.forEach((item, index) => {
						// console.log(this.myExpressData.records[ResIndex].req.orderReq.kuaidicom)
						if (item.key == this.myExpressData.records[ResIndex].req.orderReq.kuaidicom) {
							this.myExpressData.records[ResIndex].imgUrl = item.imgUrl
							this.myExpressData.records[ResIndex].name = item.name
						}
					})
				})
				if (OldDatalength == this.dataLength && OldDatalength > 0) {
					uni.showToast({
						title: '没有更多了...😐',
						icon: 'none'
					})
				} else {
					this.queryList.size += 6
				}
			})
		},
		ViewDetails(item) {
			uni.navigateTo({
				url: `/pages/user/kuai-di/LogisticsDetails?id=${item.id}`
			})
		},
		CancelOrder(res) {
			const params = {
				orderId: res.resp.data.orderId,
				recordId: res.id,
				taskId: res.resp.data.taskId,
				userId: res.req.userId
			}
			this.CancelOrderParams = params
			this.modal = true
			console.log(this.CancelOrderParams)
		},
		// 隐藏组件
		hideModal() {
			this.modal = false
		},
		handleClick() {
			orderCancelApi({ cancelMsg: this.cancelMsg, ...this.CancelOrderParams }).then((res) => {
				console.log(res)
				this.getMyExpressList()
				this.hideModal()
			})
		}
	}
}
</script>

<style lang="scss">
.cacelBtn {
	display: flex;
	justify-content: space-around;
}

.gray {
	background-color: #979797 !important;
}

.sticky-fixed {
	/* #ifdef H5 */
	position: fixed;
	top: 88rpx !important;
	left: 0;
	width: 100vw;
	font-size: 40rpx !important;
	height: 60rpx;
	line-height: 60rpx;
	background-color: white;

	>span {
		margin-left: 20rpx;
	}

	/* #endif */
	/* #ifndef H5 */
	position: fixed;
	top: 80rpx !important;
	/* #endif */
	z-index: 999 !important;
}

.selectExpress {
	position: relative;
	width: 100%;
	height: 270rpx;
	margin-bottom: 80rpx;
	background-color: #327ee4;
	border-bottom-left-radius: 20%;
	border-bottom-right-radius: 20%;
	display: flex;
	flex-direction: column;
	align-items: center;

	.selectInput {
		position: relative;
		margin-top: 38rpx;
		width: 711rpx;
		height: 92rpx;
		background-color: white;
		border-radius: 15rpx;
		display: flex;
		// justify-content: space-around;
		align-items: center;
		
		.selectIcon {
			width: 38rpx;
			height: 38rpx;
			margin-left: 20rpx;
		}

		.seltInput {
			margin-left: 15rpx;
			font-size: 38rpx;
		}

		.seltImgIcon {
			position: absolute;
			right: 30rpx;
			width: 48rpx;
			height: 48rpx;
		}
	}

	.ExpressOptions {
		position: absolute;
		top: 150rpx;
		width: 711rpx;
		height: 200rpx;
		border-radius: 15rpx;
		background-color: white;
		font-size: 35rpx;
		font-weight: 550;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.optItem {
			display: flex;
			flex-direction: column;
			align-items: center;

			>image {
				width: 90rpx;
				height: 90rpx;
			}

			>p {
				margin-top: 5rpx;
			}
		}
	}
}

.ExpressView {
	box-sizing: border-box;
	width: 100vw;
	overflow: hidden;
	padding: 20rpx 22rpx 70rpx 22rpx;

	.viewHeader {
		display: flex;
		justify-content: space-between;
		font-size: 34rpx;
		font-weight: 600;

		>span:nth-of-type(1) {
			color: #000;
		}

		>span:nth-of-type(2) {
			color: #3284e8;
		}
	}

	.ExpressSelection {
		display: flex;
		display: inline-block;
		white-space: nowrap;
		margin-top: 22rpx;

		.SelectionItem {
			display: inline-flex;
			flex-direction: column;
			align-items: center;
			width: 176rpx;
			// height: 252rpx;
			margin-right: 20px;
			border-radius: 15rpx;
			background-color: white;
			padding: 16rpx 10rpx;

			.icfonts {
				display: flex;
				align-items: center;

				>image {
					width: 50rpx;
					height: 50rpx;
				}

				>span {
					margin-left: 10rpx;
					font-size: 24rpx;
				}
			}

			.NewMoney {
				margin-top: 16rpx;
				font-size: 24rpx;
				letter-spacing: 2rpx;

				>span {
					letter-spacing: 1rpx;
					margin-right: 5rpx;
					font-size: 50rpx;
					color: #ff651a;
				}
			}

			.OldMoney {
				margin-top: 12rpx;
				font-size: 20rpx;
				color: #868e92;

				>span {
					margin: 0 5rpx;
					text-decoration: line-through;
				}
			}

			.goSend {
				margin-top: 15rpx;
				font-size: 20rpx;
				line-height: 37rpx;
				color: #fff;
				width: 114rpx;
				height: 37rpx;
				background-color: #0283fb;
			}
		}
	}

	.ExpressRecord {
		width: 100%;

		.RecordList {
			// min-height: ;
			margin-top: 20rpx;
			// max-height: 670rpx;
		}

		.RecordItem {
			margin-bottom: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 0rpx 20rpx;
			width: 100%;
			height: 130rpx;
			border-radius: 20rpx;
			background-color: white;

			>image {
				width: 76rpx;
				height: 76rpx;
			}

			>span {
				max-width: 400rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: left;
				white-space: nowrap;
				letter-spacing: 1rpx;
				font-size: 30rpx;
			}

			>button {
				margin: 0;
				// background-color: #01aaff;
				color: #fff;
				padding: 0;
				font-size: 20rpx;
				width: 116rpx;
				line-height: 60rpx;
				height: 60rpx;
			}
		}

		.noRecordData {
			display: flex;
			flex-direction: column;
			align-items: center;

			>image {
				width: 450rpx;
				height: 500rpx;
			}

			line-height: 50rpx;
			font-size: 32rpx;
			color: #868e92;
		}
	}
}
</style>
