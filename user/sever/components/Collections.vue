<template>
  <view class="collections">
    <view class="collection-item" v-for="item in data" :key="item.id">
      <image class="collection-image" :src="item.picUrl" />

      <view class="collection-detail-info">
        <view class="name">{{ item.name }}</view>
        <view class="collection-number"
          >{{ getRandom(1000, 10000) }} 人收藏</view
        >
        <view class="collection-footer">
          <view class="collection-price">￥{{ item.retailPrice }}</view>
          <button class="uni-btn view-btn" @click="handleToView(item.valueId)">
            查看详情
          </button>

          <button
            class="uni-btn view-btn unfollow-btn"
            @click="handleUnFollow(item)"
          >
            取消收藏
          </button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { collectionApi } from "../../../api/goods";

import { getRandom, getUserId } from "../../../utils";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },

  methods: {
    getRandom,
    handleToView(goodsId) {
      uni.navigateTo({
        url: "/pages/prod/prod?goodsId=" + goodsId,
      });
    },

    handleUnFollow(info) {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "是否取消收藏该商品",
        success: function (res) {
          if (res.confirm) {
            collectionApi({
              userId: getUserId(),
              type: 0,
              valueId: info.valueId,
            }).then(() => {
              _this.$showToast("取消收藏成功", "success");
              _this.$emit("delete");
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.collections {
  font-size: 28upx;
  margin: 20upx 0;

  .collection-item {
    display: flex;
    align-items: center;
    margin-bottom: 30upx;
    // justify-content: space-between;
    .collection-image {
      width: 202upx;
      height: 196upx;
      object-fit: cover;
      border-radius: 10upx;
      flex-shrink: 0;
      margin-right: 72upx;
    }

    .collection-detail-info {
      flex: 1;

      .name {
        color: #3d3d3d;
      }

      .collection-number {
        font-size: 24upx;
        color: #777;
        margin: 26upx 0 18upx 0;
      }

      .collection-footer {
        display: flex;
        justify-content: space-between;
        align-items: centerF;
        .collection-price {
          color: #fa5151ff;
        }

        .uni-btn.view-btn {
          width: 120upx;
          height: 48upx;
          text-align: center;
          line-height: 48upx;
          border: 1upx solid #fa5151;
          border-radius: 10upx;
          font-size: 24upx;
          color: #fa5151;
        }

        .unfollow-btn {
          color: #3d3d3d !important;
          border-color: #3d3d3d !important;
        }
      }
    }
  }
}
</style>