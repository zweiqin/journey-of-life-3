<template>
  <view class="stuff-store-container" @click="handleToStoreHome">
    <img
      class="store-img"
      src="https://img2.baidu.com/it/u=2083830934,4008812075&fm=253&fmt=auto&app=120&f=JPEG?w=640&h=640"
      alt=""
    />

    <view class="name">团蜂家具材料店</view>
    <view class="tags">
      <text class="tag">材料供应商</text>
      <text class="tag">品质保证</text>
    </view>

    <view class="footer">
      <img
        src="https://img2.baidu.com/it/u=107609331,3321119768&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=544"
        alt=""
        class="avatar"
      />
      <view class="sub-name">团蜂家具材料商</view>
    </view>
  </view>
</template>

<script>
export default {
  props: ["url"],
  methods: {
    handleToStoreHome() {
      uni.navigateTo({
        url: "/stuff/store/index",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.stuff-store-container {
  width: 340upx;
  border-radius: 20upx 20upx 0 0;
  // overflow: hidden;
  margin-bottom: 22upx;

  .store-img {
    width: 100%;
    height: 300upx;
    object-fit: cover;
    border-radius: 20upx 20upx 0 0;
  }

  .name {
    font-size: @f14;
    color: @c3d;
  }

  .tags {
    margin: 10px 0;

    .tag {
      font-size: @f10;
      color: #ff8f1f;
      padding: 8upx 10upx;
      border: 1upx solid #ff8f1f;
      border-radius: 5px;
      margin-right: 10px;
    }
  }

  .footer {
    display: flex;
    margin-top: 10px;

    .avatar {
      .img(40upx, 50%);
    }

    .sub-name {
      color: @c9;
      font-size: @f10;
      margin-left: 10px;
    }
  }
}
</style>