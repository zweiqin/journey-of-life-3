<template>
  <div class="goods" @click="handeViewDetail">
    <img
      class="img"
      :src="
        url ||
        'https://img2.baidu.com/it/u=1766258309,950066704&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=305'
      "
      alt=""
    />

    <view class="body">
      <view class="name">{{ name || "GLOSTAD" }} </view>
      <view class="money">
        <view class="payMoney"
          >￥<text class="price1">{{ price || "1562.0" }}</text></view
        >
        <view class="paypeople">{{ payNumber || "1000" }}+付款</view></view
      >
      <view class="bottom">
        <view class="sname">{{ sname || "二人沙发" }} </view>
        <view class="allDian">
          <view class="dian"></view>
          <view class="dian"></view>
          <view class="dian"> </view> </view
      ></view>
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
  },

  methods: {
    handeViewDetail() {
      if (!this.id) {
        return;
      }
      uni.navigateTo({
        url: `/pages/prod/prod?goodsId=${this.id}`,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.goods {
  overflow: hidden;
  margin-bottom: 12upx;
  display: flex;

  .img {
    width: 200upx;
    height: 200upx;
    border-radius: 20upx;
  }

  .body {
    padding-left: 20upx;
    box-sizing: border-box;
    width: 334upx;
    .name {
      font-size: 28upx;
      font-weight: 600;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      height: 80upx;
    }
    .money {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      padding-bottom: 30upx;
      .payMoney {
        color: #fa5151;
        font-size: 28upx;
        align-items: flex-end;

        .price1 {
          color: #fa5151;
          font-size: 36upx;
          font-weight: 700;
        }
      }

      .paypeople {
        color: #3d3d3d;
        font-size: 24upx;
      }
    }
  }
}
.bottom {
  justify-content: space-between;
  display: flex;
  align-items: center;
  .sname {
    font-size: 24upx;
  }
  .allDian {
    display: flex;
    width: 40upx;
    justify-content: space-between;
    .dian {
      width: 8upx;
      height: 8upx;
      border-radius: 50%;
      background: #767676;
    }
  }
}
</style>