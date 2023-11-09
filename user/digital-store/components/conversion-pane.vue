<template>
  <view class="conversion-pane-container">
    <img
      class="avatar"
      :src="
        info.userAvatar ||
        require('../../../static/images/new-user/default-user-avatar.png')
      "
      alt=""
    />

    <view class="info">
      <view class="item">
        <view class="name"> {{ info.userName }}</view>
        <view class="phone text">电话：{{ info.userTel || "未获取" }}</view>
        <view class="text s-text">创建时间: 2022-09-17</view></view
      >

      <view class="item">
        <view class="phone text">购买时间：2022-01-09</view>
        <view @click="handleChooseWords" class="text s-text select"
          >话术选择</view
        >
      </view>

      <view class="item">
        <view class="phone text">购买次数：20</view>
        <view class="text s-text select" @click="handleIsVisit"
          >是否回访：<text class="select-value">未回访</text></view
        ></view
      >
    </view>
  </view>
</template>

<script>
import { changeUserStatusApi } from "../../../api/user";

export default {
  props: {
    info: Object,
  },
  mounted() {
    console.log("操了", this.info);
  },
  methods: {
    handleIsVisit() {
      const _this = this;
      uni.showActionSheet({
        title: "是否回访",
        itemList: ["未回访", "已回访"],
        success: async function (res) {
          if (res.tapIndex === 1) {
            const changeRes = await changeUserStatusApi({
              id: _this.info.id,
              status: 3,
            });

            if (changeRes.errno === 0) {
              _this.$emit("success");
            }
          }
        },
      });
    },

    // handleIsSwitch() {
    //   uni.showActionSheet({
    //     title: "是否转化",
    //     itemList: ["未转化", "已转化"],
    //     success: function (res) {
    //       console.log("选中了第" + (res.tapIndex + 1) + "个按钮");

    //       if (res.tapIndex) {
    //       }
    //     },
    //   });
    // },

    handleChooseWords() {
      // const words = ["暂无话术"].map(
      //   (item) => item.say
      // );

      // uni.showActionSheet({
      //   title: "请选择转化话术",
      //   itemList: words,
      //   success: function (res) {
      //     uni.setClipboardData({
      //       data: words[res.tapIndex],
      //       success: function () {
      //         uni.showToast({
      //           title: "话术复制成功",
      //         });
      //       },
      //     });
      //   },
      // });

      uni.navigateTo({
        url: "/user/digital-store/choose-words?type=2",
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