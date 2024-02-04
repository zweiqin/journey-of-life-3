<template>
  <view class="fill-code-container">
    <view class="main-area">
      <image
        class="logo"
        src="../../../static/images/user/code/logo.png"
        mode=""
      />

      <view class="input-wrapper">
        <input v-model="code" type="text" placeholder="请输入邀请码" />
      </view>

      <button class="uni-btn" @click="handelBind">提交</button>
    </view>
  </view>
</template>

<script>
import { getUserId } from '../../../utils'
import { bindLastUserApi } from '../../../api/user'
export default {
  data() {
    return {
      code: '',
      timer: null,
    }
  },
  methods: {
    async handelBind() {
      if (!this.code) {
        uni.showToast({
          title: '请输入邀请码',
          duration: 2000,
          icon: 'none',
        })
        return
      }

      if (!getUserId()) {
        uni.redirectTo({
          url: `/pages/jump/jump?userId=&type=bindLastUser&code=${this.code}`
        })
        return
      }

      try {
        await bindLastUserApi({
          userId: getUserId(),
          userCode: this.code,
        })

        uni.showToast({
          title: '绑定成功',
          duration: 500,
        })

        this.timer = setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index',
          })
        }, 1000)
      } catch (error) {
        uni.showModal({
          title: '提示',
          content: error + ', 是否回到首页？',
          success: function (res) {
            if (res.confirm) {
              uni.switchTab({
                url: '/pages/index/index',
              })
            }
          },
        })
      } finally {
        this.$emit('value', false)
      }
    },
  },

  onLoad(params) {
    this.code = params.code
  },

  destroyed() {
    clearTimeout(this.timer)
    this.timer = null
  },
}
</script>

<style lang="less" scoped>
.fill-code-container {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background: url('../../../static/images/user/code/code-bg.png') no-repeat;
  background-size: cover;
  overflow: scroll;

  .main-area {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 622upx;
    height: 638upx;
    background-color: #fff;
    border-radius: 28upx;
    margin-top: 234upx;

    .logo {
      height: 245upx;
      width: 162upx;
      margin-top: -72upx;
      margin-bottom: 40upx;
    }

    .input-wrapper {
      background-color: #f6f6f5;
      width: 462upx;
      height: 112upx;
      border-radius: 24upx;
      padding: 35upx;
      box-sizing: border-box;

      input {
        text-align: center;
      }
    }

    .uni-btn {
      height: 88upx;
      background: #ffcb05;
      border-radius: 100px;
      margin-top: 80upx;
      line-height: 88upx;
      font-size: 28upx;
      font-weight: 500;
      width: 462upx;
    }
  }
}
</style>
