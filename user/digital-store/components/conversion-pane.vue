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

      <!-- <view class="item" @click="handleChooseWords">
        <view class="text select" style="flex: 1">
          话术选择：<text class="words">化验室的衣服尴尬属地积分</text>
        </view>
      </view> -->
    </view>
  </view>
</template>

<script>
import { WORDS_LIST } from "../../../constant";
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

            if (changeRes === "回访成功") {
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
      // const words = (uni.getStorageSync(WORDS_LIST) || ["暂无话术"]).map(
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

    &::after {
      content: "";
      position: absolute;
      display: block;
      background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/2gaw2khlvr5tm9to6aik.png")
        no-repeat;
      background-size: cover;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
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