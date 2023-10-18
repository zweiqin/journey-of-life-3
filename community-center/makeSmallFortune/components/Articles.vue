<template>
  <view class="ArticlesItem">
      <view class="ArticlesItemTop">
        <view class="ArticlesCoverSheetBox">
          <image class="ArticlesCoverSheet" src='@/static/images/new-community/home/CoverSheet.png'></image>
          <image class="ArticlesCoverSheet overPng" v-if="datas.isOver" src='@/static/images/new-community/home/isOver.png'></image>
        </view>
        <view class="LeftInformation">
          <view class="title">劲爆！0元可在附近就能开店快...</view>
          <view class="timer">发布者：团蜂科技</view>
          <view class="TheReader">
            <image :src="item" class="ReaderAvatar" :class="{more:index > 0,moremore:index>1}" v-for="(item, index) in datas.readerAvata" :key="index"></image>
            <text class="ReaderNumber">已有100+人领取</text>
          </view>
        </view>
      </view>
      <view class="ArticlesItemTBottom">
        <view class="maxPrice">
          <view class="maxText">
            最高奖励
          </view>
          <view class="maxPriceNumber">可获取99元</view>
        </view>
        <view class="ClicTokDetails" v-if="!datas.isOver">
          查看详情
        </view>
        <view class="disableds" v-else>
          已结束
        </view>
      </view>
  </view>
</template>

<script>
export default {
  name: "Articles",
  props: {
    datas: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      
    }
  },
  computed: {},
  methods: {},
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
}
</script>

<style lang="scss" scoped>
/* @keyframes fade {
  0% {
    opacity: 0.4;
    transform: translateX(-100vw);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
} */
.ArticlesItem {
  min-width: 100%;
  box-sizing: border-box;
	background-color: #ffffff;
  box-sizing: border-box;
  padding: 22rpx 26rpx;
  /* -webkit-animation: fade 350ms cubic-bezier(0.76, 1.68, 1, 0.84);
  animation: fade 350ms cubic-bezier(0.76, 1.68, 1, 0.84); */
  .ArticlesItemTop {
    width: 100%;
    height: 155rpx;
    display: flex;
    .ArticlesCoverSheetBox {
      position: relative;
          .ArticlesCoverSheet {
            width: 148rpx;
            height: 155rpx;
            border-radius: 10rpx;
          }
          .overPng {
            position: absolute;
            top: -10rpx;
            left: -20rpx;
            width: 258rpx;
            height: 255rpx;
          }
    }
    .LeftInformation {
      position: relative;
      margin-left: 20rpx;
      .title {
        min-width: 463rpx;
        max-width: 463rpx;
        white-space:nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 32rpx;
        font-weight: 600;
        line-height: 52rpx;
        color: #222229;
      }
      .timer {
        font-size: 26rpx;
        font-weight: normal;
        line-height: normal;
        color: #888889;
        margin-top: 5rpx;
        margin-bottom: 20rpx;
      }
      .TheReader {
        position: relative;
        display: flex;
        align-items: center;
        .ReaderAvatar {
          width: 34rpx;
          height: 34rpx;
          border-radius: 50%;
        }
        .more {
          transform: translateX(-30%);
        }
        .moremore {
          transform: translateX(-60%);
        }
        .ReaderNumber {
          font-size: 26rpx;
          font-weight: normal;
          line-height: normal;
          color: #FF380C;
        }
      }
    }
  }
  
  .ArticlesItemTBottom {
    margin-top: 10rpx;
    width: 100%;
    height: 50rpx;
    display: flex;
    .maxPrice {
      display: flex;
      position: relative;
      margin-left: 158rpx;
      .maxText {
        width: 132rpx;
        height: 48rpx;
        border-radius: 48rpx;
        background: #5B79FB;
        font-size: 24rpx;
        text-align: center;
        line-height: 48rpx;
        font-weight: normal;
        color: #FFFFFF;
        z-index: 1;
      } 
      .maxPriceNumber {
        box-sizing: border-box;
        z-index: 0;
        position: absolute;
        left: 95rpx;
        min-width: 203rpx;
        padding-right: 20rpx;
        height: 48rpx;
        border-radius: 48rpx;
        background: #EEF1FF;
        font-size: 24rpx;
        text-align: right;
        font-weight: normal;
        line-height: 48rpx;
        font-feature-settings: "kern" on;
        color: #5B79FB;
      }
    }
    .ClicTokDetails {
      margin-left: 220rpx;
      width: 158rpx;
      height: 48rpx;
      border-radius: 50rpx;
      background: #FEEEEE;
      font-size: 24rpx;
      text-align: center;
      font-weight: normal;
      line-height: 48rpx;
      color: #FF380C;
    }
    .disableds {
      margin-left: 220rpx;
      width: 134rpx;
      height: 47rpx;
      font-size: 24rpx;
      border-radius: 50rpx;
      background: #F6F6F8;
      text-align: center;
      font-weight: normal;
      line-height: 48rpx;
      color: #9E9E9E;
    }
  }
}
</style>