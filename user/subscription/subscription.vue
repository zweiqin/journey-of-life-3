<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-15 10:05:05
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-18 09:13:32
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\subscription\subscription.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- 标题 -->
    <view class="subscription-title">
      <view class="left-view">
        <img
          @click="back"
          class="left-img"
          src="../../static/images/store/chevron-states.png"
          alt=""
        />
      </view>
      <view class="middle-view">
        <view class="text">订阅</view>
      </view>
      <view class="right-view"> </view>
    </view>
    <!-- 筛选订阅状态 -->
    <view class="subscription-chose">
      <view
        @click="changeTab(0)"
        :class="{ active: currentTab === 0 }"
        class="item"
        >全部店铺</view
      >
      <view
        @click="changeTab(1)"
        :class="{ active: currentTab === 1 }"
        class="item"
        >最近看过</view
      >
    </view>
    <!-- 订阅店铺显示 -->
    <view v-if="currentTab === 0">
      <view
        class="subscription-detail"
        v-for="(item, index) in shoplist"
        :key="index"
      >
        <view class="left-view">
          <img
            src="../../static/images/wuliu/user-blue.png"
            alt=""
            class="left-img"
          />
          <view>
            <view class="left-shopname">{{ item.shopname }}</view>
            <view class="shopdeatil">
              <view class="shop-classify">{{ item.shopClassify }}</view>
              <view class="detail-boundary">丨</view>
              <view class="subscription-time" v-if="item.subscriptionTime < 180"
                >{{ item.subscriptionTime }}天前订阅</view
              >
              <view
                class="subscription-time"
                v-if="item.subscriptionTime >= 180"
                >半年前订阅</view
              >
            </view>
          </view>
        </view>
        <view class="middle-view">
          <view class="shop-type" v-if="item.subscriptionType == 0"></view>
          <view class="shop-type" v-if="item.subscriptionType == 1"
            >新品发布中</view
          >
          <view class="shop-type" v-if="item.subscriptionType == 2"
            >福利发放中</view
          >
        </view>
        <view class="right-view">
          <view class="subscription-type">
            <view class="type-text">已订阅</view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="currentTab === 1">
      <view
          v-for="(item, index) in shoplist"
        :key="index">
                <view v-if="item.lastseeType == 1">
      <view
        class="subscription-detail"
    
      >

          <view class="left-view">
            <img
              src="../../static/images/wuliu/user-blue.png"
              alt=""
              class="left-img"
            />
            <view>
              <view class="left-shopname">{{ item.shopname }}</view>
              <view class="shopdeatil">
                <view class="shop-classify">{{ item.shopClassify }}</view>
                <view class="detail-boundary">丨</view>
                <view
                  class="subscription-time"
                  v-if="item.subscriptionTime < 180"
                  >{{ item.subscriptionTime }}天前订阅</view
                >
                <view
                  class="subscription-time"
                  v-if="item.subscriptionTime >= 180"
                  >半年前订阅</view
                >
              </view>
            </view>
          </view>
          <view class="middle-view">
            <view class="shop-type" v-if="item.subscriptionType == 0"></view>
            <view class="shop-type" v-if="item.subscriptionType == 1"
              >新品发布中</view
            >
            <view class="shop-type" v-if="item.subscriptionType == 2"
              >福利发放中</view
            >
          </view>
          <view class="right-view">
            <view class="subscription-type">
              <view class="type-text">已订阅</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 0,
      shoptype: 0,
      lastsee: 0,
      shoplist: [
        {
          id: 1,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 35,
          subscriptionType: 0,
          lastseeType: 0,
        },
        {
          id: 2,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 190,
          subscriptionType: 1,
          lastseeType: 1,
        },
        {
          id: 3,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 12,
          subscriptionType: 2,
          lastseeType: 1,
        },
        {
          id: 1,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 35,
          subscriptionType: 0,
          lastseeType: 0,
        },
        {
          id: 2,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 190,
          subscriptionType: 1,
          lastseeType: 1,
        },
        {
          id: 3,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 12,
          subscriptionType: 2,
          lastseeType: 1,
        },
        {
          id: 1,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 35,
          subscriptionType: 0,
          lastseeType: 0,
        },
        {
          id: 2,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 190,
          subscriptionType: 1,
          lastseeType: 1,
        },
        {
          id: 3,
          shopname: "团蜂家具",
          shopClassify: "家具店",
          subscriptionTime: 12,
          subscriptionType: 2,
          lastseeType: 1,
        },
        
      ],
    };
  },
  methods: {
    changeTab(tab) {
      console.log(this.currentTab);
      this.currentTab = tab;
    },
      back() {
      uni.navigateBack();
    },
  },
};
</script>

<style lang="less" scoped>
.subscription-title {
  display: flex;
  margin-top: 72upx;
  .left-view {
    .left-img {
      width: 48upx;
      height: 48upx;
    }
  }
  .middle-view {
    margin-left: 280upx;
    .text {
      font-size: 32upx;
      font-weight: 500;
    }
  }
}
.subscription-chose {
  display: flex;
  .item {
    font-size: 24upx;
    padding: 0 24upx;

    &.active {
      font-weight: bold;
      color: #3d3d3d;
    }
  }
}
.subscription-detail {
  padding: 30upx 60upx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-view {
    display: flex;
    .left-img {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
      margin-right: 20upx;
    }
    .left-shopname {
      font-size: 28upx;
      font-weight: 700;
      margin-bottom: 8upx;
    }
    .shopdeatil {
      display: flex;
      color: #999999;
      font-size: 20upx;
      font-weight: 350;
      .shop-classify {
      }
      .detail-boundary {
      }
      .subscription-time {
      }
    }
  }
  .middle-view {
    .shop-type {
      color: #07b9b9;
      font-size: 24upx;
      font-weight: 350;
    }
  }
  .right-view {
    background-color: #ff8f1f;
    border-radius: 20px;
    padding: 10upx 20upx;
    font-size: 24upx;
    font-weight: 500;
    color: white;
  }
}
</style>