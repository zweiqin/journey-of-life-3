<template>
  <view class="contact-guide-container">
    <image
      class="logo animate__animated animate__bounce"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ajpaibzunrpqxlu9uw4o.png"
    ></image>
    <view class="desc animate__animated animate__rubberBand"
      >数字化营销的领跑者</view
    >

    <button class="uni-btn animate__animated animate__fadeInLeft" @click="go('/user/marketing-tools/contact-guide/create-namezcard')">
      新建名片
    </button>
    <button
      class="uni-btn animate__animated animate__fadeInRight"
      @click="go('/user/marketing-tools/contact-guide/my-cards')"
    >
      我的名片
    </button>
    <button
      class="uni-btn out animate__animated animate__flipInX"
      @click="handleBack"
    >
      退出
    </button>
  </view>
</template>

<script>
export default {
  onLoad() {},

  mounted() {},

  methods: {
    handleBack() {
      uni.switchTab({
        url: "/pages/user/user",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.contact-guide-container {
  width: 100vw;
  height: 100vh;
  background-color: #183869;
  display: flex;
  padding-top: 40px;
  box-sizing: border-box;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font-size: 32upx;
  overflow: hidden;

  .logo {
    width: 411upx;
    height: 115.48upx;
    margin-top: 200upx;
    margin-bottom: 20upx;
  }

  .uni-btn {
    color: #fff;
    padding: 18upx 50upx;
    border: 1upx solid #999;
    border-radius: 100px;
    margin-bottom: 24upx;

    &.out {
      border: none;
    }
  }

  .desc {
    font-size: 40upx;
    letter-spacing: 10upx;
    margin-bottom: 132upx;
  }
}
</style>