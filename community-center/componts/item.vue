<template>
  <view class="item" @click="handleClickItem">
    <view class="m">
      <view class="row">
        <view class="name">{{ serverInfoName }}</view>

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
import { number } from "echarts";
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
    handleClickItem() {
      this.$emit("choose", {
        id: this.id,
        serverInfoName: this.serverInfoName,
        serverPrice: this.serverPrice,
        serverUnit: this.serverUnit,
      });
    },
  },
  created() {},
};
</script>




<style lang="less" scoped>
.item {
  margin-right: 70upx;
  margin-bottom: 40upx;
  border-radius: 10upx;
  color: #999999;
  border: 2upx solid #999999;
  &.active {
    border: 2upx solid #fa5151;
    color: #fa5151;
  }

  .m {
    padding-left: 6upx;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .row {
      display: flex;
      align-items: center;

      .name {
        font-size: 28upx;
        font-weight: 400;
      }

      .logo {
        font-size: 28upx;
        font-weight: 400;
      }
      .number {
        font-size: 28upx;
        font-weight: 400;
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
