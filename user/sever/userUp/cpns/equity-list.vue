<template>
  <view class="apply-type-container vip-container">
    <view class="pane-title"> 会员升级权益 </view>

    <view class="pane-container">
      <Tabs :size="33" :data="equity"></Tabs>
    </view>
  </view>
</template>

<script>
// import { hehuoWq } from '../../../../data/user'

export default {
  props: {
    type: {
      type: String,
      // required: true,
    },
  },

  data() {
    return {
      // equity: Object.freeze(hehuoWq),
      equity: {},
    }
  },
}
</script>

<style lang="less" scoped>
.apply-type-container {
  width: 100%;
  .pane-container {
    display: flex;
    align-items: center;
    margin-top: 20upx;
    margin-bottom: 20upx;
    width: 100%;
  }

  /deep/ .tabs-container {
    width: 100%;
  }
}
</style>
