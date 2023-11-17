<template>
  <view class="brand-pane-container" v-if="factory" @click="go(`/pages/index/BrandFactory/detail?id=${factory.shopId}`)">
    <tui-lazyload-img width="266rpx" height="266rpx" radius="8rpx" mode="scaleToFill" style="flex-shrink: 0;"
      :src="getBrandPic(factory.advertisement)"></tui-lazyload-img>

    <view class="brand-info">
      <view class="brand-name">{{ factory.shopName }}</view>
      <view class="info info-1">
        <view class="brand-icon">
          <image class="icon" src="../../../../static/images/new-index/brandFactory/brand-icon.png">
          </image> 品牌家居
        </view>
        <view class="time-long text-center"> {{ factory.annualLimit ? `${factory.annualLimit}年` : '经典老店' }} </view>
        <view class="brand-address">{{ factory.shopAdress }}</view>
      </view>


      <view class="info info-2">
        <view>品牌灯饰</view>
        <view class="text-center">履约率100%</view>
        <view>98%回头率</view>
      </view>


      <view class="info">
        <image class="rate-icon" src="../../../../static/images/new-index/brandFactory/rate-icon.png"></image>
        <view class="rate-detail">
          <image class="rate-star" v-for="item in (factory.score || 5)" :key="item"
            src="../../../../static/images/new-index/brandFactory/rate-star.png"></image> {{ factory.score || 5 }}星工厂
          <image class="next-icon" src="../../../../static/images/new-index/brandFactory/next.png"></image>
        </view>
      </view>

      <view class="info" style="margin-bottom: -10upx;">
        <view class="tag" v-for="label in factory.label ? initLabels(factory.label) : defaultLabels">{{ label }}</view>
      </view>

      <view class="info recommend-containter">
        <view style="display: flex; align-items: center;">
          <image class="recommend-icon" src="../../../../static/images/new-index/brandFactory/recommend.png"></image>
          多款品牌家具
        </view>

        <view class="dots">
          <view class="item"></view>
          <view class="item"></view>
          <view class="item"></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    factory: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      defaultLabels: ['支持定制', '批量采购', '品牌正品']
    }
  },

  methods: {
    getBrandPic(picStr) {
      if (!picStr || typeof picStr !== 'string') return ''
      return picStr.split(',')[0]
    },

    initLabels(label) {
      if (!label || typeof label !== 'string' || !label.trim()) return this.defaultLabels
      return label.split(',')
    }
  },
}
</script>

<style lang="less" scoped>
.brand-pane-container {
  margin-bottom: 36upx;
  display: flex;
  align-items: flex-start;

  .brand-info {

    margin-left: 16upx;

    .brand-name {
      font-weight: bold;
      font-size: 32upx;
      color: #222229;
      width: 432upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .text-center {
      padding: 0 13upx;
      margin: 0 13upx;
      border-left: 1upx solid #D8D8D8;
      border-right: 1upx solid #D8D8D8;
    }

    .info {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: 12upx 0;
      font-size: 24upx;
      color: #9E9E9E;


      .brand-icon {
        display: flex;
        align-items: center;
        font-size: 24upx;
        color: #222229;
        font-weight: 500;

        .icon {
          width: 32upx;
          height: 32upx;
          margin-right: 6upx;
          flex-shrink: 0;
        }
      }

      .time-long {
        font-size: 24upx;
        color: #9E9E9E;

      }

      .brand-address {
        color: #222229;
        font-size: 24upx;
        width: 140upx;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
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

      .tag {
        padding: 4upx 8upx;
        background-color: #EFF3F6;
        border-radius: 4upx;
        font-size: 20upx;
        margin-right: 6upx;
        white-space: nowrap;
        margin-bottom: 10upx;
      }


    }

    .recommend-icon {
      width: 35upx;
      height: 35upx;
      flex-shrink: 0;
      margin-right: 14upx;
    }
  }

  .recommend-containter {
    justify-content: space-between;

    .dots {
      display: flex;
      align-items: center;

      .item {
        width: 6upx;
        height: 6upx;
        border-radius: 50%;
        background-color: #D8D8D8;
        margin-left: 6upx;
      }
    }
  }
}
</style>