<template>
  <view class="style-one">
    <view class="top-card">
      <view class="top">
        <JAvatar
          v-if="data.headPic"
          :size="160"
          radius="20"
          :src="data.headPic"
        ></JAvatar>
        <view class="right">
          <view class="name"
            >{{ data.name }}
            <JIcon
              type="red-modal"
              style="vertical-align: sub; margin-left: 10upx"
              width="34"
              height="40"
            ></JIcon>
          </view>
          <view>
            <view class="position sub">{{ data.position }}</view>
            <view class="company sub">{{ data.business }}</view>
          </view>
        </view>
      </view>

      <view class="main-card-item">
        <JIcon width="30" height="30" type="phone"></JIcon
        ><view class="main-card-text">{{ data.phone }}</view>
        <JIcon type="tuanfeng" width="124.5" height="42"></JIcon
      ></view>

      <view class="main-card-item">
        <JIcon width="26" height="30" type="main-locale"></JIcon
        ><view class="main-card-text">{{ data.address }}</view></view
      >

      <view class="qrcode">
        <slot></slot>
        <view class="desc">（扫一扫了解更多详情）</view>
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
    code: String,
  },

  methods: {},
};
</script>

<style lang="less" scoped>
/deep/ .j-icon {
  flex-shrink: 0;
}

.style-one{
  min-width: 690upx;
}

.img-avatr {
  border-radius: 20upx;
  width: 160upx;
  height: 160upx;
}

.top-card {
  width: 100%;
  font-size: 28upx;
  padding: 48upx 24upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20upx;
  margin-top: 40upx;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);

  .main-card-item {
    display: flex;
    align-items: flex-start;
    margin-top: 28upx;
    justify-content: space-between;

    .main-card-text {
      margin-left: 10upx;
      flex: 1;
    }
  }

  .top {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 30upx;

    .right {
      margin-left: 26upx;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 10upx 0;
      box-sizing: border-box;

      .name {
        font-size: 32upx;
        font-weight: bold;
      }

      .sub {
        color: #999999;

        &:nth-child(2) {
          margin-top: 16upx;
        }
      }
    }
  }

  .icon {
    text-align: right;
  }

  .qrcode {
    text-align: center;
    margin-top: 60upx;
    display: flex;
    align-items: center;
    flex-direction: column;

    .desc {
      color: #999999;
      font-size: 24upx;
      margin-top: 6upx;
    }
  }
}
</style>