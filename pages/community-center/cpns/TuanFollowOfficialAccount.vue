<template>
  <tui-bottom-popup
    :zIndex="1002"
    :maskZIndex="1001"
    :show="followOfficialAccountVisible"
    @close="followOfficialAccountVisible = false"
  >
    <view class="container">
      <view class="title-wrapper">
        <img
          class="logo-img"
          src="../../../static/images/new-user/logo.jpg"
          alt=""
        />
        <div class="detail-wrapper">
          <view class="name">团蜂</view>
        </div>
      </view>
      <view class="content">
        团蜂科技--数字化营销的领跑者，团蜂科技是一
        家集家居数字化营销系统开发，家具产品设计研发
        家居供应链、家居营销培训、营销策划服务、招商销
        售、展会于一体的科技营销落地型公司
      </view>
      <view class="tip"
        >关注团蜂，下单不迷路!
        <button @click="handleToFollow" :loading="loading" class="uni-btn">
          {{ loading ? "跳转中..." : "去关注" }}
        </button></view
      >
    </view>
  </tui-bottom-popup>
</template>

<script>
export default {
  data() {
    return {
      followOfficialAccountVisible: false,
      loading: false,
    };
  },
  methods: {
    show() {
      this.followOfficialAccountVisible = true;
    },

    handleToFollow() {
      if (this.loading) return;
      this.loading = true;
      window.location.href =
        "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=Mzg4MDc4NzM0MA==#wechat_redirect";
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  max-height: 50vh;
  background-color: #fff;
  padding: 40upx 40upx 80upx;
  box-sizing: border-box;

  .title-wrapper {
    display: flex;
    align-items: center;

    .name {
      font-size: 40upx;
      font-weight: 500;
      color: #3d3d3d;
    }

    .logo-img {
      width: 120upx;
      height: 120upx;
      border: 4upx solid rgb(240, 240, 240);
      border-radius: 50%;
      margin-right: 20upx;
      flex-shrink: 0;
    }
  }

  .content {
    font-size: 28upx;
    line-height: 1.5;
    margin-top: 40upx;
    text-indent: 2em;
  }

  .tip {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 28upx;
    margin-top: 40upx;
    .uni-btn {
      font-size: 28upx;
      color: #e95d20;
    }
  }
}
</style>
