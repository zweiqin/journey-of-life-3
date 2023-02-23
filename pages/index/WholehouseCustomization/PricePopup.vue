<template>
  <tui-top-dropdown
    :height="240"
    :show="value"
    :translatey="transDis"
    @close="btnCloseDrop"
  >
    <view class="popup-container">
      <view class="item" v-for="(item, index) in priceItems" :key="index">{{
        item
      }}</view>
    </view>
  </tui-top-dropdown>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },

    scrollTop: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      priceItems: Object.freeze([
        '￥100/㎡以下',
        '￥100-299/㎡',
        '￥300-500/㎡',
        '500/㎡以上',
      ]),
    }
  },

  methods: {
    btnCloseDrop() {
      this.$emit('input', false)
    },
  },

  computed: {
    transDis() {
      return 260 - this.scrollTop * 2
    },
  },
}
</script>

<style lang="less" scoped>
.popup-container {
  padding: 30upx 20upx 32upx;
  background-color: #fff;
  width: 100%;
  height: 240upx;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 226upx;
    height: 64upx;
    border-radius: 100upx;
    background-color: #f6f6f5;
    font-size: 28upx;
    margin-right: 14upx;
    margin-bottom: 16upx;
    color: #605d52;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
