<template>
  <view
    class="coupon-item-container"
    :style="{
      background: expire ? '#999' : '',
    }"
  >
    <view class="main">
      <view
        class="item count-info"
        :style="{
          color: expire ? '#999' : '',
        }"
      >
        <view class="count"><text class="count-icon">￥</text>100</view>
        <view class="count-desc">满100元可用</view>
      </view>
      <view class="item detail-info">
        <view class="coupon-effect">
          <view class="tag" :class="{ expire: expire }">巨蜂商城券</view>
          <view
            class="tag-desc"
            :style="{
              color: expire ? '#999' : '',
            }"
            >仅可在巨蜂商城使用</view
          >
        </view>

        <view class="effect-time"> 有效期：2022-10-01至2022-10-07 </view>

        <view class="uni-btn-wrapper"
          ><button
            class="uni-btn"
            :style="{
              background: expire ? '#999' : '',
            }"
          >
            去使用
          </button></view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    expire: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.coupon-item-container {
  width: 100%;
  height: 240upx;
  background-color: #ccc;
  border-radius: 10upx;
  overflow: hidden;
  background-color: #fa5151;
  padding: 32upx 0;
  font-size: 28upx;
  color: #3d3d3d;

  .main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 10upx 0;
    box-sizing: border-box;

    .item {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .count-info {
      width: 210upx;
      font-size: 48upx;
      font-weight: bold;
      border-right: 1upx dotted #d8d8d8;
      color: #fa5151;

      .count-icon {
        font-size: 24upx;
      }

      .count-desc {
        font-size: 24upx;
        font-weight: normal;
        margin-top: 10upx;
      }
    }

    .detail-info {
      flex: 1;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20upx;

      .coupon-effect {
        display: flex;
        align-items: center;
        font-size: 24upx;

        .tag {
          position: relative;
          padding-right: 10upx;
          text-align: right;
          line-height: 46upx;
          font-size: 24upx;
          width: 160upx;
          color: #fff;
          height: 46upx;
          background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/l5mmb5d6bgu4c8364eyz.png")
            no-repeat;
          background-size: cover;
          margin-right: 30upx;

          &.expire {
            background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/lwn3ryxbxh64oz5zpan5.png")
              no-repeat;
            background-size: cover;
          }

          &::after {
            position: absolute;
            content: "";
            width: 8upx;
            height: 8upx;
            background-color: #fff;
            border-radius: 50%;
            left: 24upx;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }

      .effect-time {
        font-size: 24upx;
        color: #999999;
        flex: 1;
        margin-top: 20upx;
      }

      .uni-btn-wrapper {
        width: 100%;
        text-align: right;
      }

      .uni-btn {
        width: 112upx;
        height: 40upx;
        border-radius: 100px;
        color: #fff;
        background-color: #fa5151;
        font-size: 24upx;
        text-align: center;
        float: right;
        line-height: 40upx;
      }
    }
  }
}
</style>