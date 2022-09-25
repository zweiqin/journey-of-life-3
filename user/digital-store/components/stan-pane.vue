<template>
  <view class="conversion-pane-container">
    <img
      class="avatar"
      :src="
        info.userAvatar ||
        'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/spams4e3lnv3pce4ztzk.webp'
      "
      alt=""
    />

    <view class="info">
      <view class="item">
        <view class="name"> {{ info.userName }}</view>
        <view class="phone text">电话：{{ info.userTel || "暂无" }}</view>
        <view class="text s-text">创建时间: {{ info.createTime }}</view></view
      >

      <view class="item">
        <view class="phone text">购买时间：{{ info.updateTime }}</view>
        <view class="phone text">购买次数：{{ info.buyCount }}</view>
        <view class="text select">活动方案</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: Object,
  },

  methods: {
    handleIsVisit() {
      uni.showActionSheet({
        title: "是否回访",
        itemList: ["未回访", "已回访"],
        success: function (res) {
          console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        },
      });
    },

    handleIsSwitch() {
      uni.showActionSheet({
        title: "是否转化",
        itemList: ["未转化", "已转化"],
        success: function (res) {
          console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        },
      });
    },

    handleChooseWords() {
      uni.showActionSheet({
        title: "请选择转化话术",
        itemList: ["我是来救你的", "没我你的店就倒闭了"],
        success: function (res) {
          console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.conversion-pane-container {
  margin-bottom: 32upx;
  display: flex;

  .words {
    color: @c3d;
  }

  .text {
    font-size: 20upx;
  }

  .s-text {
    color: @c3d;
  }

  .info {
    flex: 1;
    padding-bottom: 10upx;
    border-bottom: 01upx dotted #d8d8d8;
  }

  .select {
    position: relative;
    padding-right: 20upx;

    &::after {
      content: "";
      position: absolute;
      display: block;
      background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/2gaw2khlvr5tm9to6aik.png")
        no-repeat;
      background-size: cover;
      right: -2px;
      top: 50%;
      transform: translateY(-50%) rotate(90deg);
      width: 20upx;
      height: 10upx;
    }

    .select-value {
      margin-right: 10upx;
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    line-height: 20px;

    .name {
      font-size: 24upx;
    }
  }

  .avatar {
    .img(96upx, 10upx);
    margin-right: 24upx;
  }
}
</style>