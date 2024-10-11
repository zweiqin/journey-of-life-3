<template>
	<view class="user-page-container">
		<TuanAppShim bg="#f6eadf"></TuanAppShim>
		<BaseInfo></BaseInfo>
		<view class="main-area">
			<Pane title="我的功能" :menu-data="myFunction" @menu-click="handleNavigate"></Pane>
			<Pane title="我的优惠" :menu-data="myPreferential" @menu-click="handleNavigate"></Pane>
			<Pane title="商家服务" :menu-data="shopServe" @menu-click="handleNavigate"></Pane>
			<Pane title="附加功能" :menu-data="additionalFunction" @menu-click="handleNavigate"></Pane>
			<view>
				<view v-if="isShowOther">
					<Pane title="其它功能" :menu-data="otherFunction" @menu-click="handleNavigate"></Pane>
					<view style="text-align: center;background-color: #afafaf;">
						{{ $store.state.app.terminal }}-{{ isH5InWebview() }}-{{ ENV }}-{{ $store.state.auth.identityInfo.type }}-1.0.33.8
					</view>
				</view>
				<view v-else style="margin-top: 24rpx;" @click="isShowOther = true">
					<view style="width: 632rpx;height: 12rpx;margin: 0 auto;background-color: #f1f1ef;"></view>
				</view>
			</view>
		</view>
		<tui-modal
			:show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
		></tui-modal>

		<TuanChatKF ref="tuanChatKFRef"></TuanChatKF>
		<tui-toast ref="toast"></tui-toast>

		<!-- 特殊code的 menu 操作 -->
		<CodeCreatePopup ref="codeCreateRef"></CodeCreatePopup>

		<!-- 参与抽奖输入暗语 -->
		<view class="lottery-dialog">
			<tui-dialog
				style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
				:show="isShowLotteryDialog" title="团蜂抽奖系统" @click="handleLotteryDialog"
			>
				<template #content>
					<view style="text-align: left;color: #000000;">
						<!-- <tui-input v-model="lotteryForm.codeWordLottery" type="text" placeholder="请输入抽奖暗语"></tui-input> -->
						<tui-input
							v-model="lotteryForm.name" label="用户名称" :label-size="26" padding="20rpx 0 20rpx 0"
							type="text" placeholder="请输入用户名称"
						></tui-input>
						<ATFUpload
							margin="30rpx 0" title="请选择用户头像" :img-url="common.seamingImgUrl(lotteryForm.url)" purpose-text="设置用户在抽奖模块里的头像，以便展示抽奖结果"
							@upload="(e) => (lotteryForm.url = e) && $forceUpdate()" @delete="lotteryForm.url = '' || $forceUpdate()"
						>
						</ATFUpload>
					</view>
				</template>
			</tui-dialog>
		</view>

		<!-- 链接跳转 -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowOutsideLinkDialog" title="套壳链接跳转" @click="handleOutsideLinkDialog"
		>
			<template #content>
				<tui-input v-model="codeWordOutsideLink" type="text" placeholder="请输入链接地址"></tui-input>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { getStorageKeyToken, jumpToOtherProject, isH5InWebview } from '../../utils'
import BaseInfo from './cpns/BaseInfo'
import Pane from './cpns/Pane.vue'
import showModalMixin from '../../mixin/showModal'
import { T_STORAGE_KEY } from '../../constant'
import { myFunction, additionalFunction, shopServe, myPreferential, otherFunction } from './data'
import { Encrypt } from '../../utils/secret'
import { ENV } from '../../config'

export default {
	name: 'User',
	components: {
		BaseInfo,
		Pane
	},
	mixins: [ showModalMixin() ],
	onShow() {
		this.init()
	},
	data() {
		return {
			ENV,
			timer: null,
			myFunction,
			shopServe,
			additionalFunction,
			myPreferential,
			otherFunction,
			isShowOther: false,
			userInfo: {},
			bindingCode: '',

			// 参与抽奖
			isShowLotteryDialog: false,
			lotteryForm: {
				codeWordLottery: '',
				name: '',
				url: ''
			},
			// 套壳链接
			isShowOutsideLinkDialog: false,
			codeWordOutsideLink: ''
		}
	},
	methods: {
		isH5InWebview,
		init() {
			this.userInfo = uni.getStorageSync(T_STORAGE_KEY) || {}
			if (this.isLogin()) {
				this.$store.dispatch('auth/refrshUserInfoAction')
				this.$store.dispatch('user/getCountAction')
			}
			this.$forceUpdate()
		},
		handleNavigate(item, cb) {
			// if (['/user/sever/customer-service/customer-service', '/user/sever/chat/chat'].includes(item.url)) {
			//   this.$refs.tuanChatKFRef.show();
			//   return;
			// }
			if (item.navigate) {
				item.navigate()
				return
			}
			if (item.type === 'external') {
				this.go('/user/view?target=' + item.url)
				return
			} else if (item.type === 'electronicCard') {
				if (!(this.$store.state.app.terminal === 3)) jumpToOtherProject({ isInMiniProgram: this.$store.state.app.isInMiniProgram, id: 'gh_5668ad6e5290', appId: 'wxb446588ba0dbb9d7', url: `pages/index/index`, programUrl: `pages/skip/skip`, toType: 'MP', query: '?type=electronicCard', montageTerminal: [ 6 ] })
				return
			} else if (item.type === 'outsideLink') {
				this.isShowOutsideLinkDialog = true
				return
			} else if (item.type === 'notActivity') {
				this.$showToast('活动尚未开启，敬请期待！')
				return
			}
			if (this.isLogin()) {
				if (item.type === 'participateLottery') {
					this.isShowLotteryDialog = true
					return
				} else if (item.type === 'userInvitation') {
					// // if (this.$store.state.auth.identityInfo.type.includes(1)) {
					// // 	uni.showActionSheet({
					// // 		title: '* 请选择业务 *',
					// // 		itemList: ['关系链绑定', '绑定加盟商'],
					// // 		itemColor: '#2c3e50',
					// // 		success: (res) => {
					// // 			if (res.tapIndex === 0) {
					// // 				this.go('/another-tf/another-user/user-invitation/index')
					// // 			} else if (res.tapIndex === 1) {
					// // 				this.$refs.codeCreateRef.getCode('franchiseeInvitation')
					// // 			}
					// // 		}
					// // 	})
					// // } else {
					// this.go('/another-tf/another-user/user-invitation/index')
					// // }
					this.$refs.codeCreateRef.getCode('userInvitation')
					return
				} else if (item.type === 'flyToService') {
					// this.$store.dispatch('app/getCustomerServiceAction', { isToService: true })
					this.go('/another-tf/another-user/chat/chat-detail?chat=serviceAssistant')
					return
				} else if (item.type === 'settle') {
					const storageKeyToken = getStorageKeyToken()
					console.log(Encrypt(storageKeyToken))
					if (storageKeyToken) {
						jumpToOtherProject({ isInMiniProgram: this.$store.state.app.isInMiniProgram, url: `${item.url}/#/?username=${this.userInfo.name}&user=${encodeURIComponent(Encrypt(storageKeyToken))}`, programUrl: `pages/skip/skip`, toType: 'H5', query: `?type=merchantSettlement&username=${this.userInfo.name}&user=${encodeURIComponent(Encrypt(storageKeyToken))}`, montageTerminal: [ 6 ] })
					}
					return
				} else if (item.type === 'shopInvitation') {
					// this.$refs.codeCreateRef.getCode('shopInvitation')
					this.go('/another-tf/another-user/shop-invitation/index')
					return
				}
				if (!item.url) {
					this.empty()
					return
				}
				if (cb && typeof cb === 'function' && cb()) {
					uni.navigateTo({
						url: item.url
					})
				} else {
					uni.navigateTo({
						url: item.url
					})
				}
			} else {
				this.$data._isShowTuiModel = true
			}
		},
		handleLotteryDialog(e) {
			if (e.index === 0) { } else if (e.index === 1) {
				// if (!(this.lotteryForm.codeWordLottery === '团蜂')) return this.$showToast('暗语错误')
				if (!this.lotteryForm.name) return this.$showToast('请输入用户名称')
				if (!this.lotteryForm.url) return this.$showToast('请选择用户头像')
				this.go(`/pages/jump/jump?userId=${this.userInfo.buyerUserId}&type=participateLottery&code=${encodeURIComponent(this.lotteryForm.name)}~${encodeURIComponent(this.lotteryForm.url)}`)
			}
			this.lotteryForm.codeWordLottery = ''
			this.isShowLotteryDialog = false
		},
		handleOutsideLinkDialog(e) {
			if (e.index === 0) { } else if (e.index === 1) {
				if (!this.codeWordOutsideLink) return this.$showToast('链接错误')
				this.go('/user/view?target=' + this.codeWordOutsideLink)
			}
			this.codeWordOutsideLink = ''
			this.isShowOutsideLinkDialog = false
		}
	}
}
</script>

<style lang="less" scoped>
.user-page-container {
	position: relative;
	min-height: 100vh;
	background-color: #f6f6f5;
	padding-bottom: 140rpx;

	.main-area {
		width: 100%;
		padding: 0 32rpx 32rpx;
		box-sizing: border-box;

		/deep/ .menu-title {
			font-size: 24rpx;
			color: #3a3629;
		}

		/deep/ .menu-icon {
			width: 64rpx;
			height: 64rpx;
		}

		/deep/ .menu-item {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}

		/deep/ .order-pane {
			margin-top: 20rpx;
		}
	}

	.lottery-dialog {
		/deep/ .tui-dialog {
			top: 30%;
			transform: none;
		}
	}
}

/deep/ .tui-loading-init {
	position: inherit;
	transform: translate(0, 0);
	background-color: transparent;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100vw;
	min-width: 100vw;
	max-width: 100vw;
	flex-direction: row;
	// padding-top: 30rpx;
}

/deep/ .tui-loadmore-tips {
	color: #ff7a4e;
	margin-bottom: 40rpx;
}

/deep/ .tui-loading-center {
	border-color: #ff7a4e;
}
</style>
