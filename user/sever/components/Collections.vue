<template>
  <view class="collections">
    <view class="collection-item" v-for="item in data" :key="item.id">
      <image class="collection-image" :src="common.seamingImgUrl(item.picUrl)" />

      <view class="collection-detail-info">
        <view class="name">{{ item.name }}</view>
        <view class="collection-number"
          >{{ getRandom(1000, 10000) }} 人收藏</view
        >
        <view class="collection-footer">
          <view class="collection-price">￥{{ item.counterPrice }}</view>
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
	background: #FFFFFF;
  font-size: 28upx;
  margin: 20upx 20upx 20upx 20upx;
	border-radius: 24upx;
  .collection-item {
    display: flex;
    // align-items: center;
    padding: 32upx;
    // justify-content: space-between;
    .collection-image {
      width: 168upx;
      height: 168upx;
      object-fit: cover;
      border-radius: 16upx;
      flex-shrink: 0;
      margin-right: 24upx;
    }

    .collection-detail-info {
      flex: 1;
			border-bottom: 1upx solid #F1F1F0;
      .name {
        color: #3A3629;
				font-size: 28upx;
      }

      .collection-number {
        font-size: 24upx;
        color: #8F8D85;
        margin: 12upx 0 24upx 0;
      }

      .collection-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
				margin-bottom: 34upx;
        .collection-price {
          color: #141000;
					font-size: 28upx;
					font-weight: 500;
        }

        .uni-btn.view-btn {
          width: 120upx;
          height: 48upx;
          // text-align: center;
          // line-height: 48upx;
          border: 1upx solid #FFC117;
          border-radius: 10upx;
          font-size: 24upx;
          color: #FFC117;
					display: flex;
					align-items: center;
					justify-content: center;
        }

        .unfollow-btn {
          color: #8F8D85 !important;
          border-color: #8F8D85 !important;
        }
      }
    }
  }
}
</style>