<template>
  <view class="item" @click="handleClickItem">
    <view class="m">
      <view class="name">{{ serverInfoName }}</view>
      <view class="row">
        <view class="logo">￥</view>
        <view class="number">{{ serverPrice }}</view>
        <view class="slash">/</view>
        <view class="unit">{{ serverUnit }}</view>
        <view class="qi"></view>
      </view>
    </view>
  </view>
</template>

<script>
import { number } from 'echarts'
export default {
  name: 'Item',
  props: {
    id: Number,
    serverInfoName: String,
    serverPrice: Number,
    serverUnit: String,
  },
  data() {
    return {}
  },
  methods: {
    handleClickItem() {
      this.$emit('choose', {
        id: this.id,
        serverInfoName: this.serverInfoName,
        serverPrice: this.serverPrice,
        serverUnit: this.serverUnit,
      })
    },
  },
  created() {},
}
</script>

<style lang="less" scoped>
.item {
  margin-right: 44upx;
  margin-bottom: 40upx;
  border-radius: 10upx;
  color: #999999;
  border: 2upx solid #999999;
  &.active {
    border: 2upx solid #fa5151;
    color: #fa5151;
    background-color: #ffeded;
  }

  .m {
    padding: 20upx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-size: 28upx;
      font-weight: 500;
      color: #000;
      margin-bottom: 8upx;
    }

    .row {
      display: flex;
      align-items: center;
      color: red;

      .logo {
        font-size: 28upx;
        font-weight: 400;
      }
      .number {
        font-size: 34upx;
        font-weight: bold;
      }
      .slash {
        font-size: 28upx;
        font-weight: 400;
      }
      .unit {
        font-size: 28upx;
        font-weight: 400;
      }
      .qi {
        font-size: 28upx;
        font-weight: 400;
      }
    }
  }
}
</style>
