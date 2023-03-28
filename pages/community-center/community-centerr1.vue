<template>
  <view class="community-center-container">
    <!-- search -->
    <TopHead></TopHead>

    <!-- nav -->
    <view class="navs-container">
      <view class="navs">
        <view
          class="item"
          @click="go(item.url)"
          v-for="(item, index) in navs"
          :key="index"
        >
          <image class="nav-icon" :src="item.icon" mode="" />
          <text>{{ item.name }}</text>
        </view>
      </view>
    </view>

    <!-- vip -->
    <view class="vip-container">
      <image
        class="vip-39"
        @click="go('/community-center/vip-center/vip-detail?type=1')"
        src="../../static/images/con-center/new-home/39.9.png"
        mode=""
      />
      <view class="right">
        <image
          @click="go('/community-center/vip-center/vip-detail?type=2')"
          src="../../static/images/con-center/new-home/299.png"
          mode=""
        />
        <image
          @click="empty('套餐升级中')"
          src="../../static/images/con-center/new-home/1399.png"
          mode=""
        />
      </view>
    </view>

    <!-- nearby -->
    <view class="service-station">
      <view class="brand-title"> 附近服务站 </view>

      <ServiceStationPane></ServiceStationPane>
      <ServeListPane></ServeListPane>
    </view>

    <tui-toast ref="toast"></tui-toast> 
  </view>
</template>

<script>
import TopHead from './cpns/TopHead.vue'
import { homeNavConfig } from './data'
import ServiceStationPane from './cpns/ServiceStationPane.vue'
import ServeListPane from './cpns/ServeListPane.vue'
export default {
  components: {
    TopHead,
    ServiceStationPane,
    ServeListPane,
  },

  data() {
    return {
      navs: Object.freeze(homeNavConfig),
    }
  },
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5;
}
.community-center-container {
  background: #f1f1f0;
  padding-bottom: 100px;
  .navs-container {
    height: 411upx;
    width: 100%;
    background: linear-gradient(
      180deg,
      #e95d20 0%,
      #ff8f1f 47%,
      rgba(241, 240, 240, 0) 100%
    );
    padding: 30upx;
    box-sizing: border-box;

    .navs {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      flex-wrap: wrap;
      width: 100%;
      height: 100%;
      background-color: #fff;
      border-radius: 20upx;
      padding: 34upx 30upx;
      box-sizing: border-box;

      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 96upx;
        margin-right: 36upx;

        &:nth-of-type(5n) {
          margin-right: 0;
        }

        .nav-icon {
          width: 80upx;
          height: 80upx;
        }

        text {
          color: #3a3629;
          font-size: 24upx;
        }
      }
    }
  }

  .vip-container {
    display: flex;
    padding: 30upx;
    box-sizing: border-box;
    height: 320upx;

    image {
      flex-shrink: 0;
    }

    .vip-39 {
      width: 350upx;
      height: 320upx;
      margin-right: 20upx;
    }

    .right {
      height: 320upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;

      image {
        width: 320upx;
        height: 150upx;
      }
    }
  }

  .service-station {
    padding: 30upx;
    box-sizing: border-box;
    margin-top: 36upx;

    .brand-title {
      position: relative;
      color: #141000;
      font-size: 36upx;
      padding-left: 20upx;

      &::after {
        content: '';
        display: block;
        width: 8upx;
        height: 40upx;
        border-radius: 10px;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: linear-gradient(180deg, #ffd556 0%, #e95d20 100%);
      }
    }
  }
}
</style>
