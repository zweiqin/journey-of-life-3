<template>
	<view class="vip-detail-conatiner" :style="{ background: type == 2 ? '#ee7d53' : '' }">
		<view class="header">
			<img
				v-if="type != 2" style="width: 100%; padding-top: 80upx; padding-bottom: 30upx"
				src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/hz3cjdj9eogy1xpezqkm.png" alt=""
			/>
			<!-- <JIcon @click="handleClickBack" class="back" type="red-back"></JIcon> -->
			<img
				src="https://www.tuanfengkeji.cn:9527/dts-admin-api/admin/storage/fetch/56zmrnjpobwxiwy3tie6.png" alt=""
				class="back" @click="handleClickBack"
			/>

			<view v-if="campaignsType === 0">
				<view style="position: fixed;z-index: 1;top: 40upx;right: 30upx;height: 64upx;padding: 0 20upx;display: flex;align-items: center;font-weight: 700;background-color: rgba(255, 255, 255, .68);border-radius: 32upx;" @click="handleShareActivity">活动分享</view>
			</view>

			<view class="main" :style="{ padding: type == 2 ? '0px !important' : '' }">
				<PackagePane v-if="type == 1" :key="vipList[0].name" :data="vipList[0]" @pay="handlePayTH">
					<view class="list">
						<li
							v-for="(item, index) in indulgenceData" :key="index" class="indulgence-item"
							@click="handleChooseIndulgence(item)"
						>
							<tui-icon
								:color="
									currentIndulgence === item.serverContent ? '#fa5151' : '#ccc'
								" :size="25" :name="
									currentIndulgence === item.serverContent
										? 'circle-fill'
										: 'circle'
								"
							></tui-icon>
							<text>{{ item.serverContent }}</text>
						</li>
					</view>
				</PackagePane>

				<!-- <PackagePane v-if="type == 2" @pay="handlePayBS" :key="vipList[1].name" :data="vipList[1]">
					<view class="list">
					<li class="indulgence-item" v-for="(item, index) in beeSteward" :key="index">
					<text>({{ index + 1 }}) {{ item }}</text>
					</li>
					</view>
					</PackagePane> -->

				<image v-if="type == 2" class="vip-299" mode="widthFix" src="../../static/images/con-center/vip.png"></image>
			</view>
		</view>

		<JCity ref="jCityRef" @confirm="handleChooseCity"></JCity>

		<view v-if="type == 2" class="vip-299-pay-btn-wrapper">
			<button class="uni-btn" @click="handlePayBS"> 299元立即抢购 </button>
		</view>

		<!-- 分享活动邀请码 -->
		<PosterPopup ref="posterPopupRef"></PosterPopup>
		<!-- 生成二维码 -->
		<view v-if="activityCode">
			<uqrcode
				ref="uqrcode" class="generate-code-container" canvas-id="qrcode" :value="qrcodeUrl + activityCode"
				@complete="handleCompleteCode"
			></uqrcode>
		</view>

		<TuanWxShare ref="tuanWxShareRef"> </TuanWxShare>
		<!-- <button @click="handleShareServe">分享</button> -->
	</view>
</template>

<script>
import PackagePane from './components/package-pane.vue'
import Tabbar from './components/tabbar.vue'
import { vipList } from './config'
import { getServeListApi } from '../../api/community-center'
import { USER_ID } from '../../constant'
import {
	getPurchaseRecordApi,
	getCreateCodeApi
} from '../../api/user'
import { getUserId } from '../../utils'
import PosterPopup from './components/PosterPopup.vue'

export default {
	name: 'VipDetail',
	components: {
		PackagePane,
		Tabbar,
		PosterPopup
	},
	data() {
		return {
			campaignsType: '',
			vipList,
			allServeList: [],
			beeSteward: null,
			indulgenceData: [],
			currentIndulgence: '空调清洗一台 (免拆)',
			address: '',
			userId: null,
			type: null,
			shareCode: '',
			activityCode: '',
			qrcodeUrl: 'https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/user/sever/activityCenter/index?code='
		}
	},
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
		// debugger
		if (!this.type) {
			this.type = uni.getStorageSync('SERVE_TYPE')
		}
	},

	methods: {
		handleClickBack() {
			// uni.switchTab({
			// 	url: '/'
			// })
			uni.navigateBack()
		},

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
				this.handleShareServe(true)
			}
		},

		// 选择地址
		handleChooseCity(data) {
			this.address = data.area
		},

		// 选择特惠
		handleChooseIndulgence(item) {
			this.currentIndulgence = item.serverContent
		},

		// 购买特惠
		handlePayTH() {
			if (!this.userId) {
				uni.showModal({
					title: '提示',
					content: '你还未登录，是否先去登录？',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login?to=/community-center/vip-center/vip-detail'
							})
						}
					}
				})
				return
			}
			if (!this.currentIndulgence) {
				uni.showToast({
					title: '请选择服务项',
					duration: 2000,
					icon: 'none'
				})
				return
			}
			const currentServe = this.allServeList.find((item) => item.serverContent === this.currentIndulgence)
			uni.navigateTo({
				url:
					'/community-center/active-consignee?data=' +
					JSON.stringify(currentServe) +
					'&repair=true'
			})
		},

		// 购买金管家
		handlePayBS() {
			if (!this.userId) {
				uni.showModal({
					title: '提示',
					content: '你还未登录，是否先去登录？',
					success(res) {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login?to=/community-center/vip-center/vip-detail'
							})
						}
					}
				})
				return
			}
			const currentServe = this.allServeList.find((item) => item.serverType === 1)
			uni.navigateTo({
				url:
					'/community-center/active-consignee?data=' +
					JSON.stringify(currentServe) +
					'&repair=true'
			})
		},

		// 分享会员
		async handleShareServe(isQuit) {
			const _this = this
			let data
			if (this.campaignsType === 0) { // 肯定是type也为2
				const failObj = {
					data: {
						title: '团蜂社区金管家会员',
						desc: `团蜂千万大补贴，全年水电管道检测修服务，活动期间免费赠送价值300元的羊驼公仔一个！`,
						link: `https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/community-center/vip-center/vip-detail?type=2`,
						imageUrl: require('../../static/images/con-center/alpaca-forward.png')
					},
					successCb: () => { },
					failCb: () => { }
				}
				const res = await getPurchaseRecordApi({ userId: getUserId(), price: 299 })
				if (res.data) {
					getCreateCodeApi({
						userId: getUserId()
					}).then((res) => {
						this.activityCode = res.data
						data = {
							data: {
								title: '团蜂社区金管家会员',
								desc: `团蜂千万大补贴，全年水电管道检测修服务，活动期间免费赠送价值300元的羊驼公仔一个！`,
								link: `${this.qrcodeUrl}${res.data}`,
								imageUrl: require('../../static/images/con-center/alpaca-forward.png')
							},
							successCb: () => { },
							failCb: () => { }
						}
					})
						.catch((err) => {
							data = failObj
							uni.showToast({
								title: '获取活动邀请码失败',
								duration: 5000,
								icon: 'none'
							})
						})
				} else {
					data = failObj
					uni.showToast({
						title: '您还未购买金管家会员，购买后才可进行活动分享！',
						duration: 5000,
						icon: 'none'
					})
				}
			} else {
				data = {
					data: {
						title: _this.type == 2 ? '团蜂社区金管家会员' : '限时钜惠',
						// desc: `售后质保·服务专业·极速退款·意外承包`,
						desc: _this.type == 2 ? `团蜂千万大补贴，全年水电管道检测修服务，活动期间免费赠送价值300元的羊驼公仔一个！` : `${this.indulgenceData.map((item) => item.serverContent).join('；')}`,
						link: `https://www.tuanfengkeji.cn/TFShop_Uni_H5/#/community-center/vip-center/vip-detail?type=${_this.type}`,
						imageUrl: _this.type == 2 ? require('../../static/images/con-center/alpaca-forward.png') : ''
					},
					successCb: () => { },
					failCb: () => { }
				}
			}
			this.$refs.tuanWxShareRef.share(data, isQuit)
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

	}
}
</script>

<style lang="less" scoped>
.vip-detail-conatiner {
	background-color: #fa5151;
	font-size: 32upx;
	min-height: 100vh;

	.header {
		position: relative;

		.back {
			position: fixed;
			top: 40upx;
			left: 30upx;
			width: 60upx;
			height: 60upx;
			z-index: 1000;
			background-color: #ff9137;
			border-radius: 50%;
		}
	}

	.main {
		padding: 22upx;
		box-sizing: border-box;

		.vip-299 {
			width: 100%;
			padding-bottom: 140upx;
		}
	}

	.indulgence-item {
		margin: 20upx 0;

		text {
			margin-left: 20upx;
			color: #3d3d3d;
		}
	}
}

/deep/ .address {
	display: none !important;
}

li {
	display: flex;
	align-items: center;
}

.vip-299-pay-btn-wrapper {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 140upx;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;

	.uni-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 610upx;
		height: 104upx;
		border-radius: 999px;
		font-size: 36upx;
		color: #fff;
		background: linear-gradient(180deg, #FF715B 0%, #FA5151 100%);
	}
}
</style>
