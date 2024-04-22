<template>
  <view class="info-pane">
    <view class="header">
			<tui-icon name="arrowleft" color="#FFFFFF" size="52" unit="rpx" margin="0"></tui-icon>
    </view>

    <view class="share-holder-info">
			<view class="avatar">
    	  <image style="width: 125upx;height: 125upx;border-radius: 16upx;" :src="userInfo.avatarUrl"></image>
				<view style="position: absolute;bottom: 0;right: 0;margin-bottom: -10upx;margin-right: -10upx;padding: 10rpx;background-color: #e95d20;line-height: 1;border-radius: 50%;box-sizing: border-box;">
					<tui-icon name="people-fill" color="#ffffff" size="28" unit="rpx" margin="0"></tui-icon>
				</view>
			</view>
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
    width: fit-content;
    margin: 12rpx 0 0 24rpx;
    padding: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    line-height: 1;
		background-color: #1625b7;

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