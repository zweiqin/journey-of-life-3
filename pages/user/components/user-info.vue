<template>
  <view class="user-info">
    <view class="left-wrapper" v-if="data">
      <view class="image-wrapper">
        <image @click="$emit('detail')" :src="data.avatarUrl" mode="" />
      </view>
      <view class="wrapper">
        <view class="top-wrapper">
          <view class="user-info-detail">
            <view class="username">{{ data.nickName }}</view>
            <view class="type">会员类型：{{ data.userLevelDesc }}</view>
          </view>

          <view class="right-wrapper">
            <view class="item" @click="$emit('detail')">
              <image src="../../../static/images/center/setting.png" mode="" />
              <text>设置</text>
            </view>
            <view class="item">
              <image src="../../../static/images/center/chart.png" mode="" />
              <text>聊天</text>
            </view>
          </view>
        </view>

        <view class="list-item">
          <view class="left">
            <navigator
              url="/user/sever/view-history?page=history"
              hover-class="none"
            >
              <text style="margin-left: 0"
                >足迹{{ data.footprintCount || 0 }}</text
              >
            </navigator>

            <navigator
              url="/user/sever/view-history?page=follow"
              hover-class="none"
            >
              <text>订阅{{ data.rssCount || 0 }}</text>
            </navigator>

            <navigator
              url="/user/sever/view-history?page=collection"
              hover-class="none"
            >
              <text style="border-right: none"
                >收藏{{ data.collectCount || 0 }}</text
              >
            </navigator>
          </view>

          <view v-if="data.invitationCode" class="code" @click="handleCopyCode"
            >编号：{{ data.invitationCode }}
          </view>
        </view>
      </view>
    </view>

    <view class="no-data" v-else>
      <image
        src="https://img2.baidu.com/it/u=3258659466,1029841077&fm=253&fmt=auto&app=138&f=PNG?w=120&h=120"
        mode=""
      />
      <view>
        您还未登录，<text class="text" @click="go('/pages/login/login')"
          >去登录~</text
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: {
    handleCopyCode() {
      uni.setClipboardData({
        data: this.data.invitationCode,
        success: () => {
          uni.showToast({
            title: '编号复制成功',
            duration: 2000,
          })
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.user-info {
  position: relative;
  width: 100%;
  height: 270upx;
  // background: url("../../static/images/center-2.0/Vector.png") no-repeat;
  background-size: cover;
  padding: 70upx 36upx 0 42upx;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  box-sizing: border-box;
  background: linear-gradient(to right, #ed374d, #fa793f);

  .wrapper {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    flex: 1;

    .top-wrapper {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .left-wrapper {
    display: flex;
    width: 100%;

    .image-wrapper {
      width: 160upx;
      height: 160upx;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #fff;
      margin-right: 20upx;
      flex-shrink: 0;

      image {
        width: 156upx;
        height: 156upx;
        border-radius: 50%;
      }
    }

    .user-info-detail {
      font-size: 24upx;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .username {
        font-size: 32upx;
        font-weight: 500;
        color: #fff;
      }

      .type {
        margin: 10upx 0;
        color: #fff;
      }
    }
  }

  .list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      display: flex;
      align-items: center;

      &:nth-child(1) {
        padding-left: 0;
      }

      text {
        padding: 0 10upx;
        color: #fff;
        border-right: 1px solid #fff;
      }
    }
  }

  .right-wrapper {
    display: flex;
    align-items: center;

    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:nth-child(2) {
        margin-left: 40upx;
      }

      text {
        font-size: 24upx;
        margin-top: 10upx;
        color: #fff;
      }
    }

    image {
      width: 48upx;
      height: 48upx;
    }
  }

  &::after {
    position: absolute;
    // content: "";
    display: block;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    // background: url("../../static/images/center-2.0/image 21.png") no-repeat;
    background-size: cover;
    transform: scale(2);
  }

  .no-data {
    display: flex;
    align-items: center;
    font-size: 28upx;
    line-height: 3;

    image {
      width: 120upx;
      height: 120upx;
      margin-right: 20upx;
    }

    .text {
      color: #d5d5d5;
    }
  }
}
</style>
