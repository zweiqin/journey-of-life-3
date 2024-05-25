<template>
  <view class="ArticlesItem">
      <view class="ArticlesItemTop">
        <view class="ArticlesCoverSheetBox">
          <image class="ArticlesCoverSheet"  @click="gotoArticleDetails" :src='datas.postCover?datas.postCover:require("../../../static/images/new-user/default-user-avatar.png")'></image>
					<view v-if="!(datas.remainingPacket > 0)" class="overPng">
						<view style="padding: 14rpx 0;border-top: 2rpx solid #ffffff;border-bottom: 2rpx solid #ffffff;">已结束</view>
					</view>
        </view>
        <view class="LeftInformation">
          <view class="title" @click="gotoArticleDetails">{{ datas.postTitle || '无题 / 巅峰造诣' }}</view>
          <view class="timer">发布者：{{ datas.username || '团峰科技' }}</view>
          <view class="TheReader">
            <image :src="item.imgUrl" class="ReaderAvatar" :class="{more:index > 0,moremore:index>1}" v-for="(item, index) in datas.already.slice(0,3)" :key="index"></image>
            <text class="ReaderNumber">已有{{ datas.redPacketInfo.totalPacket-datas.redPacketInfo.remainingPacket || 0 }}+人领取</text>
            <!-- Math.ceil(Math.random()*100 + 20) 好哈哈好没有数据，极限作假 -->
          </view>
        </view>
      </view>
      <view class="ArticlesItemTBottom">
        <view class="maxPrice">
          <view class="maxText">
            最高奖励
          </view>
          <span class="maxPriceNumber">
                可获取{{ datas.redPacketInfo.totalAmount || Math.ceil(Math.random()*100 + 20) }}元
          </span>
        </view>
        <view class="ClicTokDetails" v-if="datas.remainingPacket > 0" @click="gotoArticleDetails">
          查看详情
        </view>
        <view class="disableds" v-else  @click="gotoArticleDetails">
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
  methods: {
    gotoArticleDetails() {
      uni.navigateTo({
         url: `/community-center/makeSmallFortune/articleDetails?id=${this.datas.postId}`
      });
    }
  },
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
.ArticlesItem {
  min-width: 100%;
  box-sizing: border-box;
	background-color: #ffffff;
  box-sizing: border-box;
  padding: 22rpx 26rpx;
  .ArticlesItemTop {
    width: 100%;
    height: 155rpx;
    display: flex;
    .ArticlesCoverSheetBox {
      position: relative;
          .ArticlesCoverSheet {
            width: 170rpx;
            height: 172rpx;
            border-radius: 10rpx;
          }
          .overPng {
            position: absolute;
            top: 30rpx;
            left: 20rpx;
						// padding: 52rpx;
            width: 170rpx;
            height: 172rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border: 4rpx solid #ffffff;
						border-radius: 50%;
						color: #ffffff;
						font-size: 38rpx;
						text-align: center;
						white-space: nowrap;
        		transform: rotate(-30deg);
						box-sizing: border-box;
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
        font-size: 34rpx;
        font-weight: 600;
        line-height: 52rpx;
        color: #222229;
      }
      .timer {
        font-size: 26rpx;
        font-weight: normal;
        line-height: normal;
        color: #888889;
        margin-top: 10rpx;
        margin-bottom: 20rpx;
      }
      .TheReader {
        position: relative;
        display: flex;
        align-items: center;
        .ReaderAvatar {
          width: 36rpx;
          height: 36rpx;
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
    position: relative;
    margin-top: 20rpx;
    width: 100%;
    height: 50rpx;
    display: flex;
    .maxPrice {
      display: flex;
      position: relative;
      margin-left: 178rpx;
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
        display: inline-block;
        min-width: 176rpx;
        padding-right: 20rpx;
        padding-left: 50rpx;
        height: 48rpx;
        border-radius: 48rpx;
        background: #EEF1FF;
        font-size: 24rpx;
        /* text-align: right; */
        font-weight: normal;
        line-height: 48rpx;
        font-feature-settings: "kern" on;
        white-space: nowrap;
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