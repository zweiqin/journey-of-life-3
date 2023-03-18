<template>
  <view class="tuan-location-container" @click="handleGetUserLocation">
    <slot></slot>
  </view>
</template>

<script>
export default {
  methods: {
    // 点击获取定位
    handleGetUserLocation() {
      uni.navigateTo({
        url: '/pages/choose-location/choose-location',
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
