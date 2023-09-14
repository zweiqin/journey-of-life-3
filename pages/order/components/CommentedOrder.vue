<template>
  <view class="goods-pane" v-if="orderDetail">
    <view class="order-no-status comment-wrapper">
      <view class="comment">
        <text class="comment-title">我的评论：</text>
        {{ orderDetail.content }}
      </view>
      <view class="comment" v-if="orderDetail.commentGoods1">
        <text class="comment-title">我的追评：</text>
        {{ orderDetail.commentGoods1 && orderDetail.commentGoods1.content }}</view
      >
      <view class="comment" v-if="orderDetail.commentGoods2">
        <text class="comment-title">商家回复：</text>
        {{ orderDetail.commentGoods2.content }}</view
      >
    </view>

    <view class="goods-list" @click="handleToViewOrderDetail(orderDetail)">
      <view class="goods-item" style="margin-bottom: 0">
        <image class="goods-img" :src="orderDetail.dtsTfGoods.picUrl" mode="" />

        <view class="info">
          <view class="name">{{ orderDetail.dtsTfGoods.name }}</view>

          <view class="good-sp-pr">
            <view class="pr"
              >￥{{ orderDetail.dtsTfGoods.counterPrice }} <text v-if="orderDetail.dtsTfGoods.unit">/ {{ orderDetail.dtsTfGoods.unit }}</text></view
            >
          </view>
        </view>
      </view>
    </view>

    <view class="goods-ops" style="justify-content: flex-end">
      <view class="btns">
        <button v-if="!orderDetail.commentGoods1" @click="handleCommentAgain(orderDetail)" class="uni-btn">追加评价</button>
        <button v-else class="uni-btn" style="background-color: transparent; color: #3d3d3d">已追评</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    orderDetail: {
      type: Object,
      required: true
    }
  },

  methods: {
    // 去追评
    handleCommentAgain(goodsInfo) {
      uni.navigateTo({
        url: `/user/orderForm/additional-evaluation?goodsName=${goodsInfo.dtsTfGoods.name}&picUrl=${goodsInfo.dtsTfGoods.picUrl}&price=${goodsInfo.dtsTfGoods.counterPrice}&unit=${goodsInfo.dtsTfGoods.unit}&commentId=${goodsInfo.id}&goodsId=${goodsInfo.gid}&oid=${goodsInfo.oid}&ocid=${goodsInfo.ocid}`
      });
    },

    handleToViewOrderDetail(goods) {
      uni.navigateTo({
        url: '/user/orderForm/order-form-detail?id=' + goods.id
      });
    }
  }
};
</script>

<style lang="less" scoped>
.goods-pane {
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

.ev-btn {
  font-size: 24upx;
  color: #fff;
  padding: 18upx 28upx;
  background-color: rgb(132, 195, 65);
  white-space: nowrap;
  margin-left: 20upx;
  border-radius: 4upx;
  margin-top: 20upx;
}
</style>
