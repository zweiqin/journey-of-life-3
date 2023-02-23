<template>
  <view class="intelligent-selection-container">
    <Fields></Fields>

    <view class="package-list">
      <Package v-for="item in tempData" :key="item.name" :data="item"></Package>
    </view>
  </view>
</template>

<script>
import Fields from './Fields.vue'
import Package from './Package.vue'
import { tempData } from './data'
export default {
  components: {
    Fields,
    Package,
  },

  data() {
    return {
      tempData: Object.freeze(tempData),
    }
  },
}
</script>

<style lang="less" scoped>
.package-list {
  padding: 20upx;
  box-sizing: border-box;
}
</style>
