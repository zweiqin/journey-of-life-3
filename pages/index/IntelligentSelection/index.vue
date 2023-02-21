<template>
  <view class="intelligent-selection-container">
    <Fields></Fields>

    <view class="package-list">
      <Package v-for="item in 10" :key="item"></Package>
    </view>
  </view>
</template>

<script>
import Fields from './Fields.vue'
import Package from './Package.vue'
export default {
  components: {
    Fields,
    Package,
  },
}
</script>

<style lang="less" scoped>
.package-list{
  padding: 20upx;
  box-sizing: border-box;
}
</style>
