<template>
  <view class="collect-pane-container">
    <img
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/spams4e3lnv3pce4ztzk.webp"
      alt=""
      class="avatar"
    />
    <view class="info">
      <view class="top">
        <view class="text name">戴某呀</view>
        <view class="text time">创建时间:2022-09-28</view>
      </view>

      <view class="bottom">
        <view class="text">电话：19877665544</view>
        <view class="text time">购买次数：12</view>
        <view class="text" style="color: #ff8f1f" @click="handleSwtich"
          >是否转化</view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleSwtich() {
      uni.showActionSheet({
        itemList: ["已转化", "未转化"],
        title: "是否转化",
        success: function (res) {
          const index = res.tapIndex + 1;
          console.log("选中了第" + index + "个按钮");
        },
        fail: function (res) {
          // 点击了取消
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.collect-pane-container {
  width: 100%;
  .flex(center, flex-start);
  margin-bottom: 30upx;

  .text {
    font-size: 20upx;
    color: @c0;

    &.time {
      color: @c3d;
    }
  }

  .name {
    font-size: 24upx;
  }

  .avatar {
    .img(96upx, 10upx);
    margin-right: 24upx;
  }

  .info {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding-bottom: 10upx;
    border-bottom: 1upx dotted #d8d8d8;
  }

  .top,
  .bottom {
    margin: 10upx 0;
    display: flex;
    justify-content: space-between;
  }
}
</style>