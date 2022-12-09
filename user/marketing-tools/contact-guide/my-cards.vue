<template>
  <view class="my-card">
    <view
      ref="backgroundImgRef"
      class="my-card-background"
      :style="{
        background: currentBackgroundColor,
      }"
    >
    </view>
    <view class="main">
      <view class="my-card-header">
        <JBack></JBack>
        <h2>名片夹</h2>
      </view>

      <view class="card-info animate__animated animate__swing">
        <view class="title">总名片数</view>
        <view class="card-number">{{ totalNameCardNumber }}</view>
      </view>

      <view class="my-card-change" @click="changeBackgroundColor">
        更换背景
      </view>

      <view class="card-list" v-for="(item, index) in data" :key="index">
        <view class="create-card-time">{{ index }}</view>
        <view
          class="card-wrapper"
          @click="handleViewNameCard(nameCard)"
          v-for="nameCard in item"
          :key="nameCard.id"
        >
          <image class="avatar" :src="nameCard.headPic" mode="" />

          <view class="detail-info">
            <view class="name-wrapper">
              <view class="name">{{ nameCard.name }}</view>
              <JIcon
                width="36"
                height="36"
                type="share"
              ></JIcon>
            </view>

            <view class="text text1">{{ nameCard.position }}</view>
            <view class="text">{{ nameCard.business }}</view>
          </view>
        </view>
      </view>
      <JNoData
        v-if="JSON.stringify(data) === '{}'"
        type="namecard"
        width="300"
        text="未添加名片"
      ></JNoData>
    </view>

    <view class="my-card-footer">
      <button
        class="uni-btn build"
        @click="go('/user/marketing-tools/contact-guide/create-namezcard')"
      >
        新建名片
      </button>
    </view>

    <JPopup v-model="backgroundChangeVisble">
      <view class="change-background">
        <view class="change-background-header">
          <view class="title">更换背景色</view>
          <JIcon
            @click="closePopup"
            width="36"
            height="36"
            type="close"
          ></JIcon>
        </view>

        <view class="color-selector">
          <view class="color-wrapper">
            <view class="title">当前</view>
            <view class="colors">
              <view class="color-item" style="background: #183869"></view>
            </view>
          </view>

          <view class="color-wrapper">
            <view class="title">替换</view>
            <view class="colors">
              <view
                v-for="item in restColoes"
                :key="item"
                :style="{
                  background: item,
                }"
                @click="handleChooseItem(item)"
                class="color-item"
                :class="{
                  active: currentChooseColor === item,
                }"
                style="background: #183869"
              ></view>
            </view>
          </view>

          <view class="selector-footer">
            <button class="uni-btn selector-cancel" @click="closePopup">
              取消
            </button>
            <button
              class="uni-btn selector-confirm"
              @click="handleConfirmBackground"
            >
              确定
            </button>
          </view>
        </view>
      </view>
    </JPopup>
  </view>
</template>

<script>
import { getRestColor } from "./config";
import { getNameCardList, changeNameCardBgApi } from "../../../api/user";
import { domToImage, getUserId } from "../../../utils";

export default {
  data() {
    return {
      backgroundChangeVisble: false,
      currentChooseColor: "",
      currentBackgroundColor: "",
      data: [],
      totalNameCardNumber: 0,
    };
  },

  onShow() {
    this.getNameCardList();
  },

  methods: {
    // 获取名片列表
    getNameCardList() {
      const _this = this;
      getNameCardList({
        userId: getUserId(),
        page: 1,
        limit: 30,
      }).then(({ data }) => {
        const finalData = {};
        _this.totalNameCardNumber = data.brandList.length;

        for (const nameCard of data.brandList) {
          const addTime = nameCard.addTime.split(" ")[0];
          if (!finalData[addTime]) {
            finalData[addTime] = [nameCard];
          } else {
            finalData[addTime].push(nameCard);
          }
        }

        _this.data = finalData;
      });
    },

    // 更换背景
    changeBackgroundColor() {
      this.backgroundChangeVisble = true;
    },

    // 关闭popup
    closePopup() {
      this.backgroundChangeVisble = false;
      this.currentChooseColor = "";
    },

    // 选择当前颜色值
    handleChooseItem(color) {
      this.currentChooseColor = color;
    },

    // 确定选择该颜色值
    handleConfirmBackground() {
      const _this = this;
      changeNameCardBgApi({
        userId: getUserId(),
        bgColor: _this.currentChooseColor,
      }).then(() => {
        _this.currentBackgroundColor = _this.currentChooseColor;
        _this.closePopup();
      });
    },

    // 去看详情
    handleViewNameCard(info) {
      this.go(
        "/user/marketing-tools/contact-guide/name-card-detail?id=" + info.id
      );
    },
  },

  computed: {
    restColoes() {
      return getRestColor("#183869");
    },
  },
};
</script>

<style lang="less" scoped>
.my-card {
  width: 100%;

  &-background {
    width: 100%;
    height: 384upx;
    background-color: #183869;
    transition: all 350ms;
  }

  .main {
    position: absolute;
    left: 0;
    top: 54upx;
    width: 100%;
    padding: 0 30upx;
    box-sizing: border-box;
    padding-bottom: 166upx;

    .my-card-header {
      display: flex;
      align-items: center;

      h2 {
        color: #fff;
        font-size: 30upx;
        margin-top: -4upx;
        margin-left: 30upx;
      }
    }

    .card-info {
      height: 320upx;
      width: 100%;
      background-color: #ffe5cc;
      border-radius: 20upx;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 32upx;
      color: #3d3d3d;
      margin: 60upx 0 20upx 0;

      .card-number {
        font-size: 72upx;
        color: #804208;
        font-weight: bold;
        margin-top: 56upx;
        font-family: fangsong;
      }
    }

    .my-card-change {
      text-align: center;
      color: #999999;
      font-size: 24upx;
    }

    .card-list {
      margin-top: 30upx;

      .create-card-time {
        font-size: 24upx;
        color: #999;
      }

      .card-wrapper {
        width: 100%;
        padding: 50upx 26upx;
        box-sizing: border-box;
        border-radius: 20upx;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.302);
        margin-top: 20upx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .avatar {
          width: 120upx;
          height: 120upx;
          object-fit: cover;
          border-radius: 20upx;
          margin-right: 26upx;
          flex-shrink: 0;
        }

        .detail-info {
          flex: 1;

          .name-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 32upx;
            font-weight: bold;
          }

          .text {
            color: #3d3d3d;
            font-size: 24upx;

            &.text1 {
              margin: 14upx 0 10upx 0;
            }
          }
        }
      }
    }
  }

  .my-card-footer {
    position: fixed;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 115upx;
    display: flex;
    padding: 22upx 30upx;
    box-sizing: border-box;
    align-items: center;
    background-color: #fff;

    .build {
      flex: 1;
      margin-right: 24upx;
      color: rgb(255, 255, 255);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
      background-color: #3662ec;
    }
  }

  .change-background {
    width: 690upx;
    padding: 26upx 18upx;
    box-sizing: border-box;
    border-radius: 20upx;
    background-color: #fff;

    .change-background-header {
      position: relative;
      width: 100%;
      text-align: center;

      /deep/ .j-icon {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      }
    }

    .color-selector {
      margin: 60upx 0 20upx 0;
      .color-wrapper {
        display: flex;
        align-items: flex-start;
        margin-bottom: 20upx;

        .colors {
          display: flex;
          flex: 1;
          flex-wrap: wrap;
        }

        .title {
          margin-right: 20upx;
          font-size: 24upx;
          color: #3d3d3d;
        }

        .color-item {
          width: 80upx;
          height: 80upx;
          margin-right: 20upx;
          border-radius: 4upx;
          flex-shrink: 0;
          margin-bottom: 20upx;

          &.active {
            position: relative;

            &::after {
              content: "";
              display: block;
              position: absolute;
              right: 6upx;
              bottom: 6upx;
              width: 32upx;
              height: 32upx;
              background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/0kut8emy01lkcxd0gvxg.png")
                no-repeat;
              background-size: cover;
            }
          }
        }
      }
    }

    .selector-footer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 100upx;

      .uni-btn {
        font-size: 32upx;
        color: #fff;
        border-radius: 100px;
        padding: 20upx 80upx;
      }

      .selector-cancel {
        color: #999;
        border: 1upx solid #999;
      }

      .selector-confirm {
        background-color: #3662ec;
      }
    }
  }
}
</style>
