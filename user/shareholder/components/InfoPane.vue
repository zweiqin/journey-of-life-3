<template>
  <view class="info-pane">
    <view class="header">
      <image class="back" @click="handleBack" src="../../../static/images/new-user/gudong/back.png"></image>
    </view>

    <view class="share-holder-info">
      <image class="avatar" :src="userInfo.avatarUrl"></image>
      <view class="detail-info">
        <view class="nickname">{{ userInfo.nickName }} <text class="personal-tag"> (股东成员)</text> </view>
        <view class="mobile">{{ userInfo.phone }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/user/user'
      });
    }
  },
}
</script>

<style lang="less" scoped>
.info-pane {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 328upx;
  background-color: #0011B1;
  width: 100%;

  .header {
    height: 104upx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .back {
      width: 60upx;
      height: 60upx;
      margin-left: 24upx;
    }
  }

  .share-holder-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 44upx;
    box-sizing: border-box;
    color: #fff;
    margin-bottom: 50upx;


    .avatar {
      position: relative;
      width: 125upx;
      height: 125upx;
      border-radius: 16upx;
      flex-shrink: 0;
      margin-right: 30upx;
      overflow: inherit;

      &::after {
        display: block;
        position: absolute;
        content: '';
        width: 48upx;
        height: 48upx;
        background: url('../../../static/images/new-user/gudong/tag.png') no-repeat;
        background-size: cover;
        bottom: 0;
        right: 0;
        margin-bottom: -10upx;
        margin-right: -10upx;
      }
    }

    .detail-info {
      .nickname {
        line-height: 1.5;
        font-weight: 500;
        font-size: 36upx;
        margin-bottom: 4upx;

        .personal-tag {
          font-size: 28upx;
          margin-left: 10upx;
        }
      }

      .mobile {
        font-size: 28upx;
      }
    }
  }
}
</style>