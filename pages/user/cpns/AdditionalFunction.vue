<template>
  <view class="order-pane">
    <view class="title-wrapper">
      <view class="title-item">附加功能</view>
    </view>

    <view class="menus-container">
      <view class="swiper-item">
        <view class="menu-item" @click="go('/pages/stuff/stuff')">
          <image class="menu-icon" src="../../../static/images/tabbar/stuff.png" mode="" />
          <text class="menu-title">找材料</text>
        </view>

        <view class="menu-item" @click="go('/pages/logistics/logistics')">
          <image class="menu-icon" src="../../../static/images/tabbar/logistics.png" mode="" />
          <text class="menu-title">找物流</text>
        </view>

        <view class="menu-item" @click="go('/pages/user/kuai-di/index')">
			    <image class="menu-icon" src="../../../static/images/tabbar/kuaidi.png" mode="" />
          <text class="menu-title">寄快递</text>
		    </view>
        <view class="menu-item" @click="go('/pages/serviceoil/serviceoil')">
          <image class="menu-icon" src="../../../static/images/tabbar/jiayouqi.png" mode="" />
          <text class="menu-title">加油站</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { RuanRequest, shopRequest } from "@/utils";
export default {
  data() {
    return {

    }
  },
  methods: {
    gotoTuanYou() {
      RuanRequest('/tuanyou/getjumpurl', null, 'post').then(({ data }) => {
					console.log(data)
					// uni.navigateTo({
					// 	url: '/pages/index/convenient-services/tuanyouh5?url=' + data
					// })
				})
    }
  }
};
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5 !important;
}

.order-pane {
  padding: 32upx 24upx;
  background-color: #fff;
  border-radius: 24upx;

  .title-wrapper {
    color: #b3b2ad;
    font-size: 28upx;
    padding-bottom: 24upx;
    border-bottom: 1upx solid #f1f1f0;

    .title-item {
      margin-right: 24upx;
      font-weight: 500;
      color: #141000;
    }
  }

  .menus-container {
    height: 120upx;
    .swiper-item {
      padding: 28upx 0 32upx 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      // height: 280upx;

      .menu-item {
        position: relative;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        // width: 25%;
        // height: 104upx;

        .menu-icon {
          width: 50upx;
          height: 50upx;
        }

        .sub-script {
          position: absolute;
          padding: 4upx;
          background-color: #fff;
          border: 1upx solid #fc4023;
          border-radius: 100px;

          text {
            background-color: #fc4023;
            border-radius: 100px;
            font-size: 20upx;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
