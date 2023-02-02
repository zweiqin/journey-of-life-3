<template>
  <view class="form-pane">
    <view class="item" v-for="(item, index) in formLabels" :key="index">
      <view class="form-title">{{ item.label }}</view>
      <view class="counts-wrapper">
        <text>订单：1000</text>
        <text>收益：1000</text>
      </view>
    </view>
  </view>
</template>

<script>
import { formLabels } from './config'
export default {
  data() {
    return {
      formLabels: Object.freeze(formLabels),
    }
  },
}
</script>

<style lang="less" scoped>
.form-pane {
  padding-top: 30upx;
  font-size: 28upx;

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .item {
    flex: 0 0 50%;
    padding: 30upx 0;
    box-sizing: border-box;
    border-bottom: 1upx solid #d8d8d8;
    border-right: 1upx solid #d8d8d8;

    &:nth-child(2n) {
      padding-left: 20upx;
      border-right: 0;
    }

    &:last-child{
      border-bottom: none;
    }

    .form-title{
      margin-bottom: 10upx;
      font-weight: bold;
    }
  }
}
</style>
