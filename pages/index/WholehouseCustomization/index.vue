<template>
  <view class="Wholehouse-customization-container">
    <view class="filter">
      <view class="item" v-for="item in filters" :key="item.value">
        <text>{{ item.label }}</text>
        <tui-icon :size="20" :name="item.icon"></tui-icon>
      </view>
    </view>

    <view class="company-container">
      <DesignCompany v-for="item in 10" :key="item"></DesignCompany>
    </view>
  </view>
</template>

<script>
import { filters } from './data'
import DesignCompany from './DesignCompany.vue'
export default {
  components: {
    DesignCompany,
  },
  data() {
    return {
      filters: Object.freeze(filters),
    }
  },
}
</script>

<style lang="less" scoped>
.Wholehouse-customization-container {
  .filter {
    display: flex;
    align-items: center;
    background-color: #fff;
    height: 70upx;
    border-radius: 0 0 24upx 24upx;

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 33%;
      text-align: center;
      color: #3a3629;
      font-size: 28upx;
    }
  }

  .company-container {
    padding: 20upx;
    box-sizing: border-box;
  }
}
</style>
