<template>
  <view class="user-up-container">
    <view class="main">
      <NewHeader
        @back="handleBack"
        title="会员升级"
        position="left"
        top="61%"
        color="#fff"
        padding="40upx 60upx 20upx 12upx"
        tabbar="/pages/user/user"
      >
        <!-- <block slot="right">
          <button class="uni-btn">申请记录</button>
        </block> -->
      </NewHeader>

      <Pane
        @click="handleUserUp"
        :equity="equity"
        text="合伙人升级"
        price="1000"
      ></Pane>
      <Pane
        @click="handleUserUp"
        :equity="equity"
        text="超级合伙人升级"
        price="5000"
      ></Pane>
    </view>

    <tui-modal
      :show="$data._isShowTuiModel"
      title="提示"
      content="您还未登录，请先登录"
      @click="_handleClickTuiModel($event, handleToLogin)"
    ></tui-modal>
  </view>
</template>

<script>
import Pane from './cpns/pane.vue'
import { hehuoWq } from '../../../data/user'
import { getUserId } from '../../../utils'
import { USER_INFO } from '../../../constant'
export default {
  data() {
    return {
      equity: Object.freeze(hehuoWq),
    }
  },

  components: {
    Pane,
  },

  methods: {
    handleUserUp(price) {
      const userInfo = uni.getStorageSync(USER_INFO)
      console.log(userInfo)
      if (getUserId()) {
        if (price == 1000) {
          if (userInfo.userLevel == 6) {
            uni.showToast({
              title: '您已经是合伙人了，无需申请',
              icon: 'none',
            })
            return
          }

          if (userInfo.userLevel == 7) {
            uni.showToast({
              title: '您已经是超级合伙人了，无需申请',
              icon: 'none',
            })
            return
          }

          if (userInfo.userLevel == 1) {
            uni.showToast({
              title: '您已经是门店了，无需申请',
              icon: 'none',
            })
            return
          }
          uni.navigateTo({
            url: '/user/sever/userUp/partner-appay?type=partner',
          })
        } else {
          if (userInfo.userLevel == 7) {
            uni.showToast({
              title: '您已经是超级合伙人了，无需申请',
              icon: 'none',
            })
            return
          }

          if (userInfo.userLevel == 1) {
            uni.showToast({
              title: '您已经是门店了，无需申请',
              icon: 'none',
            })
            return
          }
          uni.navigateTo({
            url: '/user/sever/userUp/partner-appay?type=sup-partner',
          })
        }
      } else {
      }
    },

    handleToLogin() {
      uni.navigateTo({
        url: '/pages/auth/login/login?redirectUrl=/pages/user/my-serve/userUp/index',
      })
    },

    handleBack() {
      console.log(1)
      uni.switchTab({
        url: '/pages/user/user',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.user-up-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('../../../static/images/center/userUp/user-vip-bg.png')
    no-repeat;
  background-size: cover;

  .main {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .uni-btn {
    padding: 20upx 40upx;
    background-color: #fe9f21;
    color: #fff;
    border-radius: 20upx;
  }
}
</style>
