<template>
	<view class="vip-page">
		<!-- header -->
		<VipHeader @share-activity="handleShareActivity" :campaignsType="campaignsType" :name="type == 2 ? '金管家会员' : '限时钜惠'">
		</VipHeader>

		<!-- 金管家的header -->
		<view class="pane" v-if="type == 2">
			<view class="desc-pane">
				<view class="text">
					<view class="text1">开通金管家会员</view>
					<view class="text2">享受{{ beeSteward.length }}大福利</view>
				</view>
			</view>
			<PayBar :price="type == 2 ? 299 : 39.9" @pay="handlePayVip"></PayBar>
		</view>

		<!-- 服务内容 -->
		<VipServePane :type="type * 1" :subTitle="type == 2 ? '金管家会员权益' : '39.9元清洗套餐'"
			:desc="type == 2 ? `享受${beeSteward.length}大权益` : '任选一项清洗服务'" v-model="currentIndulgence"
			:data="type == 2 ? beeSteward : indulgenceData" :radius="type == 2 ? '42upx' : '42rpx 42rpx 0 0'" class="vip-list">
		</VipServePane>

		<!-- 抢购 -->
		<PayBar v-if="type == 1" :price="type == 2 ? 299 : 39.9" @pay="handlePayVip"></PayBar>

		<!-- 赠品 -->
		<view class="gift" v-if="type == 2">
			<image class="gift-icon" src="../../static/images/con-center/vip/gift.png"></image>
			<text>购买本套餐赠送羊驼一只</text>
			<image class="gift-detail" src="../../static/images/con-center/vip/gift-detail.png"></image>
		</view>

		<!-- 赠品 -->
		<view class="desc" v-if="type == 2">
			<view class="title">权益说明：</view>
			<view class="detail">
				此会员为服务100平方左右的商品房客户， 别墅或自建房需另行购买。
				<br>
				会员一年内有效
				<br>
				以上服务不含更换配件费用，水电检修服务 不含水电改造。
			</view>
		</view>

		<!-- 权益 -->
		<view class="tip">温馨提示：在法律允许范围内，本公司拥有该活动最终解释权</view>

		<!-- 底部操作栏 -->
		<VipFooter v-if="userId"></VipFooter>

		<tui-modal :show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/community-center/vip-center/vip-detail')"></tui-modal>

		<!-- 生成二维码 -->
		<view v-if="activityCode">
			<uqrcode ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + activityCode"
				@complete="handleCompleteCode"></uqrcode>
		</view>
	</view>
</template>

<script>
import VipHeader from './components/VipHeader.vue'
import VipServePane from './components/VipServePane.vue';
import PayBar from './components/PayBar.vue'
import VipFooter from './components/VipFooter.vue'
import { getServeListApi } from '../../api/community-center'
import { USER_ID, COMMUNITY_ORDER_NO } from '../../constant'
import showModal from '../../mixin/showModal'
import {
	getPurchaseRecordApi,
	getCreateCodeApi
} from '../../api/user'
import { getUserId } from '../../utils'

export default {
	components: { VipHeader, VipServePane, PayBar, VipFooter },
	data() {
		return {
			type: null,
			campaignsType: null,
			userId: null,
			allServeList: [],
			beeSteward: [],
			indulgenceData: [],
			currentIndulgence: '',
			activityCode: '',
			qrcodeUrl: 'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/user/sever/activityCenter/index?code='
		}
	},

	mixins: [showModal()],

	onLoad(option) {
		this.type = option.type
		this.campaignsType = option.campaignsType * 1
		if (this.type) {
			uni.setStorageSync('SERVE_TYPE', option.type)
		}
		this.getServeList()
		this.userId = uni.getStorageSync(USER_ID)
	},

	onShow() {
		if (!this.type) {
			this.type = uni.getStorageSync('SERVE_TYPE')
		}
		uni.removeStorageSync(COMMUNITY_ORDER_NO)
	},

	methods: {
		// 获取服务列表
		async getServeList() {
			uni.showLoading({
				title: '加载中'
			})
			const res = await getServeListApi()
			uni.hideLoading()
			if (res.statusCode === 20000) {
				this.allServeList = res.data
				this.beeSteward = res.data
					.find((item) => item.serverType === 1)
					.serverContent.split(',')
				this.indulgenceData = res.data.filter((item) => item.serverType === 2)
				this.currentIndulgence = this.indulgenceData[0].serverContent

				console.log(this.beeSteward);
				// this.handleShareServe(true)
			}
		},

		// 点击购买会员
		handlePayVip() {
			if (!this.isLogin()) {
				this.$data._isShowTuiModel = true
				return
			}

			if (!this.currentIndulgence) {
				this.ttoast({
					type: 'fail',
					title: '请选择服务项'
				})
				return
			}

			if (this.type == 2) {
				const currentServe = this.allServeList.find((item) => item.serverType === 1)
				uni.navigateTo({
					url:
						'/community-center/active-consignee?data=' +
						JSON.stringify(currentServe) +
						'&repair=true'
				})
			} else {
				const currentServe = this.allServeList.find((item) => item.serverContent === this.currentIndulgence)
				uni.navigateTo({
					url:
						'/community-center/active-consignee?data=' +
						JSON.stringify(currentServe) +
						'&repair=true'
				})
			}
		},

		// 分享活动邀请码
		async handleShareActivity() {
			if (this.campaignsType === 0) {
				const res = await getPurchaseRecordApi({ userId: getUserId(), price: 299 }) // TODO: 为啥是299
				if (res.data) {
					getCreateCodeApi({
						userId: getUserId()
					}).then((res) => {
						this.activityCode = res.data
						this.handleShare()
					})
				} else {
					uni.showToast({
						title: '请您购买金管家会员后，即可进行分享',
						duration: 5000,
						icon: 'none'
					})
				}
			}
		},

		// 点击分享
		handleShare() {
			uni.showLoading({
				title: '活动邀请码生成中...'
			})
			const _this = this
			this.$refs.uqrcode.make({
				success: () => {
					uni.hideLoading()
					_this.$refs.posterPopupRef.show({
						shareCode: this.shareCode,
						logo: require('../../static/images/con-center/alpaca-forward.png'),
						desc: `活动邀请码分享`
					})
				}
			})
		},

		// 完成
		handleCompleteCode(e) {
			const _this = this
			if (e.success) {
				this.$refs.uqrcode.toTempFilePath({
					success: (res) => {
						if (!_this.shareCode) {
							_this.shareCode = res.tempFilePath
						}
					}
				})
			}
		},
		// 分享活动邀请码
		async handleShareActivity() {
			if (this.campaignsType === 0) {
				const res = await getPurchaseRecordApi({ userId: getUserId(), price: 299 })
				if (res.data) {
					getCreateCodeApi({
						userId: getUserId()
					}).then((res) => {
						this.activityCode = res.data
						this.handleShare()
					})
				} else {
					uni.showToast({
						title: '请您购买金管家会员后，即可进行分享',
						duration: 5000,
						icon: 'none'
					})
				}
			}
		}
	},
}
</script>

<style lang="less" scoped>
.vip-page {
	width: 100%;
	height: 100vh;
	overflow: scroll;
	background-color: #ffecd5;
	padding: 30upx;
	box-sizing: border-box;
	background: url('../../static/images/con-center/vip/vip-pabe-bg.png') no-repeat;
	background-size: cover;
	padding-bottom: 140upx;

	.vip-list {
		position: relative;


	}

	.tip {
		color: #873816;
		font-size: 24upx;
		text-align: center;
		margin-top: 124upx;
	}

	.pane {
		position: relative;
		padding-top: 102upx;
		background-color: #fff;
		border-radius: 42upx;
		margin-bottom: 40upx;

		.text {
			position: absolute;
			top: 50%;
			left: 260upx;
			transform: translateY(-50%);


			.text1 {
				font-size: 32upx;
				font-weight: bold;
				color: #3d3d3d;
			}

			.text2 {
				font-size: 28upx;
				color: #3d3d3d;
				letter-spacing: 12upx;
			}
		}

		.desc-pane {
			position: absolute;
			height: 147upx;
			width: 660upx;
			left: 50%;
			top: -52upx;
			transform: translateX(-50%);
			background: url('../../static/images/con-center/vip/bg.png') no-repeat;
			background-size: cover;
			border-radius: 36upx;
		}
	}


	.gift {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 18upx 37upx;
		box-sizing: border-box;
		background-color: #FFFBF4;
		border-radius: 42upx;
		margin: 30upx 0;

		image {
			flex-shrink: 0;
		}

		.gift-icon {
			width: 129upx;
			height: 121upx;
		}

		text {
			flex: 1;
		}

		.gift-detail {
			width: 77upx;
			height: 124upx;
			flex-shrink: 0;

		}
	}

	.desc {
		display: flex;
		padding: 25upx 37upx;
		box-sizing: border-box;
		background-color: #FFFBF4;
		border-radius: 42upx;
		color: #999999;
		font-size: 24upx;
		line-height: 2;

		.title {
			margin-right: 10upx;
		}

		.detail {
			flex: 1;
		}
	}

	.generate-code-container {
		position: absolute;
		top: -10000upx;
	}

}
</style>