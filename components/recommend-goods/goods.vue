<template>
  <div class="goods" @click="handeViewDetail">
    <tui-lazyload-img
      width="334rpx"
      height="300rpx"
      style="{width: 334upx !important, height: 300upx !important}"
      :src="url || require('../../static/logo.png')"
    ></tui-lazyload-img>

    <view class="body">
      <view class="name">{{ name || 'GLOSTAD' }} </view>
      <!-- <view class="sname">{{ sname || "二人沙发" }} </view> -->
      <view class="info">
        <view class="left">
          <text class="icon">￥</text><text class="price">{{ price || '500' }}</text>
        </view>

        <view class="right">
          <view>{{ payNumber || 0 }}人浏览</view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    sname: String,
    price: [String, Number],
    payNumber: [Number, String],
    url: String,
    id: [Number, String],
    isShowBrand: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handeViewDetail() {
      if (!this.id) {
        return;
      }
      let url = `/pages/prod/prod?goodsId=${this.id}`;
      if (this.isShowBrand) {
        url += '&showBrand=true';
      }
      uni.navigateTo({
        url
      });
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .tui-lazyload__img{
  width: 340upx !important;
  height: 300upx !important;
}

.goods {
  border-radius: 20upx 20upx 0 0;
  overflow: hidden;
  margin-bottom: 12upx;

  .img {
    width: 334upx;
    height: 300upx;
  }

  .body {
    padding: 14upx 26upx 26upx 22upx;
    box-sizing: border-box;
    width: 334upx;

    .name {
      width: 334upx;
      color: #3d3d3d;
      font-family: auto;
      font-size: 28upx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 700;
      &:nth-child(2) {
        margin: 6upx 0 12upx 0;
      }
    }
    .sname {
      width: 334upx;
      color: #3d3d3d;
      font-weight: 500;
      font-family: auto;
      font-size: 24upx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 10upx 0;
    }

    .info {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      .icon {
        color: #fa5151;
        font-family: auto;
        font-size: 34upx;
        // vertical-align: top;
        font-weight: 400;
      }

      .price {
        color: #fa5151;
        font-size: 40upx;
        font-family: auto;
        font-weight: 600;
        padding: 0;
      }

      .right {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #3d3d3d;
        font-family: auto;
        font-size: 20upx;

        // &::after {
        //   position: absolute;
        //   right: 0;
        //   bottom: -10px;
        //   content: "...";
        //   font-weight: bold;
        //   font-family: auto;
        //   font-size: 40upx;
        // }

        // .dots {
        //   color: #767676;
        //   text-align: right;
        //   font-size: 60upx;
        //   line-height: 1;
        // }
      }
    }
  }
}
</style>
