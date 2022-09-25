<!--
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 17:02:23
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-24 17:16:46
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\user\orderForm\order-form.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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

    <!-- 商品详情 + 状态判断 0 = 全部 1 = 待付款  2 = 待发货  3= 待安装 4 = 待评价 -->
    <view
      class="order-form-goods"
      @click="bindtapdetail"
      v-for="(item1, id1) in info.goodsList"
      :key="id1"
    >
      <view class="goods-left">
        <img class="goods-left-img" :src="item1.picUrl" alt="" />
      </view>
      <view class="goods-middle">
        <view class="goods-name"> {{ item1.goodsName || "空调安装" }}</view>
        <view class="goods-detail">
          <view class="goods-size">规格：{{ item1.goodsSn || "正一匹" }}</view>
          <view class="goods-number">数量：{{ item1.number || 2 }}台</view>
        </view>
        <view class="goods-money">￥{{ item1.price || 300 }}</view>
      </view>
      <view class="goods-right">
        <view class="goods-type" v-if="item1.type == 1">待付款</view>
        <view class="goods-type" v-if="item1.type == 2">待发货</view>
        <view class="goods-type" v-if="item1.type == 3">待安装</view>
        <view class="goods-type" v-if="item1.type == 4">待评价</view>
      </view>
    </view>
  </view>
</template>

<script>
import { number } from 'echarts';
import loginVue from "../../../pages/login/login.vue";
export default {
  props: {
    info: Object,
    orderType:number,
    showType:number
    // ordertype:number,
  },
  data() {
    return {
      type: 0,
    };
  },
  watch: {
    info: {
      handler(value) {
        // console.log("草", value);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    back() {
      uni.navigateBack();
    },
    changeTab(tab) {
      this.currentTab = tab;
    },
    bindtapdetail() {
      uni.navigateTo({
        url: "../../orderForm/order-form-detail",
      });
    },
  },
  data() {
    return {
      collectiontype: "",
      currentTab: 0,
    };
  },
  onLoad(e) {
    console.log(e);

  },
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
      margin-top: 10upx;
    }
  }
  .goods-middle {
    flex: 1;
    margin-top: 10upx;
    .goods-name {
      font-size: 24upx;
      width: 450upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 500;
      margin-bottom: 10upx;
    }
    .goods-detail {
      font-size: 20upx;
      color: #3d3d3d;
      font-weight: 350;
      margin-bottom: 16upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      .goods-size {
        width: 450upx;
        margin-right: 20upx;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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