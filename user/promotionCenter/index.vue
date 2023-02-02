<template>
  <view class="account-book-containter">
    <view class="header">
      <view class="left">
        <image
          @click="handleBack"
          class="back-icon"
          src="../../static/images/common/back.png"
          mode=""
        />
        <text>小账本</text>
      </view>

      <view class="right">
        <image
          class="share-icon"
          src="../../static/images/promotion/share-2.png"
          mode=""
        />
      </view>
    </view>

    <Profit></Profit>
    <Fans></Fans>
    <Gen></Gen>
    <Analysis></Analysis>
  </view>
</template>

<script>
import Profit from "./cpns/profit.vue";
import Fans from "./cpns/fans.vue";
import Gen from "./cpns/gen/index.vue";
import Analysis from "./cpns/analysis/index.vue";
export default {
  components: {
    Profit,
    Fans,
    Gen,
    Analysis,
  },

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
.account-book-containter {
  position: relative;
  width: 100%;
  background-color: #f7f7f7;
  min-height: 100vh;
  padding: 80upx 22upx 0;
  box-sizing: border-box;

  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 420upx;
    background-color: #e95d20;
    border-bottom-left-radius: 200px 20px;
    border-bottom-right-radius: 200px 20px;
  }

  .header {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    margin-bottom: 40upx;

    .back-icon {
      width: 16upx;
      height: 28upx;
      margin-right: 20upx;
    }

    .share-icon {
      width: 40upx;
      height: 44upx;
    }
  }
}
</style>