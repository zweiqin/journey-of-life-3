<template>
  <view class="brand-pane-container" v-if="data && data.brand.picUrls.length && data.brand.brandgenre == 23">
    <Carousel :isLazyLoad="false" :height="150" :list="data.brand.picUrls"></Carousel>
    <view class="brand-info" @click="go(`/pages/index/BrandFactory/detail?brandId=${data.brand.id}`)">
      <image v-if="data.brand.picUrl" class="brand-avatar" :src="data.brand.picUrl" mode="" />

      <view :style="{ background: randomRGB() }" v-else class="brand-avatar">
        {{ data.brand.name.slice(0, 2) }}
      </view>

      <view class="detail-info">
        <view class="brand-title">
          <view class="title">{{ data.brand.name }}</view>
          <button class="uni-btn">
            进入展厅
            <tui-icon color="ffc117" name="arrowright" :size="20"></tui-icon>
          </button>
        </view>

        <view class="tags">
          <view class="tag">
            <view class="img-wrapper">
              <image class="icon" src="../../../static/images/new-brand/index/shiming.png" mode="" />
            </view>
            <text>实名认证</text>
          </view>

          <view class="tag">
            <view class="img-wrapper">
              <image class="icon" src="../../../static/images/new-brand/index/shiming.png" mode="" />
            </view>
            <text>品质保证</text>
          </view>
        </view>

        <view class="rate">
          <view class="item">{{ data.brand.trafficVolume || 0 }}人访问</view>
          <view class="item">{{ data.brand.collectVolume || 0 }}人关注</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Carousel from "../../../components/carousel/index";
import { randomRGB } from "../../../utils";
export default {
  components: {
    Carousel,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  methods: { randomRGB },
};
</script>

<style lang="less" scoped>
/deep/ .brand-pane-container {
  /deep/ .banner {
    border-radius: 24upx 24upx 0 0 !important;
    margin-top: 0 !important;
    height: 380upx !important;
  }
}

/deep/ .uni-swiper-dot {
  width: 16upx !important;
  height: 16upx !important;
  border-radius: 50% !important;
  box-sizing: border-box !important;
  background-color: #f1f1f0 !important;
  border: 1upx solid #fff !important;
}

/deep/ .uni-swiper-dot-active {
  width: 48upx !important;
  border-radius: 100px !important;
  background-color: #ffc117 !important;
}

.brand-info {
  display: flex;
  align-items: center;
  padding: 32upx;
  background-color: #fff;
  box-sizing: border-box;
  border-radius: 0 0 24upx 24upx;

  .brand-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160upx;
    height: 160upx;
    border-radius: 16upx;
    flex-shrink: 0;
    margin-right: 24upx;
    font-size: 36upx;
    color: #fff;
  }

  .detail-info {
    // background-color: #ffc117;
    flex: 1;

    .brand-title {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        width: 236upx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 34upx;
        line-height: 52upx;
        font-weight: 500;
      }

      .uni-btn {
        display: flex;
        align-items: center;
        color: #ffc117;
        white-space: nowrap;
        font-size: 28upx;
      }
    }
  }
}

.brand-pane-container {
  margin-bottom: 20upx;
}

.tags {
  display: flex;
  align-items: center;
  margin: 14upx 0 24upx 0;

  .tag {
    display: flex;
    align-items: center;
    // overflow: hidden;
    box-sizing: border-box;

    .img-wrapper {
      text-align: center;
      line-height: 40upx;
      width: 40upx;
      height: 40upx;
      border-radius: 8upx 0 0 8upx;
    }

    .icon {
      width: 24upx;
      height: 24upx;
    }

    text {
      height: 40upx;
      line-height: 38upx;
      font-size: 22upx;
      box-sizing: border-box;
      padding: 0 6upx;
      border-radius: 0 8upx 8upx 0;
    }

    &:nth-child(1) {
      margin-right: 9upx;

      .img-wrapper {
        background-color: #ffc117;
      }

      text {
        border: 2upx solid #ffc117;
        color: #ffc117;
      }
    }

    &:nth-child(2) {
      .img-wrapper {
        background-color: #81e19e;
      }

      text {
        border: 2upx solid #81e19e;
        color: #81e19e;
      }
    }
  }
}

.rate {
  display: flex;

  .item {
    font-size: 28upx;
    color: #8f8d85;

    &:nth-child(1) {
      padding-right: 16upx;
      margin-right: 16upx;
      border-right: 1upx solid #f1f1f0;
    }
  }
}
</style>
