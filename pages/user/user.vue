<template>
	<!-- <view
		class="user-page-container"
		@touchstart="handleTouchStart"
		@touchend="handleTouchEnd"
		@touchmove="calcDis"
		> -->

	<view class="user-page-container">
		<view :style="{ height: moveDis / 2 + 'px' }" class="loading-pane">
			<tui-loading type="row" text="正在刷新中..."></tui-loading>
		</view>
		<TuanAppShim bg="#f6eadf"></TuanAppShim>
		<BaseInfo ref="baseInfoRef" :data="userInfo" @handleNavigate="handleNavigate"></BaseInfo>
		<view class="main-area">
			<Equity :menu="myEquity1" @handleNavigate="handleNavigate"></Equity>
			<MyFunction ref="myFunctionRef" @handleNavigate="handleNavigate"></MyFunction>
			<Serve @handleNavigate="handleNavigate"></Serve>
			<AdditionalFunction></AdditionalFunction>
		</view>
		<tui-modal
			:show="$data._isShowTuiModel"
			title="提示"
			content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
		></tui-modal>
		<tui-modal :show="isShow" title="提示" content="您的会员等级不够，是否前去升级？" @click="handleVipUp"></tui-modal>

		<TuanChatKF ref="tuanChatKFRef"></TuanChatKF>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { throttle } from '../../utils'
import BaseInfo from './cpns/BaseInfo'
import Equity from './cpns/Equity.vue'
import MyFunction from './cpns/MyFunction.vue'
import AdditionalFunction from './cpns/AdditionalFunction.vue'
import Serve from './cpns/Serve.vue'
import showModalMixin from '../../mixin/showModal'
import { USER_ID, USER_INFO } from '../../constant'
import { myEquity } from './data'
import { getStorageKeyToken } from '../../utils/DWHutils'
import { Encrypt } from '../../utils/secret'

export default {
	name: 'User',
	components: {
		BaseInfo,
		Equity,
		MyFunction,
		Serve,
		AdditionalFunction
	},
	mixins: [ showModalMixin() ],
	onLoad() {
		// #ifdef H5
		this.init()
		this.calcDis = throttle(this.handleTouchMove, 50)
		// #endif
	},
	onShow() {
		this.init()
		this.setShareHolder()
	},
	data() {
		return {
			timer: null,
			isShow: false,
			moveDis: 0,
			touchStartDis: 0,
			calcDis: null,
			userId: null,
			myEquity1: [],
			userInfo: {}
		}
	},
	methods: {
		init() {
			this.userId = uni.getStorageSync(USER_ID)
			this.userInfo = uni.getStorageSync(USER_INFO)
			if (this.userInfo) {
				this.$refs.baseInfoRef && this.$refs.baseInfoRef.userIsPurchase()
				this.$store.dispatch('auth/refrshUserInfo', (userInfo) => (this.userInfo = userInfo))
				this.$store.dispatch('user/count', this.userInfo)
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
			}
			if (item.type === 'settle') {
				const storageKeyToken = getStorageKeyToken()
				if (storageKeyToken) this.go('/user/view?target=' + item.url + `/#/?username=${this.userInfo.nickName}&user=${Encrypt(storageKeyToken)}`)
				return
			}
			if (this.isLogin()) {
				if (item.role && item.role.length && !item.role.includes(this.$store.getters.userInfo.userLevel) && !this.$store.getters.userInfo.isRegionAgent) {
					this.isShow = true
					return
				}
				if (item.permission) {
					const res = item.permission()
					console.log(res)
					if (res) {
						this.ttoast({
							type: 'info',
							title: res
						})
						return
					}
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

		handleVipUp(e) {
			if (e.index) {
				uni.navigateTo({
					url: '/user/sever/userUp/partner-appay'
				})
			}

			this.isShow = false
		},

		// 点击触摸
		handleTouchStart(e) {
			this.touchStartDis = e.changedTouches[0].pageY
		},

		// 触摸结束
		handleTouchEnd() {
			this.init()
			this.moveDis = 0
		},

		// 手指移动
		handleTouchMove(e) {
			this.moveDis = e.changedTouches[0].pageY - this.touchStartDis
			if (this.moveDis > 100) {
				this.moveDis = 150
			}
		},

		// 设置股东看板
		setShareHolder() {
			const userInfo = this.$store.getters.userInfo
			console.log(userInfo)
			if (userInfo && userInfo.shareholderType === 1) {
				this.myEquity1 = [
					...myEquity,
					{
						name: '股东看板',
						icon: require('../../static/images/new-user/equity/gudong.png'),
						url: '/user/shareholder/shareholder'
					}
				]
			} else {
				const index = this.myEquity1.findIndex((item) => item.name === '股东看板')
				if (index != -1) {
					this.myEquity1.splice(index, 1)
				}

				this.myEquity1 = [ ...myEquity ]
			}
			this.$forceUpdate()
		}
	}
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5 !important;
}

.user-page-container {
  widows: 100vw;
  min-height: 100vh;
  background-color: #f6f6f5;
  padding-bottom: 120upx;

  .main-area {
    width: 100%;
    padding: 0 32upx 32upx;
    box-sizing: border-box;

    /deep/ .menu-title {
      font-size: 24upx;
      color: #3a3629;
    }

    /deep/ .menu-icon {
      width: 64upx;
      height: 64upx;
    }

    /deep/ .menu-item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    /deep/ .order-pane {
      margin-top: 20upx;
    }
  }
}

.loading-pane {
  overflow: hidden;
  transition: all 100ms;
  background: linear-gradient(360deg, #f6e6d8, #eff5f0);
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
  // padding-top: 30upx;
}

/deep/ .tui-loadmore-tips {
  color: #ff7a4e;
  margin-bottom: 40upx;
}

/deep/ .tui-loading-center {
  border-color: #ff7a4e;
}
</style>
