<template>
  <view class="op-footer-container">
    <view class="op-itme-wrapper">
      <image
        @click="handleEmpty('eva')"
        class="icon"
        src="../../../../../static/images/new-index/brand/elv.png"
        mode=""
      />
      <text>评价</text>
    </view>

    <view @click="handleEmpty('phone')" class="op-itme-wrapper">
      <image
        class="icon"
        src="../../../../../static/images/new-index/brand/phone.png"
        mode=""
      />
      <text>电话</text>
    </view>

    <button class="uni-btn online" @click="handleEmpty('eva')">在线预约</button>

    <button class="uni-btn chat" @click="handleEmpty('eva')">免费咨询</button>
  </view>
</template>

<script>
export default {
  methods: {
    handleEmpty(type) {
      switch (type) {
        case 'eva':
          uni.showToast({
            title: '客服未上线',
            duration: 2000,
            icon: 'none',
          })
          break

        case 'phone':
          uni.showToast({
            title: '暂无电话',
            duration: 2000,
            icon: 'none'
          })
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.op-footer-container {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 120upx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 24upx 24upx 0 0;
  padding: 16upx 32upx;
  box-sizing: border-box;

  .op-itme-wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 48upx;
      height: 48upx;
    }

    text {
      font-size: 22upx;
      margin-top: 10upx;
    }
  }

  .uni-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 240upx;
    height: 88upx;
    border-radius: 100px;
    font-size: 28upx;
    color: #fff;

    &.online {
      color: #ffc117;
      border: 1upx solid #ffc117;
    }

    &.chat {
      background-color: #ffc117;
    }
  }
}
</style>
