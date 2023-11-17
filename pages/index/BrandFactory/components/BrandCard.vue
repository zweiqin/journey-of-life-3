<template>
  <view class="brand-card-container">
    <view class="brand-name-wrapper">
      <view class="name">{{ name }}</view>
      <image class="brand-icon" src="../../../../static/images/new-index/brandFactory/brand-icon.png"></image>
    </view>

    <view class="item">
      <image class="xun-icon" src="../../../../static/images/new-index/brandFactory/xun.png"></image>
      <view class="no-wrap">{{ year ? `经营${year}年` : '经典老店' }}</view>
      <view class="main-serve no-wrap">主营：{{ label }}</view>
    </view>

    <view class="item">
      <image class="rate-icon" src="../../../../static/images/new-index/brandFactory/rate-icon.png"></image>
      <view class="rate-detail">
        <image class="rate-star" v-for="item in score" :key="item"
          src="../../../../static/images/new-index/brandFactory/rate-star.png"></image> {{ score }}星工厂
        <image class="next-icon" src="../../../../static/images/new-index/brandFactory/next.png"></image>
      </view>
      <image class="brand-tag" src="../../../../static/images/new-index/brandFactory/brand-tag.png"></image>
      <view class="arrow-wrapper">
        <image class="arrow" src="../../../../static/images/new-index/brandFactory/right-arrow.png"></image>
      </view>
    </view>

    <view class="item">
      <image class="bao-icon" src="../../../../static/images/new-index/brandFactory/bao.png"></image>
      <view class="arrow-wrapper">
        <image class="arrow" src="../../../../static/images/new-index/brandFactory/right-arrow.png"></image>
      </view>
    </view>

    <view class="item">
      <image class="brand-address" src="../../../../static/images/new-index/brandFactory/brand-address.png"></image>
      <view class="address-text">{{ address }}</view>
      <view class="arrow-wrapper">
        <image class="arrow" src="../../../../static/images/new-index/brandFactory/right-arrow.png"></image>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ""
    },

    year: {
      type: [Number, String],
      default: ''
    },

    score: {
      type: [Number, String],
      default: 5
    },

    address: {
      type: String,
      default: ""
    },

    label: {
      type: String,
      default: '支持定制,批量采购,品牌正品'
    }
  }
}
</script>

<style lang="scss" scoped>
.brand-card-container {
  width: 100%;
  padding: 40upx 30upx 38upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 20upx;
  margin: 24upx 0 28upx 0;

  .no-wrap {
    white-space: nowrap;
  }

  .brand-name-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40upx;

    .name {
      width: 580upx;
      overflow: hidden;
      font-size: 36upx;
      font-weight: 500;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .brand-icon {
      width: 32upx;
      height: 32upx;
      flex-shrink: 0;
    }
  }

  .item {
    display: flex;
    align-items: center;
    font-size: 26upx;
    color: #888889;
    margin: 16upx 0;

    .xun-icon {
      width: 34upx;
      height: 34upx;
      flex-shrink: 0;
      margin-right: 12upx;
    }

    .main-serve {
      width: 472upx;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-left: 30upx;
    }

    .rate-icon {
      width: 128upx;
      height: 34upx;
      flex-shrink: 0;
    }



    .rate-detail {
      display: flex;
      align-items: center;
      height: 34upx;
      background: #FBF4F4;
      color: #EF530E;
      font-size: 24upx;
      padding: 0 14upx;
      border-radius: 0px 4upx 4upx 0px;

      .rate-star {
        width: 21upx;
        height: 20upx;
        margin-right: 8upx;
      }

      .next-icon {
        width: 22upx;
        height: 22upx;
        margin-left: 6upx;
      }
    }

    .brand-tag {
      width: 128upx;
      height: 34upx;
      flex-shrink: 0;
      margin-left: 24upx;
    }


    .arrow-wrapper {
      flex: 1;
      text-align: right;

      .arrow {
        width: 20upx;
        height: 20upx;
        flex-shrink: 0;
      }
    }

    .bao-icon {
      height: 40upx;
      width: 555upx;
    }

    .brand-address {
      width: 34upx;
      height: 34upx;
      flex-shrink: 0;
      margin-right: 12upx;
    }

    .address-text {
      font-size: 26upx;
      width: 503upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #000;

    }
  }
}
</style>