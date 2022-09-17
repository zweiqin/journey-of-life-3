<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 17:02:23
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-15 15:59:33
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\orderForm\order-form.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- 标题页 -->
    <view class="order-form-title">
      <view class="order-form-title-left-view">
        <img
          @click="back"
          class="order-form-title-left-img"
          src="../../static/images/store/chevron-states.png"
          alt=""
        />
        <view class="order-form-title-text">我的订单</view>
      </view>
      <view class="order-form-title-right-view">
        <img
          class="order-form-title-right-img"
          src="../../static/images/lqb/orderform/search.png"
          alt=""
        />
      </view>
    </view>
    <!-- 订单选择卡 -->
    <view class="order-form-chose">
      <view class="order-form-chose-text">
        <view
          @click="changeTab(0)"
          :class="{ active: currentTab === 0 }"
          class="item"
          >全部</view
        >
        <view
          @click="changeTab(1)"
          :class="{ active: currentTab === 1 }"
          class="item"
          >待付款</view
        >
        <view
          @click="changeTab(2)"
          :class="{ active: currentTab === 2 }"
          class="item"
          >待发货</view
        >
        <view
          v-if="collectiontype == 1"
          @click="changeTab(3)"
          :class="{ active: currentTab === 3 }"
          class="item"
          >待安装</view
        >
        <view
          v-if="collectiontype == 0"
          @click="changeTab(3)"
          :class="{ active: currentTab === 3 }"
          class="item"
          >待收货</view
        >
        <view
          @click="changeTab(4)"
          :class="{ active: currentTab === 4 }"
          class="item"
          >待评价</view
        >
      </view>
    </view>
    <!-- 分界线 -->
    <view class="order-form-boundary"> </view>
    <!-- 商品详情 + 状态判断 0 = 全部 1 = 待付款  2 = 待发货  3= 待安装 4 = 待评价 -->
    <view
      class="order-form-goods"
      :key="index"

      v-for="(item, index) in goodslist"
      v-show="currentTab === 0"
      @click="bindtapdetail"
    >
      <view class="goods-left">
        <img
          class="goods-left-img"
          src="../../static/images/lqb/orderform/order-form-img.png"
          alt=""
        />
      </view>
      <view class="goods-middle">
        <view class="goods-name"> {{ item.name }}</view>
        <view class="goods-detail">
          <view class="goods-size">尺寸：{{ item.size }}</view>
          <view class="goods-number">数量：{{ item.number }}台</view>
        </view>
        <view class="goods-money">￥{{ item.money }}</view>
      </view>
      <view class="goods-right">
        <view class="goods-type" v-show="item.type == 1">待付款</view>
        <view class="goods-type" v-show="item.type == 2">待发货</view>
        <view class="goods-type" v-show="item.type == 3">待安装</view>
        <view class="goods-type" v-show="item.type == 4">待评价</view>
      </view>
    </view>
    <view
      class="order-form-goods"
      :key="index"
      v-for="(item, index) in goodslist"
      v-show="currentTab === 1"
      v-if="currentTab == item.type"
    >
      <view class="goods-left">
        <img
          class="goods-left-img"
          src="../../static/images/lqb/orderform/order-form-img.png"
          alt=""
        />
      </view>
      <view class="goods-middle">
        <view class="goods-name"> {{ item.name }}</view>
        <view class="goods-detail">
          <view class="goods-size">尺寸：{{ item.size }}</view>
          <view class="goods-number">数量：{{ item.number }}台</view>
        </view>
        <view class="goods-money">￥{{ item.money }}</view>
      </view>
      <view class="goods-right">
        <view class="goods-type" v-show="item.type == currentTab">待付款</view>
        <view class="goods-type" v-show="item.type == 2">待发货</view>
        <view class="goods-type" v-show="item.type == 3">待安装</view>
        <view class="goods-type" v-show="item.type == 4">待评价</view>
      </view>
    </view>
    <view
      class="order-form-goods"
      :key="index"
      v-for="(item, index) in goodslist"
      v-show="currentTab === 2"
      v-if="currentTab == item.type"
    >
      <view class="goods-left">
        <img
          class="goods-left-img"
          src="../../static/images/lqb/orderform/order-form-img.png"
          alt=""
        />
      </view>
      <view class="goods-middle">
        <view class="goods-name"> {{ item.name }}</view>
        <view class="goods-detail">
          <view class="goods-size">尺寸：{{ item.size }}</view>
          <view class="goods-number">数量：{{ item.number }}台</view>
        </view>
        <view class="goods-money">￥{{ item.money }}</view>
      </view>
      <view class="goods-right">
        <view class="goods-type" v-show="item.type == 1">待付款</view>
        <view class="goods-type" v-show="item.type == 2">待发货</view>
        <view class="goods-type" v-show="item.type == 3">待安装</view>
        <view class="goods-type" v-show="item.type == 4">待评价</view>
      </view>
    </view>
    <view
      class="order-form-goods"
      :key="index"
      v-for="(item, index) in goodslist"
      v-show="currentTab === 3"
      v-if="currentTab == item.type"
    >
      <view class="goods-left">
        <img
          class="goods-left-img"
          src="../../static/images/lqb/orderform/order-form-img.png"
          alt=""
        />
      </view>
      <view class="goods-middle">
        <view class="goods-name"> {{ item.name }}</view>
        <view class="goods-detail">
          <view class="goods-size">尺寸：{{ item.size }}</view>
          <view class="goods-number">数量：{{ item.number }}台</view>
        </view>
        <view class="goods-money">￥{{ item.money }}</view>
      </view>
      <view class="goods-right">
        <view class="goods-type" v-show="item.type == 1">待付款</view>
        <view class="goods-type" v-show="item.type == 2">待发货</view>
        <view class="goods-type" v-show="item.type == 3">待安装</view>
        <view class="goods-type" v-show="item.type == 4">待评价</view>
      </view>
    </view>
    <view
      class="order-form-goods"
      :key="index"
      v-for="(item, index) in goodslist"
      v-show="currentTab === 4"
      v-if="currentTab == item.type"
    >
      <view class="goods-left">
        <img
          class="goods-left-img"
          src="../../static/images/lqb/orderform/order-form-img.png"
          alt=""
        />
      </view>
      <view class="goods-middle">
        <view class="goods-name"> {{ item.name }}</view>
        <view class="goods-detail">
          <view class="goods-size">尺寸：{{ item.size }}</view>
          <view class="goods-number">数量：{{ item.number }}台</view>
        </view>
        <view class="goods-money">￥{{ item.money }}</view>
      </view>
      <view class="goods-right">
        <view class="goods-type" v-show="item.type == 1">待付款</view>
        <view class="goods-type" v-show="item.type == 2">待发货</view>
        <view class="goods-type" v-show="item.type == 3">待安装</view>
        <view class="goods-type" v-show="item.type == 4">待评价</view>
      </view>
    </view>
  </view>
</template>

<script>
import loginVue from "../../pages/login/login.vue";
export default {
  methods: {
    back() {
      uni.navigateBack();
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
    bindtapdetail() {
      uni.navigateTo({
        url: "../orderForm/order-form-detail",
      });
    },
  },
  data() {
    return {
      collectiontype:'',
      currentTab: 0,
      goodslist: [
        {
          id: 1,
          name: "空调安装",
          size: "正一匹",
          number: 2,
          money: 300,
          type: 1,
        },
        {
          id: 2,
          name: "空调安装",
          size: "正一匹",
          number: 2,
          money: 300,
          type: 2,
        },
        {
          id: 3,
          name: "空调安装",
          size: "正一匹",
          number: 2,
          money: 300,
          type: 3,
        },
        {
          id: 4,
          name: "空调安装",
          size: "正一匹",
          number: 2,
          money: 300,
          type: 4,
        },
        {
          id: 5,
          name: "空调安装",
          size: "正一匹",
          number: 2,
          money: 300,
          type: 1,
        },
      ],
    };
  },
  onLoad(e){
     this.collectiontype = e.collectiontype
  }
};
</script>

<style lang="less" scoped>
.order-form-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 74upx;
  .order-form-title-left-view {
    display: flex;
    align-items: center;
    margin-left: 32upx;
    .order-form-title-left-img {
      height: 48upx;
      width: 48upx;
      margin-right: 32upx;
    }
    .order-form-title-text {
      font-size: 32upx;
      font-weight: 500;
    }
  }
  .order-form-title-right-view {
    margin-right: 48upx;
    .order-form-title-right-img {
      height: 33upx;
      width: 33upx;
    }
  }
}
.order-form-chose {
  margin-top: 34upx;
  margin-left: 44upx;
  margin-right: 44upx;

  .order-form-chose-text {
    display: flex;
    justify-content: space-evenly;
    font-size: 24upx;
    color: #999999;
    margin-bottom: 14upx;
    .item {
      &.active {
        font-weight: bold;
        color: #ff8f1f;
      }
    }
  }
}
.order-form-boundary {
  border: 0.5px solid #d8d8d8;
  width: 90%;
  margin: 0 auto;
}
.order-form-goods {
  display: flex;
  margin-top: 22upx;
  justify-content: space-between;
  padding: 0 44upx 0 32upx;
  .goods-left {
    margin-right: 36upx;
    .goods-left-img {
      width: 200upx;
      height: 150upx;
    }
  }
  .goods-middle {
    flex: 1;
    margin-top: 14upx;
    .goods-name {
      font-size: 24upx;
      font-weight: 500;
      margin-bottom: 16upx;
    }
    .goods-detail {
      display: flex;
      font-size: 20upx;
      color: #3d3d3d;
      font-weight: 350;
      margin-bottom: 16upx;
      .goods-size {
        margin-right: 20upx;
      }
      .goods-number {
      }
    }
    .goods-money {
      color: #fa5151;
      font-size: 28upx;
      font-weight: 350;
    }
  }
  .goods-right {
    margin: auto 0;
    .goods-type {
      font-size: 28upx;
      font-weight: 350;
      color: #fa5151;
    }
  }
}
</style>