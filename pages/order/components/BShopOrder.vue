<template>
  <view class="shop-order-container" v-if="orderDeatil">
    <view class="order-no-status" @click="handleToViewOrderDetail(orderDeatil)">
      <view class="order-no">订单号:{{ orderDeatil.orderNo }}</view>
      <view class="order-status">{{ orderDeatil.orderStatus | mapOrderStatus }}</view>
    </view>

    <view class="goods-list" @click="handleToViewOrderDetail(orderDeatil)">
      <!-- <view class="goods-item" v-for="goods in orderDeatil.goodsList" :key="goods.id"> -->
      <view class="goods-item">
        <image class="goods-img" :src="common.seamingImgUrl(orderDeatil.goodsVo.goodsUrl)" mode="" />

        <view class="info">
          <view class="name">{{ orderDeatil.goodsVo.goodsName }}</view>

          <view class="good-sp-pr">
            <!-- <view class="sp">{{ goods.specifications.join(',') }}</view> -->
            <view class="pr">￥{{ orderDeatil.goodsVo.goodsPrice }}</view>
          </view>
        </view>

        <view>
          <view class="number" style="text-align: right; font-size: 28upx; color: #3a3629"> x {{
            orderDeatil.goodsVo.goodsNumber }} </view>
        </view>
      </view>
    </view>

    <view class="goods-ops">
      <view class="actual-price">
        共计：<text class="number">￥{{ orderDeatil.actualAmount }}</text>
      </view>

      <view class="btns">
        <view v-for="btn in businessOrderOPButtons" :key="btn.label">
          <button :style="{
            background: btn.color
          }" @click="$emit('op-order', { orderDeatil, key: btn.key })" class="uni-btn" v-if="btn.show(orderDeatil)">
            {{ btn.label }}
          </button>
        </view>
      </view>
    </view>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { mapBusinessOrderStatus, businessOrderOPButtons } from '../config'
export default {
  props: {
    orderDeatil: {
      type: Object,
      required: true
    }
  },

  filters: {
    mapOrderStatus(status) {
      if (!status && status !== 0) return '未知状态'
      const statusInfo = mapBusinessOrderStatus.find(item => item.value === status)
      if (!statusInfo) return '未知状态'
      return statusInfo.label
    }
  },

  data() {
    return {
      businessOrderOPButtons: Object.freeze(businessOrderOPButtons)
    };
  },

  methods: {
    // 查看详情
    handleToViewOrderDetail(goods) {
      uni.navigateTo({
        url: '/order/b-order-form/b-order-form?orderNo=' + goods.orderNo
      });
    },

    // 点击操作按钮
    async handleOpOrder(goodsDeatil, key) {
      console.log(goodsDeatil, key);
    }
  }
};
</script>

<style lang="less" scoped>
.shop-order-container {
  padding: 32upx;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 20upx;
  border-radius: 24upx;

  &:nth-of-type(:last-child) {
    margin-bottom: 0;
  }

  .order-no-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 16upx;
    // border-bottom: 1upx solid #dbdbdb;

    &.comment-wrapper {
      border-bottom: 1upx solid #e9e9e9;
      display: block;

      .comment {
        color: #141000;
        font-size: 28upx;
        font-weight: 500;
        margin-top: 20upx;

        .comment-title {
          color: #f40;
        }
      }
    }

    .order-no {
      font-size: 28upx;
      color: #605d52;
    }

    .order-status {
      color: #ffc117;
      font-size: 28upx;
    }
  }

  .goods-list {
    padding: 20upx 0;

    .goods-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30upx;

      .info {
        flex: 1;
        height: 100%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .name {
          font-size: 28upx;
          font-weight: 500;
          width: 300upx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .good-sp-pr {
          margin-top: 12upx;

          .sp {
            line-height: 1.5;
            color: #8f8d85;
            font-size: 24upx;
            margin-bottom: 20upx;
          }

          .pr {
            font-size: 28upx;
          }
        }
      }

      .goods-img {
        width: 140upx;
        height: 140upx;
        object-fit: cover;
        margin-right: 20upx;
      }
    }
  }

  .goods-ops {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20upx;
    border-top: 1upx solid #f1f1f0;

    .actual-price {
      font-size: 28upx;
      font-weight: 500;
      color: #141000;

      .number {
        color: #141000;
      }
    }

    .btns {
      display: flex;
      align-items: center;

      .uni-btn {
        font-size: 24upx;
        color: #fff;
        line-height: 2.5;
        padding: 0 28upx;
        background-color: #f40;
        white-space: nowrap;
        margin-left: 20upx;
        border-radius: 32upx;
      }
    }
  }
}
</style>
