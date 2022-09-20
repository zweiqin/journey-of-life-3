<template>
  <div class="goods">
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
      <view class="name">{{ sname || "二人沙发" }} </view>
      <view class="info">
        <view class="left">
          <text class="icon">￥</text
          ><text class="price">{{ price || "500" }}</text>
        </view>

        <view class="right">
          <view>{{ payNumber || "1000" }}+付款</view>
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
    price: String,
    payNumber: String,
    url: String
  },

  mounted() {
    // console.log(this.name, this.sname, this.price, this.payNumber);
  },
};
</script>

<style lang="less" scoped>
.goods {
  border-radius: 20upx 20upx 0 0;
  overflow: hidden;
  margin-bottom: 12upx;

  .img {
    width: 334upx;
  }

  .body {
    padding: 14upx 26upx 26upx 22upx;
    box-sizing: border-box;
    width: 334upx;

    .name {
      width: 334upx;
      color: #3d3d3d;
      font-size: 20upx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:nth-child(2) {
        margin: 6upx 0 12upx 0;
      }
    }

    .info {
      display: flex;
      justify-content: space-between;

      .icon {
        color: #3d3d3d;
        font-size: 20upx;
        vertical-align: top;
      }

      .price {
        color: #ff8f1f;
        font-size: 36upx;
        padding: 0;
      }

      .right {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #3d3d3d;
        font-size: 20upx;

        &::after {
          position: absolute;
          right: 0;
          bottom: -10px;
          content: "...";
          font-weight: bold;
          font-size: 40upx;
        }

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