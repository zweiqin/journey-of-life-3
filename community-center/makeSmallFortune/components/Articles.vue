<template>
	<view class="ArticlesItem">
		<view class="ArticlesItemTop">
			<view class="ArticlesCoverSheetBox">
				<!-- @/static/images/new-community/home/CoverSheet.png -->
				<image class="ArticlesCoverSheet" :src="datas.postCover ? datas.postCover : require(&quot;@/static/images/new-community/home/CoverSheet.png&quot;)"></image>
				<image v-if="!(datas.redPacketInfo.totalPacket > 0)" class="ArticlesCoverSheet overPng" src="@/static/images/new-community/home/isOver.png"></image>
			</view>
			<view class="LeftInformation">
				<view class="title">{{ datas.postTitle || '无题 / 巅峰造诣' }}</view>
				<view class="timer">发布者：团峰科技</view>
				<view class="TheReader">
					<image v-for="(item, index) in datas.readerAvata" :key="index" :src="item" class="ReaderAvatar" :class="{ more: index > 0, moremore: index > 1 }"></image>
					<text class="ReaderNumber">已有{{ datas.redPacketInfo.totalPacket - datas.redPacketInfo.remainingPacket || 0 }}+人领取</text>
					<!-- Math.ceil(Math.random()*100 + 20) 好哈哈好没有数据，极限作假 -->
				</view>
			</view>
		</view>
		<view class="ArticlesItemTBottom">
			<view class="maxPrice">
				<view class="maxText">
					最高奖励
				</view>
				<view class="maxPriceNumber">可获取{{ datas.redPacketInfo.totalAmount || Math.ceil(Math.random() * 100 + 20) }}元</view>
			</view>
			<view v-if="datas.redPacketInfo.totalPacket && datas.redPacketInfo.totalPacket > 0" class="ClicTokDetails" @click="gotoArticleDetails">
				查看详情
			</view>
			<view v-else class="disableds">
				已结束
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'Articles',
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
	methods: {
		gotoArticleDetails() {
			uni.navigateTo({
				url: `/community-center/makeSmallFortune/articleDetails?id=${this.datas.postId}`
			})
		}
	}
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
        font-size: 24rpx;
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
