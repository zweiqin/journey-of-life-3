<template>
  <view class="shop-detail-container" v-if="shopInfo">
    <view class="pane main-area" v-if="shopInfo.mainBusiness">
      <view class="pane-title">公司主营</view>
      <view class="pane-content">
        <view class="description">
          {{ shopInfo.mainBusiness }}
        </view>
      </view>
    </view>

    <view class="pane company-info" v-if="shopInfo.businessLicense.length && shopInfo.rotationChart.length">
      <view class="pane-title">公司信息</view>
      <view class="pane-content" v-if="shopInfo.businessLicense.length">
        <view class="section">
          <view class="section-title"> 资质证件</view>
          <view class="image-list">
            <scroll-view scroll-x="true">
              <view class="img-list">
                <tui-lazyload-img
                  :class="{ one: shopInfo.rotationChart.length === 1 }"
                  v-for="img in shopInfo.businessLicense"
                  :key="img"
                  :src="img"
                ></tui-lazyload-img>
              </view>
            </scroll-view>
          </view>
        </view>

        <view class="section company-style" v-if="shopInfo.rotationChart.length">
          <view class="section-title"> 公司风采</view>
          <view class="image-list">
            <scroll-view scroll-x="true">
              <view class="img-list">
                <tui-lazyload-img
                  :class="{ one: shopInfo.rotationChart.length === 1 }"
                  v-for="img in shopInfo.rotationChart"
                  :key="img"
                  :src="img"
                ></tui-lazyload-img>
              </view>
            </scroll-view>
          </view>

          <view class="description">
            {{ shopInfo.elegantDemeanour }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    shopInfo: Object
  }
};
</script>

<style lang="scss" scoped>
.pane {
  margin-top: 28upx;

  .pane-title {
    font-weight: 500;
    color: #222229;
    font-size: 32upx;
  }

  .pane-content {
    margin-top: 14upx;

    .section {
      &-title {
        color: #222229;
        font-size: 28upx;
      }
    }
  }
}

.main-area {
  .description {
    color: #9e9e9e;
    font-size: 28upx;
    line-height: 1.5;
  }
}

.company-info {
  .img-list {
    display: flex;
    align-items: center;
    margin: 14upx 0 24upx 0;

    /deep/ .tui-lazyload__box {
      width: 213upx !important;
      height: 191upx !important;
      align-items: center;
      background-color: #f9f9f9 !important;
      margin-right: 20upx;
      overflow: hidden;
      border-radius: 8upx;

      &.one {
        width: 100% !important;
        height: 275upx !important;
      }

      .tui-lazyload__img {
        border-radius: 8upx;
      }
    }
  }

  .company-style {
    /deep/ .tui-lazyload__box {
      width: 447upx !important;
      height: 275upx !important;
    }

    .description {
      color: #9e9e9e;
      font-size: 24upx;
      line-height: 1.5;
    }
  }
}
</style>
