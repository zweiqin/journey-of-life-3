<template>
  <view class="user-page-container">
    <BaseInfo @handleNavigate="handleNavigate"></BaseInfo>

    <view class="main-area">
      <OrderPane @handleNavigate="handleNavigate"></OrderPane>
      <Equity @handleNavigate="handleNavigate"></Equity>
      <MyFunction
        ref="myFunctionRef"
        @handleNavigate="handleNavigate"
      ></MyFunction>
      <Serve @handleNavigate="handleNavigate"></Serve>
    </view>

    <tui-modal
      :show="$data._isShowTuiModel"
      title="提示"
      content="您还未登录，是否先去登录？"
      @click="_handleClickTuiModel($event, 'login', '/pages/user/user')"
    ></tui-modal>

    <tui-modal
      :show="isShow"
      title="提示"
      content="您的会员等级不够，是否前去升级？"
      @click="handleVipUp"
    ></tui-modal>
  </view>
</template>

<script>
import BaseInfo from './cpns/BaseInfo'
import OrderPane from './cpns/OrderPane.vue'
import Equity from './cpns/Equity.vue'
import MyFunction from './cpns/MyFunction.vue'
import Serve from './cpns/Serve.vue'
import showModalMixin from '../../mixin/showModal'
import { USER_ID, user_INFO } from 'constant'
export default {
  components: {
    BaseInfo,
    OrderPane,
    Equity,
    MyFunction,
    Serve,
  },
  onShow() {
    this.userId = uni.getStorageSync(USER_ID)

    if (this.userId) {
      this.$store.dispatch('auth/refrshUserInfo')
      this.$store.dispatch('user/count', this.userId)
    }

    this.$forceUpdate()
  },
  mixins: [showModalMixin()],
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    handleNavigate(item, cb) {
      if (this.isLogin()) {
        if (
          item.role &&
          item.role.length &&
          !item.role.includes(this.$store.getters.userInfo.userLevel)
        ) {
          this.isShow = true
          return
        }

        if (!item.url) {
          this.empty()
          return
        }

        if (cb && typeof cb === 'function' && cb()) {
          uni.navigateTo({
            url: item.url,
          })
        } else {
          uni.navigateTo({
            url: item.url,
          })
        }
      } else {
        this.$data._isShowTuiModel = true
      }
    },

    handleVipUp(e) {
      if (e.index) {
        uni.navigateTo({
          url: '/user/sever/userUp/partner-appay',
        })
      }

      this.isShow = false
    },
  },
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
</style>
