<template>
  <view class="design-detail-container">
    <img
      src="https://img0.baidu.com/it/u=2118931845,2580773066&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313"
      alt=""
      class="bgc"
    />

    <img
      class="back"
      @click="handleBack"
      src="../../static/images/common/back.png"
      alt=""
    />

    <view class="main">
      <view class="info">
        <view class="avatar">
          <img
            src="https://img0.baidu.com/it/u=2345246182,1338839258&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
            class="avatar-img"
          />

          <button class="follow-btn">订阅</button>
        </view>

        <view class="name">团蜂家居设计</view>

        <view class="total">
          订阅 <text class="num">45</text> 收藏 <text class="num">55</text>
        </view>

        <view class="serve-info">
          <view class="title">服务信息</view>
          <view class="serve-contaoner">
            <view class="item">
              <text class="text">服务区域</text>
              <text class="value">佛山、广州</text>
            </view>
            <view class="item">
              <text class="text">服务价格</text>
              <text class="value">200-500元/平方</text>
            </view>
            <view class="item">
              <text class="text">服务类型</text>
              <text class="value">室内设计</text>
            </view>
            <view class="item">
              <text class="text">服务范围</text>
              <text class="value">软装设计、硬装设计、全案设计</text>
            </view>
          </view>
        </view>
      </view>

      <view class="navs">
        <view
          :class="{ active: currentTab === 0 }"
          @click="changeTab(0)"
          class="item"
          >动态</view
        >
        <view
          @click="changeTab(1)"
          :class="{ active: currentTab === 1 }"
          class="item"
          >案例(45)</view
        >
        <view
          :class="{ active: currentTab === 2 }"
          @click="changeTab(2)"
          class="item"
          >评价</view
        >
      </view>

      <view class="content">
        <view v-show="currentTab === 1">
          <view class="goods-item">
            <img
              class="goods-img"
              src="https://img1.baidu.com/it/u=4076410947,2327937684&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=299"
              alt=""
            />

            <view class="name">龙江中式</view>
            <view class="tags">
              <text class="tag">佛山</text>
              <text class="tag">三居</text>
              <text class="tag">30万</text>
              <text class="tag">130平方</text>
            </view>
          </view>

          <view class="goods-item">
            <img
              class="goods-img"
              src="https://img1.baidu.com/it/u=3523041763,2590492518&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
              alt=""
            />

            <view class="name">龙江中式</view>
            <view class="tags">
              <text class="tag">佛山</text>
              <text class="tag">三居</text>
              <text class="tag">30万</text>
              <text class="tag">130平方</text>
            </view>
          </view>

          <view class="goods-item">
            <img
              class="goods-img"
              src="https://img2.baidu.com/it/u=27540206,1260750826&fm=253&fmt=auto&app=138&f=JPEG?w=859&h=500"
              alt=""
            />

            <view class="name">龙江中式</view>
            <view class="tags">
              <text class="tag">佛山</text>
              <text class="tag">三居</text>
              <text class="tag">30万</text>
              <text class="tag">130平方</text>
            </view>
          </view>

          <view class="goods-item">
            <img
              class="goods-img"
              src="https://img1.baidu.com/it/u=1134470971,2936499679&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=373"
              alt=""
            />

            <view class="name">龙江中式</view>
            <view class="tags">
              <text class="tag">佛山</text>
              <text class="tag">三居</text>
              <text class="tag">30万</text>
              <text class="tag">130平方</text>
            </view>
          </view>
        </view>

        <view v-show="currentTab === 0">
          <Dynamic></Dynamic>
          <Dynamic></Dynamic>
          <Dynamic></Dynamic>
        </view>

        <view v-show="currentTab === 2">
          <Evaluate></Evaluate>
          <Evaluate></Evaluate>
          <Evaluate></Evaluate>
        </view>
      </view>
    </view>

    <view class="op">
      <button class="phone">电话咨询</button>
      <button class="chat">
        <img class="icon" src="../../static/images/index/we-chat.png" alt="" />
        免费咨询
      </button>
    </view>
  </view>
</template>

<script>
import Dynamic from "./components/Design/components/dynamic";
import Evaluate from "./components/Design/components/evaluate";

export default {
  data() {
    return {
      currentTab: 1,
    };
  },

  components: {
    Dynamic,
    Evaluate,
  },

  methods: {
    changeTab(tab) {
      this.currentTab = tab;
    },

    handleBack() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
.design-detail-container {
  padding-bottom: 120upx;
  .bgc {
    width: 100%;
    height: 340upx;
    object-fit: cover;
  }

  .back {
    position: absolute;
    left: 40upx;
    top: 40upx;
    width: 20upx;
  }

  .main {
    position: relative;
    padding: 30upx;
    box-sizing: border-box;
    border-radius: 20upx;
    margin-top: -28upx;
    z-index: 10;

    .info {
      position: relative;

      .avatar {
        margin-bottom: -53upx;
        &-img {
          position: relative;
          top: -94upx;
          width: 160upx;
          height: 160upx;
          object-fit: cover;
          border-radius: 50%;
        }

        .follow-btn {
          float: right;
          width: 67px;
          height: 23px;
          text-align: center;
          line-height: 23px;
          background-color: #07b9b9;
          border-radius: 10px;
          color: #fff;
          font-size: 24upx;
          margin-top: 14upx;
        }
      }

      .name {
        font-size: 36upx;
        font-weight: bold;
      }

      .total {
        color: #999999;
        font-size: 24upx;
        margin: 28upx 0 42upx 0;
        .num {
          font-size: 32upx;
          color: #3d3d3d;
          margin-left: 6upx;

          &:nth-child(1) {
            margin-right: 72upx;
          }
        }
      }

      .serve-info {
        .title {
          color: #3d3d3d;
          font-size: 28upx;
          font-weight: bold;
          margin-bottom: 30upx;
        }

        .serve-contaoner {
          width: 100%;
          background-color: #efefef;
          border-radius: 10upx;
          font-size: 28upx;
          padding: 40upx 32upx;
          box-sizing: border-box;

          .item {
            margin-bottom: 20upx;
          }

          .text {
            color: #999999;
            margin-right: 36upx;
          }

          .value {
            color: #3d3d3d;
            font-weight: bold;
          }
        }
      }
    }

    .navs {
      display: flex;
      color: #999999;
      font-size: 24upx;
      margin: 20upx 0;

      .item {
        margin-right: 80upx;
        transition: all 350ms linear;

        &.active {
          font-weight: bold;
          color: #3d3d3d;
        }
      }
    }

    .content {
      .goods-item {
        margin-top: 34upx;

        .goods-img {
          width: 100%;
          height: 344upx;
          border-radius: 10upx;
        }

        .name {
          margin: 20upx 0;
          font-size: 24upx;
          font-weight: bold;
        }

        .tags {
          .tag {
            color: #999;
            font-size: 20upx;
            padding: 0 14upx;
            border-right: 1upx solid #d8d8d8;

            &:last-child {
              border: none;
            }

            &:first-child {
              padding-left: 0;
            }
          }
        }
      }
    }
  }

  .op {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 112upx;
    width: 100%;
    background-color: #fff;
    z-index: 20;

    .phone,
    .chat {
      height: 68upx;
      font-size: 28upx;
      border-radius: 40upx;
    }

    .phone {
      flex: 1;
      border: 1upx solid #999999;
      margin: 0 32upx;
    }

    .chat {
      flex: 3;
      background-color: #07b9b9;
      color: #fff;
      margin: 0 32upx;

      .icon {
        width: 54upx;
        vertical-align: middle;
        margin-right: 20upx;
      }
    }
  }

  .evaluate-container {
    margin-top: 40upx;
  }
}
</style>