<template>
  <view v-if="JSON.stringify(data) !== '{}'">
    <view class="goods-list" v-show="data.goodsList.length">
      <view
        @click="go(`/pages/prod/prod?goodsId=${item.id}`)"
        class="item"
        v-for="item in data.goodsList"
        :key="item.id"
      >
        <image class="goods-img" :src="item.picUrl" mode="" />
        <!-- <tui-lazyload-img width="350rpx" height="348rpx" :src="item.picUrl || ''"></tui-lazyload-img> -->

        <view class="goods-info">
          <view class="goods-name">{{ item.name }}</view>
          <view class="btns" v-if="type === 0 && !isConsumer">
            <button
              class="uni-btn off-shelf-btn"
              @click.stop="
                $emit('opGoods', {
                  type: 'off',
                  goodsInfo: item,
                })
              "
            >
							<tui-icon
								name="bottom" :size="32" unit="rpx"
								color="#ffffff"
								margin="0"
							></tui-icon>
              <text>下架</text>
            </button>
            <button
              class="uni-btn share-btn"
              @click.stop="
                $emit('opGoods', {
                  type: 'share',
                  goodsInfo: item,
                })
              "
            >
							<tui-icon
								name="share" :size="32" unit="rpx"
								color="#ffffff"
								margin="0"
							></tui-icon>
              <text>分享</text>
            </button>
          </view>

          <view class="btns" v-if="type === 1 && !isConsumer">
            <button
              class="uni-btn sale"
              @click.stop="
                $emit('opGoods', {
                  type: 'on',
                  goodsInfo: item,
                })
              "
            >
							<tui-icon
								name="partake" :size="32" unit="rpx"
								color="#ffffff"
								margin="0"
							></tui-icon>
              <text>上架</text>
            </button>
          </view>

          <view class="mic-price">￥{{ item.counterPrice }}</view>
        </view>
      </view>
    </view>

    <view class="no-data" v-show="!data.goodsList.length">
			<tui-icon
				name="nodata" :size="432" unit="rpx"
				color="#b6cadc"
				margin="0"
			></tui-icon>
      <view>暂无商品~</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    type: {
      type: Number,
      default: 0,
    },

    isConsumer: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="less" scoped>
// 商品列表
.goods-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .item {
    width: 350upx;
    border-radius: 24upx;
    overflow: hidden;
    background-color: #fff;
    margin-bottom: 20upx;

    .goods-img {
      width: 350upx;
      height: 348upx;
      object-fit: cover;
    }

    .goods-info {
      padding: 24upx;
      box-sizing: border-box;

      .mic-price {
        font-size: 32upx;
        font-weight: bold;
        line-height: 2;
        color: #fa5151;
      }

      .goods-name {
        width: 300upx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .btns {
        display: flex;
        align-items: center;
        margin-top: 18upx;

        image {
          width: 32upx;
          height: 32upx;
        }

        .uni-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80upx;
          flex: 1;
          color: #fff;
          font-size: 28upx;

          text {
            margin-left: 6upx;
          }
        }

        .off-shelf-btn {
          background-color: #ffc117;
          border-radius: 100upx 0 0 100upx;
        }

        .share-btn {
          background-color: #3a3629;
          border-radius: 0 100upx 100upx 0;
        }

        .sale {
          width: 100%;
          border-radius: 100px;
          background-color: #ffc117;
        }
      }
    }
  }
}

.no-data {
  margin-top: 200upx;

  view {
    text-align: center;
    margin-top: 30upx;
    color: #ccc;
  }
}
</style>
