<template>
  <view
    @click="go('/pages/prod/prod?goodsId=' + data.id)"
    class="goods-wrapper"
    v-if="data"
  >
    <view class="goods-image-wrapper">
      <!-- <image class="good-img"  mode="" /> -->
      <fast-lazy-load
        width="100%"
        height="320upx"
        :src="data.picUrl"
      ></fast-lazy-load>
      <!-- <image
        class="icon"
        src="../../../../static/images/common/color-bottom.png"
        mode=""
      /> -->
    </view>
    <view class="goods-info">
      <view class="goods-name">
        <view class="icon-wrapper"
          ><image
            class="icon"
            src="../../../../static/images/index/miaosha.png"
            mode=""
          />
        </view>
        <view class="name">{{ data.name }}</view>
      </view>

      <view class="tags">
        <view class="tag">旗舰店</view>
        <view class="tag">官方正品</view>
      </view>

      <view class="goods-price">
        <view class="text"
          ><text class="text-price">￥{{ data.counterPrice }}</text></view
        >
        <view class="salsed">100+付款</view>
      </view>
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
  },
};
</script>

<style lang="scss" scoped>
.goods-wrapper {
  width: 350upx;
  border-radius: 10upx;
  overflow: hidden;
  font-size: 28upx;
  margin-bottom: 20upx;

  .goods-image-wrapper {
    position: relative;
    .icon {
      width: 100%;
      position: absolute;
      bottom: 0px;
      height: 66upx;
    }
  }

  .good-img {
    width: 100%;
    height: 320upx;
    object-fit: cover;
    display: block;
  }

  .goods-info {
    background-color: #fff;
    padding: 20upx;
    box-sizing: border-box;

    .goods-name {
      display: flex;
      align-items: center;

      .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50upx;
        height: 28upx;
        background-color: #fa5151;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 10upx;
        margin-top: 4upx;

        .icon {
          width: 38upx;
          height: 16upx;
        }
      }
      .name {
        width: 256upx;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight: bold;
      }
    }

    .tags {
      display: flex;
      align-items: center;

      .tag {
        font-size: 20upx;
        color: #fa5151;
        line-height: 1.5;
        padding: 0 18upx;
        border: 1upx solid #fa5151;
        margin: 22upx 0 12upx 0;
        border-radius: 4upx;

        &:nth-child(1) {
          margin-right: 16upx;
        }
      }
    }
  }

  .goods-price {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .text {
      font-size: 24upx;
      color: #fa5151;
      font-weight: 500;
    }

    .text-price {
      font-size: 32upx;
      font-weight: bold;
    }

    .salsed {
      font-size: 20upx;
      color: #999999;
    }
  }
}
</style>