<template>
  <view class="item" @click="handleClickItem">
    <view class="m">
      <view class="first">{{ serverInfoName }}</view>
      <view class="second">
        <view class="row">
          <view class="specs"></view>
          <view class="logo">￥</view>
          <view class="number">{{ serverPrice }}</view>
          <view class="slash">/</view>
          <view class="unit">{{ serverUnit }}</view>
          <view class="qi">起</view>
        </view>
      </view>
    </view>
  </view>
</template>




<script>
import { number } from 'echarts';
export default {
  name: "Item",
  props: {
    id: Number,
    serverInfoName: String,
    serverPrice: Number,
    serverUnit: String,
  },
  data() {
    return {};
  },
  methods: {
    handleClickItem(){
      this.$emit('choose', {
        id: this.id,
        serverInfoName: this.serverInfoName,
        serverPrice: this.serverPrice,
        serverUnit: this.serverUnit
      })
    }
  },
  created() {},
};
</script>




<style lang="less" scoped>
.item {
  margin-right: 10upx;
  margin-bottom: 40upx;
  width: 210upx;
  height: 70upx;
  border-radius: 10upx;
  color: #999999;
  border: 2upx solid #999999;
  &.active{
    border: 2upx solid #FA5151;
    color: #FA5151;
  }

  .m {
    padding-left: 6upx;
    width: 210upx;
    height: 70upx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .first {
      font-size: 28upx;
      font-weight: 400;
      // color: #999999;
    }
    .second {
      // margin-top: 4upx;
      .row {
        display: flex;
        align-items: center;
        // .specs {
        //   font-size: 24upx;
        //   font-weight: 400;
        //   color: #999999;
        // }
        .logo{
          font-size: 28upx;
          font-weight: 400;
          // color: #999999;
        }
        .number {
          font-size: 28upx;
          font-weight: 400;
          // color: #999999;
        }
        .slash{
          font-size: 24upx;
          font-weight: 400;
          // color: #999999;
        }
        .unit {
          font-size: 24upx;
          font-weight: 400;
          // color: #999999;
        }
        .qi {
          font-size: 24upx;
          font-weight: 400;
          // color: #999999;
        }
      }
    }
  }
}
</style>
