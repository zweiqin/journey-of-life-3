<template>
  <view
    class="menus"
    :style="{
      'margin-top': top + 'px',
    }"
  >
    <view class="item" v-for="item in menus" :key="item.label">
      <img class="icon" :style="iconStyle" :src="item.icon" alt="" />
      <view :style="labelStyle" class="name">{{ item.label }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      required: true,
    },
    iconStyle: Object,
    labelStyle: Object,
    top: Number,
  },
};
</script>

<style lang="less" scoped>
.menus {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 44upx;
    }

    .name {
      color: #3d3d3d;
      font-size: 24upx;
      margin-top: 10upx;
    }
  }
}
</style>