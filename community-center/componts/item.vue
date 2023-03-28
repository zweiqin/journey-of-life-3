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
  margin-right: 20upx;
  // margin-bottom: 40upx;
  border-radius: 12upx;
  color: #605D52;
  border: 2upx solid #F1F1F0;
  &.active {
    border: 2upx solid #FC4023;
    color: #fa5151;
    background: #FFF8F6;
		font-weight: bold;
		
  }

  .m {
    padding: 20upx 30upx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
		
    .name {
      font-size: 28upx;
      // font-weight: 500;
      // color: #000;
      margin-bottom: 8upx;
    }

    .row {
      display: flex;
      align-items: center;
      // color: red;

      .logo {
        font-size: 30upx;
        font-weight: bold;
				line-height: 46upx;

      }
      .number {
        font-size: 30upx;
        font-weight: bold;
				line-height: 46upx;

      }
      .slash {
        font-size: 22upx;
        line-height: 34upx;
      }
      .unit {
        font-size: 22upx;
       line-height: 34upx;
      }
      .qi {
        font-size: 28upx;
        font-weight: 400;
      }
    }
  }
}
</style>
