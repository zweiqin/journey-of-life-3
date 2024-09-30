<template>
  <view class="container">
		<BeeBack>
			<view
				style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx 16rpx;background-color: #f5f5f5;"
			>
				<BeeIcon name="arrowleft" :size="26" color="#222229" style="width: fit-content;">
				</BeeIcon>
				<text style="flex: 1;margin-left: -40rpx;text-align: center;">充值商家</text>
			</view>
		</BeeBack>
    <view class="checkoutMerchant">
        <div class="tabsNavs">
            <view class="tab-item" @click="changeTab(index)" :class="{active : currentIndex == index}" v-for="(item, index) in tabs" :key="item">
                {{ item }}
            </view>
            <div class="tab-active" :style="{width: 750/tabs.length + 'rpx', left: currentIndex * 750/tabs.length - 20 + 'rpx'}"></div>
        </div>
    </view>
    <view class="merchantList">
            <merchantList ref="merchantList" v-if="currentIndex == 0"></merchantList>
            <historyMerchantList ref="historyMerchantList" v-if="currentIndex == 1"></historyMerchantList>
    </view>
  </view>
</template>

<script>
import historyMerchantList from './components/historyMerchantList.vue'
import merchantList from './components/merchantList.vue'
export default {
  name: "selectMerchant",
  components: {
    historyMerchantList,
    merchantList
  },
  data() {
    return {
        tabs: ['商家列表','我的商家'],
        currentIndex: 0,
    };
  },
  methods: {
    handleBack() {
        uni.navigateBack();
    },
    changeTab(index){
        this.currentIndex = index
    }
  },
  onReachBottom() {
        let arr = [this.$refs.merchantList, this.$refs.historyMerchantList]
        arr[this.currentIndex].getMoreList()
  }
};
</script>

<style lang="scss">
.container {
    background-color: #F8F9FB;
    .checkoutMerchant {
        width: 100vw;
        box-sizing: border-box;
        padding: 32rpx;
        display: flex;
          .tabsNavs {
                position: relative;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                overflow: hidden;
                width: 100%;
                height: 76rpx;
                border-bottom: 2rpx solid #F5F5F5;
                border-radius: 50rpx;
                box-shadow: 0px 2rpx 6rpx 0px rgba(9, 23, 49, 0.21);
                 .tab-item {
                    z-index: 2;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex: 1;
                    /* height: 100%;
                    width: 180rpx; */
                    color: #888889;
                    padding: 0 10rpx;
                }
                .active {
                    color: #FFFFFF;
                    transition: color .4s; /* 针对 color 来实现动画 */
                }
                .tab-active {
                    z-index: 1;
                    position: absolute;
                    bottom: 0;
                    /* width: 110px; */
                    height: 100%;
                    display: inline-block;
                    border-radius: 50rpx;
                    background: #EF530E;
                    transition: left .4s; /* 针对 left 变动来实现动画 */
                }
            }
    }
    .merchantList {
        width: 100vw;
        box-sizing: border-box;
        padding: 32rpx;
    }
}
</style>
