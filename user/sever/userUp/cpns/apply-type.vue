<template>
  <view class="apply-type-container vip-container">
    <view class="pane-title"> 申请类型 </view>

    <view class="pane-container">
      <view
        class="item"
        @click="changeVipType('partner')"
        :class="{ active: value === 'partner' }"
      >
        <image
          src="../../../../static/images/center/userUp/vip_2.png"
          mode=""
        />
        <view class="vip-type-name">合伙人</view>
        <view class="vip-cost">￥<text>1000</text>/年</view>
        <tui-icon class="icon" :size="28" color="#fff" name="check"></tui-icon>
      </view>

      <view
        class="item"
        @click="changeVipType('sup-partner')"
        :class="{ active: value === 'sup-partner' }"
      >
        <image
          src="../../../../static/images/center/userUp/vip_1.png"
          mode=""
        />
        <view class="vip-type-name">超级合伙人</view>
        <view class="vip-cost">￥<text>5000</text>/年</view>
        <tui-icon class="icon" :size="28" color="#fff" name="check"></tui-icon>
      </view>
    </view>
  </view>
</template>

<script>
import { USER_INFO } from '../../../../constant'
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },

  methods: {
    changeVipType(tag) {
      const userInfo = uni.getStorageSync(USER_INFO)

      if (tag === 'partner') {
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

        this.$emit('input', tag)
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

        this.$emit('input', tag)
      }
    },
  },
}
</script>

<style lang="less" scoped>
@color: #424890;
.apply-type-container {
  .pane-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20upx;
    margin-bottom: 20upx;

    .item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 280upx;
      height: 292upx;
      box-sizing: border-box;
      border-radius: 10upx;
      transition: box-shadow 350ms;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

      .icon {
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 10;
      }

      &.active {
        border: 4upx solid #fdc041;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);

        &::after {
          position: absolute;
          right: -1upx;
          bottom: -1upx;
          content: '';
          width: 60upx;
          height: 60upx;
          background-color: #fdc041;
          border-radius: 70upx 0px 0upx 0px;
        }
      }

      .vip-type-name {
        color: @color;
        font-weight: bold;
        margin-top: 22upx;
        margin-bottom: 6upx;
      }

      image {
        width: 80upx;
        height: 80upx;
      }

      .vip-cost {
        font-size: 24upx;

        text {
          color: @color;
          font-size: 48upx;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
