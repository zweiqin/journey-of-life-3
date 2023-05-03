<template>
  <view class="vip-header-container">
    <view class="op-top">
      <TuanBack>
        <tui-icon :size="30" name="arrowleft"></tui-icon>
      </TuanBack>
      <!-- <image @click="$emit('share')" class="share-icon" v-if="campaignsType != 0" src="../../../static/images/con-center/vip/share.png"></image> -->
    </view>

    <view class="title">
      <view class="main-title">{{ name }}</view>
      <view class="sub-title">凡是与家居有关的问题，我们都可以解决</view>
    </view>

    <view v-if="campaignsType === 0">
      <view style="display: flex;position: fixed;z-index: 1;top: 26upx;right: 30upx;height: 64upx;">
        <view
          style="padding: 0 20upx;display: flex;align-items: center;font-weight: 700;background-color: rgba(255, 255, 255, .68);border-radius: 32upx;margin-right: 10upx;"
          @click="$emit('share-activity')">
          生成邀请码
        </view>
        <view
          style="padding: 0 20upx;display: flex;align-items: center;font-weight: 700;background-color: rgba(255, 255, 255, .68);border-radius: 32upx;"
          @click="$emit('share-active', false, 'shareBtn')">
          活动分享
        </view>
      </view>
    </view>
    <image class="topic-img" src="../../../static/images/con-center/vip/topic-img.png"></image>
  </view>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      require: true
    },
    campaignsType: {
      type: Number,
      default: null
    }
  }
}
</script>

<style lang="less" scoped>
.vip-header-container {
  .op-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40upx;

    .share-icon {
      width: 44upx;
      height: 44upx;
    }

  }

  .title {
    text-align: center;

    .main-title {
      font-size: 72upx;
      background: linear-gradient(180deg, #500000 0%, #FF8C00 110%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
      line-height: 100upx;
      font-weight: bold;
    }

    .sub-title {
      color: #542323;
      font-size: 32upx;
    }
  }

  .topic-img {
    width: 100%;
    height: 360upx;
    margin-bottom: -66upx;
  }
}
</style>