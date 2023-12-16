<template>

	<view class="user-page-container">
		<TuanAppShim bg="#f6eadf"></TuanAppShim>
		<BaseInfo ref="baseInfoRef" :user-id="userId" @handleNavigate="handleNavigate"></BaseInfo>
		<view class="main-area">
			<Pane title="我的功能" :menu-data="myFunction" @menu-click="handleNavigate"></Pane>
			<Pane title="我的服务" :menu-data="myServe" @menu-click="handleNavigate"></Pane>
			<Pane title="商家服务" :menu-data="shopServe" @menu-click="handleNavigate"></Pane>
			<Pane title="附加功能" :menu-data="additionalFunction" @menu-click="handleNavigate"></Pane>
			<Pane title="我的优惠" :menu-data="myPreferential" @menu-click="handleNavigate"></Pane>
		</view>
		<tui-modal
			:show="$data._isShowTuiModel"
			title="提示"
			content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
		></tui-modal>

		<TuanChatKF ref="tuanChatKFRef"></TuanChatKF>
		<tui-toast ref="toast"></tui-toast>

		<!-- 特殊code的 menu 操作 -->
		<CodeCreatePopup ref="codeCreateRef"></CodeCreatePopup>
	</view>
</template>

<script>
import { getStorageKeyToken, jumpToOtherProject } from '../../utils'
import BaseInfo from './cpns/BaseInfo'
import Pane from './cpns/Pane.vue'
import showModalMixin from '../../mixin/showModal'
import { USER_ID, T_STORAGE_KEY } from '../../constant'
import { myFunction, myServe, additionalFunction, shopServe, myPreferential } from './data'
import { Encrypt } from '../../utils/secret'

export default {
	name: 'User',
	components: {
		BaseInfo,
		Pane
	},
	mixins: [ showModalMixin() ],
	onShow() {
		this.init()
		this.$refs.baseInfoRef.getVoucher()
	},
	data() {
		return {
			timer: null,
			userId: null,
			myFunction,
			myServe,
			shopServe,
			additionalFunction,
			myPreferential,
			userInfo: {},
			bindingCode: ''
		}
	},
	methods: {
		init() {
			this.userId = uni.getStorageSync(USER_ID)
			this.userInfo = uni.getStorageSync(T_STORAGE_KEY) || {}
			if (this.isLogin()) {
				this.$refs.baseInfoRef && this.$refs.baseInfoRef.userIsPurchase()
				this.$store.dispatch('auth/refrshUserInfo')
				this.$store.dispatch('user/count')
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
			if (this.isLogin()) {
				if (item.type === 'userInvitation') {
					this.$refs.codeCreateRef.getCode('userInvitation')
					return
				} else if (item.type === 'settle') {
					const storageKeyToken = getStorageKeyToken()
					if (storageKeyToken) {
						jumpToOtherProject(`${item.url}/#/?username=${this.userInfo.name}&user=${Encrypt(storageKeyToken)}`)
					}
					return
				} else if (item.type === 'shopInvitation') {
					this.$refs.codeCreateRef.getCode('shopInvitation')
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
